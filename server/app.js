import cors from "cors";
import express from "express";
import { interests } from "../shared/enquiries.js";

const allowedInterests = new Set(Object.values(interests));
const defaultLimit = 10;
const windowMs = 15 * 60 * 1000;

function validDate(value) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value
  );
}

export function createApp({
  saveEnquiry,
  checkDatabase,
  allowedOrigins = ["http://localhost:5173"],
  rateLimitMax = defaultLimit,
} = {}) {
  const app = express();
  const attempts = new Map();
  app.disable("x-powered-by");
  app.use(cors({ origin: allowedOrigins, methods: ["POST", "GET"] }));
  app.use(express.json({ limit: "32kb" }));

  app.get("/api/health", async (_request, response) => {
    response.set("Cache-Control", "no-store");
    try {
      if (!checkDatabase)
        return response.status(503).json({ database: "unavailable" });
      await checkDatabase();
      return response.json({ database: "ready" });
    } catch {
      return response.status(503).json({ database: "unavailable" });
    }
  });

  app.use("/api/cms", (_request, response) =>
    response
      .status(410)
      .json({ error: "Content management has moved to Sanity Studio." }),
  );

  app.post("/api/contact", async (request, response) => {
    const now = Date.now();
    for (const [key, record] of attempts)
      if (record.expires <= now) attempts.delete(key);
    const key = request.ip;
    if (!attempts.has(key) && attempts.size >= 10000) {
      return response.status(503).json({
        error: "The enquiry service is busy. Please try again shortly.",
      });
    }
    const record = attempts.get(key) || { count: 0, expires: now + windowMs };
    record.count += 1;
    attempts.set(key, record);
    if (record.count > rateLimitMax) {
      response.set(
        "Retry-After",
        String(Math.ceil((record.expires - now) / 1000)),
      );
      return response.status(429).json({
        error:
          "Too many enquiries from this connection. Please try again in 15 minutes.",
      });
    }

    const body = request.body;
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return response
        .status(400)
        .json({ error: "Please complete the enquiry form and try again." });
    }
    // Honeypot responses do not create database records.
    if (body.website) return response.status(201).json({ ok: true });
    const fields = [
      "name",
      "email",
      "interest",
      "message",
      "subject",
      "preferredDate",
      "groupSize",
    ];
    const clean = Object.fromEntries(
      fields.map((field) => [
        field,
        typeof body[field] === "string" ? body[field].trim() : "",
      ]),
    );
    clean.email = clean.email.toLowerCase();
    if (!clean.name || !clean.email || !clean.interest || !clean.message) {
      return response
        .status(400)
        .json({ error: "Please complete every required field." });
    }
    if (
      clean.name.length > 120 ||
      clean.email.length > 254 ||
      clean.message.length > 5000 ||
      clean.subject.length > 160
    ) {
      return response.status(400).json({
        error: "One or more fields are too long. Please shorten your enquiry.",
      });
    }
    if (!allowedInterests.has(clean.interest)) {
      return response
        .status(400)
        .json({ error: "Please select one of the listed areas of interest." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) {
      return response
        .status(400)
        .json({ error: "Enter a valid email address." });
    }
    if (clean.preferredDate && !validDate(clean.preferredDate)) {
      return response
        .status(400)
        .json({ error: "Enter a valid preferred visit date." });
    }
    if (
      clean.groupSize &&
      (!/^\d+$/.test(clean.groupSize) ||
        Number(clean.groupSize) < 1 ||
        Number(clean.groupSize) > 1000)
    ) {
      return response.status(400).json({
        error: "Group size must be a whole number between 1 and 1000.",
      });
    }
    if (!saveEnquiry)
      return response.status(503).json({
        error:
          "The enquiry service is temporarily unavailable. Please try again later.",
      });

    const context = [
      clean.subject && `Subject: ${clean.subject}`,
      clean.interest === interests.visit &&
        clean.preferredDate &&
        `Preferred visit date: ${clean.preferredDate}`,
      clean.interest === interests.visit &&
        clean.groupSize &&
        `Group size: ${clean.groupSize}`,
    ].filter(Boolean);
    try {
      await saveEnquiry({
        name: clean.name,
        email: clean.email,
        interest: clean.interest,
        message: [...context, clean.message].join("\n\n"),
      });
      return response.status(201).json({ ok: true });
    } catch (error) {
      // Avoid printing submitted personal details or database connection strings.
      console.error("Contact submission failed", {
        code: error.code || "unknown",
      });
      return response.status(503).json({
        error: "Your enquiry could not be saved. Please try again in a moment.",
      });
    }
  });

  app.use("/api", (_request, response) =>
    response.status(404).json({ error: "This API endpoint was not found." }),
  );
  app.use((error, _request, response, _next) => {
    if (error.type === "entity.too.large")
      return response.status(413).json({
        error: "Your enquiry is too large. Please shorten your message.",
      });
    if (error.type === "entity.parse.failed")
      return response
        .status(400)
        .json({ error: "The enquiry could not be read. Please try again." });
    return response
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  });
  return app;
}
