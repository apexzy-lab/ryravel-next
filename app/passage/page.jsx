import Link from "next/link";
import { FeelingQuiz } from "../components/HomepageExperience";
import { buildMetadata } from "../seo";
import styles from "./passage.module.css";
import { buildPassageCollectionSchema } from "./schema";

export const metadata = buildMetadata({
  title: "Passage | A Ryravel Publication",
  description: "Passage is Ryravel's publication on emotion-led travel, the arcs that shape a journey, and what travellers carry home. Read the latest essays.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPassageCollectionSchema()).replace(/</g, "\\u003c") }} />
      <div className={styles.header}>
        <Link className={styles.logo} href="/passage" aria-label="Passage, a Ryravel publication home">Passage <span>A Ryravel Publication</span></Link>
        <nav className={styles.nav} aria-label="Passage sections">
          <Link href="/passage" aria-current="page">Latest</Link>
          <a href="#issue-01">Issue 01</a>
          <a href="#about-passage">About</a>
        </nav>
      </div>

      <main>
        <section className={styles.hero} aria-labelledby="passage-title">
          <span className={styles.eyebrow}>A Ryravel Publication</span>
          <h1 id="passage-title">Writing about travel<br />that changes <em>who you are.</em></h1>
          <p>Passage is where we share what we have learned about emotional travel: the arcs, the returns, and the moments where a journey becomes something you carry.</p>
          <a className={styles.heroQuizLink} href="#feeling-quiz">Find your arc <span aria-hidden="true">→</span></a>
        </section>

        <section className={styles.featured} aria-labelledby="featured-title">
          <article className={styles.featuredCard}>
            <div className={`${styles.featuredVisual} ${styles.featuredPhoto}`} aria-hidden="true" />
            <div className={styles.featuredContent}>
              <span className={styles.tag}>Issue 01 · The Category · Published</span>
              <h2 id="featured-title">Transformational Travel vs. a Wellness Retreat:<br /><em>What Is the Difference?</em></h2>
              <p className={styles.featuredDek}>Rest and change can both matter. The question is which kind of journey meets you where you are, and what will help its benefits last after you return.</p>
              <p className={styles.meta}>By Maryangel Ajuzieogu · October 25, 2026</p>
              <Link className={styles.readArticle} href="/passage/transformational-travel-vs-wellness-retreat">Read the essay <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        </section>

        <section className={styles.issue} id="issue-01" aria-labelledby="issue-title">
          <div className={styles.issueHeader}><h2 id="issue-title">Issue 01 · The Arcs</h2><span>Eight essays published, more in preparation</span></div>
          <div className={styles.articleRow}>
            <article className={`${styles.articleCard} ${styles.articleCardFeatured}`}>
              <Link className={styles.articleCardLink} href="/passage/burnout-recovery-retreat-for-executives">
                <div className={`${styles.articleVisual} ${styles.executivePhoto}`} role="img" aria-label="An aerial view of forest and drifting clouds" />
                <div className={styles.articleCardContent}><span className={styles.tag}>Essay 08 · Published</span><h3>What Does a Burnout Recovery Retreat for Executives Actually <em>Involve?</em></h3><p>What to look for, what to ask, and what the evidence can and cannot promise.</p><span className={styles.articleRead}>Read the essay →</span></div>
              </Link>
            </article>
            <article className={`${styles.articleCard} ${styles.articleCardFeatured}`}>
              <Link className={styles.articleCardLink} href="/passage/why-doesnt-a-vacation-fix-executive-burnout">
                <div className={`${styles.articleVisual} ${styles.executiveVacationPhoto}`} role="img" aria-label="Evening sunlight filtering through trees above an outdoor seating area" />
                <div className={styles.articleCardContent}><span className={styles.tag}>Essay 07 · Published</span><h3>Why Doesn&apos;t a Vacation Fix <em>Executive Burnout?</em></h3><p>A holiday may help, and some of that relief may fade. What matters is how fully you leave, and what you return to.</p><span className={styles.articleRead}>Read the essay →</span></div>
              </Link>
            </article>
            <article className={`${styles.articleCard} ${styles.articleCardFeatured}`}>
              <Link className={styles.articleCardLink} href="/passage/when-a-senior-leader-burns-out">
                <div className={`${styles.articleVisual} ${styles.leaderPhoto}`} role="img" aria-label="A young gorilla resting close to its family" />
                <div className={styles.articleCardContent}><span className={styles.tag}>Essay 06 · Published</span><h3>What Should a Company Do When a Senior Leader <em>Burns Out?</em></h3><p>The first week matters, and so does the work they return to.</p><span className={styles.articleRead}>Read the essay →</span></div>
              </Link>
            </article>
            <article className={`${styles.articleCard} ${styles.articleCardFeatured}`}>
              <Link className={styles.articleCardLink} href="/passage/what-are-the-signs-of-burnout">
                <div className={`${styles.articleVisual} ${styles.signsPhoto}`} role="img" aria-label="A river and forest landscape in warm evening light" />
                <div className={styles.articleCardContent}><span className={styles.tag}>Essay 05 · Published</span><h3>What Are the Signs of Burnout, and Is It Different From Being <em>Tired?</em></h3><p>Tired asks for sleep. Burnout asks for more than that.</p><span className={styles.articleRead}>Read the essay →</span></div>
              </Link>
            </article>
            <article className={`${styles.articleCard} ${styles.articleCardFeatured}`}>
              <Link className={styles.articleCardLink} href="/passage/how-long-does-burnout-recovery-take">
                <div className={`${styles.articleVisual} ${styles.burnoutPhoto}`} role="img" aria-label="People in a canoe crossing sunlit wetlands at dusk" />
                <div className={styles.articleCardContent}>
                  <span className={styles.tag}>Essay 04 · Published</span>
                  <h3>How Long Does Burnout Recovery Actually <em>Take?</em></h3>
                  <p>Why a week away fades, and what a real return looks like.</p>
                  <span className={styles.articleRead}>Read the essay →</span>
                </div>
              </Link>
            </article>
            <article className={`${styles.articleCard} ${styles.articleCardFeatured}`}>
              <Link className={styles.articleCardLink} href="/passage/how-to-choose-a-transformational-travel-service-in-2027">
                <div className={`${styles.articleVisual} ${styles.servicePhoto}`} role="img" aria-label="Two people paddling a canoe through a waterway bordered by green vegetation" />
                <div className={styles.articleCardContent}>
                  <span className={styles.tag}>Essay 03 · Published</span>
                  <h3>How Do I Choose a Transformational Travel Service in <em>2027?</em></h3>
                  <p>The trip is only the door. The change lives in the second month.</p>
                  <span className={styles.articleRead}>Read the essay →</span>
                </div>
              </Link>
            </article>
            <article className={`${styles.articleCard} ${styles.articleCardFeatured}`}>
              <Link className={styles.articleCardLink} href="/passage/why-your-last-vacation-did-not-help-you-feel-rested">
                <div className={`${styles.articleVisual} ${styles.vacationPhoto}`} role="img" aria-label="A pale frog resting on a lily pad" />
                <div className={styles.articleCardContent}>
                  <span className={styles.tag}>Essay 02 · Published</span>
                  <h3>Why Your Last Vacation Did Not Help You Feel <em>Rested</em></h3>
                  <p>You changed the view, but the tiredness kept its seat. What the research says about coming home.</p>
                  <span className={styles.articleRead}>Read the essay →</span>
                </div>
              </Link>
            </article>
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
            <p>Passage is the editorial arm of Ryravel. We publish long-form writing about the emotional territory of travel: the conditions that can make a journey meaningful, the arcs that match them, and what happens after the return.</p>
            <p>We do not write destination guides. We do not rank hotels. We write about what happens when a journey is built around a feeling, not a place, and what it costs to come back unchanged.</p>
            <p>New issues will arrive when they are ready. Not on a schedule. Not for the algorithm. For the person who needs them.</p>
          </div>
        </section>
      </main>

    </div>
  );
}
