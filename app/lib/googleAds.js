import { readTrackingChoice } from "./funnel.js";

const GOOGLE_ADS_ID = "AW-18469165502";
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

export function installGoogleAdsTag() {
  if (typeof window === "undefined" || !googleAdsAllowed()) return;
  if (document.querySelector('script[data-ryravel-google-ads="true"]')) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  // Basic consent mode: no Google request is made until marketing is allowed.
  window.gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  updateGoogleAdsConsent(readTrackingChoice());
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  script.dataset.ryravelGoogleAds = "true";
  document.head.appendChild(script);
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
