import HomepageExperience from "./components/HomepageExperience";
import { buildMetadata, websiteJsonLd } from "./seo";

export const metadata = buildMetadata({
  title: "Ryravel | Bespoke Travel Designed Around How You Feel",
  description: "Bespoke luxury journeys designed around how you want to feel, from private Tanzania safaris and Zanzibar escapes to Africa and beyond.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
    <HomepageExperience />
  </>;
}
