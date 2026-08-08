import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async () => {
  try {
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
      ORDER BY "fechaVencimiento", id;
    `;

    return new Response(JSON.stringify(obligaciones), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error consultando obligaciones tributarias:', error);

    return new Response(
      JSON.stringify({
        error: 'Error al consultar las obligaciones tributarias',
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