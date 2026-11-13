import { absoluteUrl, SITE_URL } from "../seo.js";
import { passageArticles } from "./articles.js";

export function buildPassageCollectionSchema() {
  // The featured first essay appears above the newest-to-oldest article grid.
  const displayOrder = [passageArticles[0], ...passageArticles.slice(1).reverse()];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/passage#publication`,
        url: `${SITE_URL}/passage`,
        name: "Passage, a Ryravel publication",
        description: "Essays on emotion-led travel, rest, burnout and the changes people carry home.",
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntity: { "@id": `${SITE_URL}/passage#articles` },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/passage#articles`,
        itemListElement: displayOrder.map((article, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: article.title,
          url: absoluteUrl(article.path),
        })),
      },
    ],
  };
}

// Keep the article's existing, page-specific facts; connect them to the
// publication and the real author instead of inventing extra credentials.
export function buildPassageSchema(article) {
  const { "@context": _context, ...details } = article;
  const url = details.mainEntityOfPage;
  const breadcrumbId = `${url}#breadcrumb`;
  const imageUrl = details.image;
  const inventoryEntry = passageArticles.find((entry) => absoluteUrl(entry.path) === url);
  const restorationEssay = inventoryEntry && passageArticles.indexOf(inventoryEntry) >= 3;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: details.headline,
        description: details.description,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": breadcrumbId },
        mainEntity: { "@id": `${url}#article` },
        primaryImageOfPage: { "@id": `${url}#primary-image` },
      },
      {
        ...details,
        "@id": `${url}#article`,
        url,
        image: { "@id": `${url}#primary-image` },
        inLanguage: "en",
        isAccessibleForFree: true,
        ...(restorationEssay ? { articleSection: "The Restoration" } : {}),
        isPartOf: { "@id": `${SITE_URL}/passage#publication` },
        mainEntityOfPage: { "@id": url },
        author: {
          "@type": "Person",
          "@id": `${SITE_URL}/about#maryangel`,
          name: "Maryangel Ajuzieogu",
          url: `${SITE_URL}/about`,
        },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "ImageObject",
        "@id": `${url}#primary-image`,
        url: imageUrl,
        contentUrl: imageUrl,
      },
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/passage#publication`,
        url: `${SITE_URL}/passage`,
        name: "Passage, a Ryravel publication",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Ryravel", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Passage", item: absoluteUrl("/passage") },
          { "@type": "ListItem", position: 3, name: details.headline, item: url },
        ],
      },
    ],
  };
}
