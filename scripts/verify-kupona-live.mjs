const baseUrl = process.env.RYRAVEL_BASE_URL || "https://ryravel.com";
const cacheBust = Date.now();

async function text(path) {
  const separator = path.includes("?") ? "&" : "?";
  const response = await fetch(`${baseUrl}${path}${separator}verify=${cacheBust}`);
  return { response, body: await response.text() };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
  console.log(`PASS ${message}`);
}

const [tour, collection, index, sitemap, heroImage, bodyImage] = await Promise.all([
  text("/journeys/kupona"),
  text("/journeys/stillness"),
  text("/journeys"),
  text("/sitemap.xml"),
  fetch(`${baseUrl}/journeys/kupona/matetsi-river-suite.jpg?verify=${cacheBust}`),
  fetch(`${baseUrl}/journeys/kupona/zambezi-boat-aerial.jpg?verify=${cacheBust}`),
]);

assert(tour.response.status === 200, "Kupona route returns 200");
assert(tour.body.includes("Kupona: Private Luxury Victoria Falls Retreat"), "Kupona SEO title is live");
assert(tour.body.includes("https://ryravel.com/journeys/kupona"), "Kupona canonical URL is live");
assert(tour.body.includes("running a clinic that never technically closes"), "Supplied Kupona narrative is live");
assert(tour.body.includes('"@type":"TouristTrip"'), "Kupona TouristTrip schema is live");
assert(tour.body.includes('"@type":"FAQPage"'), "Kupona FAQ schema is live");
assert(tour.body.includes("journey=kupona"), "Kupona enquiry context is live");
assert(collection.response.status === 200 && collection.body.includes("/journeys/kupona"), "Stillness Collection links to Kupona");
assert(/5(?:<!--.*?-->)*\s*journeys/.test(collection.body) && collection.body.includes('"numberOfItems":5'), "Stillness Collection reports five journeys");
assert(index.body.includes("/journeys/kupona"), "Journey index links to Kupona");
assert(sitemap.body.includes("/journeys/kupona"), "Sitemap includes Kupona");
assert(heroImage.status === 200 && heroImage.headers.get("content-type")?.startsWith("image/"), "Kupona hero image is live");
assert(bodyImage.status === 200 && bodyImage.headers.get("content-type")?.startsWith("image/"), "Kupona river image is live");
