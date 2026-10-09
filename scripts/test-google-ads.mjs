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
const marketingConsent = window.dataLayer.find((entry) => entry[0] === "consent" && entry[1] === "update");
assert.equal(marketingConsent[2].ad_storage, "granted");
assert.equal(marketingConsent[2].ad_user_data, "granted", "Explicit marketing consent permits Google Ads conversion measurement");
assert.equal(marketingConsent[2].ad_personalization, "denied", "Marketing measurement does not enable personalized ads");

recordGoogleAdsLead("RY-TEST");
const conversion = window.dataLayer.find((entry) => entry[0] === "event" && entry[1] === "conversion");
assert.equal(conversion[2].send_to, "AW-18469165502/SXVSCOy294wdEL6z5OZE");
assert.equal(conversion[2].transaction_id, "RY-TEST");
assert.deepEqual(Object.keys(conversion[2]).sort(), ["send_to", "transaction_id"]);

saveTrackingChoice("reject");
updateGoogleAdsConsent("reject");
assert.equal(window.dataLayer.at(-1)[2].ad_storage, "denied", "Withdrawal updates Google consent immediately");
assert.equal(window.dataLayer.at(-1)[2].ad_user_data, "denied", "Withdrawal disables Google advertising user-data measurement");
const count = window.dataLayer.length;
recordGoogleAdsLead("RY-SECOND");
assert.equal(window.dataLayer.length, count, "Withdrawing consent prevents further conversions");

// Privacy-restricted browsers can reject localStorage writes. The choice made
// in the current page must still be honored without persisting it across reloads.
const blockedStorage = {
  getItem: () => { throw new Error("storage blocked"); },
  setItem: () => { throw new Error("storage blocked"); },
};
window.localStorage = blockedStorage;
scripts.length = 0;
window.dataLayer = [];
delete window.gtag;
saveTrackingChoice("all");
installGoogleAdsTag();
assert.equal(scripts.length, 1, "An explicit current-page choice still loads the tag when storage is blocked");
installGoogleAdsTag();
assert.equal(scripts.length, 1, "Consent does not insert a duplicate tag");
recordGoogleAdsLead("RY-VOLATILE");
assert.equal(window.dataLayer.at(-1)[2].transaction_id, "RY-VOLATILE", "An explicit current-page choice permits the confirmed lead event");
saveTrackingChoice("reject");
const blockedCount = window.dataLayer.length;
recordGoogleAdsLead("RY-BLOCKED");
assert.equal(window.dataLayer.length, blockedCount, "Current-page withdrawal blocks later conversions even when storage is unavailable");

window.localStorage = {
  getItem: () => JSON.stringify({ choice: "reject", at: Date.now() }),
  setItem: () => { throw new Error("write blocked"); },
};
saveTrackingChoice("marketing");
recordGoogleAdsLead("RY-WRITE-BLOCKED");
assert.equal(window.dataLayer.at(-1)[2].transaction_id, "RY-WRITE-BLOCKED", "A stale stored choice cannot override an explicit new choice when writes fail");

const request = readFileSync(new URL("../app/request/page.jsx", import.meta.url), "utf8");
assert.match(request, /if \(!response\.ok\)[\s\S]*?recordGoogleAdsLead\(result\.reference\)/, "Conversion is queued only after a successful server response");
const video = readFileSync(new URL("../app/components/HeroVideo.jsx", import.meta.url), "utf8");
assert.match(video, /src="https:\/\/media\.ryravel\.com\/ryravel-hero\.mp4\?v=20260831"/, "Hero retains the original Ryravel video");
const worker = readFileSync(new URL("../worker.js", import.meta.url), "utf8");
assert.match(worker, /media-src 'self' https:\/\/media\.ryravel\.com/, "CSP permits the original Ryravel video");
assert.match(worker, /connect-src [^;]*https:\/\/pagead2\.googlesyndication\.com/, "CSP permits Google Ads conversion beacons");
assert.match(worker, /connect-src [^;]*https:\/\/ad\.doubleclick\.net/, "CSP permits Google's Ads collection endpoint");

console.log("PASS Google Ads consent, single tag, confirmed lead event and original hero video");
