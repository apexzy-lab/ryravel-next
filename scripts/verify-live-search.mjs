const base = "https://ryravel.com";

const tests = [
  ["robots", `${base}/robots.txt`, "Codex live verifier", ["OAI-SearchBot", "Googlebot", "Bingbot"]],
  ["key", `${base}/626d871d-6631-466f-ae78-7efafa06cb1e.txt`, "Codex live verifier", ["626d871d-6631-466f-ae78-7efafa06cb1e"]],
  ["sitemap", `${base}/sitemap.xml`, "Codex live verifier", ["<loc>"]],
  ["homepage", `${base}/`, "OAI-SearchBot", ["Bespoke travel designed"]],
  ["journeys", `${base}/journeys`, "Googlebot", ["ItemList"]],
  ["journey-ex9", `${base}/journeys/ex9`, "bingbot", ["TouristTrip"]],
  ["case-studies", `${base}/case-studies`, "OAI-SearchBot", ["Case Studies"]],
  ["private-bespoke", `${base}/private-bespoke`, "Googlebot", ["Service"]],
];

let failed = false;

for (const [name, url, userAgent, markers] of tests) {
  const response = await fetch(url, { headers: { "user-agent": userAgent } });
  const body = await response.text();
  const markerResults = markers.map((marker) => body.includes(marker));
  const sitemapCount = name === "sitemap" ? (body.match(/<loc>/g) || []).length : null;

  if (!response.ok || markerResults.includes(false)) failed = true;
  console.log(
    `${name}: status=${response.status}; markers=${markerResults.join(",")}` +
      (sitemapCount === null ? "" : `; urls=${sitemapCount}`),
  );
}

if (failed) process.exitCode = 1;
