import JourneysExperience from "./JourneysExperience";
import "./journeys.css";
import { journeys } from "../data";
import { absoluteUrl, buildMetadata } from "../seo";

const featuredJourneys = journeys.filter((journey) => journey.arc !== "stillness");

export const metadata = buildMetadata({ title: "Private Luxury Journeys Across Africa", description: "Explore Ryravel's published feeling-led journeys across Africa, including Restoration and Return. The Stillness Collection has its own page; bespoke requests beyond Africa are welcome.", path: "/journeys" });

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
