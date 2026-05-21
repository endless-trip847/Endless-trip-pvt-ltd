import "dotenv/config"; // 👈 REQUIRED
import fs from "fs";
import path from "path";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function initDB() {
  try {
    const sql = fs.readFileSync(
      path.join(process.cwd(), "scripts/create-tables.sql"),
      "utf8"
    );

    await pool.query(sql);
    console.log("✅ Database tables created successfully");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  } finally {
    await pool.end();
  }
}

initDB();
