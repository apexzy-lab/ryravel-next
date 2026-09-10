import { notFound } from "next/navigation";
import { absoluteUrl, buildMetadata } from "../../seo";
import CaseStudyArticle from "../CaseStudyArticle";
import { caseStudies, caseStudyFor } from "../caseStudies";

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = caseStudyFor(slug);
  if (!study) return {};
  return buildMetadata({ title: study.seoTitle, description: study.description, path: `/case-studies/${study.slug}`, image: study.image, type: "article" });
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const study = caseStudyFor(slug);
  if (!study) notFound();
  const canonical = absoluteUrl(`/case-studies/${study.slug}`);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: study.headline,
    description: study.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    articleSection: "Luxury travel case studies",
    keywords: [study.arc, study.destination, "bespoke luxury travel", "private journey", "Ryravel"],
    ...(study.image ? { image: absoluteUrl(study.image) } : {}),
    author: { "@id": "https://ryravel.com/#organization" },
    publisher: { "@id": "https://ryravel.com/#organization" },
    isPartOf: { "@type": "CollectionPage", "@id": "https://ryravel.com/case-studies#collection" },
    about: study.destination.split(" and ").map((name) => ({ "@type": "TouristDestination", name })),
    inLanguage: "en",
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ryravel", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Case studies", item: absoluteUrl("/case-studies") },
      { "@type": "ListItem", position: 3, name: study.headline, item: canonical },
    ],
  };
  return <CaseStudyArticle study={study} articleJsonLd={articleJsonLd} breadcrumbJsonLd={breadcrumbJsonLd} />;
}
