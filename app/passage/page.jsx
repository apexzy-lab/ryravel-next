import Link from "next/link";
import { FeelingQuiz } from "../components/HomepageExperience";
import { buildMetadata } from "../seo";
import PassageCookieSettings from "./PassageCookieSettings";
import styles from "./passage.module.css";

export const metadata = buildMetadata({
  title: "Passage | A Ryravel Publication",
  description: "Passage is Ryravel's forthcoming publication on emotion-led travel, the arcs that shape a journey, and what travellers carry home.",
  path: "/passage",
  absoluteTitle: true,
});

const upcoming = [
  {
    title: "The Unleashing",
    description: "What restlessness is really asking for, and why the summit is only the beginning.",
    tone: "warm",
  },
  {
    title: "The Restoration",
    description: "On permission, exhaustion, and the architecture of true rest.",
    tone: "blue",
  },
  {
    title: "The Return",
    description: "On disconnection, wilderness, and the self that waits on the other side of silence.",
    tone: "green",
  },
];

export default function PassagePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.logo} href="/passage" aria-label="Passage, a Ryravel publication home">Passage <span>A Ryravel Publication</span></Link>
        <nav className={styles.nav} aria-label="Passage navigation">
          <Link href="/passage" aria-current="page">Latest</Link>
          <a href="#issue-01">Issue 01</a>
          <a href="#about-passage">About</a>
        </nav>
        <Link className={styles.headerCta} href="/journeys">Plan a journey</Link>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="passage-title">
          <span className={styles.eyebrow}>A Ryravel Publication</span>
          <h1 id="passage-title">Writing about travel<br />that changes <em>who you are.</em></h1>
          <p>Passage is where we will share what we have learned about emotional travel: the arcs, the returns, and the moments where a journey becomes something you carry.</p>
          <a className={styles.heroQuizLink} href="#feeling-quiz">Find your arc <span aria-hidden="true">→</span></a>
        </section>

        <section className={styles.featured} aria-labelledby="featured-title">
          <article className={styles.featuredCard}>
            <div className={styles.featuredVisual} aria-hidden="true" />
            <div className={styles.featuredContent}>
              <span className={styles.tag}>Issue 01 · The Arcs · Coming soon</span>
              <h2 id="featured-title">The Unleashing:<br /><em>What Restlessness Is Really Asking For</em></h2>
              <p className={styles.featuredDek}>The person with energy that has nowhere worthy to go does not need a harder workout. They need a summit that does not care about their pace, followed by a plain that does not care about their output. The restlessness is not the problem. The absence of a worthy container is.</p>
              <p className={styles.meta}>By Maryangel Ajuzieogu · Essay in preparation</p>
            </div>
          </article>
        </section>

        <section className={styles.issue} id="issue-01" aria-labelledby="issue-title">
          <div className={styles.issueHeader}><h2 id="issue-title">Issue 01 · The Arcs</h2><span>Essays in preparation</span></div>
          <div className={styles.articleRow}>
            {upcoming.map((article) => <article className={styles.articleCard} key={article.title}>
              <div className={`${styles.articleVisual} ${styles[article.tone]}`} aria-hidden="true" />
              <span className={styles.tag}>Coming soon</span>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </article>)}
          </div>
        </section>

        <div className={`new-home ${styles.quizWrap}`}><FeelingQuiz /></div>

        <section className={styles.about} id="about-passage" aria-labelledby="passage-about-title">
          <div><span className={styles.eyebrow}>About Passage</span><h2 id="passage-about-title">Not travel writing.<br /><em>Travel that writes you back.</em></h2></div>
          <div className={styles.aboutBody}>
            <p>Passage is the editorial arm of Ryravel. We are preparing long-form writing about the emotional territory of travel: the conditions that make a journey transformative, the arcs that match them, and the returns that prove they worked.</p>
            <p>We do not write destination guides. We do not rank hotels. We write about what happens when a journey is built around a feeling, not a place, and what it costs to come back unchanged.</p>
            <p>New issues will arrive when they are ready. Not on a schedule. Not for the algorithm. For the person who needs them.</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}><Link className={styles.logo} href="/passage">Passage <span>A Ryravel Publication</span></Link><Link href="/">Back to Ryravel <span aria-hidden="true">→</span></Link></div>
        <div className={styles.footerBottom}><span>© 2026 Passage. A Ryravel publication.</span><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/cookies">Cookies</Link><PassageCookieSettings /></div></div>
      </footer>
    </div>
  );
}
