import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { CTA, JourneyCard } from "../../components/Blocks";
import { arcs, journeys, arcFor, journeyFor } from "../../data";
import ExhaustedRestoration from "./ExhaustedRestoration";
import ExhaustedRestorationSix from "./ExhaustedRestorationSix";
import ExhaustedRestorationNine from "./ExhaustedRestorationNine";
import KimbilioJourney from "./KimbilioJourney";
import KimyaJourney from "./KimyaJourney";
import KuponaJourney from "./KuponaJourney";
import RunyararoJourney from "./RunyararoJourney";
import UtalalaJourney from "./UtalalaJourney";
import { absoluteUrl, buildMetadata } from "../../seo";
import JourneyProof from "../../components/JourneyProof";

function requestHrefFor(journey) {
  const query = new URLSearchParams({
    journey: journey.slug,
    name: journey.title,
    destination: journey.destination,
    nights: String(journey.nights),
    price: journey.price,
  });
  return `/request?${query.toString()}`;
}

export function generateStaticParams() {
  return [...arcs.filter((arc) => journeys.some((journey) => journey.arc === arc.id)).map((arc) => ({ slug: arc.id })), ...journeys.map((journey) => ({ slug: journey.slug }))];
}

const aliases = {
  "renewed": "exhausted",
  "ex11": "ex6",
  "yakushima-silence": "ex6",
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const featured = {
    ex6: ["The Full Tanzania Restoration · 11 Nights", "Exhausted, The Restoration — an eleven-night journey through Zanzibar, the Serengeti and Ngorongoro.", "/journeys/ex6/exhausted-ngorongoro-sunset.webp"],
    ex9: ["Exhausted, The Restoration · 6 Nights", "Six nights in Zanzibar designed around pure decompression, stillness and a gentler return.", "/journeys/ex9/exhausted-zanzibar-coast.webp"],
    rn9: ["Exhausted, The Restoration · 9 Nights", "Nine nights through Zanzibar and the Serengeti, designed around deep rest, wilderness and a quieter return.", "/journeys/rn9/exhausted-serengeti-camp.webp"],
  }[slug];
  if (featured) return buildMetadata({ title: featured[0], description: featured[1], path: `/journeys/${slug}`, image: featured[2] });
  const item = journeyFor(slug) || arcFor(slug);
  if (!item) return { robots: { index: false, follow: false } };
  return buildMetadata({
    title: item.seoTitle || item.title,
    description: item.seoDescription || item.description || item.intro || `Explore ${item.title}, a private Ryravel journey designed around how you want to feel.`,
    path: `/journeys/${slug}`,
    image: item.image,
    keywords: item.keywords,
  });
}

function ArcPage({ arc }) {
  const cards = journeys.filter((journey) => journey.arc === arc.id);
  const heroImage = arc.id === "stillness" ? "/images/stillness-collection-forest.jpg" : null;
  return (
    <main>
      <section className={`arc-hero arc-${arc.id} ${heroImage ? "has-hero-image" : ""}`}>
        {heroImage && <img className="arc-hero-image" src={heroImage} alt="A quiet boat beneath sunlit forest reflected in still water" width="1080" height="1350" fetchPriority="high" />}
        {heroImage && <i className="arc-hero-image-overlay" aria-hidden="true" />}
        <div><Link href="/journeys">← All journeys</Link><span className="kicker">Emotional arc · {arc.label}</span><h1>{arc.title}</h1><em>{arc.subtitle}</em><p>{arc.intro}</p></div>
      </section>
      <section className="arc-story paper-section"><p className="lead">{arc.story}</p><span className="kicker">How the arc works</span><div className="principle-grid">{arc.principles.map(([title, copy], index) => <article key={title}><span>— 0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
      <section className="arc-journeys paper-section"><div className="section-heading"><div><span className="kicker">Choose your arc</span><h2>{cards.length} journeys. <em>One feeling.</em></h2></div></div><div className="journey-cards">{cards.map((journey) => <JourneyCard journey={journey} key={journey.slug} />)}</div></section>
      <JourneyProof arc={arc.id} />
      <CTA requestHref={`/request?arc=${encodeURIComponent(arc.id)}&name=${encodeURIComponent(arc.title)}`} />
    </main>
  );
}

function JourneyPage({ journey }) {
  const arc = arcFor(journey.arc);
  const requestHref = requestHrefFor(journey);
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
      <JourneyProof arc={journey.arc} />
      <section className="investment paper-section"><div><span className="kicker">Investment</span><h2>{journey.nights} nights. Everything included.</h2><p>International flights are not included. Private transfers, experiences, indicated meals, signature rituals and curator support are included.</p>{journey.priceNote && <p className="price-note">{journey.priceNote}</p>}</div><div><small>From</small><strong>{journey.price}</strong><span>/ {journey.unit || "person"}</span><Link className="button button-red" href={requestHref}>Begin the conversation →</Link></div></section>
      <section className="related paper-section"><span className="kicker">Continue exploring</span><div className="journey-cards">{journeys.filter((item) => item.arc === journey.arc && item.slug !== journey.slug).map((item) => <JourneyCard journey={item} key={item.slug} />)}</div></section>
      <CTA title={journey.tagline} copy="A curator will adapt every detail to your dates, pace and the feeling you want to carry home." requestHref={requestHref} />
    </main>
  );
}

function StructuredJourney({ journey, children }) {
  const arc = arcFor(journey.arc);
  const canonical = absoluteUrl(`/journeys/${journey.slug}`);
  const tripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${canonical}#trip`,
    name: journey.title,
    description: journey.description,
    url: canonical,
    provider: { "@id": "https://ryravel.com/#organization" },
    touristType: arc.label,
    itinerary: {
      "@type": "ItemList",
      itemListElement: journey.destination.split("·").map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@type": "TouristDestination", name: name.trim() },
      })),
    },
    ...(journey.keywords ? { keywords: journey.keywords.join(", ") } : {}),
    ...(journey.tripOrigin ? { tripOrigin: { "@type": "Place", name: journey.tripOrigin } } : {}),
    ...(journey.days ? {
      subTrip: journey.phases.map((name, index) => ({
        "@type": "TouristTrip",
        name: `Day ${index + 1}: ${name}`,
        touristType: arc.label,
        partOfTrip: { "@id": `${canonical}#trip` },
      })),
    } : {}),
    ...(journey.price ? {
      offers: {
        "@type": "Offer",
        price: journey.price.replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
        url: canonical,
        availability: "https://schema.org/InStock",
        description: journey.priceNote || `From ${journey.price} per ${journey.unit || "person"}`,
      },
    } : {}),
    ...(journey.images ? { image: journey.images.map((image) => absoluteUrl(image)) } : journey.image ? { image: absoluteUrl(journey.image) } : {}),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ryravel", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Journeys", item: absoluteUrl("/journeys") },
      { "@type": "ListItem", position: 3, name: journey.title, item: canonical },
    ],
  };
  const faqJsonLd = journey.faqs?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: journey.faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } : null;
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripJsonLd) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
    {children}
  </>;
}

function StructuredArc({ arc, children }) {
  const cards = journeys.filter((journey) => journey.arc === arc.id);
  const canonical = absoluteUrl(`/journeys/${arc.id}`);
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#collection`,
    name: arc.title,
    description: arc.intro,
    url: canonical,
    isPartOf: { "@id": "https://ryravel.com/#website" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: cards.length,
      itemListElement: cards.map((journey, index) => ({ "@type": "ListItem", position: index + 1, name: journey.title, url: absoluteUrl(`/journeys/${journey.slug}`) })),
    },
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />{children}</>;
}

export default async function JourneyRoute({ params }) {
  const { slug } = await params;
  if (aliases[slug]) permanentRedirect(`/journeys/${aliases[slug]}`);
  const journey = journeyFor(slug);
  if (journey) {
    const content = slug === "ex6" ? <ExhaustedRestoration /> : slug === "ex9" ? <ExhaustedRestorationSix /> : slug === "rn9" ? <ExhaustedRestorationNine /> : slug === "kimbilio" ? <KimbilioJourney journey={journey} /> : slug === "kimya" ? <KimyaJourney journey={journey} /> : slug === "kupona" ? <KuponaJourney journey={journey} /> : slug === "runyararo" ? <RunyararoJourney journey={journey} /> : slug === "utalala" ? <UtalalaJourney journey={journey} /> : <JourneyPage journey={journey} />;
    return <StructuredJourney journey={journey}>{content}</StructuredJourney>;
  }
  const arc = arcFor(slug);
  if (arc && journeys.some((journey) => journey.arc === arc.id)) return <StructuredArc arc={arc}><ArcPage arc={arc} /></StructuredArc>;
  notFound();
}
