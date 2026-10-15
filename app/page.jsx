import HomepageExperience from "./components/HomepageExperience";
import { buildMetadata, websiteJsonLd } from "./seo";

export const metadata = buildMetadata({
  title: "Ryravel | Bespoke Travel Designed Around How You Feel",
  description: "Explore Ryravel's feeling-led private journeys across Africa. Bespoke requests for other destinations are welcome and reviewed personally.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
    <HomepageExperience />
  </>;
}
