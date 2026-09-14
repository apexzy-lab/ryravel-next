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
  text("/journeys/runyararo"),
  text("/journeys/stillness"),
  text("/journeys"),
  text("/sitemap.xml"),
  fetch(`${baseUrl}/journeys/runyararo/hwange-sunset.webp?verify=${cacheBust}`),
  fetch(`${baseUrl}/journeys/runyararo/hwange-leopard.webp?verify=${cacheBust}`),
]);

assert(tour.response.status === 200, "Runyararo route returns 200");
assert(tour.body.includes("Runyararo: Private Luxury Hwange Safari"), "Runyararo SEO title is live");
assert(tour.body.includes("https://ryravel.com/journeys/runyararo"), "Runyararo canonical URL is live");
assert(tour.body.includes("I&#x27;ve done the spa weekend"), "Supplied Runyararo narrative is live");
assert(tour.body.includes('"@type":"TouristTrip"'), "Runyararo TouristTrip schema is live");
assert(tour.body.includes('"@type":"FAQPage"'), "Runyararo FAQ schema is live");
assert(tour.body.includes("journey=runyararo"), "Runyararo enquiry context is live");
assert(collection.response.status === 200 && collection.body.includes("/journeys/runyararo"), "Stillness Collection links to Runyararo");
assert(/6(?:<!--.*?-->)*\s*journeys/.test(collection.body) && collection.body.includes('"numberOfItems":6'), "Stillness Collection reports six journeys");
assert(index.body.includes("/journeys/runyararo"), "Journey index links to Runyararo");
assert(sitemap.body.includes("/journeys/runyararo"), "Sitemap includes Runyararo");
assert(heroImage.status === 200 && heroImage.headers.get("content-type")?.startsWith("image/"), "Runyararo hero image is live");
assert(bodyImage.status === 200 && bodyImage.headers.get("content-type")?.startsWith("image/"), "Runyararo leopard image is live");
