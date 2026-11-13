import Link from "next/link";
import { buildMetadata, SITE_URL } from "../../seo";
import { canvasRebelFeature } from "../updates";
import newsroom from "../newsroom.module.css";
import styles from "./feature.module.css";

const sourceUrl = "https://canvasrebel.com/meet-maryangel-chiamaka-ajuzieogu";
const url = `${SITE_URL}${canvasRebelFeature.path}`;
const image = `${SITE_URL}${canvasRebelFeature.image}`;

export const metadata = {
  ...buildMetadata({
    title: "Maryangel Ajuzieogu Featured in CanvasRebel | Ryravel Newsroom",
    description: canvasRebelFeature.summary,
    path: canvasRebelFeature.path,
    image: canvasRebelFeature.image,
    type: "article",
    absoluteTitle: true,
  }),
  openGraph: {
    title: "Maryangel Ajuzieogu on the journey that reshaped Ryravel",
    description: canvasRebelFeature.summary,
    url,
    siteName: "Ryravel",
    type: "article",
    publishedTime: canvasRebelFeature.published,
    modifiedTime: canvasRebelFeature.modified,
    images: [{ url: image, width: 1861, height: 2560, alt: "Portrait of Ryravel founder Maryangel Ajuzieogu" }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "NewsArticle", "@id": `${url}#article`, headline: canvasRebelFeature.title, description: canvasRebelFeature.summary, url, image, datePublished: canvasRebelFeature.published, dateModified: canvasRebelFeature.modified, author: { "@id": `${SITE_URL}/#organization` }, publisher: { "@id": `${SITE_URL}/#organization` }, about: { "@type": "Person", "@id": `${SITE_URL}/about#maryangel`, name: "Maryangel Ajuzieogu" }, isBasedOn: sourceUrl, citation: sourceUrl, mainEntityOfPage: { "@id": url }, isPartOf: { "@id": `${SITE_URL}/newsroom#collection` }, inLanguage: "en" },
    { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ryravel", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Newsroom", item: `${SITE_URL}/newsroom` },
      { "@type": "ListItem", position: 3, name: canvasRebelFeature.title, item: url },
    ] },
  ],
};

export default function CanvasRebelFeature() {
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <div className={newsroom.articleBar}><Link href="/newsroom">← Ryravel Newsroom</Link><span>In the press / 13 November 2026</span></div>
    <header className={styles.hero}>
      <div className={styles.heroCopy}>
        <span className={styles.eyebrow}>CanvasRebel / Founder interview</span>
        <h1>Maryangel Ajuzieogu on the journey that <em>reshaped Ryravel.</em></h1>
        <p className={styles.dek}>A trip that did not bring the rest she needed. Five ventures that taught her to build differently. And a conviction that the journey home deserves as much thought as the departure.</p>
        <div className={styles.heroMeta}><time dateTime="2026-11-13">13 November 2026</time><span>Media coverage</span></div>
        <a className={styles.heroLink} href={sourceUrl} target="_blank" rel="noopener noreferrer">Read the full interview on CanvasRebel <span aria-hidden="true">↗</span></a>
      </div>
      <figure className={styles.portrait}><img src={canvasRebelFeature.image} alt="Maryangel Ajuzieogu, founder of Ryravel, seated for a studio portrait" width="1861" height="2560" fetchPriority="high" /><figcaption>Maryangel Ajuzieogu, Founder of Ryravel</figcaption></figure>
    </header>

    <section className={styles.story} aria-labelledby="story-heading"><div className={styles.storyGrid}>
      <aside className={styles.rail}><span>01 / In conversation</span><p>CanvasRebel&apos;s interview with Ryravel&apos;s founder.</p></aside>
      <article className={styles.storyCopy}>
        <h2 id="story-heading">The question behind <em>the new Ryravel.</em></h2>
        <p>In a new <a href={sourceUrl} target="_blank" rel="noopener noreferrer">CanvasRebel interview</a>, Maryangel Chiamaka Ajuzieogu traces Ryravel&apos;s current direction to an experience that challenged her assumptions about travel. She went to Zanzibar needing space from an exhausting period. The setting was beautiful, but she returned to the same pressures she had left behind.</p>
        <p>That experience prompted a different question for the company: what if a journey were designed around how someone needs to feel when they come home, rather than only where they want to go? Ryravel&apos;s answer is to consider the person, the environment, the pace and <Link href="/the-return">the return</Link> as parts of one brief.</p>
        <h3>Building with greater clarity</h3>
        <p>Maryangel also speaks candidly about five earlier ventures that did not succeed. In the interview, she reflects on what those attempts taught her about positioning, understanding the customer and building systems that can sustain a clear promise. The same willingness to rethink an existing business shaped Ryravel&apos;s move from broad travel services toward emotion-led journeys and team restoration retreats.</p>
        <h3>Why the return belongs in the design</h3>
        <p>Her position is deliberately measured. Travel cannot promise to fix a person, and a beautiful itinerary alone does not answer what brought them to travel. Ryravel designs conditions for rest, reflection and reconnection, then gives thought to what happens after the traveller gets home. That approach runs through its <Link href="/journeys/stillness">Stillness Collection</Link> and the wider work described on <Link href="/about">Ryravel&apos;s About page</Link>.</p>
        <div className={styles.source}><span>Original interview</span><p>This is a Ryravel newsroom summary of an interview published by CanvasRebel. Read Maryangel&apos;s answers in full at the original source.</p><a href={sourceUrl} target="_blank" rel="noopener noreferrer">Meet Maryangel Chiamaka Ajuzieogu, CanvasRebel <span aria-hidden="true">↗</span></a></div>
      </article>
    </div></section>
    <section className={styles.contact}><div><span className={styles.eyebrow}>Press &amp; interviews</span><h2>For media enquiries,<br /><em>reach our team.</em></h2></div><a href="mailto:hello@ryravel.com">hello@ryravel.com <span aria-hidden="true">↗</span></a></section>
  </main>;
}
