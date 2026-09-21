import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { contactMessages } from "./db/schema.js";
import { createApp } from "./app.js";

const port = Number(process.env.CONTACT_API_PORT || 8787);
const allowedOrigins = (
  process.env.CONTACT_APP_ORIGIN || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim());
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
  checkDatabase: pool ? () => pool.query("SELECT 1") : undefined,
  saveEnquiry: db
    ? (enquiry) => db.insert(contactMessages).values(enquiry)
    : undefined,
});
const server = app.listen(port, () =>
  console.log(`Contact API listening on http://localhost:${port}`),
);
let closing = false;
function shutdown() {
  if (closing) return;
  closing = true;
  server.close(async () => {
    await pool?.end();
  });
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
