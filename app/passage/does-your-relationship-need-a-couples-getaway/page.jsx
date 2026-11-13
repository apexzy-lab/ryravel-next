import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "../../seo";
import { buildPassageSchema } from "../schema";
import frame from "../passage.module.css";
import styles from "../transformational-travel-vs-wellness-retreat/article.module.css";
import story from "./story.module.css";

const title = "Does Your Relationship Need a Couples Getaway?";
const path = "/passage/does-your-relationship-need-a-couples-getaway";
const hero = "/images/passage-reawakening-story.jpg";
const description = "A quiet Tuesday, two people who still love each other, and the space they have stopped making together. A story from The Reawakening by Ryravel.";

export const metadata = {
  ...buildMetadata({ title: `${title} | Passage by Ryravel`, description, path, image: hero, type: "article", absoluteTitle: true }),
  openGraph: { title, description, url: `https://ryravel.com${path}`, type: "article", images: [{ url: `https://ryravel.com${hero}`, width: 1280, height: 1600, alt: "Two people walking together beneath trees in warm evening light" }] },
};

const sourceLinks = [
  ["Coffey and colleagues, couples' vacations and romantic passion and intimacy, 2024", "https://doi.org/10.1016/j.annale.2024.100121"],
  ["Aron and colleagues, shared novel activities and relationship quality, 2000", "https://pubmed.ncbi.nlm.nih.gov/10707334/"],
  ["Tsapelas, Aron and Orbuch, marital boredom and later satisfaction, 2009", "https://pubmed.ncbi.nlm.nih.gov/19389134/"],
];

export default function ReawakeningStory() {
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
    <div className={frame.header}><Link className={frame.logo} href="/passage" aria-label="Passage, a Ryravel publication home">Passage <span>A Ryravel Publication</span></Link><nav className={frame.nav} aria-label="Passage sections"><Link href="/passage">Latest</Link><Link href="/passage#reawakening">The Reawakening</Link><Link href="/passage#about-passage">About</Link></nav></div>
    <main>
      <header className={styles.articleHeader}><span className={frame.eyebrow}>The Reawakening · Story 11</span><h1>Does Your Relationship Need a <em>Couples Getaway?</em></h1><p className={styles.dek}>Sometimes nothing is wrong. You have simply stopped finding each other in the ordinary day.</p><p className={styles.meta}>By <Link href="/about">Maryangel Ajuzieogu</Link><span>·</span><time dateTime="2026-11-13">November 13, 2026</time><span>·</span>5 min read</p></header>
      <figure className={styles.heroFigure}><Image src={hero} alt="Two people walking together beneath trees in warm evening light" width={1280} height={1600} priority sizes="(max-width: 768px) 100vw, 1100px" className={story.heroImage} /><figcaption>A moment side by side can be the beginning of a different conversation.</figcaption></figure>
      <article className={styles.body}>
        <p className={styles.lead}>The kitchen light is on. The dishwasher hums. One of you stands at the counter with a phone; the other sits at the table with a laptop. Someone asks whether the bill was paid. Someone says yes. Neither looks up.</p>
        <p>No one is shouting. No one is cruel. You still love each other. That is what makes the distance so difficult to name. It has not arrived as an event. It has accumulated in small evenings like this one.</p>

        <h2>The quiet space <em>between you</em></h2>
        <p>For a while, competence can disguise it. The household works. Plans are made. You remember what the other likes for breakfast and which side of the bed they choose. But the person you know best begins to feel curiously less known. You cannot quite say what has been worrying them lately, or when you last did something together that neither of you already knew how to do.</p>
        <p>Relationship researchers <a href="https://pubmed.ncbi.nlm.nih.gov/19389134/" target="_blank" rel="noopener noreferrer">Tsapelas, Aron and Orbuch</a> found that reported marital boredom predicted lower satisfaction years later in the couples they followed. A study like that cannot tell any particular couple what will happen. It does put language around something easy to dismiss: routine is not always harmless simply because it is peaceful.</p>
        <p>Even so, a new place is not automatically an answer. Taking the same silence to a beautiful room can make it louder. What matters is whether both of you want the time, and whether you can make room for each other inside it.</p>

        <h2>A morning neither of you <em>planned alone</em></h2>
        <p>Imagine a morning elsewhere. This is an illustrative scene, not an account of a Ryravel client journey. You leave your phones behind by agreement and walk out together before the heat. You are slightly unsure of the path. One of you notices the light passing through the trees; the other sees a bird neither can name. For once, neither is the expert in the room.</p>
        <p>Later, you try something new together. It need not be dangerous or grand. The value is in choosing it together, laughing when you get part of it wrong, and discovering that the other person can still surprise you. The afternoon is left open. A long lunch becomes a conversation rather than a pause between appointments.</p>
        <p><a href="https://pubmed.ncbi.nlm.nih.gov/10707334/" target="_blank" rel="noopener noreferrer">Experiments on shared novel activities</a> found short-term improvements in how couples rated their relationship after doing something unfamiliar together. More directly, a <a href="https://doi.org/10.1016/j.annale.2024.100121" target="_blank" rel="noopener noreferrer">2024 study of couples' vacations</a> associated novel, engaging shared experiences with greater post-trip passion and relationship satisfaction. Those findings do not prove a designed journey will revive a relationship, and they are not a promise about how long any feeling will last. They do suggest that time together is different from simply being away at the same time.</p>

        <h2>What the trip cannot <em>carry</em></h2>
        <p>A journey can give you privacy, time and a different setting for a conversation. It cannot make one person want that conversation if they do not. It cannot settle a betrayal, remove contempt or make fear safe. If either of you feels afraid, coerced or unsafe, the right first step is support from a qualified professional or local service, not a romantic itinerary. Ryravel is a travel designer, not a couples therapist.</p>
        <p>Even where warmth remains, the best moment of a trip may be a small one: a question asked at breakfast, a phone placed face down, an unhurried answer. It is tempting to believe that the landscape changed everything. More likely, it gave you enough space to hear what had been waiting beneath the noise.</p>

        <h2>The kitchen light, <em>again</em></h2>
        <p>When you come home, the dishwasher still hums. The bill still needs paying. The journey has not removed ordinary life. Perhaps one of you puts the phone down anyway. Perhaps the other turns from the laptop, and for a few minutes there is no task to complete. You sit together and ask what you want to make room for next.</p>
        <p>The Reawakening is Ryravel's name for this romantic arc. It is currently a waitlist collection, not a fixed couples journey available to book. We can listen to a private brief and design around both people's wishes, without promising to fix a relationship. A getaway is worth considering when you still want to meet each other there, not because a list of signs told you to go.</p>
        <p>That Tuesday kitchen is an imagined scene. The choice it leaves you with is real: what would it take to turn toward each other while you are still in the same room?</p>

        <div className={styles.ctaBox}><h3>Begin with <em>both of you.</em></h3><p>Tell us what you hope to feel together, and what kind of time you both want. We will be honest about whether a journey belongs in the answer.</p><Link href="/passage#feeling-quiz">Find your arc <span aria-hidden="true">→</span></Link><Link href="/request?interest=Romantic%2C%20The%20Reawakening">Share a private brief <span aria-hidden="true">→</span></Link></div>
        <div className={styles.sources}><h2>Research cited</h2><p className={story.sourceNote}>The kitchen and travel scenes are illustrative, not client accounts. The studies inform this story; they do not test Ryravel journeys or establish that a holiday can repair a relationship.</p><ul>{sourceLinks.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{label}</a></li>)}</ul></div>
      </article>
      <aside className={styles.authorBox} aria-label="About the author"><Image src="/people/maryangel-ajuzieogu.webp" alt="Maryangel Ajuzieogu" width={106} height={106} /><div><h2>Maryangel Ajuzieogu</h2><p className={styles.authorRole}>Founder, Ryravel</p><p>Maryangel designs journeys around each traveller's brief and writes about the emotional territory of travel.</p></div></aside>
      <section className={styles.related} aria-labelledby="related-title"><span className={frame.eyebrow}>More from Passage</span><h2 id="related-title">Keep reading</h2><div className={styles.relatedGrid}><article><Link href="/passage/signs-you-need-an-adventure"><span>Story 10</span><h3>Signs You Need an Adventure, Not a Relaxing Vacation</h3></Link></article><article><Link href="/passage/why-your-last-vacation-did-not-help-you-feel-rested"><span>Essay 02</span><h3>Why Your Last Vacation Did Not Help You Feel Rested</h3></Link></article></div><Link className={styles.backLink} href="/passage">Explore Passage <span aria-hidden="true">→</span></Link></section>
    </main>
  </div>;
}
