export const SITE_URL = "https://ryravel.com";
export const SITE_NAME = "Ryravel";
export const DEFAULT_DESCRIPTION = "Bespoke luxury travel in Tanzania and Zanzibar, designed around how you want to feel and who you want to be when you return.";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function buildMetadata({ title, description = DEFAULT_DESCRIPTION, path = "/", image, type = "website", robots } = {}) {
  const canonical = absoluteUrl(path);
  const images = image ? [{ url: absoluteUrl(image), alt: title || SITE_NAME }] : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    robots: robots || { index: true, follow: true },
    openGraph: {
      title: title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} — Bespoke travel designed around how you feel`,
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
  areaServed: ["Tanzania", "Zanzibar", "Serengeti", "Ngorongoro"],
  sameAs: ["https://www.linkedin.com/company/ryravel"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
};
