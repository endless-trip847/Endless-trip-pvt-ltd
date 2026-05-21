// src/lib/db.js

import pkg from "pg";
const { Pool } = pkg;

// Neon PostgreSQL connection
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

// Optional: quick test helper (remove later if you want)
export async function testDB() {
  const res = await pool.query("SELECT NOW()");
  return res.rows[0];
}
