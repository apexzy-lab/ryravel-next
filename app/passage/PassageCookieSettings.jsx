"use client";

export default function PassageCookieSettings() {
  return <button type="button" onClick={() => window.dispatchEvent(new Event("ryravel:cookie-settings"))}>Cookie settings</button>;
}
