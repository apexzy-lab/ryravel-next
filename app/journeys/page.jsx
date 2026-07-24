import Link from "next/link";
import { CTA, JourneyCard, PageHero } from "../components/Blocks";
import { arcs, journeys } from "../data";

export const metadata = { title: "Journeys" };

export default function JourneysPage() {
  const arcCount = arcs.length;
  const journeyCount = journeys.length;
  return (
    <main>
      <PageHero kicker="Journeys · Tanzania collection" title="Crafted for the way" emphasis="you want to arrive." copy={`${arcCount} emotional arcs. ${journeyCount} journeys. Every one begins with a feeling.`} />
      <nav className="filter-nav"><a href="#all">All journeys</a>{arcs.map((arc) => <a href={`#${arc.id}`} key={arc.id}>{arc.shortTitle} arc</a>)}<Link href="/private-bespoke">Private & bespoke</Link><Link href="/gifting">Gifting</Link></nav>
      <section className="catalogue paper-section" id="all">
        <div className="catalogue-heading"><span className="kicker">Tanzania collection · {arcCount} arcs</span><span>{journeyCount} journeys · {arcCount} emotional arcs</span></div>
        {arcs.map((arc) => (
          <div className="arc-row" id={arc.id} key={arc.id}>
            <div className="arc-row-heading"><div><span>{arc.label}</span><p>{arc.intro}</p></div><Link href={`/journeys/${arc.id}`}>Explore the arc →</Link></div>
            <div className="journey-cards">{journeys.filter((journey) => journey.arc === arc.id).map((journey) => <JourneyCard journey={journey} key={journey.slug} />)}</div>
          </div>
        ))}
      </section>
      <CTA title="Not sure which journey is yours?" copy="Tell us how you want to feel. A curator will listen and identify the journey that is right for exactly where you are now." />
    </main>
  );
}
