export const FUNNEL_EVENTS = [
  "journey_viewed", "case_study_opened", "plan_journey_clicked", "form_started",
  "feeling_selected", "validation_error", "form_abandoned", "enquiry_submitted", "private_call_requested",
];

const consentKey = "ryravel-cookie-choice-v2";
const sessionKey = "ryravel-analytics-session-v1";
const consentAgeMs = 183 * 86400000;
let volatileChoice = null;

function validChoice(value) {
  return ["reject", "analytics", "marketing", "all"].includes(value?.choice)
    && Number.isFinite(value?.at)
    && Date.now() - value.at < consentAgeMs
    && value.at <= Date.now();
}

export function readTrackingChoice() {
  if (typeof window === "undefined") return null;
  if (validChoice(volatileChoice)) return volatileChoice.choice;
  try {
    const value = JSON.parse(window.localStorage.getItem(consentKey) || "null");
    if (validChoice(value)) return value.choice;
  } catch { /* Storage may be unavailable even after a visitor makes a choice. */ }
  // Keep an explicit choice only for this page session when persistence fails.
  return null;
}

export function saveTrackingChoice(choice) {
  if (typeof window === "undefined" || !["reject", "analytics", "marketing", "all"].includes(choice)) return;
  const value = { choice, at: Date.now() };
  volatileChoice = value;
  try {
    window.localStorage.setItem(consentKey, JSON.stringify(value));
    if (window.localStorage.getItem(consentKey) === JSON.stringify(value)) volatileChoice = null;
  } catch { /* Explicit consent remains valid only in this page session. */ }
}

export function analyticsAllowed() {
  return ["analytics", "all"].includes(readTrackingChoice());
}

export function clearAnalyticsSession() {
  try { window.sessionStorage.removeItem(sessionKey); } catch { /* Storage may be disabled. */ }
}

function sessionId() {
  try {
    let value = window.sessionStorage.getItem(sessionKey);
    if (!value) {
      value = window.crypto.randomUUID();
      window.sessionStorage.setItem(sessionKey, value);
    }
    return value;
  } catch { return null; }
}

// The caller may pass only the enum fields below. Never send a URL, query string,
// free-text field, contact detail, enquiry reference, or browser fingerprint.
export function trackFunnel(event, properties = {}) {
  if (!analyticsAllowed() || !FUNNEL_EVENTS.includes(event)) return;
  const session = sessionId();
  if (!session) return;
  const allowed = ["journey_slug", "case_study_slug", "feeling", "step", "error_fields"];
  const details = Object.fromEntries(allowed.filter((key) => properties[key] !== undefined).map((key) => [key, properties[key]]));
  const body = JSON.stringify({ id: window.crypto.randomUUID(), session, event, ...details });
  fetch("/api/analytics", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true, credentials: "same-origin", referrerPolicy: "no-referrer" }).catch(() => {});
}
