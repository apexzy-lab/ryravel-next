import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "../../seo";
import { buildPassageSchema } from "../schema";
import frame from "../passage.module.css";
import styles from "../transformational-travel-vs-wellness-retreat/article.module.css";
import story from "./story.module.css";

const title = "Signs You Need an Adventure, Not a Relaxing Vacation";
const path = "/passage/signs-you-need-an-adventure";
const hero = "/images/passage-unleashing-story.jpg";
const description = "The third afternoon on the sun lounger feels longer than the first. A story about restlessness, chosen challenge and why The Unleashing begins with a different question.";

export const metadata = {
  ...buildMetadata({ title: `${title} | Passage by Ryravel`, description, path, image: hero, type: "article", absoluteTitle: true }),
  openGraph: { title, description, url: `https://ryravel.com${path}`, type: "article", images: [{ url: `https://ryravel.com${hero}`, width: 720, height: 900, alt: "A herd of buffalo moving through grassland in warm morning light" }] },
};

const sourceLinks = [
  ["Grant, Buchanan and Shockley, vacation and employee well-being, 2025", "https://pubmed.ncbi.nlm.nih.gov/39836131/"],
  ["Sonnentag and Fritz, Recovery Experience Questionnaire, 2007", "https://pubmed.ncbi.nlm.nih.gov/17638488/"],
];

export default function UnleashingStory() {
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
    <div className={frame.header}><Link className={frame.logo} href="/passage" aria-label="Passage, a Ryravel publication home">Passage <span>A Ryravel Publication</span></Link><nav className={frame.nav} aria-label="Passage sections"><Link href="/passage">Latest</Link><Link href="/passage#unleashing">The Unleashing</Link><Link href="/passage#about-passage">About</Link></nav></div>
    <main>
      <header className={styles.articleHeader}><span className={frame.eyebrow}>The Unleashing · Story 10</span><h1>Signs You Need an Adventure, <em>Not a Relaxing Vacation</em></h1><p className={styles.dek}>Some tiredness asks for silence. Some of it asks for a mountain.</p><p className={styles.meta}>By <Link href="/about">Maryangel Ajuzieogu</Link><span>·</span><time dateTime="2026-11-13">November 13, 2026</time><span>·</span>5 min read</p></header>
      <figure className={styles.heroFigure}><Image src={hero} alt="A herd of buffalo moving through grassland in warm morning light" width={720} height={900} priority sizes="(max-width: 768px) 100vw, 1100px" className={story.heroImage} /><figcaption>Movement changes the shape of a morning. It is not the same thing as filling every hour.</figcaption></figure>
      <article className={styles.body}>
        <p className={styles.lead}>By the third afternoon on the sun lounger, you are counting umbrellas. The sea is beautiful and you know it. Nothing urgent is waiting. Yet you keep checking the time, as if the day owes you a feeling it has not delivered.</p>
        <p>There is no reason to be ashamed of this. You wanted rest, and perhaps you got it. What surprised you was the restlessness that remained. It is possible to be grateful for a quiet place and still want to be somewhere else.</p>

        <h2>The afternoon that would not <em>move</em></h2>
        <p>At first you try to be better at relaxing. Another book. Another swim. A longer lunch. You have made a holiday out of doing less and somehow turned even that into a task. The question is no longer whether the resort is good. It is why stillness, on this particular week, feels like a room with no door.</p>
        <p>Maybe the months before this trip were not only crowded. Maybe they were repetitive. Work was competent, life was orderly, and the part of you that likes to learn the shape of something unfamiliar had nowhere to go. That is not a diagnosis. It is one possible account of why a beautifully restful day might not feel like your own.</p>

        <h2>Another version of <em>morning</em></h2>
        <p>Imagine a different morning, not a reported guest itinerary, but a way of seeing the choice. The light comes up over grassland. A herd moves through it without an audience. You are outside before the heat, watching the world become visible a little at a time.</p>
        <p>Later, a guide points toward a ridge. It will take effort. You can say yes, choose an easier route or stay where you are. If you go, your attention shifts from the small bright rectangle in your pocket to the ground beneath your feet. At the top you are tired, but it is a tiredness with a cause you chose. The view does not ask you to be productive with it.</p>
        <p>That evening there is a meal and a bed already arranged. The hard part was never meant to consume the whole trip. It needed to be held by ease on either side.</p>

        <h2>Hard, then <em>held</em></h2>
        <p>Work-recovery researchers <a href="https://pubmed.ncbi.nlm.nih.gov/17638488/" target="_blank" rel="noopener noreferrer">Sonnentag and Fritz</a> distinguished four experiences that can matter in time away: detachment, relaxation, mastery and control. The last two help explain the pull of the ridge. There is satisfaction in engaging with something new, and freedom in choosing how far to go. Their work does not say that everyone needs an adventure, or that a quiet holiday cannot offer those experiences.</p>
        <p>A <a href="https://pubmed.ncbi.nlm.nih.gov/39836131/" target="_blank" rel="noopener noreferrer">2025 review of 32 vacation studies</a> found meaningful benefits from holidays and suggested that physical activity and mental detachment from work may be particularly helpful. It did not establish that an adventure trip beats a relaxing one. The research is a reason to take movement seriously, not a licence to sell exertion as a cure.</p>
        <p>The difference in the imagined day is not that one traveller is brave and another is lazy. It is that this traveller was missing a challenge they could choose, with permission to rest afterward. For someone exhausted, injured, grieving or unwell, the same ridge could be exactly the wrong offer. A journey should respond to the person, not to an attractive photograph of what they might become.</p>

        <h2>The third afternoon, <em>again</em></h2>
        <p>Back on the lounger, you stop counting umbrellas. The sea has not changed. What has changed is the question. You are not asking for a fuller itinerary or a higher summit. You are wondering where your attention comes alive, and what kind of distance would give it room.</p>
        <p>The Unleashing is Ryravel&apos;s name for that restless arc. It is not a promise of transformation and its published journeys are not yet available to book. We can still listen to a private brief and say honestly whether movement, rest or something in between belongs in it. If persistent low mood or physical symptoms are part of the picture, a qualified professional should help assess those first; travel is not treatment.</p>
        <p>Some tiredness asks for silence. Some of it asks for a mountain. The point is not to choose the harder answer. It is to notice which answer is yours.</p>

        <div className={styles.ctaBox}><h3>Find the arc that <em>fits.</em></h3><p>Begin with how you want to feel when you return. We will not assume that restlessness means you should push harder.</p><Link href="/passage#feeling-quiz">Find your arc <span aria-hidden="true">→</span></Link><Link href="/request?interest=Restless%2C%20The%20Unleashing">Share a private brief <span aria-hidden="true">→</span></Link></div>
        <div className={styles.sources}><h2>Research cited</h2><p className={story.sourceNote}>The ridge scene is illustrative, not a client account. These studies inform the story but do not test Ryravel journeys or diagnose a reader&apos;s needs.</p><ul>{sourceLinks.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{label}</a></li>)}</ul></div>
      </article>
      <aside className={styles.authorBox} aria-label="About the author"><Image src="/people/maryangel-ajuzieogu.webp" alt="Maryangel Ajuzieogu" width={106} height={106} /><div><h2>Maryangel Ajuzieogu</h2><p className={styles.authorRole}>Founder, Ryravel</p><p>Maryangel designs journeys around each traveller&apos;s brief and writes about the emotional territory of travel.</p></div></aside>
      <section className={styles.related} aria-labelledby="related-title"><span className={frame.eyebrow}>More from Passage</span><h2 id="related-title">Keep reading</h2><div className={styles.relatedGrid}><article><Link href="/passage/signs-you-need-a-restoration-trip"><span>Story 09</span><h3>Signs You Need a Restoration Trip, Not Just a Vacation</h3></Link></article><article><Link href="/passage/transformational-travel-vs-wellness-retreat"><span>Essay 01</span><h3>Transformational Travel vs. a Wellness Retreat</h3></Link></article></div><Link className={styles.backLink} href="/passage">Explore Passage <span aria-hidden="true">→</span></Link></section>
    </main>
  </div>;
}
