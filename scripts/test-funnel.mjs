import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { clearAnalyticsSession, readTrackingChoice, saveTrackingChoice, trackFunnel } from "../app/lib/funnel.js";

function storage() {
  const values = new Map();
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) };
}

const localStorage = storage();
const sessionStorage = storage();
const sent = [];
globalThis.window = { localStorage, sessionStorage, crypto: globalThis.crypto };
globalThis.fetch = async (_url, options) => { assert.equal(options.referrerPolicy, "no-referrer", "Analytics does not transmit the source URL in Referer"); sent.push(JSON.parse(options.body)); return { ok: true }; };

trackFunnel("journey_viewed", { journey_slug: "ex6" });
assert.equal(sent.length, 0, "Nothing is sent before consent");
saveTrackingChoice("analytics");
assert.equal(readTrackingChoice(), "analytics");
trackFunnel("journey_viewed", { journey_slug: "ex6", name: "Private name", email: "private@example.com", query: "?email=private@example.com" });
assert.equal(sent.length, 1);
assert.deepEqual(Object.keys(sent[0]).sort(), ["event", "id", "journey_slug", "session"].sort(), "Only allowlisted event fields leave the browser");
trackFunnel("form_started", { journey_slug: "ex6" });
assert.equal(sent[0].session, sent[1].session, "The browser session is stable for funnel counting");
saveTrackingChoice("reject");
clearAnalyticsSession();
trackFunnel("form_abandoned");
assert.equal(sent.length, 2, "Withdrawal stops future analytics");
saveTrackingChoice("marketing");
trackFunnel("journey_viewed", { journey_slug: "ex6" });
assert.equal(sent.length, 2, "Marketing-only consent never enables funnel analytics");
localStorage.setItem("ryravel-cookie-choice-v2", JSON.stringify({ choice: "all", at: Date.now() - 184 * 86400000 }));
assert.equal(readTrackingChoice(), null, "Old consent expires and must be renewed");

const endpoint = readFileSync(new URL("../app/api/analytics/route.js", import.meta.url), "utf8");
assert.match(endpoint, /origin !== new URL\(request.url\).origin/, "Collector is same-origin only");
assert.match(endpoint, /errorFields\.has\(field\)/, "Collector validates error-field names");
assert.doesNotMatch(endpoint, /value\.(name|email|phone|message|sourceUrl)/, "Collector does not persist contact or free-text data");
console.log("PASS Funnel consent, event allowlist, session counting and collector boundaries");
