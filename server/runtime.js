import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { contactMessages } from "./db/schema.js";
import { createApp } from "./app.js";

const allowedOrigins = (
  process.env.CONTACT_APP_ORIGIN || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Module scope lets a warm Vercel Function reuse its database pool instead of
// opening a fresh connection for every request.
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      query_timeout: 8000,
      statement_timeout: 8000,
    })
  : null;
const db = pool ? drizzle(pool) : null;

pool?.on("error", (error) =>
  console.error("Database connection error", { code: error.code || "unknown" }),
);

const app = createApp({
  allowedOrigins,
  trustProxy: Boolean(process.env.VERCEL),
  checkDatabase: pool ? () => pool.query("SELECT 1") : undefined,
  saveEnquiry: db
    ? (enquiry) => db.insert(contactMessages).values(enquiry)
    : undefined,
});

export default app;
