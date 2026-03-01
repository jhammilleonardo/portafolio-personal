import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "portafolio",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "+00:00"
});
async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}
async function queryOne(sql, params) {
  const rows = await query(sql, params);
  return rows[0] ?? null;
}

export { pool as default, query, queryOne };
