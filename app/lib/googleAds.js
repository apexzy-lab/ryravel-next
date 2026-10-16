import { analyticsAllowed, readTrackingChoice } from "./funnel.js";

const GOOGLE_ADS_ID = "AW-18469165502";
const GOOGLE_ANALYTICS_ID = "G-CYCBL8SNK8";
const LEAD_CONVERSION = `${GOOGLE_ADS_ID}/SXVSCOy294wdEL6z5OZE`;

export function googleAdsAllowed() {
  return ["marketing", "all"].includes(readTrackingChoice());
}

export function updateGoogleAdsConsent(choice) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    ad_storage: ["marketing", "all"].includes(choice) ? "granted" : "denied",
    analytics_storage: ["analytics", "all"].includes(choice) ? "granted" : "denied",
    ad_user_data: ["marketing", "all"].includes(choice) ? "granted" : "denied",
    ad_personalization: "denied",
  });
}

function ensureGoogleTag(tagId) {
  const existing = document.querySelector('script[data-ryravel-google-tag="true"]');
  if (existing) return existing;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  // Basic consent mode: load nothing until at least one purpose is allowed.
  window.gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  updateGoogleAdsConsent(readTrackingChoice());
  window.gtag("js", new Date());

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
  script.dataset.ryravelGoogleTag = "true";
  document.head.appendChild(script);
  return script;
}

export function installGoogleAdsTag() {
  if (typeof window === "undefined" || !googleAdsAllowed()) return;
  const script = ensureGoogleTag(GOOGLE_ADS_ID);
  if (script.dataset.ryravelGoogleAdsConfigured === "true") return;
  script.dataset.ryravelGoogleAdsConfigured = "true";
  window.gtag("config", GOOGLE_ADS_ID);
}

export function installGoogleAnalyticsTag() {
  if (typeof window === "undefined" || !analyticsAllowed()) return;
  if (/^\/(curator-desk|newsletter|api)(\/|$)/.test(window.location.pathname)) return;
  const script = ensureGoogleTag(GOOGLE_ANALYTICS_ID);
  if (script.dataset.ryravelGoogleAnalyticsConfigured === "true") return;
  script.dataset.ryravelGoogleAnalyticsConfigured = "true";
  window.gtag("config", GOOGLE_ANALYTICS_ID);
}

export function recordGoogleAdsLead(reference) {
  if (typeof window === "undefined" || !googleAdsAllowed()) return;
  try {
    installGoogleAdsTag();
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "conversion", {
      send_to: LEAD_CONVERSION,
      ...(reference ? { transaction_id: reference } : {}),
    });
  } catch { /* Ad measurement must never interrupt a completed enquiry. */ }
}
