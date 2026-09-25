export const SITE_URL = "https://ryravel.com";
export const SITE_NAME = "Ryravel";
export const DEFAULT_DESCRIPTION = "Ryravel designs private, bespoke luxury journeys worldwide around how you want to feel—from restorative retreats and safaris to islands and cultural journeys.";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function buildMetadata({ title, description = DEFAULT_DESCRIPTION, path = "/", image, type = "website", robots, absoluteTitle = false, keywords } = {}) {
  const canonical = absoluteUrl(path);
  const images = image ? [{ url: absoluteUrl(image), alt: title || SITE_NAME }] : undefined;

  return {
    title: absoluteTitle && title ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical },
    robots: robots || { index: true, follow: true },
    openGraph: {
      title: title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} | Bespoke Travel Designed Around How You Feel`,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: title ? `${title} · ${SITE_NAME}` : SITE_NAME,
      description,
      ...(image ? { images: [absoluteUrl(image)] } : {}),
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/brand/ryravel-lockup-red.png`,
  telephone: "+1-760-514-0361",
  email: "curator@ryravel.com",
  description: DEFAULT_DESCRIPTION,
  areaServed: ["Worldwide", "Africa", "Europe", "Asia", "Middle East", "Indian Ocean", "North America", "South America", "Oceania"],
  knowsAbout: ["Bespoke luxury travel", "Worldwide private journeys", "Emotion-led travel design", "Luxury retreats", "Private safaris", "Island escapes", "Cultural journeys", "Celebration travel", "Family travel", "Private group travel"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-760-514-0361",
    email: "curator@ryravel.com",
    contactType: "travel planning",
    availableLanguage: "English",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Ryravel private journey collections",
    itemListElement: [
      ["Bespoke private travel", "/private-bespoke"],
      ["Worldwide emotion-led journeys", "/journeys"],
      ["Worldwide luxury travel planning", "/luxury-travel-planning"],
      ["Luxury family travel", "/luxury-family-travel"],
      ["Bespoke luxury honeymoons", "/luxury-honeymoons"],
      ["Private luxury wellness retreats", "/luxury-wellness-retreats"],
      ["Luxury corporate retreats", "/luxury-corporate-retreats"],
      ["Private Tanzania safaris", "/destinations/tanzania"],
      ["Luxury Zanzibar journeys", "/destinations/zanzibar"],
    ].map(([name, path]) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, url: absoluteUrl(path) } })),
  },
  sameAs: ["https://www.linkedin.com/company/ryravel", "https://www.instagram.com/journeybyry/"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  alternateName: "Ryravel Travel",
  description: DEFAULT_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
};
