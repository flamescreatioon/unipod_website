import app from "./runtime.js";

const port = Number(process.env.PORT || process.env.CONTACT_API_PORT || 8787);
const server = app.listen(port, () =>
  console.log(`Contact API listening on http://localhost:${port}`),
);
let closing = false;
function shutdown() {
  if (closing) return;
  closing = true;
  server.close();
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
