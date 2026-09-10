import HomepageExperience from "./components/HomepageExperience";
import { buildMetadata, websiteJsonLd } from "./seo";

export const metadata = buildMetadata({
  title: "Ryravel | Bespoke Luxury Travel in Tanzania & Zanzibar",
  description: "Private, bespoke journeys across Tanzania and Zanzibar, designed around how you want to feel and who you want to be when you return.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
    <HomepageExperience />
  </>;
}
