import Link from "next/link";
import { CTA, JourneyCard, PageHero } from "../components/Blocks";
import { arcs, journeys } from "../data";
import { absoluteUrl, buildMetadata } from "../seo";

export const metadata = buildMetadata({ title: "Bespoke Luxury Journeys Worldwide", description: "Explore Ryravel's private luxury journeys and worldwide bespoke travel design, each shaped around how you want to feel when you return.", path: "/journeys" });

const journeyCollectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${absoluteUrl("/journeys")}#collection`,
  name: "Ryravel bespoke luxury journeys worldwide",
  url: absoluteUrl("/journeys"),
  description: metadata.description,
  isPartOf: { "@id": "https://ryravel.com/#website" },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: journeys.length,
    itemListElement: journeys.map((journey, index) => ({ "@type": "ListItem", position: index + 1, name: journey.title, url: absoluteUrl(`/journeys/${journey.slug}`) })),
  },
};

export default function JourneysPage() {
  const activeArcs = arcs.filter((arc) => journeys.some((journey) => journey.arc === arc.id));
  const arcCount = activeArcs.length;
  const journeyCount = journeys.length;
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(journeyCollectionJsonLd) }} />
      <PageHero kicker="Private journeys · worldwide" title="Crafted for the way" emphasis="you want to arrive." copy={`${arcCount} emotional arcs. ${journeyCount} current journeys, with bespoke destinations designed worldwide. Every one begins with a feeling.`} />
      <nav className="filter-nav"><a href="#all">All journeys</a>{activeArcs.map((arc) => <a href={`#${arc.id}`} key={arc.id}>{arc.shortTitle} arc</a>)}<Link href="/private-bespoke">Private & bespoke</Link><Link href="/gifting">Gifting</Link></nav>
      <section className="catalogue paper-section" id="all">
        <div className="catalogue-heading"><span className="kicker">Curated journeys · {arcCount} arcs</span><span>{journeyCount} current journeys · worldwide bespoke design</span></div>
        {activeArcs.map((arc) => (
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
