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

const [tour, collection, index, sitemap, owl, hippos, dew] = await Promise.all([
  text("/journeys/utalala"),
  text("/journeys/stillness"),
  text("/journeys"),
  text("/sitemap.xml"),
  fetch(`${baseUrl}/journeys/utalala/south-luangwa-scops-owl.webp?verify=${cacheBust}`),
  fetch(`${baseUrl}/journeys/utalala/south-luangwa-hippos.jpg?verify=${cacheBust}`),
  fetch(`${baseUrl}/journeys/utalala/south-luangwa-dew.webp?verify=${cacheBust}`),
]);

assert(tour.response.status === 200, "Utalala route returns 200");
assert(tour.body.includes("Utalala: Private Luxury South Luangwa Walking Safari"), "Utalala SEO title is live");
assert(tour.body.includes("https://ryravel.com/journeys/utalala"), "Utalala canonical URL is live");
assert(tour.body.includes("watch that tells me my sleep score"), "Supplied Utalala narrative is live");
assert(tour.body.includes('"@type":"TouristTrip"'), "Utalala TouristTrip schema is live");
assert(tour.body.includes('"@type":"FAQPage"'), "Utalala FAQ schema is live");
assert(tour.body.includes("journey=utalala"), "Utalala enquiry context is live");
assert(collection.response.status === 200 && collection.body.includes("/journeys/utalala"), "Stillness Collection links to Utalala");
assert(/7(?:<!--.*?-->)*\s*journeys/.test(collection.body) && collection.body.includes('"numberOfItems":7'), "Stillness Collection reports seven journeys");
assert(index.body.includes("/journeys/utalala"), "Journey index links to Utalala");
assert(sitemap.body.includes("/journeys/utalala"), "Sitemap includes Utalala");
for (const [response, label] of [[owl, "owl"], [hippos, "hippo"], [dew, "dew"]]) assert(response.status === 200 && response.headers.get("content-type")?.startsWith("image/"), `Utalala ${label} image is live`);
