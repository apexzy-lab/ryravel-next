const base = "https://ryravel.com";

const tests = [
  ["robots", `${base}/robots.txt`, "Codex live verifier", ["OAI-SearchBot", "Googlebot", "Bingbot"]],
  ["key", `${base}/626d871d-6631-466f-ae78-7efafa06cb1e.txt`, "Codex live verifier", ["626d871d-6631-466f-ae78-7efafa06cb1e"]],
  ["sitemap", `${base}/sitemap.xml`, "Codex live verifier", ["<loc>"]],
  ["homepage", `${base}/`, "OAI-SearchBot", ["Ryravel | Bespoke Travel Designed Around How You Feel", "Worldwide journey design"]],
  ["journeys", `${base}/journeys`, "Googlebot", ["ItemList"]],
  ["journey-ex9", `${base}/journeys/ex9`, "bingbot", ["TouristTrip"]],
  ["journey-kimbilio", `${base}/journeys/kimbilio`, "Googlebot", ["Kimbilio: Private Luxury Katavi Safari", "TouristTrip", "FAQPage", "katavi-sunset.jpg", "katavi-floodplain.jpg", "Usiku · The Night Drive", "$5,500", "When would you disappear?", "Request a private call", "What remained after the journey"]],
  ["journey-kimya", `${base}/journeys/kimya`, "OAI-SearchBot", ["Kimya: Private Luxury Rubondo Island Safari", "TouristTrip", "FAQPage", "rubondo-island.jpg", "rubondo-birds.jpg", "The Listening", "$9,950", "June through March.", "Request a private call", "What remained after the journey", "What happens next"]],
  ["stillness-collection", `${base}/journeys/stillness`, "Googlebot", ["/images/stillness-collection-forest.jpg", "has-hero-image", "Stillness"]],
  ["stillness-legacy-url", `${base}/tours/stillness`, "OAI-SearchBot", ["/images/stillness-collection-forest.jpg", "Stillness"]],
  ["case-studies", `${base}/case-studies`, "OAI-SearchBot", ["Case Studies"]],
  ["private-bespoke", `${base}/private-bespoke`, "Googlebot", ["Service"]],
  ["travel-styles", `${base}/travel-styles`, "OAI-SearchBot", ["CollectionPage", "Worldwide Luxury Travel Planning", "Luxury Family Travel", "Luxury Honeymoons", "Luxury Wellness Retreats", "Luxury Corporate Retreats"]],
  ["luxury-travel-planning", `${base}/luxury-travel-planning`, "Googlebot", ["Worldwide Luxury Travel Planner", '"@type":"Service"', '"@type":"FAQPage"', '"name":"Worldwide"', "/request?interest=Worldwide%20Luxury%20Travel%20Planning"]],
  ["luxury-family-travel", `${base}/luxury-family-travel`, "OAI-SearchBot", ["Luxury Family Travel Planner Worldwide", '"@type":"Service"', "multigenerational", "/case-studies/family-journey-egypt-morocco"]],
  ["luxury-honeymoons", `${base}/luxury-honeymoons`, "Googlebot", ["Bespoke Luxury Honeymoon Planner Worldwide", '"@type":"Service"', "Honeymoons &amp; journeys for two"]],
  ["luxury-wellness-retreats", `${base}/luxury-wellness-retreats`, "OAI-SearchBot", ["Private Luxury Wellness Retreat Planner", '"@type":"Service"', "never substitutes travel for medical care"]],
  ["luxury-corporate-retreats", `${base}/luxury-corporate-retreats`, "bingbot", ["Luxury Corporate Retreat &amp; Incentive Travel", '"@type":"Service"', "leadership teams"]],
  ["the-return", `${base}/the-return`, "Googlebot", ["/images/the-return-river.jpg", "The person who had been circling a decision for eight months.", "Every journey is designed directly by the founder."]],
];

let failed = false;
const retiredJourneySlugs = ["rn5", "rn7", "ro6", "ro8", "ro11", "adv7", "adv9", "adv11", "so6", "so8", "so11", "dc6", "dc7", "dc9", "dr6"];

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

for (const slug of retiredJourneySlugs) {
  const response = await fetch(`${base}/journeys/${slug}`, { headers: { "user-agent": "Googlebot" }, redirect: "manual" });
  if (response.status !== 404 && response.status !== 410) failed = true;
  console.log(`retired-${slug}: status=${response.status}`);
}

if (failed) process.exitCode = 1;
