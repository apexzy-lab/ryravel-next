import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { installGoogleAdsTag, installGoogleAnalyticsTag, recordGoogleAdsLead, updateGoogleAdsConsent } from "../app/lib/googleAds.js";
import { saveTrackingChoice } from "../app/lib/funnel.js";

const values = new Map();
const scripts = [];
globalThis.window = {
  location: { pathname: "/request" },
  localStorage: {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  },
};
globalThis.document = {
  querySelector: () => scripts.find((script) => script.dataset.ryravelGoogleTag === "true") || null,
  createElement: () => ({ dataset: {} }),
  head: { appendChild: (script) => scripts.push(script) },
};

installGoogleAdsTag();
installGoogleAnalyticsTag();
recordGoogleAdsLead("RY-TEST");
assert.equal(scripts.length, 0, "Google tag is blocked before either consent choice");

saveTrackingChoice("analytics");
installGoogleAdsTag();
installGoogleAnalyticsTag();
installGoogleAnalyticsTag();
recordGoogleAdsLead("RY-TEST");
assert.equal(scripts.length, 1, "Analytics-only consent loads one shared Google tag");
assert.match(scripts[0].src, /G-CYCBL8SNK8$/, "The provided GA4 stream is configured");
assert.equal(window.dataLayer.filter((entry) => entry[0] === "config" && entry[1] === "G-CYCBL8SNK8").length, 1);
assert.equal(window.dataLayer.some((entry) => entry[0] === "config" && entry[1] === "AW-18469165502"), false, "Analytics-only consent does not configure Ads");
assert.equal(window.dataLayer.some((entry) => entry[0] === "event" && entry[1] === "conversion"), false);

saveTrackingChoice("marketing");
updateGoogleAdsConsent("marketing");
installGoogleAdsTag();
installGoogleAdsTag();
assert.equal(scripts.length, 1, "Only one Google tag is installed");
assert.equal(window.dataLayer.filter((entry) => entry[0] === "config" && entry[1] === "AW-18469165502").length, 1);
const marketingConsent = window.dataLayer.filter((entry) => entry[0] === "consent" && entry[1] === "update").at(-1);
assert.equal(marketingConsent[2].ad_storage, "granted");
assert.equal(marketingConsent[2].ad_user_data, "granted", "Explicit marketing consent permits Google Ads conversion measurement");
assert.equal(marketingConsent[2].analytics_storage, "denied", "Marketing-only consent does not permit Analytics storage");
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

scripts.length = 0;
window.dataLayer = [];
delete window.gtag;
saveTrackingChoice("marketing");
installGoogleAnalyticsTag();
installGoogleAdsTag();
assert.equal(scripts.length, 1, "Marketing-only consent loads one shared Google tag");
assert.match(scripts[0].src, /AW-18469165502$/);
assert.equal(window.dataLayer.some((entry) => entry[0] === "config" && entry[1] === "G-CYCBL8SNK8"), false, "Marketing-only consent does not configure GA4");

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
installGoogleAnalyticsTag();
assert.equal(scripts.length, 1, "Consent does not insert a duplicate tag");
assert.equal(window.dataLayer.filter((entry) => entry[0] === "config" && entry[1] === "G-CYCBL8SNK8").length, 1);
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

scripts.length = 0;
window.dataLayer = [];
delete window.gtag;
window.location.pathname = "/curator-desk";
saveTrackingChoice("analytics");
installGoogleAnalyticsTag();
assert.equal(scripts.length, 0, "GA4 is excluded from the private curator desk");

const request = readFileSync(new URL("../app/request/page.jsx", import.meta.url), "utf8");
assert.match(request, /if \(!response\.ok\)[\s\S]*?recordGoogleAdsLead\(result\.reference\)/, "Conversion is queued only after a successful server response");
const chrome = readFileSync(new URL("../app/components/SiteChrome.jsx", import.meta.url), "utf8");
assert.match(chrome, /!isCuratorPage && \(marketingConsent === null \|\| cookieSettingsOpen\)/, "The editorial bar appears only without a saved choice or when reopened");
assert.match(chrome, /onClick=\{\(\) => chooseTracking\("all"\)\}>Allow both/, "Visitors can allow both purposes in one click");
assert.match(chrome, /onClick=\{\(\) => chooseTracking\("reject"\)\}>Reject optional/, "Visitors can reject both purposes in one click");
assert.match(chrome, /cookieCustomizeOpen && <div id="cookie-customise-panel"/, "Visitors can choose individual purposes");
assert.match(chrome, /ryravel:cookie-settings/, "Visitors can reopen tracking choices");
const video = readFileSync(new URL("../app/components/HeroVideo.jsx", import.meta.url), "utf8");
assert.match(video, /src="\/video\/ryravel-hero-approved-720p\.mp4"/, "Hero uses the optimized approved Ryravel video");
assert.match(video, /https:\/\/media\.ryravel\.com\/ryravel-hero\.mp4\?v=20260831/, "Hero records the source of the approved footage");
const heroBytes = statSync(new URL("../public/video/ryravel-hero-approved-720p.mp4", import.meta.url)).size;
assert.ok(heroBytes > 1_000_000 && heroBytes < 25 * 1024 * 1024, "Approved hero video is present and within Cloudflare's per-asset size limit");
const worker = readFileSync(new URL("../worker.js", import.meta.url), "utf8");
assert.match(worker, /media-src 'self' https:\/\/media\.ryravel\.com/, "CSP permits the original Ryravel video");
assert.match(worker, /connect-src [^;]*https:\/\/pagead2\.googlesyndication\.com/, "CSP permits Google Ads conversion beacons");
assert.match(worker, /connect-src [^;]*https:\/\/ad\.doubleclick\.net/, "CSP permits Google's Ads collection endpoint");
assert.match(worker, /connect-src [^;]*https:\/\/\*\.google-analytics\.com/, "CSP permits regional GA4 collection endpoints");

console.log("PASS GA4 and Google Ads consent, single tag, confirmed lead event and approved hero video");
