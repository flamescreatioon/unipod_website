import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { contactMessages } from './db/schema.js';

const app = express();
const port = Number(process.env.CONTACT_API_PORT || 8787);
const allowedOrigins = (process.env.CONTACT_APP_ORIGIN || 'http://localhost:5173').split(',').map((origin) => origin.trim());
const pool = process.env.DATABASE_URL ? new Pool({ connectionString: process.env.DATABASE_URL, max: 5 }) : null;
const db = pool ? drizzle(pool) : null;

app.use(cors({ origin: allowedOrigins, methods: ['POST', 'GET'] }));
app.use(express.json({ limit: '16kb' }));

app.get('/api/health', (_request, response) => response.json({ database: Boolean(db) ? 'configured' : 'not configured' }));

app.post('/api/contact', async (request, response) => {
  if (!db) return response.status(503).json({ error: 'Contact service is not configured yet.' });

  const { name, email, interest, message } = request.body ?? {};
  const clean = {
    name: typeof name === 'string' ? name.trim() : '',
    email: typeof email === 'string' ? email.trim().toLowerCase() : '',
    interest: typeof interest === 'string' ? interest.trim() : '',
    message: typeof message === 'string' ? message.trim() : '',
  };

  if (!clean.name || !clean.email || !clean.interest || !clean.message) return response.status(400).json({ error: 'Please complete every field.' });
  if (clean.name.length > 120 || clean.email.length > 254 || clean.interest.length > 80 || clean.message.length > 5000) return response.status(400).json({ error: 'One or more fields are too long.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) return response.status(400).json({ error: 'Enter a valid email address.' });

  try {
    await db.insert(contactMessages).values(clean);
    return response.status(201).json({ ok: true });
  } catch (error) {
    console.error('Contact submission failed', error);
    return response.status(500).json({ error: 'We could not send your message. Please try again.' });
  }
});

app.listen(port, () => console.log(`Contact API listening on http://localhost:${port}`));
