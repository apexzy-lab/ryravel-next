import Link from "next/link";
import { buildMetadata } from "../seo";
import styles from "./about.module.css";

export const metadata = buildMetadata({
  title: "About Ryravel: Our Story and Approach",
  description: "Why Ryravel begins with a feeling, not a destination. Meet founder Maryangel Ajuzieogu and discover how every journey is designed backwards from The Return.",
  path: "/about",
});

const method = [
  {
    number: "01",
    first: "Begin with a",
    emphasis: "feeling",
    description: "Before dates or destinations, we ask what needs to change. Not where you want to go. Who you are right now, and what you need to come back to.",
  },
  {
    number: "02",
    first: "Design the",
    emphasis: "emotional arc",
    description: "Arrival, opening, transformation and return each receive their own pace. The rest on day three is not a gap. It is preparation for what happens on day five.",
  },
  {
    number: "03",
    first: "Place only",
    emphasis: "what matters",
    description: "A meaningful experience earns its place. Empty time is protected. The destination is chosen to serve the feeling, not the other way around.",
  },
  {
    number: "04",
    first: "Carry it",
    emphasis: "home",
    description: "Every journey closes with a deliberate bridge back into ordinary life. The Departure Box. The check-ins. The Silent Documentary. The Return is not the flight home.",
  },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>Our approach</span>
        <h1>Ryravel began<br /><em>with the trip that did not work.</em></h1>
        <p>A beautiful destination is not enough. Anywhere in the world, a journey has to understand who you are when you leave, and what you need to return to.</p>
      </header>

      <div className={styles.content}>
        <section className={styles.mistake} aria-labelledby="about-mistake">
          <div className={styles.mistakeInner}>
            <div><span className={styles.label}>The trip that did not work</span><h2 id="about-mistake">I needed to disappear.<br />Not on vacation.<br /><em>Disappear.</em></h2></div>
            <div className={styles.mistakeBody}>
              <p>Quiet. Solitude. Whatever was left of myself, I needed to sit with it.</p>
              <p>So I booked Zanzibar. Seven nights. A resort with a pool and a schedule and a lobby full of people. I picked the destination and let the destination pick everything else.</p>
              <p>I came home exactly as I left. Not relaxed. Not renewed. Just unchanged, and now also tired from travelling. I remember sitting in my own living room a few days later, trying to figure out what had gone wrong, and realising the trip had never had a chance. I had not planned a journey for what I needed. I had planned the opposite of it, crowds instead of quiet, noise instead of stillness, and called it a getaway because it had a beach.</p>
              <p className={styles.mistakePull}>That was the beginning of Ryravel. Not the beach. The mistake.</p>
            </div>
          </div>
        </section>

        <section className={styles.method} aria-labelledby="about-method">
          <span className={styles.label}>The Ryravel method</span>
          <h2 id="about-method">Travel designed backwards<br />from <em>The Return.</em></h2>
          <div className={styles.methodGrid}>{method.map((item) => (
            <article className={styles.methodCard} key={item.number}>
              <span className={styles.methodNumber}>{item.number}</span>
              <h3>{item.first}<br /><em>{item.emphasis}</em></h3>
              <p>{item.description}</p>
            </article>
          ))}</div>
        </section>

        <section className={styles.founder} id="curators" aria-labelledby="maryangel">
          <div className={styles.founderInner}>
            <figure className={styles.founderVisual}>
              <img src="/people/maryangel-ajuzieogu.webp" alt="Maryangel Ajuzieogu, Ryravel founder and lead curator" width="1400" height="1750" loading="lazy" />
              <figcaption>Maryangel Ajuzieogu</figcaption>
            </figure>
            <div>
              <span className={styles.label}>Founder &amp; lead curator</span>
              <h2 id="maryangel">Maryangel<br />Ajuzieogu</h2>
              <p className={styles.founderRole}>Every journey is designed directly by the founder.</p>
              <div className={styles.founderBody}>
                <p>Ryravel was founded on the belief that the right journey can revise a life. I am not building this for people chasing a nicer photo. I am building it for people who have already had that trip, the well-reviewed, well-located, perfectly nice trip, and come home no different, the way I did.</p>
                <p>You can travel and stay exactly who you were. Or the trip can be built with enough intention that you do not. I have done both. I know which one I am building now.</p>
                <p className={styles.founderPull}>Not thread count. Intention.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.proof} aria-labelledby="about-proof">
          <span className={styles.label}>Proof</span>
          <h2 id="about-proof">They arrived one way.<br /><em>They returned another.</em></h2>
          <div className={styles.proofCard}>
            <div className={styles.proofBefore}>
              <span className={styles.proofTag}>They arrived</span>
              <p className={styles.proofText}>Running on empty. Could not remember the last time she felt present. Her body had been saying no for months while her mind kept saying yes.</p>
              <p className={styles.proofMeta}>Exhausted arc · Full Tanzania Restoration</p>
            </div>
            <div className={styles.proofAfter}>
              <span className={styles.proofTag}>They returned</span>
              <p className={styles.proofText}>She slept. Really slept. For the first time in two years. She stopped checking her phone before she got out of bed. The first hour of the day now belongs to her.</p>
              <p className={styles.proofMeta}>Day 30 · Return Score: 8 to 3</p>
            </div>
          </div>
        </section>
      </div>

      <section className={styles.bottomCta} aria-labelledby="about-begin">
        <span className={styles.label}>Begin</span>
        <h2 id="about-begin">Your return starts<br />before you leave.</h2>
        <p>Every journey is designed for who you become. Tell us where you are, and we will design the return.</p>
        <div className={styles.ctaActions}><Link className={styles.primaryButton} href="/request">Begin the conversation</Link><Link className={styles.secondaryButton} href="/journeys">Explore the journeys</Link></div>
      </section>
    </main>
  );
}
