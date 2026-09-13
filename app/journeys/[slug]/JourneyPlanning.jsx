import Link from "next/link";
import { journeyFor } from "../../data";
import JourneyProof from "../../components/JourneyProof";
import styles from "./KimbilioJourney.module.css";

function hiddenJourneyFields(journey) {
  return <>
    <input type="hidden" name="journey" value={journey.slug} />
    <input type="hidden" name="name" value={journey.title} />
    <input type="hidden" name="destination" value={journey.destination} />
    <input type="hidden" name="nights" value={journey.nights} />
    <input type="hidden" name="price" value={journey.price} />
  </>;
}

export function JourneyAvailability({ journey, title, copy, openMonths, closedNote }) {
  return (
    <section className={styles.availability} aria-labelledby={`${journey.slug}-availability`}>
      <div className={styles.availabilityIntro}>
        <span className={styles.sectionLabel}>Travel dates</span>
        <h2 id={`${journey.slug}-availability`}>{title}</h2>
        <p>{copy}</p>
        <p className={styles.seasonLine}><b>Journey window</b> {openMonths.join(" · ")}<br /><span>{closedNote}</span></p>
      </div>
      <form action="/request" method="get">
        <label>Preferred start date<input type="date" name="start-date" required /></label>
        <label>Travelling as<select name="party" defaultValue="2 people sharing"><option>2 people sharing</option><option>Solo traveller</option><option>3–4 people</option><option>5–8 people</option><option>9+ people</option></select></label>
        {hiddenJourneyFields(journey)}
        <button type="submit">Check availability →</button>
        <small>We confirm camp and flight space personally before anything is booked.</small>
      </form>
    </section>
  );
}

export function JourneyProofSection() {
  return <div className={styles.proof}><JourneyProof arc="stillness" /></div>;
}

export function JourneyFaqs({ journey }) {
  if (!journey.faqs?.length) return null;
  return (
    <section className={styles.faqs} aria-labelledby={`${journey.slug}-faqs`}>
      <header><span className={styles.sectionLabel}>Planning notes</span><h2 id={`${journey.slug}-faqs`}>The practical questions,<br />answered plainly.</h2></header>
      <div>{journey.faqs.map(({ question, answer }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
    </section>
  );
}

export function StillnessAlternatives({ currentSlug }) {
  const cards = ["kimbilio", "kimya", "st6", "st9"].filter((slug) => slug !== currentSlug).map(journeyFor).filter(Boolean);
  return (
    <section className={styles.related} aria-labelledby={`${currentSlug}-related`}>
      <header><span className={styles.sectionLabel}>Continue within Stillness</span><h2 id={`${currentSlug}-related`}>The same need.<br />A different landscape.</h2></header>
      <div>{cards.map((journey) => <Link href={`/journeys/${journey.slug}`} key={journey.slug}><span>{journey.nights} nights · {journey.destination}</span><h3>{journey.title}</h3><p>{journey.tagline}</p><b>Explore journey →</b></Link>)}</div>
    </section>
  );
}
