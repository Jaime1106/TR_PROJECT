import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async () => {
  try {
    const reglas = await sql`
      SELECT
        id,
        "tipoContribuyenteId",
        impuesto,
        frecuencia
      FROM reglas_impuestos
      ORDER BY id;
    `;

    return new Response(JSON.stringify(reglas), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error consultando reglas de impuestos:', error);

    return new Response(
      JSON.stringify({
        error: 'Error al consultar las reglas de impuestos',
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