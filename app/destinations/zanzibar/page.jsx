import Link from "next/link";
import { CTA, PageHero } from "../../components/Blocks";
import { absoluteUrl, buildMetadata } from "../../seo";

export const metadata = buildMetadata({
  title: "Luxury Zanzibar Travel & Private Journeys",
  description: "Bespoke luxury Zanzibar journeys with private stays, considered pacing and human curation, designed around how you want to feel.",
  path: "/destinations/zanzibar",
  image: "/journeys/ex9/exhausted-zanzibar-coast.webp",
});

const destinationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: "Luxury travel in Zanzibar with Ryravel",
  url: absoluteUrl("/destinations/zanzibar"),
  description: metadata.description,
  touristType: ["Luxury travellers", "Couples", "Solo travellers", "Private groups"],
  includesAttraction: ["Stone Town", "Zanzibar coast", "Mnemba Island"].map((name) => ({ "@type": "TouristAttraction", name })),
};

export default function ZanzibarDestinationPage() {
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(destinationJsonLd) }} />
    <PageHero kicker="Luxury Zanzibar travel" title="Zanzibar, beyond" emphasis="the beautiful beach" copy="Private island journeys built around restoration, intimacy and reconnection—with enough space for the island to work on you." />
    <section className="editorial paper-section">
      <span className="kicker">The island, deliberately paced</span>
      <h2>Luxury is not how much is added.<br /><em>It is how little you must manage.</em></h2>
      <p className="lead">Ryravel designs bespoke Zanzibar travel around the condition you arrive in. A restorative stay should not move like a romantic one. A private group needs a different rhythm from a solo traveller. The island remains the setting; your reason for coming determines the journey.</p>
      <div className="principle-grid">
        <article><span>01</span><h3>Restoration</h3><p>Coast, spa, protected silence and days that do not ask you to optimize them.</p></article>
        <article><span>02</span><h3>Reawakening</h3><p>Private villas, shared rituals and an island rhythm designed to bring two people back into the same moment.</p></article>
        <article><span>03</span><h3>Gathering</h3><p>Stone Town, sailing, food and music arranged to create shared memory for a small private group.</p></article>
        <article><span>04</span><h3>Return</h3><p>Space to disconnect from ordinary demands before the journey deliberately prepares you to go home.</p></article>
      </div>
    </section>
    <section className="dark-editorial"><span className="kicker">Zanzibar and mainland Tanzania</span><h2>Coast first, wilderness next.<br /><em>Or the reverse.</em></h2><p>Zanzibar can stand alone or form part of a longer private Tanzania journey. We use the coast intentionally—as permission to stop, as recovery after a summit, or as a gentler final movement after the Serengeti and Ngorongoro.</p><div><Link className="button button-red" href="/journeys/ex9">Explore the six-night restoration</Link> <Link className="button button-outline" href="/journeys/ex6">Explore Tanzania and Zanzibar</Link></div></section>
    <section className="editorial paper-section"><span className="kicker">Frequently asked</span><h2>Planning a private Zanzibar journey</h2><div className="property-grid"><article><h3>Is Zanzibar suitable for a standalone journey?</h3><p>Yes. Six to eleven nights can hold a complete emotional arc when the coast, Stone Town, private experiences and empty time are sequenced deliberately.</p></article><article><h3>Can the trip be completely private?</h3><p>Your itinerary is built around you. We select private transfers, villas and experiences where they serve the journey, subject to dates and availability.</p></article><article><h3>What does Ryravel arrange?</h3><p>We coordinate the in-country stays, transfers, experiences, indicated meals and curator support described in your proposal.</p></article></div></section>
    <CTA title="Let Zanzibar serve the reason you are travelling." copy="Begin with one honest conversation. Your curator will design the island around what you need from it." />
  </main>;
}
