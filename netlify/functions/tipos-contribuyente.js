import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async () => {
  try {
    const tipos = await sql`
      SELECT id, nombre
      FROM tipos_contribuyente
      ORDER BY id;
    `;

    return new Response(JSON.stringify(tipos), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error consultando tipos de contribuyente:', error);

    return new Response(
      JSON.stringify({
        error: 'Error al consultar los tipos de contribuyente',
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