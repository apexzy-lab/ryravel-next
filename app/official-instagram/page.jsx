import Link from "next/link";
import { buildMetadata } from "../seo";

const INSTAGRAM_URL = "https://www.instagram.com/journeybyry/";

export const metadata = buildMetadata({
  title: "Official Instagram Account Update",
  description: "Ryravel's former Instagram account @ryravels is no longer active. Our current official Instagram account is @journeybyry. Learn how to verify Ryravel communications.",
  path: "/official-instagram",
});

export default function OfficialInstagramPage() {
  return (
    <main className="account-notice">
      <section className="account-notice-hero" aria-labelledby="account-notice-title">
        <div className="account-notice-hero-inner">
          <div className="account-notice-intro">
            <span className="kicker">Official account update</span>
            <h1 id="account-notice-title">A new handle.<br /><em>The same Ryravel.</em></h1>
            <p>Our former Instagram account is no longer an active Ryravel channel. Here is where to find us now—and how to know a message is genuinely from our team.</p>
            <div className="account-notice-date"><span>Public notice</span><time dateTime="2026-09-25">25 September 2026</time></div>
          </div>
          <div className="account-notice-profile" aria-label="Ryravel's current official Instagram account">
            <span className="account-notice-profile-label">Our official Instagram</span>
            <span className="account-notice-profile-mark" aria-hidden="true">@</span>
            <strong>@journeybyry</strong>
            <p>The active account for Ryravel stories and updates.</p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Visit the official account <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="account-notice-body" aria-labelledby="account-notice-statement-title">
        <div className="account-notice-body-inner">
          <div className="account-notice-rail"><span>01 / The statement</span><p>For travellers, partners and media.</p></div>
          <article className="account-notice-statement">
            <h2 id="account-notice-statement-title">An update on our Instagram presence.</h2>
            <p>Ryravel confirms that its former Instagram account, <strong>@ryravels</strong>, was permanently suspended by Instagram in the second quarter of 2026. It is no longer an active Ryravel communications channel. Our current official Instagram account is <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@journeybyry</a>.</p>
            <p>We are sharing this update to help travellers, partners and media identify authentic communications from Ryravel. If you receive a booking request, payment instruction or message from an account claiming to represent us, please verify it through <Link href="/">ryravel.com</Link> or <a href="mailto:hello@ryravel.com">hello@ryravel.com</a> before responding or sharing information.</p>
            <div className="account-notice-signoff"><span>Ryravel</span><small>Private journeys, shaped personally.</small></div>
          </article>
        </div>
      </section>

      <section className="account-notice-verify" aria-labelledby="account-notice-verify-title">
        <div className="account-notice-verify-inner">
          <div><span className="kicker">A simple verification step</span><h2 id="account-notice-verify-title">Before you reply,<br /><em>check the source.</em></h2></div>
          <div className="account-notice-checks">
            <div><span>01</span><p>Our current official Instagram handle is <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@journeybyry</a>.</p></div>
            <div><span>02</span><p>The former handle <strong>@ryravels</strong> is not an active Ryravel channel.</p></div>
            <div><span>03</span><p>For booking or payment instructions, confirm with us at <a href="mailto:hello@ryravel.com">hello@ryravel.com</a>.</p></div>
          </div>
        </div>
      </section>

      <section className="account-notice-contact"><span>Media and partner enquiries</span><h2>Questions about this update?</h2><a href="mailto:hello@ryravel.com">hello@ryravel.com <span aria-hidden="true">↗</span></a></section>
    </main>
  );
}
