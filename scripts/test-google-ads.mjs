import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { installGoogleAdsTag, recordGoogleAdsLead, updateGoogleAdsConsent } from "../app/lib/googleAds.js";
import { saveTrackingChoice } from "../app/lib/funnel.js";

const values = new Map();
const scripts = [];
globalThis.window = {
  localStorage: {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  },
};
globalThis.document = {
  querySelector: () => scripts.find((script) => script.dataset.ryravelGoogleAds === "true") || null,
  createElement: () => ({ dataset: {} }),
  head: { appendChild: (script) => scripts.push(script) },
};

installGoogleAdsTag();
recordGoogleAdsLead("RY-TEST");
assert.equal(scripts.length, 0, "Google tag is blocked without marketing consent");

saveTrackingChoice("analytics");
installGoogleAdsTag();
recordGoogleAdsLead("RY-TEST");
assert.equal(scripts.length, 0, "Analytics-only consent does not load Google Ads");

saveTrackingChoice("marketing");
installGoogleAdsTag();
installGoogleAdsTag();
assert.equal(scripts.length, 1, "Only one Google tag is installed");
assert.match(scripts[0].src, /AW-18469165502$/);

recordGoogleAdsLead("RY-TEST");
const conversion = window.dataLayer.find((entry) => entry[0] === "event" && entry[1] === "conversion");
assert.equal(conversion[2].send_to, "AW-18469165502/SXVSCOy294wdEL6z5OZE");
assert.equal(conversion[2].transaction_id, "RY-TEST");
assert.deepEqual(Object.keys(conversion[2]).sort(), ["send_to", "transaction_id"]);

saveTrackingChoice("reject");
updateGoogleAdsConsent("reject");
assert.equal(window.dataLayer.at(-1)[2].ad_storage, "denied", "Withdrawal updates Google consent immediately");
const count = window.dataLayer.length;
recordGoogleAdsLead("RY-SECOND");
assert.equal(window.dataLayer.length, count, "Withdrawing consent prevents further conversions");

const request = readFileSync(new URL("../app/request/page.jsx", import.meta.url), "utf8");
assert.match(request, /if \(!response\.ok\)[\s\S]*?recordGoogleAdsLead\(result\.reference\)/, "Conversion is queued only after a successful server response");
const video = readFileSync(new URL("../app/components/HeroVideo.jsx", import.meta.url), "utf8");
assert.match(video, /src="\/ryravel-hero-loop\.mp4"/, "Hero uses the same-origin video");

console.log("PASS Google Ads consent, single tag, confirmed lead event and local video");
