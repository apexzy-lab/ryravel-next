import Link from "next/link";
import { buildMetadata, SITE_URL } from "../../seo";
import { instagramUpdate } from "../updates";
import styles from "../newsroom.module.css";

export const metadata = {
  ...buildMetadata({
    title: "Ryravel Instagram Account Update | Newsroom",
    description: instagramUpdate.summary,
    path: instagramUpdate.path,
    absoluteTitle: true,
  }),
  openGraph: {
    title: instagramUpdate.title,
    description: instagramUpdate.summary,
    url: `${SITE_URL}${instagramUpdate.path}`,
    siteName: "Ryravel",
    type: "article",
    publishedTime: instagramUpdate.published,
    modifiedTime: instagramUpdate.modified,
  },
};

export default function InstagramAccountUpdate() {
  const url = `${SITE_URL}${instagramUpdate.path}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", "@id": `${url}#article`, headline: instagramUpdate.title, description: instagramUpdate.summary, url, datePublished: instagramUpdate.published, dateModified: instagramUpdate.modified, author: { "@id": `${SITE_URL}/#organization` }, publisher: { "@id": `${SITE_URL}/#organization` }, isPartOf: { "@id": `${SITE_URL}/newsroom#collection` }, mainEntityOfPage: { "@id": url }, inLanguage: "en" },
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ryravel", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Newsroom", item: `${SITE_URL}/newsroom` },
        { "@type": "ListItem", position: 3, name: instagramUpdate.title, item: url },
      ] },
    ],
  };

  return <main className="account-notice">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <div className={styles.articleBar}><Link href="/newsroom">← Ryravel Newsroom</Link><span>Official company statement / 4 November 2026</span></div>
    <section className="account-notice-hero" aria-labelledby="account-notice-title">
      <div className="account-notice-hero-inner">
        <div className="account-notice-intro">
          <span className="kicker">Official account update</span>
          <h1 id="account-notice-title">An update on our<br /><em>Instagram accounts.</em></h1>
          <p>Both Ryravel Instagram handles are suspended. Here is their current status and how to verify a message claiming to come from our team.</p>
          <div className="account-notice-date"><span>Published <time dateTime="2026-09-25">25 September 2026</time></span><span>Updated <time dateTime="2026-11-04">4 November 2026</time></span></div>
        </div>
        <div className="account-notice-profile" aria-label="Ryravel Instagram account status">
          <span className="account-notice-profile-label">Current account status</span>
          <span className="account-notice-profile-mark" aria-hidden="true"><svg viewBox="0 0 16 16" fill="currentColor" focusable="false"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" /></svg></span>
          <strong>@journeybyry</strong>
          <p>Suspended. Instagram is not currently an active Ryravel communications channel.</p>
          <a href="mailto:hello@ryravel.com">Verify with our team <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>

    <section className="account-notice-body" aria-labelledby="account-notice-statement-title">
      <div className="account-notice-body-inner">
        <div className="account-notice-rail"><span>01 / The statement</span><p>For travellers, partners and media.</p></div>
        <article className="account-notice-statement">
          <h2 id="account-notice-statement-title">Ryravel statement on Instagram account status.</h2>
          <p>Ryravel&apos;s original Instagram account, <strong>@ryravels</strong>, was permanently suspended in the second quarter of 2026. Our subsequent account, <strong>@journeybyry</strong>, is also suspended. Neither account is currently an active Ryravel communications channel.</p>
          <p>We have requested a review of the @journeybyry suspension and submitted supporting documents to Instagram. We have also contacted Meta&apos;s legal leadership. As of 4 November 2026, we have not received a response. We will update this notice if the account status changes.</p>
          <p>We are publishing this update so travellers, partners and media can verify communications attributed to Ryravel. Please do not rely on an Instagram message for a booking or payment instruction. Confirm any such request through <Link href="/">ryravel.com</Link> or <a href="mailto:hello@ryravel.com">hello@ryravel.com</a> before responding or sharing information.</p>
          <div className="account-notice-signoff"><span>Ryravel</span><small>Official company statement</small></div>
        </article>
      </div>
    </section>

    <section className="account-notice-verify" aria-labelledby="account-notice-verify-title">
      <div className="account-notice-verify-inner">
        <div><span className="kicker">How to verify</span><h2 id="account-notice-verify-title">Before you reply,<br /><em>check the source.</em></h2></div>
        <div className="account-notice-checks">
          <div><span>01</span><p><strong>@journeybyry</strong> is suspended and is not currently an active Ryravel channel.</p></div>
          <div><span>02</span><p>The former handle <strong>@ryravels</strong> remains permanently suspended.</p></div>
          <div><span>03</span><p>Confirm booking or payment instructions directly at <a href="mailto:hello@ryravel.com">hello@ryravel.com</a>.</p></div>
        </div>
      </div>
    </section>

    <section className="account-notice-contact"><span>Media and partner enquiries</span><h2>Questions about this update?</h2><a href="mailto:hello@ryravel.com">hello@ryravel.com <span aria-hidden="true">↗</span></a><p><Link href="/newsroom">All Newsroom updates</Link></p></section>
  </main>;
}
