import { passageArticles } from "../app/passage/articles.js";

const origin = "https://ryravel.com";
const failures = [];
const check = (condition, message) => {
  console.log(`${condition ? "PASS" : "FAIL"} ${message}`);
  if (!condition) failures.push(message);
};

const [sitemapResponse, guideResponse, robotsResponse] = await Promise.all([
  fetch(`${origin}/sitemap.xml`),
  fetch(`${origin}/llms.txt`),
  fetch(`${origin}/robots.txt`),
]);
const [sitemap, guide, robots] = await Promise.all([
  sitemapResponse.text(),
  guideResponse.text(),
  robotsResponse.text(),
]);
check(sitemapResponse.ok && guideResponse.ok && robotsResponse.ok, "Discovery resources respond successfully");
check(robots.includes("OAI-SearchBot") && robots.includes(`${origin}/sitemap.xml`), "Search crawler and sitemap are discoverable");

for (const article of passageArticles) {
  const url = `${origin}${article.path}`;
  const response = await fetch(url);
  const html = await response.text();
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => { try { return JSON.parse(match[1]); } catch { return null; } })
    .filter(Boolean);
  const articleNode = jsonLd.flatMap((item) => item["@graph"] || [item]).find((node) => node["@type"] === "Article" && node.url === url);
  const breadcrumbs = jsonLd.flatMap((item) => item["@graph"] || [item]).find((node) => node["@type"] === "BreadcrumbList" && node["@id"] === `${url}#breadcrumb`);

  check(response.ok && !response.headers.get("x-robots-tag")?.includes("noindex"), `${article.path} serves indexable HTML`);
  check(html.includes(`<link rel="canonical" href="${url}"`) && html.includes(article.title), `${article.path} has matching canonical and title`);
  check(articleNode?.headline === article.title && articleNode?.author?.["@id"] === `${origin}/about#maryangel` && articleNode?.dateModified === article.modified && breadcrumbs?.itemListElement?.length === 3, `${article.path} has connected Article and breadcrumb data`);
  check(sitemap.includes(`<loc>${url}</loc>`) && guide.includes(url), `${article.path} appears in sitemap and reading guide`);
}

if (failures.length) process.exitCode = 1;
