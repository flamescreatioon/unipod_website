import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";
import { createApp } from "./app.js";

const valid = {
  name: " Test Visitor ",
  email: "VISITOR@example.com",
  interest: "Programmes & training",
  message: "I would like to learn CAD.",
  subject: "Design & digital manufacturing",
};

async function start(t, options) {
  const server = createApp(options).listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;
  return {
    get: (path) => fetch(origin + path),
    post: (body, raw = false) =>
      fetch(origin + "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: raw ? body : JSON.stringify(body),
      }),
  };
}

test("programme enquiry retains selection and normalizes contact details", async (t) => {
  const saved = [];
  const api = await start(t, {
    saveEnquiry: async (enquiry) => saved.push(enquiry),
  });
  const response = await api.post(valid);
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(saved.length, 1);
  assert.equal(saved[0].name, "Test Visitor");
  assert.equal(saved[0].email, "visitor@example.com");
  assert.match(saved[0].message, /Subject: Design & digital manufacturing/);
  assert.match(saved[0].message, /I would like to learn CAD/);
});

test("visit request retains date and group size", async (t) => {
  let saved;
  const api = await start(t, {
    saveEnquiry: async (enquiry) => {
      saved = enquiry;
    },
  });
  assert.equal(
    (
      await api.post({
        ...valid,
        interest: "Facility visit",
        subject: "",
        preferredDate: "2026-10-12",
        groupSize: "12",
      })
    ).status,
    201,
  );
  assert.match(saved.message, /Preferred visit date: 2026-10-12/);
  assert.match(saved.message, /Group size: 12/);
});

test("invalid requests and honeypot never reach storage", async (t) => {
  let writes = 0;
  const api = await start(t, {
    saveEnquiry: async () => {
      writes++;
    },
    rateLimitMax: 100,
  });
  for (const update of [
    { email: "invalid" },
    { interest: "Invalid option" },
    { message: " " },
    { subject: "a".repeat(161) },
    { preferredDate: "2026-02-31" },
    { groupSize: "1.5" },
  ]) {
    assert.equal((await api.post({ ...valid, ...update })).status, 400);
  }
  assert.equal((await api.post('{"broken":', true)).status, 400);
  assert.equal(
    (await api.post({ ...valid, website: "spam.invalid" })).status,
    201,
  );
  assert.equal(writes, 0);
});

test("oversized requests return readable JSON", async (t) => {
  const api = await start(t, {});
  const response = await api.post({ ...valid, message: "x".repeat(40000) });
  assert.equal(response.status, 413);
  assert.equal(typeof (await response.json()).error, "string");
});

test("rate limiting rejects repeated submissions with retry information", async (t) => {
  let writes = 0;
  const api = await start(t, {
    rateLimitMax: 2,
    saveEnquiry: async () => {
      writes++;
    },
  });
  assert.equal((await api.post(valid)).status, 201);
  assert.equal((await api.post(valid)).status, 201);
  const response = await api.post(valid);
  assert.equal(response.status, 429);
  assert.ok(Number(response.headers.get("Retry-After")) > 0);
  assert.equal(writes, 2);
});

test("health checks distinguish ready, disconnected and unconfigured databases", async (t) => {
  let connected = true;
  const api = await start(t, {
    checkDatabase: async () => {
      if (!connected) throw Error("offline");
    },
  });
  assert.equal((await api.get("/api/health")).status, 200);
  connected = false;
  assert.equal((await api.get("/api/health")).status, 503);
  const missing = await start(t, {});
  assert.equal((await missing.get("/api/health")).status, 503);
  assert.equal((await missing.post(valid)).status, 503);
});

test("failed storage returns an error instead of a success receipt", async (t) => {
  const api = await start(t, {
    saveEnquiry: async () => {
      throw Object.assign(new Error("offline"), { code: "TEST_OFFLINE" });
    },
  });
  const response = await api.post(valid);
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /could not be saved/);
});
