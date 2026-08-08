import { neon } from '@neondatabase/serverless';
import { validateNIT } from './utils/nit.js';

const sql = neon(process.env.DATABASE_URL);

const CONTRIBUYENTE_MAP = {
  // Valores que puede enviar el frontend
  'Gran Contribuyente': 'gran',
  'Responsable de IVA Bimestral': 'iva_bimestral',
  'Responsable de IVA Cuatrimestral': 'iva_cuatrimestral',
  'No Responsable de IVA': 'no_iva',

  // IDs internos del frontend
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

  const difference = dueDate.getTime() - today.getTime();

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

function getStatus(date) {
  const daysUntil = getDaysUntilDue(date);

  if (daysUntil < 0) return 'vencido';
  if (daysUntil <= 7) return 'próximo a vencer';

  return 'vigente';
}

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export default async (request) => {
  try {
    const url = new URL(request.url);

    const nit = url.searchParams.get('nit');
    const contribuyenteType = url.searchParams.get('contribuyenteType');
    const month = url.searchParams.get('month');
    const yearParam = url.searchParams.get('year');

    // -----------------------------
    // Validación del NIT
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
    // Validación del contribuyente
    // -----------------------------

    if (!contribuyenteType) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Debe especificar el tipo de contribuyente',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

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
    // Año
    // -----------------------------

    const year = yearParam
      ? Number.parseInt(yearParam, 10)
      : new Date().getFullYear();

    if (!Number.isInteger(year)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'El año no es válido',
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
    // Obtener reglas del contribuyente
    // -----------------------------

    const reglas = await sql`
      SELECT
        impuesto,
        frecuencia
      FROM reglas_impuestos
      WHERE "tipoContribuyenteId" = ${tipoId};
    `;

    if (reglas.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'No existen reglas para este tipo de contribuyente',
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

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
  WHERE EXTRACT(YEAR FROM "fechaVencimiento") = ${year}
    AND "grupo" = ${String(nitValidation.lastDigit)}
  ORDER BY "fechaVencimiento", id;
`;
    // -----------------------------
    // Relacionar reglas + obligaciones
    // -----------------------------

    const obligations = obligaciones
      .filter((obligacion) =>
        reglas.some(
          (regla) =>
            regla.impuesto === obligacion.impuesto &&
            regla.frecuencia === obligacion.frecuencia
        )
      )
      .filter((obligacion) => {
        if (!month) return true;

        const dueDate = new Date(obligacion.fechaVencimiento);
        return dueDate.getMonth() + 1 === Number(month);
      })
      .map((obligacion) => {
        const dueDate = new Date(obligacion.fechaVencimiento);

        return {
          nit: nitValidation.fullNIT,
          contribuyenteType,
          taxType: obligacion.impuesto,
          frequency: obligacion.frecuencia,
          institution: obligacion.sujetoActivo,
          period: obligacion.periodo,
          dueDate: dueDate.toISOString().split('T')[0],
          year,
          month: MONTHS[dueDate.getMonth()],
          daysUntil: getDaysUntilDue(dueDate),
          status: getStatus(dueDate),
          paid: false,
          ultimoDigito: nitValidation.lastDigit,
          grupo: obligacion.grupo,
        };
      });

    // -----------------------------
    // Resumen mensual
    // -----------------------------

    const summary = {};

    obligations.forEach((obligation) => {
      const monthName = obligation.month;

      if (!summary[monthName]) {
        summary[monthName] = {
          count: 0,
          vencidos: 0,
          proximos: 0,
          vigentes: 0,
          pagados: 0,
        };
      }

      summary[monthName].count++;

      if (obligation.status === 'vencido') {
        summary[monthName].vencidos++;
      } else if (obligation.status === 'próximo a vencer') {
        summary[monthName].proximos++;
      } else if (obligation.status === 'vigente') {
        summary[monthName].vigentes++;
      }
    });

    const monthlySummary = Object.entries(summary).map(
      ([monthName, data]) => ({
        month: monthName,
        ...data,
      })
    );

    // -----------------------------
    // Respuesta
    // -----------------------------

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          nit: nitValidation.fullNIT,
          lastDigit: nitValidation.lastDigit,
          contribuyenteType,
          year,
          totalObligations: obligations.length,
          obligations,
          monthlySummary,
          queryDate: new Date().toISOString(),
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error en calendar-query:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error al consultar el calendario',
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