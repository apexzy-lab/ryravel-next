import Link from "next/link";
import { buildMetadata } from "../seo";

export const metadata = buildMetadata({
  title: "Official Instagram Account Update",
  description: "Ryravel's Instagram accounts @ryravels and @journeybyry are suspended. Read our official update and learn how to verify Ryravel communications.",
  path: "/official-instagram",
});

export default function OfficialInstagramPage() {
  return (
    <main className="account-notice">
      <section className="account-notice-hero" aria-labelledby="account-notice-title">
        <div className="account-notice-hero-inner">
          <div className="account-notice-intro">
            <span className="kicker">Official account update</span>
            <h1 id="account-notice-title">Our Instagram<br /><em>account update.</em></h1>
            <p>Both Ryravel Instagram handles are suspended. Here is the current position, and how to verify a message claiming to come from our team.</p>
            <div className="account-notice-date"><span>Updated public notice</span><time dateTime="2026-11-04">4 November 2026</time></div>
          </div>
          <div className="account-notice-profile" aria-label="Ryravel Instagram account status">
            <span className="account-notice-profile-label">Instagram account status</span>
            <span className="account-notice-profile-mark" aria-hidden="true">@</span>
            <strong>@journeybyry</strong>
            <p>Currently suspended. Please do not use Instagram to contact Ryravel or verify a booking.</p>
            <a href="mailto:hello@ryravel.com">Verify with our team <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="account-notice-body" aria-labelledby="account-notice-statement-title">
        <div className="account-notice-body-inner">
          <div className="account-notice-rail"><span>01 / The statement</span><p>For travellers, partners and media.</p></div>
          <article className="account-notice-statement">
            <h2 id="account-notice-statement-title">An update on our Instagram presence.</h2>
            <p>Ryravel&apos;s original Instagram account, <strong>@ryravels</strong>, was permanently suspended in the second quarter of 2026. The subsequent account, <strong>@journeybyry</strong>, is also suspended. Neither handle is currently an active Ryravel communications channel.</p>
            <p>We have contacted Instagram and submitted supporting documentation to seek a review of the @journeybyry suspension. We have also escalated the matter to Meta&apos;s legal leadership. As of 4 November 2026, we have not received a response. We will update this notice if the account status changes.</p>
            <p>We are sharing this update to help travellers, partners and media identify authentic communications from Ryravel. If you receive a booking request, payment instruction or message from an account claiming to represent us on Instagram, please verify it through <Link href="/">ryravel.com</Link> or <a href="mailto:hello@ryravel.com">hello@ryravel.com</a> before responding or sharing information.</p>
            <div className="account-notice-signoff"><span>Ryravel</span><small>Private journeys, shaped personally.</small></div>
          </article>
        </div>
      </section>

      <section className="account-notice-verify" aria-labelledby="account-notice-verify-title">
        <div className="account-notice-verify-inner">
          <div><span className="kicker">A simple verification step</span><h2 id="account-notice-verify-title">Before you reply,<br /><em>check the source.</em></h2></div>
          <div className="account-notice-checks">
            <div><span>01</span><p><strong>@journeybyry</strong> is suspended and is not currently an active Ryravel channel.</p></div>
            <div><span>02</span><p>The former handle <strong>@ryravels</strong> remains permanently suspended.</p></div>
            <div><span>03</span><p>For booking or payment instructions, confirm with us at <a href="mailto:hello@ryravel.com">hello@ryravel.com</a>.</p></div>
          </div>
        </div>
      </section>

      <section className="account-notice-contact"><span>Media and partner enquiries</span><h2>Questions about this update?</h2><a href="mailto:hello@ryravel.com">hello@ryravel.com <span aria-hidden="true">↗</span></a></section>
    </main>
  );
}
