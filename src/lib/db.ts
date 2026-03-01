import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: import.meta.env.DB_HOST || 'localhost',
  port: Number(import.meta.env.DB_PORT) || 3306,
  user: import.meta.env.DB_USER || 'root',
  password: import.meta.env.DB_PASSWORD || '',
  database: import.meta.env.DB_NAME || 'portafolio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+00:00',
});

export default pool;

export async function query<T = unknown>(
  sql: string,
  params?: unknown[]
): Promise<T[]> {
  const [rows] = await pool.execute(sql, params);
  return rows as T[];
}

export async function queryOne<T = unknown>(
  sql: string,
  params?: unknown[]
): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}
