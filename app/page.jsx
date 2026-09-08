import HomepageExperience from "./components/HomepageExperience";
import { buildMetadata } from "./seo";

export const metadata = buildMetadata({
  title: "Bespoke Luxury Travel Designed Around How You Feel",
  description: "Private, bespoke journeys across Tanzania and Zanzibar, designed around how you want to feel and who you want to be when you return.",
  path: "/",
});

export default function Home() {
  return <HomepageExperience />;
}
