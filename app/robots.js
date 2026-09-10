import { SITE_URL } from "./seo";

export default function robots() {
  const privatePaths = ["/api/", "/curator-desk"];
  return {
    rules: [
      { userAgent: "OAI-SearchBot", allow: "/", disallow: privatePaths },
      { userAgent: "Googlebot", allow: "/", disallow: privatePaths },
      { userAgent: "Bingbot", allow: "/", disallow: privatePaths },
      { userAgent: "*", allow: "/", disallow: privatePaths },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
