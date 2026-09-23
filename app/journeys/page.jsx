import JourneysExperience from "./JourneysExperience";
import "./journeys.css";
import { journeys } from "../data";
import { absoluteUrl, buildMetadata } from "../seo";

export const metadata = buildMetadata({ title: "Bespoke Luxury Journeys Worldwide", description: "Explore Ryravel's launched Restoration and Return journeys, the seven-journey Stillness Collection, and emotional arcs open for waitlist interest. Private journeys are designed worldwide.", path: "/journeys" });

const journeyCollectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${absoluteUrl("/journeys")}#collection`,
  name: "Ryravel emotional journeys",
  url: absoluteUrl("/journeys"),
  description: metadata.description,
  isPartOf: { "@id": "https://ryravel.com/#website" },
  mainEntity: { "@type": "ItemList", numberOfItems: journeys.length, itemListElement: journeys.map((journey, index) => ({ "@type": "ListItem", position: index + 1, name: journey.title, url: absoluteUrl(`/journeys/${journey.slug}`) })) },
};

export default function JourneysPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(journeyCollectionJsonLd) }} /><JourneysExperience journeys={journeys} /></>;
}
