import HomepageExperience from "./components/HomepageExperience";
import { buildMetadata, websiteJsonLd } from "./seo";

export const metadata = buildMetadata({
  title: "Ryravel | Bespoke Travel Designed Around How You Feel",
  description: "Ryravel designs private, bespoke luxury journeys worldwide around how you want to feel—from restorative retreats and safaris to islands and cultural journeys.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
    <HomepageExperience />
  </>;
}
