import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { CLARITY_HEAD_SCRIPT, installClarity, stopClarity } from "../app/lib/clarity.js";
import { saveTrackingChoice } from "../app/lib/funnel.js";

const stored = new Map();
const scripts = [];
const parentNode = { insertBefore: (script) => scripts.push(script) };
const document = {
  querySelector: () => scripts.find((script) => script.src?.startsWith("https://www.clarity.ms/tag/")) || null,
  createElement: () => ({ dataset: {} }),
  getElementsByTagName: () => [{ parentNode }],
};
const window = {
  location: { pathname: "/" },
  localStorage: {
    getItem: (key) => stored.get(key) ?? null,
    setItem: (key, value) => stored.set(key, value),
  },
};
globalThis.window = window;
globalThis.document = document;
vm.runInNewContext(CLARITY_HEAD_SCRIPT, { window, document });

installClarity();
assert.equal(scripts.length, 0, "Clarity does not load before consent");
saveTrackingChoice("marketing");
installClarity();
assert.equal(scripts.length, 0, "Marketing-only consent does not allow session replay");
saveTrackingChoice("analytics");
installClarity();
installClarity();
assert.equal(scripts.length, 1, "Clarity loads only once after analytics consent");
assert.equal(scripts[0].src, "https://www.clarity.ms/tag/yxxz3i32wm");
assert.equal(window.clarity.q[0][0], "consentv2");
assert.equal(window.clarity.q[0][1].analytics_Storage, "granted");
assert.equal(window.clarity.q[0][1].ad_Storage, "denied");

saveTrackingChoice("reject");
assert.equal(stopClarity(), true, "Consent withdrawal stops an already loaded tag");
assert.equal(window.clarity.q.at(-1)[0], "consent");
assert.equal(window.clarity.q.at(-1)[1], false);
installClarity();
assert.equal(scripts.length, 1, "Withdrawal prevents a new Clarity load");

scripts.length = 0;
saveTrackingChoice("analytics");
window.location.pathname = "/curator-desk";
installClarity();
assert.equal(scripts.length, 0, "Clarity does not load on the private curator desk");
window.location.pathname = "/newsletter/confirmed";
installClarity();
assert.equal(scripts.length, 0, "Clarity does not load on newsletter confirmation pages");

const layout = readFileSync(new URL("../app/layout.jsx", import.meta.url), "utf8");
assert.match(layout, /<head><script id="ryravel-clarity-loader"/, "The loader is in the shared head");
const worker = readFileSync(new URL("../worker.js", import.meta.url), "utf8");
assert.match(worker, /script-src [^;]*https:\/\/\*\.clarity\.ms/);
assert.match(worker, /connect-src [^;]*https:\/\/\*\.clarity\.ms https:\/\/c\.bing\.com/);
const request = readFileSync(new URL("../app/request/page.jsx", import.meta.url), "utf8");
assert.match(request, /className=\{`request-page[^\n]*data-clarity-mask="true"/, "The personal request is masked");

console.log("PASS Clarity head loader, consent, single tag, withdrawal, private routes and masking");
