import { arcs, journeys } from "./data";
import { absoluteUrl } from "./seo";
import { caseStudies } from "./case-studies/caseStudies";

const lastModified = new Date("2026-09-13T00:00:00.000Z");

const staticRoutes = [
  ["/", "weekly", 1],
  ["/journeys", "weekly", 0.95],
  ["/destinations/tanzania", "monthly", 0.9],
  ["/destinations/zanzibar", "monthly", 0.9],
  ["/about", "monthly", 0.8],
  ["/the-return", "monthly", 0.8],
  ["/case-studies", "monthly", 0.8],
  ["/private-bespoke", "monthly", 0.75],
  ["/gifting", "monthly", 0.7],
  ["/sustainability", "monthly", 0.65],
  ["/reviews", "monthly", 0.65],
  ["/request", "monthly", 0.85],
];

export default function sitemap() {
  const publicJourneys = [
    ...arcs.map((arc) => `/journeys/${arc.id}`),
    ...journeys.map((journey) => `/journeys/${journey.slug}`),
  ];
  const publicCaseStudies = caseStudies.map((study) => `/case-studies/${study.slug}`);

  return [
    ...staticRoutes.map(([path, changeFrequency, priority]) => ({ url: absoluteUrl(path), lastModified, changeFrequency, priority })),
    ...publicJourneys.map((path) => ({ url: absoluteUrl(path), lastModified, changeFrequency: "monthly", priority: 0.75 })),
    ...publicCaseStudies.map((path) => ({ url: absoluteUrl(path), lastModified, changeFrequency: "monthly", priority: 0.8 })),
  ];
}
