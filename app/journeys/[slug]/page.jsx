import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CTA, JourneyCard } from "../../components/Blocks";
import { arcs, journeys, arcFor, journeyFor } from "../../data";
import ExhaustedRestoration from "./ExhaustedRestoration";
import ExhaustedRestorationSix from "./ExhaustedRestorationSix";

export function generateStaticParams() {
  return [...arcs.map((arc) => ({ slug: arc.id })), ...journeys.map((journey) => ({ slug: journey.slug }))];
}

const aliases = {
  "renewed": "exhausted",
  "yakushima-silence": "ex6",
  "saharan-stars": "ro6",
  "patagonia-edge": "adv9",
  "amalfi-slow": "ro8",
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (slug === "ex6") {
    return {
      title: "The Full Tanzania Restoration · 11 Nights",
      description: "Exhausted, The Restoration — an eleven-night journey through Zanzibar, the Serengeti and Ngorongoro.",
      openGraph: {
        title: "The Full Tanzania Restoration · 11 Nights",
        description: "Exhausted, The Restoration — an eleven-night journey through Zanzibar, the Serengeti and Ngorongoro.",
        images: ["https://ryravel.com/journeys/ex6/exhausted-ngorongoro-sunset.webp"],
      },
      twitter: {
        card: "summary_large_image",
        title: "The Full Tanzania Restoration · 11 Nights",
        description: "Exhausted, The Restoration — an eleven-night journey through Zanzibar, the Serengeti and Ngorongoro.",
        images: ["https://ryravel.com/journeys/ex6/exhausted-ngorongoro-sunset.webp"],
      },
    };
  }
  if (slug === "ex9") {
    return {
      title: "Exhausted, The Restoration · 6 Nights",
      description: "Six nights in Zanzibar designed around pure decompression, stillness and a gentler return.",
      openGraph: {
        title: "Exhausted, The Restoration · 6 Nights",
        description: "Six nights in Zanzibar designed around pure decompression, stillness and a gentler return.",
        images: ["https://ryravel.com/journeys/ex9/exhausted-zanzibar-coast.webp"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Exhausted, The Restoration · 6 Nights",
        description: "Six nights in Zanzibar designed around pure decompression, stillness and a gentler return.",
        images: ["https://ryravel.com/journeys/ex9/exhausted-zanzibar-coast.webp"],
      },
    };
  }
  const item = journeyFor(slug) || arcFor(slug);
  return item ? { title: item.title } : {};
}

function ArcPage({ arc }) {
  const cards = journeys.filter((journey) => journey.arc === arc.id);
  return (
    <main>
      <section className={`arc-hero arc-${arc.id}`}><div><Link href="/journeys">← All journeys</Link><span className="kicker">Emotional arc · {arc.label}</span><h1>{arc.title}</h1><em>{arc.subtitle}</em><p>{arc.intro}</p></div></section>
      <section className="arc-story paper-section"><p className="lead">{arc.story}</p><span className="kicker">How the arc works</span><div className="principle-grid">{arc.principles.map(([title, copy], index) => <article key={title}><span>— 0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
      <section className="arc-journeys paper-section"><div className="section-heading"><div><span className="kicker">Choose your arc</span><h2>{cards.length} journeys. <em>One feeling.</em></h2></div></div><div className="journey-cards">{cards.map((journey) => <JourneyCard journey={journey} key={journey.slug} />)}</div></section>
      <CTA />
    </main>
  );
}

function JourneyPage({ journey }) {
  const arc = arcFor(journey.arc);
  const dayTitles = ["You are here now", "The body arrives", "Go deeper", "Receive the unexpected", "The transformation moment", "The lightest day", "The return begins", "Carry it forward"];
  return (
    <main>
      <section className={`journey-detail-hero arc-${journey.arc}`}><div><span className="kicker">{arc.label}</span><em>{arc.subtitle}</em><h1>{journey.title}</h1><h2>{journey.tagline}</h2><div className="journey-facts"><span>Duration <b>{journey.nights} nights</b></span><span>Destination <b>{journey.destination}</b></span><span>Zones <b>{journey.tags.join(" · ")}</b></span><span>From <b>{journey.price} / {journey.unit || "person"}</b></span></div></div></section>
      <section className="journey-intro paper-section"><em>“{journey.tagline}”</em><p>{journey.description} This journey is paced around your emotional arc, with room for silence, surprise and the human encounters that cannot be reduced to a checklist.</p></section>
      <section className="itinerary paper-section">
        {journey.phases.map((phase, phaseIndex) => (
          <div className="phase" key={phase}>
            <div className="phase-heading"><span>Phase {phaseIndex + 1}</span><h2>{phase}</h2><small>{journey.destination}</small></div>
            <div className="day-grid">
              {dayTitles.slice(phaseIndex * 2, phaseIndex * 2 + 2).map((title, index) => <article key={title}><span>Day {Math.min(journey.nights, phaseIndex * 2 + index + 1)}</span><h3>{title}</h3><p>Your curator has placed one meaningful experience here and protected the time around it. The pace remains human, the details personal, and nothing is added simply to fill a day.</p></article>)}
              <article className="signature-card"><span>Ryravel signature</span><h3>{phaseIndex === journey.phases.length - 1 ? "The Departure Box" : "A moment not listed in your itinerary"}</h3><p>Locally made, quietly placed, and timed for the point in the journey when it will mean the most.</p></article>
            </div>
          </div>
        ))}
      </section>
      <section className="investment paper-section"><div><span className="kicker">Investment</span><h2>{journey.nights} nights. Everything included.</h2><p>International flights are not included. Private transfers, experiences, indicated meals, signature rituals and curator support are included.</p>{journey.priceNote && <p className="price-note">{journey.priceNote}</p>}</div><div><small>From</small><strong>{journey.price}</strong><span>/ {journey.unit || "person"}</span><Link className="button button-red" href="/request">Begin the conversation →</Link></div></section>
      <section className="related paper-section"><span className="kicker">Continue exploring</span><div className="journey-cards">{journeys.filter((item) => item.arc === journey.arc && item.slug !== journey.slug).map((item) => <JourneyCard journey={item} key={item.slug} />)}</div></section>
      <CTA title={journey.tagline} copy="A curator will adapt every detail to your dates, pace and the feeling you want to carry home." />
    </main>
  );
}

export default async function JourneyRoute({ params }) {
  const { slug } = await params;
  if (aliases[slug]) redirect(`/journeys/${aliases[slug]}`);
  if (slug === "ex6") return <ExhaustedRestoration />;
  if (slug === "ex9") return <ExhaustedRestorationSix />;
  const journey = journeyFor(slug);
  if (journey) return <JourneyPage journey={journey} />;
  const arc = arcFor(slug);
  if (arc) return <ArcPage arc={arc} />;
  notFound();
}
