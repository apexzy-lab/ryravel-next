import Link from "next/link";
import { buildMetadata } from "../seo";
import styles from "./return.module.css";

export const metadata = buildMetadata({
  title: "The Return: What Lasts After Your Journey",
  description: "The journey ends. The change does not. Discover how Ryravel designs backwards from your return, with thoughtful follow-up and a measured Return Score.",
  path: "/the-return",
});

const arrivals = [
  {
    arrived: "Running on empty. Could not remember the last time she felt present. Her body had been saying no for months while her mind kept saying yes.",
    arc: "Exhausted arc · Full Tanzania Restoration",
    returned: "She slept. Really slept. For the first time in two years. She stopped checking her phone before she got out of bed. The first hour of the day now belongs to her.",
    result: "Day 30 · Return Score: 8 to 3",
  },
  {
    arrived: "Physically present everywhere and emotionally present nowhere. Optimised his life for output and lost the thread of why any of it mattered. A spectator in his own existence.",
    arc: "Disconnected arc · Safari Isolation",
    returned: "He sleeps through the night. For the first time in four years, he does not wake at 3am with a to-do list. The calving plains taught him that the world continues without his attention.",
    result: "Day 30 · Return Score: 9 to 4",
  },
  {
    arrived: "Energy with nowhere worthy to go. Tried gyms, races, challenges. The restlessness was still there because the outlet was never the point. The point was proving something to himself.",
    arc: "Restless arc · The Complete Adventurous Arc",
    returned: "The summit gave him the proof. The Serengeti gave him the peace. He now runs without tracking his pace. The restlessness has somewhere worthy to go: his own living room, at 6am, in silence.",
    result: "Day 30 · Return Score: 7 to 4",
  },
];

const followThrough = [
  {
    number: "01", title: <>The Departure<br /><em>Box</em></>,
    description: "On the day you leave, you receive a physical box. Not a gift bag. A container for what you are about to become.",
    detail: [
      "Inside: something your curator chose for you, based on a conversation you have already forgotten you had. Something from the place you are going, selected for your arc, not your itinerary. Something to open on day three, when the journey has begun to work on you. And something to write in, because the best moments resist photography.",
      "What it leaves you with: the feeling that someone saw you before you arrived. That this was never a transaction. That the journey began the moment you said yes.",
    ],
  },
  {
    number: "02", title: <>Check-ins and<br /><em>Written Integration</em></>,
    description: "The world will try to pull you back immediately. We do not let it happen without witness.",
    detail: [
      "We check in on the day you land, Day 7 and Day 30. For those who opt in, we also return on Day 90 and Day 365. Not to sell you anything. To see what lasted.",
      "Each check-in is one question and, when the time is right, one more: “What is one thing you kept from the trip?” The answers become your Return Score. The score becomes proof.",
    ],
  },
  {
    number: "03", title: <>The Silent<br /><em>Documentary</em></>,
    description: "A few weeks after you return, a hand-bound book arrives. Not photos. Not a scrapbook. A silent documentary of your own stillness.",
    detail: [
      "Curated images from your journey, printed on uncoated paper, bound by hand. No captions. No dates. Just the moments where you were not performing. The ones you did not know were being witnessed.",
      "Why silent? Because the best moments resist explanation. Because you will fill the silence with your own memory. Because years from now, you will open this book and feel something you cannot name.",
    ],
  },
];

const touchpoints = [
  ["48 hours before", "One question. One number. Your starting point."],
  ["The day you return", "Before the world rushes back in. Same question."],
  ["Day 7", "The trip is becoming memory. The feeling is what matters."],
  ["Day 30", "This is the number that matters most."],
];

const stats = [
  ["Average pre-trip score", "Before departure"],
  ["Average score at 30 days", "After Return"],
  ["Average improvement", "Points less tired"],
  ["Felt less tired", "At 30 days"],
];

const quotes = [
  ["I stopped checking my phone before I get out of bed. The first hour of the day belongs to me now.", "Exhausted arc · Day 30"],
  ["I say no to things I would have said yes to out of guilt. Zanzibar taught me that stopped is also a state.", "Exhausted arc · Day 30"],
  ["I sleep through the night. For the first time in four years, I do not wake up at 3am with a to-do list.", "Disconnected arc · Day 30"],
];

export default function ReturnPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>The Return</span>
        <h1>The journey ends.<br /><em>The change does not.</em></h1>
        <p>Most travel companies sell the departure. We design for what happens after you land. The Return is not the flight home. It is who you are when you walk back into your life.</p>
      </header>

      <div className={styles.content}>
        <section className={styles.philosophy} aria-labelledby="return-philosophy">
          <div className={styles.philosophyInner}>
            <div><span className={styles.label}>What we mean by The Return</span><h2 id="return-philosophy">You do not travel<br />to escape your life.<br /><em>You travel to return to it.</em></h2></div>
            <div className={styles.philosophyBody}>
              <p>Every Ryravel journey is designed backwards from The Return. We start with the person you want to be when you walk back through your front door, and we build the journey in reverse.</p>
              <p>The experiences are not random. They are sequenced. The rest on day three is not a gap in the itinerary. It is preparation for what happens on day five. The silence is not emptiness. It is where the change takes hold.</p>
              <p>We do not measure success by how many sights you saw or how many photos you took. We measure it by what you bring back. A habit. A perspective. A capacity for rest you had forgotten you owned.</p>
              <p className={styles.philosophyPull}>“The best journeys do not end when the plane lands. They end weeks later, when you realise you are still different.”</p>
            </div>
          </div>
        </section>

        <section className={styles.arrivals} aria-labelledby="return-arrivals">
          <span className={styles.label}>Proof of Return</span><h2 id="return-arrivals">They arrived one way.<br /><em>They returned another.</em></h2>
          <div className={styles.arrivalList}>{arrivals.map((story) => (
            <article className={styles.arrivalCard} key={story.arc}>
              <div className={styles.arrivalBefore}><span className={styles.arrivalTag}>They arrived</span><p className={styles.arrivalText}>{story.arrived}</p><p className={styles.arrivalMeta}>{story.arc}</p></div>
              <div className={styles.arrivalAfter}><span className={styles.arrivalTag}>They returned</span><p className={styles.arrivalText}>{story.returned}</p><p className={styles.arrivalMeta}>{story.result}</p></div>
            </article>
          ))}</div>
        </section>

        <section className={styles.afterTrip} aria-labelledby="return-after">
          <span className={styles.label}>After the trip</span><h2 id="return-after">The trip is the middle,<br />not the end.<br /><em>Here is what happens next.</em></h2>
          <p className={styles.sectionIntro}>The flight home is not the last chapter. It is the transition. What follows is designed as carefully as the journey itself.</p>
          <div className={styles.afterGrid}>{followThrough.map((item) => (
            <article className={styles.afterItem} key={item.number}><span className={styles.afterNumber}>{item.number}</span><h3>{item.title}</h3><p className={styles.afterDescription}>{item.description}</p><div className={styles.afterDetail}>{item.detail.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>
          ))}</div>
        </section>

        <section className={styles.returnScore} aria-labelledby="return-score">
          <div className={styles.scoreHeader}><div><span className={styles.label}>The Return Score</span><h2 id="return-score">We ask one question,<br />four times, to prove<br /><em>the trip worked.</em></h2></div><p>Before you leave, we ask: “On a scale of 1 to 10, how tired do you feel?” We ask again the day you return, 7 days later, and 30 days later. No stories. Just numbers. Only what is true.</p></div>
          <ol className={styles.timeline}>{touchpoints.map(([when, what], index) => <li key={when}><span className={`${styles.timelineDot} ${index > 1 ? styles.sageDot : ""}`} aria-hidden="true" /><span className={styles.timelineLabel}>Touchpoint {index + 1}</span><strong>{when}</strong><p>{what}</p></li>)}</ol>
          <p className={styles.placeholder}>Aggregated results will be published here once three or more travellers have completed all four touchpoints.</p>
          <div className={styles.stats} aria-label="Aggregate statistics pending">{stats.map(([label, note]) => <div className={styles.stat} key={label}><span>Pending</span><strong>{label}</strong><small>{note}</small></div>)}</div>
          <div className={styles.chart} aria-label="Average tiredness chart pending sufficient data"><p>Average tiredness score over time</p><div className={styles.chartBars}>{["Pre-trip", "Return day", "Day 7", "Day 30"].map((label) => <div key={label}><span>Pending</span><i aria-hidden="true" /><small>{label}</small></div>)}</div></div>
          <div className={styles.keptIntro}><span className={styles.label}>What stayed</span><h3>What travellers kept<br /><em>after 30 days</em></h3></div>
          <div className={styles.quotes}>{quotes.map(([quote, source]) => <blockquote key={quote}><p>“{quote}”</p><cite>{source}</cite></blockquote>)}</div>
          <p className={styles.method}>Methodology: The Return Score is collected via a one-question survey at four touchpoints: T0 (48 hours pre-departure), T1 (return day), T2 (day 7), T3 (day 30). Optional extended follow-up at day 90 and day 365. Open follow-up at T2 and T3: “What is one thing you kept from the trip?” Aggregated results are published only after at least three travellers have completed all four touchpoints. No scores are estimated, interpolated, or cherry-picked.</p>
        </section>
      </div>
      <section className={styles.bottomCta} aria-labelledby="return-begin"><span className={styles.label}>Begin</span><h2 id="return-begin">Your return starts<br />before you leave.</h2><p>Every journey is designed for who you become. Tell us where you are, and we will design the return.</p><div className={styles.ctaActions}><Link className={styles.primaryButton} href="/request">Begin the conversation</Link><Link className={styles.secondaryButton} href="/journeys">Explore the journeys</Link></div></section>
    </main>
  );
}
