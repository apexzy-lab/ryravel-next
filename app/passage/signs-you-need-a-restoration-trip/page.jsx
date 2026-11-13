import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "../../seo";
import { buildPassageSchema } from "../schema";
import frame from "../passage.module.css";
import styles from "../transformational-travel-vs-wellness-retreat/article.module.css";
import story from "./story.module.css";

const title = "Signs You Need a Restoration Trip, Not Just a Vacation";
const path = "/passage/signs-you-need-a-restoration-trip";
const hero = "/images/passage-restoration-story.jpg";
const description = "Emmanuel took one holiday a year for a decade and returned unchanged. A private journey through Kenya and Egypt, then a return to Seychelles, changed how he made room for rest.";

export const metadata = {
  ...buildMetadata({ title: `${title} | Passage by Ryravel`, description, path, image: hero, type: "article", absoluteTitle: true }),
  openGraph: { title, description, url: `https://ryravel.com${path}`, type: "article", images: [{ url: `https://ryravel.com${hero}`, width: 720, height: 900, alt: "A small frog peeking through sunlit reeds" }] },
};

const sourceLinks = [
  ["Grant, Buchanan and Shockley, vacation and employee well-being, 2025", "https://pubmed.ncbi.nlm.nih.gov/39836131/"],
  ["World Health Organization, burnout as an occupational phenomenon", "https://www.who.int/standards/classifications/frequently-asked-questions/burn-out-an-occupational-phenomenon"],
];

export default function RestorationStory() {
  const schema = {
    "@context": "https://schema.org", "@type": "Article", headline: title, description,
    image: `https://ryravel.com${hero}`, genre: "Travel story",
    datePublished: "2026-11-13", dateModified: "2026-11-13",
    author: { "@type": "Person", name: "Maryangel Ajuzieogu", url: "https://ryravel.com/about" },
    publisher: { "@type": "Organization", name: "Ryravel", url: "https://ryravel.com" },
    mainEntityOfPage: `https://ryravel.com${path}`,
  };

  return <div className={frame.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPassageSchema(schema)).replace(/</g, "\\u003c") }} />
    <div className={frame.header}><Link className={frame.logo} href="/passage" aria-label="Passage, a Ryravel publication home">Passage <span>A Ryravel Publication</span></Link><nav className={frame.nav} aria-label="Passage sections"><Link href="/passage">Latest</Link><Link href="/passage#issue-01">The Restoration</Link><Link href="/passage#about-passage">About</Link></nav></div>
    <main>
      <header className={styles.articleHeader}><span className={frame.eyebrow}>The Restoration · Story 09</span><h1>Signs You Need a Restoration Trip, <em>Not Just a Vacation</em></h1><p className={styles.dek}>A holiday changes the view. Emmanuel wanted to know whether anything could change what he carried home.</p><p className={styles.meta}>By <Link href="/about">Maryangel Ajuzieogu</Link><span>·</span><time dateTime="2026-11-13">November 13, 2026</time><span>·</span>6 min read</p></header>
      <figure className={styles.heroFigure}><Image src={hero} alt="A small frog peeking through sunlit reeds" width={720} height={900} priority sizes="(max-width: 768px) 100vw, 1100px" className={story.heroImage} /><figcaption>Even in a crowded landscape, there can be a moment of stillness.</figcaption></figure>
      <article className={styles.body}>
        <p className={styles.lead}>Picture a beach chair in Dubai. There is a phone in a warm hand and a reply going out to a message that could have waited. The same thing had happened in London and Accra. Emmanuel changed the place every year. The return did not change.</p>
        <p>Emmanuel worked in energy in Lagos. For ten years he took one break a year, then came back to the same inbox and the same pace. Our <Link href="/case-studies/first-restorative-trip-kenya-egypt">account of his first journey</Link> describes him as habituated, not diagnosed with burnout. That distinction matters. He had learned how to leave for a week without ever really leaving work.</p>

        <h2>The break that never <em>stayed</em></h2>
        <p>The evidence does not say that ordinary vacations are useless. A <a href="https://pubmed.ncbi.nlm.nih.gov/39836131/" target="_blank" rel="noopener noreferrer">2025 meta-analysis of 32 studies</a> found meaningful improvements in employee well-being from vacation. It also found that psychological detachment from work was among the experiences most associated with better outcomes. The authors did not establish that a specially designed trip is superior to a well-protected ordinary break.</p>
        <p>For Emmanuel, detachment had been the missing part. He could sit beside the sea and still be answerable to the office. He was not looking for a more impressive beach. He wanted a different relationship with the days away and the first Monday back.</p>

        <h2>Wilderness before <em>water</em></h2>
        <p>A colleague mentioned Ryravel. Emmanuel was sceptical. He had already tried different cities and different travel companies. He went anyway, on eight private nights across Kenya and Egypt in October. The journey was built around protected time, first in the wilderness, then beside the Nile.</p>
        <p>On the third morning in Kenya, a lioness crossed the track without hurry. Emmanuel noticed the pace before he noticed the animal. He realised he had not moved at his own speed in years.</p>
        <p>Later, at dusk beside the Nile, his phone died in his pocket. He let it stay dead. That night, according to the case study, he slept until morning without melatonin and did not dream about his inbox. It was one night, not a cure or a clinical outcome. But he remembered it.</p>

        <blockquote className={story.pullQuote}>“Maryangel, I have taken one break a year for ten years. This is the first time I came back and the break stayed with me.”<cite>Emmanuel, after Kenya and Egypt</cite></blockquote>

        <h2>What came home <em>with him</em></h2>
        <p>Back in Lagos, Emmanuel stayed away from email for three days. Then he stopped answering messages after 7 pm and began declining meetings that could have been emails. His work had not become light. He had not rebuilt his life. He had drawn one boundary and, for a while, kept it.</p>
        <p>A year later he returned to Ryravel. This time he booked five solo nights in Seychelles, with no itinerary and no demand for a breakthrough. He floated in clear water on the second day and could see his feet on the sand. He was not trying to earn the rest. He was practising it before he was depleted again.</p>
        <p>He changed his old rule from one annual break to two. In the <Link href="/case-studies/returning-guest-seychelles">account of his return journey</Link>, he put it plainly:</p>
        <blockquote className={story.pullQuote}>“Maryangel, the first trip proved I could stop. The second trip proved I should keep stopping.”<cite>Emmanuel, after Seychelles</cite></blockquote>

        <h2>Not proof. A <em>person.</em></h2>
        <p>Emmanuel&apos;s story is Ryravel&apos;s own account of one traveller. It is not independent evidence that our journeys work better than a holiday planned another way. It does not show how long his boundary lasted without support. It shows a smaller, more human change: he stopped waiting for exhaustion to grant him permission to rest.</p>
        <p>A trip cannot solve a job that continually recreates the same strain. If that is what awaits on return, a conversation about work may matter more than another flight. And if tiredness has become persistent distress or hopelessness, travel should not replace assessment or care from a qualified professional. The <a href="https://www.who.int/standards/classifications/frequently-asked-questions/burn-out-an-occupational-phenomenon" target="_blank" rel="noopener noreferrer">World Health Organization</a> describes burnout as an occupational phenomenon related to chronic workplace stress, not a condition a travel company can diagnose or treat.</p>
        <p>Somewhere there is still a chair on a beach. In one version of the story, the phone is warm in Emmanuel&apos;s hand. In another, it stays quiet in his pocket while the day goes on without him answering. The place is beautiful in both. The difference is what he carries home.</p>

        <div className={styles.ctaBox}><h3>Begin with the <em>feeling.</em></h3><p>If this story sounds familiar, tell us what you hope will be different when you return. We will discuss what travel can, and cannot, hold.</p><Link href="/request">Start a private journey request <span aria-hidden="true">→</span></Link><Link href="/journeys">Explore The Restoration <span aria-hidden="true">→</span></Link></div>
        <div className={styles.sources}><h2>Research cited</h2><p className={story.sourceNote}>The traveller details and quotations come from Ryravel&apos;s linked case studies. They describe one person, not a measured outcome or clinical treatment.</p><ul>{sourceLinks.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{label}</a></li>)}</ul></div>
      </article>
      <aside className={styles.authorBox} aria-label="About the author"><Image src="/people/maryangel-ajuzieogu.webp" alt="Maryangel Ajuzieogu" width={106} height={106} /><div><h2>Maryangel Ajuzieogu</h2><p className={styles.authorRole}>Founder, Ryravel</p><p>Maryangel designs journeys around each traveller&apos;s brief and writes about the emotional territory of travel.</p></div></aside>
      <section className={styles.related} aria-labelledby="related-title"><span className={frame.eyebrow}>More from Passage</span><h2 id="related-title">Keep reading</h2><div className={styles.relatedGrid}><article><Link href="/passage/why-your-last-vacation-did-not-help-you-feel-rested"><span>Essay 02</span><h3>Why Your Last Vacation Did Not Help You Feel Rested</h3></Link></article><article><Link href="/passage/what-are-the-signs-of-burnout"><span>Essay 05</span><h3>What Are the Signs of Burnout?</h3></Link></article></div><Link className={styles.backLink} href="/passage">Explore Passage <span aria-hidden="true">→</span></Link></section>
    </main>
  </div>;
}
