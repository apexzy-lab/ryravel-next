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
          <span className="account-notice-profile-mark" aria-hidden="true">@</span>
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
