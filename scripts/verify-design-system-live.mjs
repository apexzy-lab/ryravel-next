const baseUrl = process.env.RYRAVEL_BASE_URL || "https://ryravel.com";
const cacheBust = Date.now();

function assert(condition, message) {
  if (!condition) throw new Error(message);
  console.log(`PASS ${message}`);
}

async function get(path) {
  const separator = path.includes("?") ? "&" : "?";
  const response = await fetch(`${baseUrl}${path}${separator}design=${cacheBust}`);
  return { response, body: await response.text() };
}

function stylesheetPaths(html) {
  return [...html.matchAll(/<link[^>]+href="([^"]+\.css(?:\?[^"]*)?)"[^>]*>/g)].map((match) => match[1]);
}

const [home, legacyJourney, currentJourney] = await Promise.all([
  get("/"),
  get("/journeys/ex6"),
  get("/journeys/kupona"),
]);
const newJourneySlugs = ["kimbilio", "kimya", "kupona", "runyararo", "utalala"];
const newJourneyPages = await Promise.all(newJourneySlugs.map((slug) => get(`/journeys/${slug}`)));

assert(home.response.status === 200, "homepage returns 200");
assert(legacyJourney.response.status === 200, "legacy journey returns 200");
assert(currentJourney.response.status === 200, "current journey returns 200");
assert(home.body.includes('id="stillness-heading"') && home.body.includes(">Stillness<"), "homepage shows the restrained Stillness title");
assert(home.body.includes("Explore the Stillness Collection"), "homepage retains the Stillness collection action");
assert(!home.body.includes("You did not come here to see more."), "homepage removes the previous Stillness sales copy");

const cssPaths = [...new Set([
  ...stylesheetPaths(home.body),
  ...stylesheetPaths(legacyJourney.body),
  ...stylesheetPaths(currentJourney.body),
])];
const cssBodies = await Promise.all(cssPaths.map(async (path) => (await get(path)).body));
const css = cssBodies.join("\n");

assert(css.includes("Playfair Display") && css.includes("Inter"), "shared Playfair Display and Inter type system is live");
assert(css.includes("--font-serif") && css.includes("--font-sans"), "shared typography tokens are live");
assert(css.includes("stillness-word"), "redesigned Stillness composition is live");
assert(!/font-family\s*:\s*(?:Georgia|Arial|Outfit)/i.test(css), "page styles do not bypass the shared typography system");
assert(legacyJourney.body.includes("restoration-page"), "legacy journey uses the normalized journey shell");
assert(currentJourney.body.includes("Kupona"), "current journey content remains available");
newJourneyPages.forEach(({ response, body }, index) => {
  const slug = newJourneySlugs[index];
  const visibleHtml = body.replace(/<script[\s\S]*?<\/script>/gi, "");
  assert(response.status === 200, `${slug} returns 200`);
  assert((visibleHtml.match(/Explore journey/g) || []).length === 3, `${slug} shows exactly three related journeys`);
  assert(body.includes("Explore the complete Stillness Collection"), `${slug} links to the complete Stillness Collection`);
});
