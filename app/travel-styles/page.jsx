import Link from "next/link";
import { CTA, PageHero } from "../components/Blocks";
import { commercialServiceOrder, commercialServices } from "../commercialServices";
import { absoluteUrl, buildMetadata } from "../seo";

export const metadata = buildMetadata({
  title: "Luxury Travel Styles & Private Journey Planning",
  description: "Explore Ryravel's worldwide bespoke travel planning for private journeys, families, honeymoons, restorative retreats and executive groups.",
  path: "/travel-styles",
  keywords: ["luxury travel planner", "bespoke luxury travel", "luxury family travel", "luxury honeymoon planner", "luxury wellness retreats", "luxury corporate retreats"],
});

const services = commercialServiceOrder.map((slug) => commercialServices[slug]);
const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${absoluteUrl("/travel-styles")}#collection`,
  name: "Ryravel worldwide luxury travel services",
  url: absoluteUrl("/travel-styles"),
  description: metadata.description,
  mainEntity: { "@type": "ItemList", itemListElement: services.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.title, url: absoluteUrl(`/${service.slug}`) })) },
};

export default function TravelStylesPage() {
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
    <PageHero kicker="Private journeys · worldwide" title="Choose the kind of journey." emphasis="We will shape the rest." copy="Ryravel plans private, bespoke luxury travel around the people going, the reason for leaving and the way they need to return." />
    <section className="travel-style-grid paper-section">{services.map((service, index) => <Link href={`/${service.slug}`} key={service.slug}><span>0{index + 1}</span><small>{service.kicker}</small><h2>{service.title}</h2><p>{service.description}</p><b>Explore →</b></Link>)}<Link href="/transformational-travel"><span>06</span><small>Designed around feeling</small><h2>Emotion-led journeys</h2><p>Journeys designed around how you want to feel when you come back, not where you want to go.</p><b>Explore →</b></Link></section>
    <CTA title="Not sure which brief fits?" copy="You do not need the perfect category or destination. Tell us what this trip needs to do, and a curator will shape the right direction." />
  </main>;
}
