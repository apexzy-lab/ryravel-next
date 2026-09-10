import Link from "next/link";
import { CTA, PageHero } from "../../components/Blocks";
import { absoluteUrl, buildMetadata } from "../../seo";

export const metadata = buildMetadata({
  title: "Luxury Tanzania Safari & Bespoke Tours",
  description: "Private luxury Tanzania journeys through the Serengeti, Ngorongoro, Kilimanjaro and Zanzibar, designed around how you want to return.",
  path: "/destinations/tanzania",
  image: "/journeys/ex6/exhausted-ngorongoro-sunset.webp",
});

const destinationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "Luxury travel in Tanzania with Ryravel",
  url: absoluteUrl("/destinations/tanzania"),
  description: metadata.description,
  touristType: ["Luxury travellers", "Private travellers", "Couples", "Small groups"],
  includesAttraction: ["Serengeti", "Ngorongoro Conservation Area", "Mount Kilimanjaro", "Tarangire"].map((name) => ({ "@type": "TouristAttraction", name })),
};

export default function TanzaniaDestinationPage() {
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationJsonLd) }} />
    <PageHero kicker="Luxury Tanzania travel" title="Tanzania, designed around" emphasis="how you want to return" copy="Private safaris, mountain journeys and deliberate wilderness stays shaped around your pace—not a checklist of sightings." />
    <section className="editorial paper-section">
      <span className="kicker">Private by design</span>
      <h2>A luxury Tanzania safari with <em>an emotional purpose.</em></h2>
      <p className="lead">Ryravel designs bespoke travel across Tanzania for people who want privacy, depth and a journey that changes more than their location. Your curator shapes the sequence, pace, properties and protected empty time around what you need from the trip.</p>
      <div className="principle-grid">
        <article><span>01</span><h3>Serengeti</h3><p>Private game drives, mobile camps and stillness on the plains, paced for attention rather than accumulation.</p></article>
        <article><span>02</span><h3>Ngorongoro</h3><p>Crater-rim stays and a deliberate descent that can close a wilderness journey without rushing its meaning.</p></article>
        <article><span>03</span><h3>Kilimanjaro</h3><p>Supported summit journeys designed around preparation, recovery and the person who comes down the mountain.</p></article>
        <article><span>04</span><h3>Tarangire</h3><p>A quieter landscape for travellers who need space, unforced encounters and fewer competing demands.</p></article>
      </div>
    </section>
    <section className="dark-editorial"><span className="kicker">International planning</span><h2>Arrive from anywhere.<br /><em>Manage nothing when you land.</em></h2><p>We coordinate the in-country journey—private transfers, internal flights, carefully selected stays, experiences and curator support—so travellers arriving from North America, Europe, the Gulf and beyond can move through Tanzania without carrying the logistics.</p><Link className="button button-red" href="/journeys">Explore Tanzania journeys</Link></section>
    <section className="editorial paper-section"><span className="kicker">Frequently asked</span><h2>Planning a private Tanzania journey</h2><div className="property-grid"><article><h3>When should I travel?</h3><p>The right season depends on the landscape and feeling you want. Some journeys are seasonal; others run year-round. Your curator will match timing to the experience rather than defaulting to the busiest month.</p></article><article><h3>Can Tanzania and Zanzibar be combined?</h3><p>Yes. Several Ryravel journeys pair the Serengeti or Ngorongoro with Zanzibar, using the coast as arrival, recovery or closure depending on the arc.</p></article><article><h3>Are the journeys private?</h3><p>Our itineraries are designed privately around the traveller. Accommodation and specialist arrangements vary by journey, dates and availability.</p></article></div></section>
    <CTA title="Begin with how you want to feel." copy="Tell a curator what this journey needs to change. We will choose the right Tanzanian landscapes from there." />
  </main>;
}
