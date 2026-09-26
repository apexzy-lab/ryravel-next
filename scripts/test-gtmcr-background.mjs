import { spawn, spawnSync } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const wrangler = path.join(root, "node_modules", ".bin", "wrangler.cmd");
const persistence = await mkdtemp(path.join(tmpdir(), "ryravel-gtmcr-test-"));
const workerPort = 8792;
const slowDelayMs = 2500;
const maximumVisitorDelayMs = 1200;
let worker;
let workerOutput = "";
let slowSignal;
let resolveSlowSignal;
let confirmationSignal;
let resolveConfirmationSignal;

function runWrangler(args) {
  const result = spawnSync(wrangler, args, { cwd: root, encoding: "utf8", shell: true, windowsHide: true });
  if (result.status !== 0) throw new Error(`${result.stdout}\n${result.stderr}`.trim());
}

async function waitForWorker(output) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${workerPort}/request`);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Worker did not start.\n${output()}`);
}

function enquiry(email) {
  return {
    name: "Background Delivery Test",
    email,
    emailConfirmation: email,
    feeling: "Exhausted",
    month: "January",
    year: "2027",
    duration: "6 nights",
    people: "2",
    budget: "$7,000 - $12,000",
    countryCode: "+1",
    phone: "760 514 0361",
    message: "This sensitive message must not be sent to GTMCR.",
    sourceUrl: "https://ryravel.com/request?background-test=1",
  };
}

async function submit(email) {
  const startedAt = performance.now();
  const response = await fetch(`http://127.0.0.1:${workerPort}/api/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(enquiry(email)),
  });
  const elapsedMs = performance.now() - startedAt;
  const body = await response.json();
  if (response.status !== 201 || body.received !== true || !body.reference) {
    throw new Error(`Submission failed with ${response.status}: ${JSON.stringify(body)}`);
  }
  if (elapsedMs >= maximumVisitorDelayMs) {
    throw new Error(`Visitor response took ${elapsedMs.toFixed(0)}ms; expected under ${maximumVisitorDelayMs}ms`);
  }
  return { elapsedMs, reference: body.reference };
}

const mock = createServer((request, response) => {
  const chunks = [];
  request.on("data", (chunk) => chunks.push(chunk));
  request.on("end", async () => {
    const payload = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    const startedAt = performance.now();
    await new Promise((resolve) => setTimeout(resolve, slowDelayMs));
    response.writeHead(202, { "Content-Type": "application/json" });
    response.end("{}");
    const result = { payload, elapsedMs: performance.now() - startedAt };
    if (request.url === "/emails") resolveConfirmationSignal(result);
    else resolveSlowSignal(result);
  });
});

try {
  runWrangler(["d1", "execute", "DB", "--local", "--config", "wrangler.jsonc", "--persist-to", persistence, "--file", "drizzle/0000_famous_blockbuster.sql"]);
  runWrangler(["d1", "execute", "DB", "--local", "--config", "wrangler.jsonc", "--persist-to", persistence, "--file", "drizzle/0002_certain_cannonball.sql"]);
  runWrangler(["d1", "execute", "DB", "--local", "--config", "wrangler.jsonc", "--persist-to", persistence, "--file", "drizzle/0004_delivery_outbox.sql"]);

  await new Promise((resolve) => mock.listen(0, "127.0.0.1", resolve));
  const mockPort = mock.address().port;
  slowSignal = new Promise((resolve) => { resolveSlowSignal = resolve; });
  confirmationSignal = new Promise((resolve) => { resolveConfirmationSignal = resolve; });

  worker = spawn(wrangler, [
    "dev",
    "--config", "dist/server/wrangler.json",
    "--persist-to", persistence,
    "--port", String(workerPort),
    "--var", "GTMCR_SIGNAL_TOKEN:test-token",
    "--var", "ADMIN_API_TOKEN:test-only-admin-key",
    "--var", "GTMCR_TRANSACTIONAL_CONTACTS_READY:true",
    "--var", `GTMCR_SIGNALS_API_URL:http://127.0.0.1:${mockPort}/api/v1/events`,
    "--var", "RESEND_API_KEY:test-resend-token",
    "--var", `RESEND_API_URL:http://127.0.0.1:${mockPort}/emails`,
  ], { cwd: root, shell: true, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
  worker.stdout.on("data", (chunk) => { workerOutput += chunk; });
  worker.stderr.on("data", (chunk) => { workerOutput += chunk; });
  await waitForWorker(() => workerOutput);
  const base = `http://127.0.0.1:${workerPort}`;
  const forged = await fetch(base + "/api/admin/enquiries", { headers: { "oai-authenticated-user-email": "fake@example.test", "cf-access-authenticated-user-email": "fake@example.test", "cf-access-jwt-assertion": "fake" } });
  if (forged.status !== 401) throw new Error("Forged identity headers were accepted");
  const login = await fetch(base + "/api/admin/session", { method: "POST", headers: { Origin: base, "Content-Type": "application/json" }, body: JSON.stringify({ accessKey: "test-only-admin-key" }) });
  const cookie = login.headers.get("set-cookie");
  if (!login.ok || !cookie?.includes("HttpOnly") || !cookie.includes("SameSite=Strict")) throw new Error("Secure browser session could not be issued");
  const headers = { Cookie: cookie.split(";")[0] };
  const overview = await fetch(base + "/api/admin/enquiries", { headers });
  if (!overview.ok) throw new Error("Signed session could not read the desk");
  const health = await fetch(base + "/api/admin/operations", { headers });
  if (!health.ok) throw new Error("Operating health could not be read");
  const csrf = await fetch(base + "/api/admin/operations", { method: "POST", headers: { ...headers, Origin: "https://evil.example", "Content-Type": "application/json" }, body: JSON.stringify({ action: "retry-failed" }) });
  if (csrf.status !== 403) throw new Error("Cross-origin admin mutation was accepted");

  const slowSubmission = await submit("slow-signal@example.test");
  const delivered = await Promise.race([
    slowSignal,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`Slow GTMCR signal did not finish.\n${workerOutput}`)), slowDelayMs + 3000)),
  ]);
  if (delivered.elapsedMs < slowDelayMs - 100) throw new Error("Mock GTMCR response was not actually slow");
  if (!delivered.payload.eventId?.startsWith("ryravel-enquiry-") || delivered.payload.event !== "form_submitted") {
    throw new Error(`Unexpected GTMCR event: ${JSON.stringify(delivered.payload)}`);
  }
  if (delivered.payload.properties?.name !== "Background Delivery Test" || delivered.payload.properties?.source_page !== enquiry("").sourceUrl) {
    throw new Error(`GTMCR properties are incomplete: ${JSON.stringify(delivered.payload.properties)}`);
  }
  if ("message" in delivered.payload.properties) throw new Error("Sensitive enquiry message was sent to GTMCR");
  if (delivered.payload.contact?.email !== "slow-signal@example.test" || delivered.payload.properties.marketing_consent !== false) throw new Error("Identified consent-safe contract was not preserved");
  const confirmation = await Promise.race([
    confirmationSignal,
    new Promise((_, reject) => setTimeout(() => reject(new Error(`Guest confirmation did not finish.\n${workerOutput}`)), slowDelayMs + 3000)),
  ]);
  if (confirmation.payload.to?.[0] !== "slow-signal@example.test" || !confirmation.payload.subject?.includes(slowSubmission.reference)) {
    throw new Error(`Guest confirmation is incomplete: ${JSON.stringify(confirmation.payload)}`);
  }

  await new Promise((resolve) => mock.close(resolve));
  const outageSubmission = await submit("outage-signal@example.test");
  await new Promise((resolve) => setTimeout(resolve, 300));

  console.log(JSON.stringify({
    slowResponse: { visitorMs: Math.round(slowSubmission.elapsedMs), gtmcrMs: Math.round(delivered.elapsedMs), status: 201 },
    outageResponse: { visitorMs: Math.round(outageSubmission.elapsedMs), status: 201 },
    backgroundDeliveryCompleted: true,
    outageDidNotBreakSubmission: true,
    guestConfirmationQueuedInBackground: true,
    sensitiveMessageExcluded: true,
  }));
} finally {
  if (worker && worker.exitCode === null) {
    spawnSync("taskkill.exe", ["/PID", String(worker.pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
    await new Promise((resolve) => {
      const timeout = setTimeout(resolve, 2000);
      worker.once("exit", () => {
        clearTimeout(timeout);
        resolve();
      });
    });
  }
  if (mock.listening) await new Promise((resolve) => mock.close(resolve));
  const resolvedTemp = path.resolve(tmpdir());
  const resolvedPersistence = path.resolve(persistence);
  if (!resolvedPersistence.startsWith(`${resolvedTemp}${path.sep}`)) throw new Error(`Refusing to remove unexpected path: ${resolvedPersistence}`);
  await rm(resolvedPersistence, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
