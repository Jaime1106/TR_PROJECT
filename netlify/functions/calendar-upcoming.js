import { neon } from '@neondatabase/serverless';
import { validateNIT } from './utils/nit.js';

const sql = neon(process.env.DATABASE_URL);

const CONTRIBUYENTE_MAP = {
  'Gran Contribuyente': 'gran',
  'Responsable de IVA Bimestral': 'iva_bimestral',
  'Responsable de IVA Cuatrimestral': 'iva_cuatrimestral',
  'No Responsable de IVA': 'no_iva',

  'gran-contribuyente': 'gran',
  'responsable-iva-bimestral': 'iva_bimestral',
  'responsable-iva-cuatrimestral': 'iva_cuatrimestral',
  'no-responsable-iva': 'no_iva',
};

function getDaysUntilDue(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(date);
  dueDate.setHours(0, 0, 0, 0);

  return Math.ceil(
    (dueDate.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );
}

export default async (request) => {
  try {
    const url = new URL(request.url);

    const nit = url.searchParams.get('nit');
    const contribuyenteType =
      url.searchParams.get('contribuyenteType');

    const daysParam = url.searchParams.get('days');

    const days = daysParam
      ? Number.parseInt(daysParam, 10)
      : 30;

    // -----------------------------
    // Validar NIT
    // -----------------------------

    const nitValidation = validateNIT(nit);

    if (!nitValidation.valid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: nitValidation.error,
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // -----------------------------
    // Validar tipo contribuyente
    // -----------------------------

    const tipoId = CONTRIBUYENTE_MAP[contribuyenteType];

    if (!tipoId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Tipo de contribuyente no válido',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // -----------------------------
    // Obtener reglas
    // -----------------------------

    const reglas = await sql`
      SELECT
        impuesto,
        frecuencia
      FROM reglas_impuestos
      WHERE "tipoContribuyenteId" = ${tipoId};
    `;

    // -----------------------------
    // Fecha actual y límite
    // -----------------------------

    const today = new Date();

    const limitDate = new Date(today);
    limitDate.setDate(limitDate.getDate() + days);

    // -----------------------------
    // Obtener obligaciones
    // -----------------------------

    const obligaciones = await sql`
      SELECT
        id,
        grupo,
        impuesto,
        periodo,
        frecuencia,
        "sujetoActivo",
        "fechaVencimiento",
        estado,
        "mesVencimiento"
      FROM obligaciones_tributarias
      WHERE "grupo" = ${String(nitValidation.lastDigit)}
        AND "fechaVencimiento" >= ${today}
        AND "fechaVencimiento" <= ${limitDate}
      ORDER BY "fechaVencimiento" ASC;
    `;

    // -----------------------------
    // Aplicar reglas
    // -----------------------------

    const upcoming = obligaciones
      .filter((obligacion) =>
        reglas.some(
          (regla) =>
            regla.impuesto === obligacion.impuesto &&
            regla.frecuencia === obligacion.frecuencia
        )
      )
      .map((obligacion) => {
        const dueDate = new Date(
          obligacion.fechaVencimiento
        );

        return {
          nit: nitValidation.fullNIT,
          contribuyenteType,
          taxType: obligacion.impuesto,
          frequency: obligacion.frecuencia,
          institution: obligacion.sujetoActivo,
          period: obligacion.periodo,
          dueDate: dueDate.toISOString().split('T')[0],
          daysUntil: getDaysUntilDue(dueDate),
          status: getDaysUntilDue(dueDate) <= 7
            ? 'próximo a vencer'
            : 'vigente',
          ultimoDigito: nitValidation.lastDigit,
          grupo: obligacion.grupo,
        };
      });

    return new Response(
      JSON.stringify({
        success: true,
        data: upcoming,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error(
      'Error en calendar-upcoming:',
      error
    );

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error al consultar próximos vencimientos',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};