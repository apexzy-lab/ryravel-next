"use client";

import PolicyPage from "../components/PolicyPage";

export default function CookiesPage() {
  return <PolicyPage title="A choice that stays yours." intro="The website needs a few functions to work. Analytics and marketing tracking are optional and are held back until you allow them." updated="25 September 2026">
    <section><h2>Essential functions</h2><p>We store your light or dark display preference and your tracking choice in your browser. Cloudflare Turnstile helps protect the final enquiry submission from abuse. These functions support the service and security of the site.</p></section>
    <section><h2>Optional first-party analytics</h2><p>If you choose “Analytics only” or “Allow both,” Ryravel records which journey or case-study pages you open and key planning-form interactions. We generate a random identifier for each browser session and store it with those analytics events so we can count distinct sessions. The analytics event does not include your name, contact details, message, full URL or query string. We use aggregate results to improve the site. If you reject optional tracking or choose marketing only, these events are not sent. A completed enquiry is separately processed to answer you, regardless of this choice.</p></section>
    <section><h2>Optional marketing</h2><p>If you select “Marketing only” or “Allow both,” the LinkedIn Insight Tag is loaded to help us understand advertising performance. If you reject optional tracking or allow analytics only, we do not load that tag. Turning a previously accepted choice off stops future loading on this site after the page reloads, but it cannot by itself erase data already sent to LinkedIn or cookies that LinkedIn may have set. You can also manage those through your browser and LinkedIn settings.</p></section>
    <section><h2>Change your choice</h2><p>You can reopen Cookie settings at any time, including from every page footer. Your browser may also let you clear or block storage, though blocking essential functions can affect site preferences and enquiry security.</p><button className="policy-settings-button" type="button" onClick={() => window.dispatchEvent(new Event("ryravel:cookie-settings"))}>Open Cookie settings →</button></section>
    <section><h2>Questions</h2><p>Contact <a href="mailto:hello@ryravel.com">hello@ryravel.com</a> about your privacy choices. See our <a href="/privacy">privacy notice</a> for how enquiry information is used.</p></section>
  </PolicyPage>;
}
