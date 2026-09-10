import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import legacyRedirects from "../legacy-redirects/worker.js";
import { caseStudies } from "../app/case-studies/caseStudies.js";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const assertions = [];
const check = (condition, message) => assertions.push({ condition, message });

check(!existsSync(join(root, "app", "journal")), "Journal route directory is removed");
check(!existsSync(join(root, "public", "journal")), "Journal asset directory is removed");

for (const file of ["app/components/SiteChrome.jsx", "app/data.js", "app/sitemap.js"]) {
  check(!read(file).includes("/journal"), `${file} contains no Journal route links`);
}

check(existsSync(join(root, "app", "robots.js")), "robots.txt route exists");
check(existsSync(join(root, "app", "sitemap.js")), "sitemap.xml route exists");
check(read("app/robots.js").includes("/curator-desk"), "Curator workspace is excluded from crawling");
check(read("app/robots.js").includes('userAgent: "OAI-SearchBot"'), "OpenAI search crawler is explicitly allowed");
check(read("app/robots.js").includes('userAgent: "Bingbot"'), "Bing and Copilot crawler is explicitly allowed");
check(read("app/layout.jsx").includes("organizationJsonLd"), "Organization structured data is present");
check(read("app/layout.jsx").includes("metadataBase"), "Absolute metadata base is configured");
check(read("app/page.jsx").includes("websiteJsonLd"), "WebSite structured data is present on the homepage");
check(read("app/seo.js").includes('alternateName: "Ryravel Travel"'), "WebSite structured data supplies a stable alternate name");
check(read("app/page.jsx").includes('absoluteTitle: true'), "Homepage title begins with the Ryravel brand exactly");
check(read("app/request/layout.jsx").includes('path: "/request"'), "Request page has canonical metadata");
check(read("app/journeys/[slug]/page.jsx").includes("permanentRedirect"), "Legacy journey aliases use permanent redirects");
check(read("app/tours/stillness/page.jsx").includes("permanentRedirect"), "Legacy Stillness collection URL uses a permanent redirect");
check(caseStudies.length === 7, "All seven case studies are in the collection");
check(new Set(caseStudies.map(({ slug }) => slug)).size === caseStudies.length, "Every case study has a unique URL slug");
check(caseStudies.every((study) => study.sections.length === 4 && study.quote && study.description), "Every case study has a complete narrative, testimonial and SEO description");
check(!read("app/case-studies/caseStudies.js").includes("You may not need a better vacation."), "Removed Amara sentence is absent");
check(read("app/case-studies/[slug]/page.jsx").includes('"@type": "Article"'), "Case study pages publish Article structured data");
check(read("app/case-studies/[slug]/page.jsx").includes('"@type": "BreadcrumbList"'), "Case study pages publish breadcrumb structured data");
check(read("app/case-studies/page.jsx").includes('"@type": "ItemList"'), "Case study index publishes the complete ItemList");
check(read("app/journeys/page.jsx").includes('"@type": "ItemList"'), "Journey index publishes a machine-readable ItemList");
check(read("app/journeys/[slug]/page.jsx").includes('"@type": "TouristTrip"'), "Journey pages publish TouristTrip structured data");
check(read("app/private-bespoke/page.jsx").includes('"@type": "Service"'), "Private travel page publishes Service structured data");
check(existsSync(join(root, "public", "626d871d-6631-466f-ae78-7efafa06cb1e.txt")), "IndexNow ownership key is publicly deployable");
check(existsSync(join(root, "app", "destinations", "tanzania", "page.jsx")), "Tanzania destination landing page exists");
check(existsSync(join(root, "app", "destinations", "zanzibar", "page.jsx")), "Zanzibar destination landing page exists");
check(read("app/sitemap.js").includes("/destinations/tanzania") && read("app/sitemap.js").includes("/destinations/zanzibar"), "Destination landing pages are in the sitemap");
check(!read("app/data.js").includes('slug: "ex11"'), "Duplicate eleven-night journey record is removed");
for (const legacyPath of ["/contact", "/contact-us", "/forms", "/services", "/about-us"]) {
  check(read("next.config.mjs").includes(`source: "${legacyPath}"`), `Legacy root URL ${legacyPath} has a permanent redirect`);
}
for (const brokenPath of ["/journeys/st7", "/journeys/di6", "/journeys/pu5", "/journeys/pu7"]) {
  check(!read("app/components/HomepageExperience.jsx").includes(brokenPath), `Homepage no longer links to missing ${brokenPath}`);
}

const legacyLuxury = await legacyRedirects.fetch(new Request("https://blog.ryravel.com/zanzibar-luxury-resorts-2026-new-hotel-openings-private-island-retreats/"));
check(legacyLuxury.status === 301 && legacyLuxury.headers.get("location") === "https://ryravel.com/destinations/zanzibar", "Relevant retired blog authority redirects to Zanzibar");
const legacyIrrelevant = await legacyRedirects.fetch(new Request("https://blog.ryravel.com/how-to-apply-for-a-netherlands-tourist-visa/"));
check(legacyIrrelevant.status === 410 && legacyIrrelevant.headers.get("x-robots-tag")?.includes("noindex"), "Irrelevant retired blog content returns 410 and noindex");

const failures = assertions.filter(({ condition }) => !condition);
for (const { condition, message } of assertions) console.log(`${condition ? "PASS" : "FAIL"} ${message}`);
if (failures.length) process.exit(1);
