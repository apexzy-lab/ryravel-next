import JourneysExperience from "./JourneysExperience";
import "./journeys.css";
import { journeys } from "../data";
import { absoluteUrl, buildMetadata } from "../seo";

const featuredJourneys = journeys.filter((journey) => journey.arc !== "stillness");

export const metadata = buildMetadata({ title: "Bespoke Luxury Journeys Worldwide", description: "Explore Ryravel's launched Exhausted and Disconnected emotional arcs, including four Restoration journeys and the six-night Calving Season. Seven further arcs are open for waitlist interest; Stillness has its own collection.", path: "/journeys" });

const journeyCollectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${absoluteUrl("/journeys")}#collection`,
  name: "Ryravel emotional journeys",
  url: absoluteUrl("/journeys"),
  description: metadata.description,
  isPartOf: { "@id": "https://ryravel.com/#website" },
  mainEntity: { "@type": "ItemList", numberOfItems: featuredJourneys.length, itemListElement: featuredJourneys.map((journey, index) => ({ "@type": "ListItem", position: index + 1, name: journey.title, url: absoluteUrl(`/journeys/${journey.slug}`) })) },
};

export default function JourneysPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(journeyCollectionJsonLd) }} /><JourneysExperience journeys={featuredJourneys} /></>;
}
