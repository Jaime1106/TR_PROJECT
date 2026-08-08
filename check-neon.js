import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL);

console.log('\n=== TIPOS DE CONTRIBUYENTE ===');

const tipos = await sql`
  SELECT *
  FROM tipos_contribuyente
  ORDER BY id;
`;

console.table(tipos);


console.log('\n=== REGLAS DE IMPUESTOS ===');

const reglas = await sql`
  SELECT *
  FROM reglas_impuestos
  ORDER BY id;
`;

console.table(reglas);


console.log('\n=== OBLIGACIONES TRIBUTARIAS ===');

const obligaciones = await sql`
  SELECT *
  FROM obligaciones_tributarias
  ORDER BY id;
`;

console.table(obligaciones);