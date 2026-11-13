import Link from "next/link";
import { buildMetadata, SITE_URL } from "../seo";
import { newsroomUpdates } from "./updates";
import styles from "./newsroom.module.css";

export const metadata = buildMetadata({
  title: "Newsroom | Official Ryravel Updates",
  description: "Ryravel newsroom: founder interviews, company announcements, official statements and verified media contact details.",
  path: "/newsroom",
  absoluteTitle: true,
});

export default function NewsroomPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `${SITE_URL}/newsroom#collection`, url: `${SITE_URL}/newsroom`, name: "Ryravel Newsroom", description: "Official statements and company updates from Ryravel.", isPartOf: { "@id": `${SITE_URL}/#website` }, publisher: { "@id": `${SITE_URL}/#organization` }, mainEntity: { "@id": `${SITE_URL}/newsroom#updates` } },
      { "@type": "ItemList", "@id": `${SITE_URL}/newsroom#updates`, itemListElement: newsroomUpdates.map((update, index) => ({ "@type": "ListItem", position: index + 1, name: update.title, url: `${SITE_URL}${update.path}` })) },
    ],
  };

  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <section className={styles.hero} aria-labelledby="newsroom-title">
      <div className={styles.heroInner}>
        <span className={styles.eyebrow}>Ryravel / Newsroom</span>
        <h1 id="newsroom-title">The record,<br /><em>in one place.</em></h1>
        <p>Official company statements and updates. For journey stories and ideas, visit <Link href="/passage">Passage</Link>, our publication.</p>
      </div>
    </section>
    <section className={styles.content} aria-labelledby="latest-updates">
      <div className={styles.sectionHeading}><div><span className={styles.eyebrow}>From the newsroom</span><h2 id="latest-updates">Latest updates</h2></div><span>{newsroomUpdates.length.toString().padStart(2, "0")} updates</span></div>
      <div className={styles.list}>
        {newsroomUpdates.map((update) => <article className={styles.update} key={update.path}>
          <div className={styles.date}><span>{update.category}</span><time dateTime={update.modified}>{update.displayDate}</time></div>
          <div className={styles.updateMain}>{update.image && <Link className={styles.updateImage} href={update.path}><img src={update.image} alt="Portrait of Ryravel founder Maryangel Ajuzieogu" width="1861" height="2560" loading="lazy" /></Link>}<div className={styles.updateBody}><h3><Link href={update.path}>{update.title}</Link></h3><p>{update.summary}</p><Link className={styles.read} href={update.path}>{update.action} <span aria-hidden="true">↗</span></Link></div></div>
        </article>)}
      </div>
      <div className={styles.media}><div><span className={styles.eyebrow}>Media contact</span><h2>Need to verify a statement?</h2><p>For press enquiries, interview requests or confirmation of an official notice, contact Ryravel directly.</p></div><a href="mailto:hello@ryravel.com">hello@ryravel.com <span aria-hidden="true">↗</span></a></div>
    </section>
  </main>;
}
