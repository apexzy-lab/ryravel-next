import { arcs, journeys } from "./data";
import { absoluteUrl } from "./seo";
import { caseStudies } from "./case-studies/caseStudies";

const staticRoutes = [
  "/", "/journeys", "/destinations/tanzania", "/destinations/zanzibar",
  "/about", "/official-instagram", "/the-return", "/case-studies",
  "/private-bespoke", "/gifting", "/sustainability", "/reviews",
  "/request", "/policies", "/terms", "/cancellations",
  "/travel-information", "/privacy", "/cookies", "/travel-styles",
  "/transformational-travel", "/luxury-travel-planning",
  "/luxury-family-travel", "/luxury-honeymoons",
  "/luxury-wellness-retreats", "/luxury-corporate-retreats",
];

export default function sitemap() {
  return [
    ...staticRoutes.map((path) => ({ url: absoluteUrl(path) })),
    ...arcs.filter((arc) => journeys.some((journey) => journey.arc === arc.id)).map((arc) => ({ url: absoluteUrl(`/journeys/${arc.id}`) })),
    ...journeys.map((journey) => ({
      url: absoluteUrl(`/journeys/${journey.slug}`),
      ...(journey.images?.length || journey.image ? { images: (journey.images?.length ? journey.images : [journey.image]).map(absoluteUrl) } : {}),
    })),
    ...caseStudies.map((study) => ({
      url: absoluteUrl(`/case-studies/${study.slug}`),
      ...(study.image ? { images: [absoluteUrl(study.image)] } : {}),
    })),
  ];
}
