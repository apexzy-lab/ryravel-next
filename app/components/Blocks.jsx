import Link from "next/link";
import { arcFor } from "../data";

export function PageHero({ kicker, title, emphasis, copy, compact = false, tone = "green" }) {
  return (
    <section className={`page-hero tone-${tone} ${compact ? "compact" : ""}`}>
      <div>
        <span className="kicker">{kicker}</span>
        <h1>{title}{emphasis && <><br /><em>{emphasis}</em></>}</h1>
        {copy && <p>{copy}</p>}
      </div>
    </section>
  );
}

export function JourneyCard({ journey }) {
  const arc = arcFor(journey.arc);
  return (
    <Link href={`/journeys/${journey.slug}`} className={`journey-card arc-${journey.arc}`}>
      <div className="journey-card-art">
        <span>{journey.nights} nights</span>
        <div><small>{arc.shortTitle}</small><h3>{journey.title}</h3></div>
      </div>
      <div className="journey-card-copy">
        <small>{arc.label}</small>
        <h3>{journey.title}</h3>
        <p>{journey.description}</p>
        <div className="tags">{journey.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="journey-price"><span>From <b>{journey.price}</b> / {journey.unit || "person"}</span><u>Explore →</u></div>
      </div>
    </Link>
  );
}

export function CTA({ title = "How do you want to feel?", copy = "Tell us—and we will build the rest. One honest conversation is all it takes to begin." }) {
  return (
    <section className="global-cta">
      <span className="kicker">Ready to start</span>
      <h2>{title}</h2>
      <p>{copy}</p>
      <div><Link className="button button-red" href="/request">Begin the conversation</Link><Link className="button button-outline" href="/journeys">Explore journeys</Link></div>
    </section>
  );
}
