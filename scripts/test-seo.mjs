import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import legacyRedirects from "../legacy-redirects/worker.js";
import { caseStudies } from "../app/case-studies/caseStudies.js";
import { arcs, journeys } from "../app/data.js";
import { commercialServiceOrder, commercialServices } from "../app/commercialServices.js";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const assertions = [];
const check = (condition, message) => assertions.push({ condition, message });
const requestPage = read("app/request/page.jsx");
const retiredJourneySlugs = ["rn5", "rn7", "ro6", "ro8", "ro11", "adv7", "adv9", "adv11", "so6", "so8", "so11", "dc6", "dc7", "dc9", "dr6"];

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
check(read("app/page.jsx").includes("Ryravel | Bespoke Travel Designed Around How You Feel"), "Homepage title uses the broad feeling-led Ryravel positioning");
check(read("app/seo.js").includes("bespoke luxury journeys worldwide") && read("app/seo.js").includes('areaServed: ["Worldwide"'), "Global metadata and organization schema position Ryravel as worldwide");
check(retiredJourneySlugs.every((slug) => !journeys.some((journey) => journey.slug === slug)), "All requested journey records are removed from the catalogue");
check(retiredJourneySlugs.every((slug) => !read("app/components/HomepageExperience.jsx").includes(`/journeys/${slug}`)), "Homepage contains no links to retired journeys");
check(read("app/journeys/page.jsx").includes('journey.arc !== "stillness"') && read("app/sitemap.js").includes("journeys.some"), "Journey catalogue excludes Stillness tours while collection routes remain discoverable");
check(read("app/journeys/JourneysExperience.jsx").includes('status: "Launched"') && read("app/journeys/JourneysExperience.jsx").includes('status: "Waitlist"'), "Journey experience distinguishes launched and waitlist arcs");
check(read("app/journeys/JourneysExperience.jsx").includes("<FeelingQuiz />") && read("app/components/HomepageExperience.jsx").includes("export function FeelingQuiz()"), "Journey page reuses the homepage feeling quiz");
check(read("app/journeys/[slug]/KimbilioJourney.module.css").includes("clamp(27px,3.1vw,44px)"), "Shared trip closing quote scale is aligned with the site typography");
check(!read("app/journeys/[slug]/page.jsx").includes('"saharan-stars": "ro6"') && !read("app/journeys/[slug]/page.jsx").includes('"patagonia-edge": "adv9"') && !read("app/journeys/[slug]/page.jsx").includes('"amalfi-slow": "ro8"'), "Legacy aliases no longer redirect to retired journeys");
check(commercialServiceOrder.length === 5 && commercialServiceOrder.every((slug) => Boolean(commercialServices[slug])), "Worldwide commercial travel service catalogue is complete");
for (const slug of commercialServiceOrder) {
  const pagePath = `app/${slug}/page.jsx`;
  check(existsSync(join(root, pagePath)), `${slug} commercial landing page exists`);
  check(read("app/sitemap.js").includes(`/${slug}`), `${slug} is discoverable through the sitemap`);
  check(read("app/components/SiteChrome.jsx").includes(`/${slug}`), `${slug} is internally linked from the site footer`);
}
const commercialPage = read("app/components/CommercialServicePage.jsx");
check(commercialPage.includes('"@type": "Service"') && commercialPage.includes('"@type": "FAQPage"') && commercialPage.includes('"@type": "BreadcrumbList"'), "Commercial pages publish Service, FAQ and breadcrumb structured data");
check(commercialPage.includes("areaServed") && commercialPage.includes('name: "Worldwide"'), "Commercial service schema declares worldwide coverage");
check(commercialPage.includes("/request?interest=") && requestPage.includes('params.get("interest")'), "Commercial intent is preserved into the progressive request form");
check(existsSync(join(root, "app", "travel-styles", "page.jsx")) && read("app/travel-styles/page.jsx").includes('"@type": "CollectionPage"') && read("app/travel-styles/page.jsx").includes('"@type": "ItemList"'), "Travel styles hub publishes a crawlable commercial collection");
check(read("app/components/HomepageExperience.jsx").includes('className="home-travel-styles"') && read("app/components/HomepageExperience.jsx").includes("Worldwide journey design"), "Homepage links into the worldwide commercial search architecture");
check(read("app/request/layout.jsx").includes('path: "/request"'), "Request page has canonical metadata");
check(requestPage.includes('["US / Canada", "+1"]') && requestPage.includes('["United Kingdom", "+44"]') && requestPage.includes('["Australia", "+61"]') && requestPage.includes('["Singapore", "+65"]'), "Request page supports an international client base");
check(read("app/journeys/page.jsx").includes("Bespoke Luxury Journeys Worldwide") && !read("app/journeys/page.jsx").includes("Tanzania collection"), "Journey index presents the current collection without defining Ryravel by one country");
check(read("app/private-bespoke/page.jsx").includes('name: "Worldwide"') && read("app/private-bespoke/page.jsx").includes("anywhere in the world"), "Private bespoke service explicitly serves worldwide journeys");
check(!requestPage.includes('defaultValue="+234"'), "Request page does not assume a Nigerian calling code");
check(requestPage.includes("progressive-summary") && requestPage.includes("journeyContext") && requestPage.includes("preferredCallTime"), "Request page preserves journey and private-call context");
check(requestPage.includes("What happens next") && requestPage.includes("journey direction and proposal"), "Request page explains the post-enquiry process");
check(requestPage.includes('const [step, setStep]') && requestPage.includes("Step 1 of 3") && requestPage.includes("Step 2 of 3") && requestPage.includes("Final step"), "Request page is a real three-stage progressive form");
check(!requestPage.includes("email-confirmation") && !requestPage.includes("Confirm email address"), "Progressive request form removes the duplicate email field");
check(requestPage.includes("if (step !== 3) return undefined") && requestPage.includes("turnstileMount"), "Turnstile initializes only on the final request stage");
check(requestPage.includes("Ryravel curator team") && !requestPage.includes("Maryangel"), "Request reassurance represents the professional curator team");
const globalCss = read("app/globals.css");
check(globalCss.includes("body:has(.request-page:not(.request-page-complete)) { height: 100%; overflow: hidden; }") && globalCss.includes(".request-page:not(.request-page-complete) { height: calc(100dvh - 64px); overflow: hidden; }"), "Desktop request flow is locked to one viewport without page scrolling");
check(requestPage.includes('request-page-complete') && globalCss.includes(".request-page-complete { min-height: calc(100dvh - 64px); overflow: visible; }"), "Completed enquiry screen is never clipped by the fixed form viewport");
check(globalCss.includes("html:has(.request-page) .site-footer { display: none; }"), "Focused request flow removes the below-fold site footer");
check(globalCss.includes(".progressive-request { grid-template-columns: minmax(0,1fr)") && globalCss.includes(".progressive-workspace > * { min-width: 0; width: 100%; }") && globalCss.includes("grid-template-columns: minmax(0,1fr) clamp(250px,22vw,320px)"), "Every progressive stage uses one invariant form and summary grid");
check(read("app/api/enquiries/route.js").includes("RESEND_API_KEY") && read("app/api/enquiries/route.js").includes("queueGuestConfirmation"), "Branded guest confirmation email is integrated without blocking submission");
check(!read("app/api/enquiries/route.js").includes("emailConfirmation") && read("app/api/enquiries/route.js").includes("Enter a valid email address."), "Enquiry API validates one email address without duplicate confirmation");
check(read("app/api/enquiries/route.js").includes("curator@updates.ryravel.com"), "Confirmation email sends from the Resend-verified Ryravel subdomain");
check(existsSync(join(root, "app", "components", "JourneyProof.jsx")), "Journey-specific case study proof component exists");
check(read("app/journeys/[slug]/page.jsx").includes("requestHrefFor") && read("app/journeys/[slug]/page.jsx").includes("<JourneyProof"), "Journey pages carry context into enquiries and surface case-study proof");
check(read("app/components/HomepageExperience.jsx").includes("/images/stillness-collection-forest.jpg"), "Homepage Stillness feature uses the supplied collection image");
check(existsSync(join(root, "public", "images", "the-return-river.jpg")), "The Return hero image is deployable");
check(existsSync(join(root, "public", "images", "stillness-collection-forest.jpg")), "Stillness Collection hero image is deployable");
check(read("app/journeys/[slug]/page.jsx").includes("/images/stillness-collection-forest.jpg"), "Stillness Collection uses the supplied forest image");
const returnPage = read("app/the-return/page.jsx");
for (const passage of [
  "The Return is not a feeling you get on the trip.",
  "You know the version of yourself that exists at the end of the second day.",
  "Most trips are designed around what you will see.",
  "Stillness is not",
  "What landscape does, when it is vast enough",
  "The person who came back and slept.",
  "The person who had been circling a decision for eight months.",
  "The couple who came back having chosen each other again.",
  "The person who came back smaller",
  "That is the only promise we make.",
  "Every journey is designed directly by the founder.",
]) check(returnPage.includes(passage), `The Return retains supplied copy: ${passage}`);
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
const reset = journeys.find((journey) => journey.slug === "the-reset");
const exhausted = arcs.find((arc) => arc.id === "exhausted");
check(Boolean(reset) && reset.arc === "exhausted" && reset.nights === 5 && reset.days === 6, "The Reset is a first-class five-night Exhausted journey");
check(exhausted?.intro.startsWith("Four restorative journeys"), "Exhausted Collection introduction matches its four journeys");
check(existsSync(join(root, "public", "journeys", "the-reset", "zanzibar-beach.jpg")) && existsSync(join(root, "public", "journeys", "the-reset", "wellness-treatment.jpg")), "Both supplied Reset images are deployable");
const resetPage = read("app/journeys/[slug]/ResetJourney.jsx");
for (const passage of ["I have never once shown up late", "You Are Here Now", "The Body Remembers", "The Island as Teacher", "Sand, Sky, Nothing Else", "The Morning You Didn't Expect", "Late Checkout. The Return Begins.", "Night 5 · Day 6 departure", "Nobody is grading how well you rest", "I have spent my life trying to be the best student"]) check(resetPage.includes(passage), `The Reset retains supplied copy and accurate duration: ${passage}`);
check(reset.faqs.length >= 4 && reset.availableMonths.length === 12 && resetPage.includes("JourneyAvailability") && resetPage.includes("JourneyProofSection") && resetPage.includes("ExhaustedAlternatives") && resetPage.includes("Request a private call"), "The Reset has season, availability, proof, FAQ and related-journey parity");
check(read("app/journeys/[slug]/page.jsx").includes('slug === "the-reset" ? <ResetJourney journey={journey} />'), "The Reset resolves to its complete journey page");
const kimbilio = journeys.find((journey) => journey.slug === "kimbilio");
const stillness = arcs.find((arc) => arc.id === "stillness");
check(Boolean(kimbilio) && kimbilio.arc === "stillness" && kimbilio.nights === 4, "Kimbilio is a first-class Stillness Collection journey");
check(stillness?.intro.startsWith("Ten wilderness journeys"), "Stillness Collection introduction matches its ten journeys");
const calvingSeason = journeys.find((journey) => journey.slug === "calving-season");
check(Boolean(calvingSeason) && calvingSeason.arc === "stillness" && calvingSeason.nights === 6 && calvingSeason.days === 7, "Calving Season is a first-class six-night Stillness journey");
check(existsSync(join(root, "public", "journeys", "calving-season", "southern-serengeti-aerial.webp")) && existsSync(join(root, "public", "journeys", "calving-season", "camp-hospitality.webp")), "Both supplied Calving Season images are deployable");
const calvingPage = read("app/journeys/[slug]/CalvingSeasonJourney.jsx");
for (const passage of ["The World Falls Away", "The Plains in Full Life", "Ndutu, the Heart of the Calving", "The Hunt and the Birth", "The Morning You Don't Expect", "A woman with a camera", "The Crater", "Last Morning. The Return.", "I've spent years making everything lighter"]) check(calvingPage.includes(passage), `Calving Season retains supplied copy: ${passage}`);
check(calvingSeason.faqs.length >= 4 && calvingPage.includes("JourneyAvailability") && calvingPage.includes("JourneyProofSection") && calvingPage.includes("StillnessAlternatives") && calvingPage.includes("Request a private call"), "Calving Season has current journey planning, proof, FAQ and related-journey parity");
const calvingIsolation = journeys.find((journey) => journey.slug === "calving-isolation");
check(Boolean(calvingIsolation) && calvingIsolation.arc === "stillness" && calvingIsolation.nights === 7 && calvingIsolation.days === 8, "Calving Maximum Isolation is a first-class seven-night Stillness journey");
check(existsSync(join(root, "public", "journeys", "calving-isolation", "safari-drive-at-sunset.webp")) && existsSync(join(root, "public", "journeys", "calving-isolation", "guided-nature-walk.webp")), "Both supplied Calving Maximum Isolation images are deployable");
const calvingIsolationPage = read("app/journeys/[slug]/CalvingIsolationJourney.jsx");
for (const passage of ["I plan. That's the honest version", "Land &amp; Strip Back", "The Full Ecosystem", "The Fly Camp", "On Foot in the Calving Plains", "The Morning After", "Chosen Day", "Close &amp; Carry", "Last Morning. The Return.", "Standing in the middle of the herd"]) check(calvingIsolationPage.includes(passage), `Calving Maximum Isolation retains supplied copy: ${passage}`);
check(calvingIsolation.faqs.length >= 4 && calvingIsolationPage.includes("JourneyAvailability") && calvingIsolationPage.includes("JourneyProofSection") && calvingIsolationPage.includes("StillnessAlternatives") && calvingIsolationPage.includes("Request a private call"), "Calving Maximum Isolation has season, availability, proof, FAQ and related-journey parity");
const fullCalvingArc = journeys.find((journey) => journey.slug === "full-calving-arc");
check(Boolean(fullCalvingArc) && fullCalvingArc.arc === "stillness" && fullCalvingArc.nights === 9 && fullCalvingArc.days === 10, "The Full Calving Arc is a first-class nine-night Stillness journey");
check(existsSync(join(root, "public", "journeys", "full-calving-arc", "camp-fire-on-plains.webp")) && existsSync(join(root, "public", "journeys", "full-calving-arc", "guided-plains-walk.webp")), "Both supplied Full Calving Arc images are deployable");
const fullCalvingArcPage = read("app/journeys/[slug]/FullCalvingArcJourney.jsx");
for (const passage of ["I've been going through the motions", "Land &amp; Open", "The Serengeti Opens", "Ndutu Immersion", "The Migration in Golden Light", "Off the Grid", "Walking into the Birth", "Descend &amp; Reconnect", "Into the Caldera", "The Maasai Morning. The Return.", "Standing inside the herd"]) check(fullCalvingArcPage.includes(passage), `The Full Calving Arc retains supplied copy: ${passage}`);
check(fullCalvingArc.faqs.length >= 4 && fullCalvingArcPage.includes("JourneyAvailability") && fullCalvingArcPage.includes("JourneyProofSection") && fullCalvingArcPage.includes("StillnessAlternatives") && fullCalvingArcPage.includes("Request a private call"), "The Full Calving Arc has season, availability, proof, FAQ and related-journey parity");
check(existsSync(join(root, "public", "journeys", "kimbilio", "katavi-sunset.jpg")) && existsSync(join(root, "public", "journeys", "kimbilio", "katavi-floodplain.jpg")), "Both supplied Katavi images are deployable");
const kimbilioPage = read("app/journeys/[slug]/KimbilioJourney.jsx");
for (const passage of ["Nobody has said no to me in about a decade.", "The box arrived", "The Signature Moment", "Usiku · The Night Drive", "You never have to", "One camp. No alternative offered, on purpose.", "Thirty days", "June through October.", "One decision that", "I did not come here to be found."]) check(kimbilioPage.includes(passage), `Kimbilio retains supplied copy: ${passage}`);
check(read("app/journeys/[slug]/page.jsx").includes("journey.images.map") && read("app/journeys/[slug]/page.jsx").includes("subTrip:"), "Kimbilio schema includes crawlable images and visible day-level itinerary");
check(read("app/journeys/[slug]/page.jsx").includes('"@type": "FAQPage"') && kimbilio.faqs.length >= 4, "Kimbilio publishes visible planning answers as FAQ structured data");
check(kimbilioPage.includes("JourneyAvailability") && kimbilioPage.includes("Request a private call") && kimbilioPage.includes("JourneyProofSection") && kimbilioPage.includes("StillnessAlternatives"), "Kimbilio has availability, private-call, proof and related-journey conversion paths");
const kimya = journeys.find((journey) => journey.slug === "kimya");
check(Boolean(kimya) && kimya.arc === "stillness" && kimya.nights === 4, "Kimya is a first-class Stillness Collection journey");
check(existsSync(join(root, "public", "journeys", "kimya", "rubondo-island.jpg")) && existsSync(join(root, "public", "journeys", "kimya", "rubondo-birds.jpg")), "Both supplied Rubondo images are deployable");
const kimyaPage = read("app/journeys/[slug]/KimyaJourney.jsx");
for (const passage of ["My apartment has a white noise machine", "Not burned out.", "The Crossing", "The First Silence", "The Signature Moment", "The Listening", "The Middle of the Lake", "Hearing Yourself Again", "The Kimya Rule", "One camp, on an island with no road in.", "A silence you don", "I didn&apos;t know how loud my life was."]) check(kimyaPage.includes(passage), `Kimya retains supplied copy: ${passage}`);
check(kimyaPage.includes("Is Kimya for you?") && kimyaPage.includes("What happens next") && kimyaPage.includes("A curator responds personally"), "Kimya includes qualification, reassurance and next-step conversion paths");
check(kimya.availableMonths.length === 10 && kimya.faqs.length >= 4 && kimyaPage.includes("JourneyAvailability") && kimyaPage.includes("Request a private call") && kimyaPage.includes("JourneyProofSection") && kimyaPage.includes("StillnessAlternatives"), "Kimya has season, availability, private-call, proof, FAQ and related-journey parity");
check(read("app/journeys/[slug]/JourneyPlanning.jsx").includes('name="start-date"') && read("app/journeys/[slug]/JourneyPlanning.jsx").includes('name="party"'), "Stillness availability checks preserve dates and party size in the enquiry handoff");
const kupona = journeys.find((journey) => journey.slug === "kupona");
check(Boolean(kupona) && kupona.arc === "stillness" && kupona.nights === 4 && kupona.destination.includes("Zimbabwe"), "Kupona is a first-class Stillness Collection journey");
check(existsSync(join(root, "public", "journeys", "kupona", "matetsi-river-suite.jpg")) && existsSync(join(root, "public", "journeys", "kupona", "zambezi-boat-aerial.jpg")), "Both supplied Matetsi images are deployable");
const kuponaPage = read("app/journeys/[slug]/KuponaJourney.jsx");
for (const passage of ["I&apos;ve been running a clinic", "Not looking for adventure.", "The Landing", "Water, Not Walls", "The Long Middle", "Strength Returns", "The Kupona Principle", "One reserve, 15 kilometres of river", "January through March.", "What&apos;s depleted", "I didn&apos;t come here to be fixed."]) check(kuponaPage.includes(passage), `Kupona retains supplied copy: ${passage}`);
check(kupona.availableMonths.length === 3 && kupona.faqs.length >= 4 && kuponaPage.includes("JourneyAvailability") && kuponaPage.includes("Request a private call") && kuponaPage.includes("JourneyProofSection") && kuponaPage.includes("StillnessAlternatives"), "Kupona has season, availability, private-call, proof, FAQ and related-journey parity");
const runyararo = journeys.find((journey) => journey.slug === "runyararo");
check(Boolean(runyararo) && runyararo.arc === "stillness" && runyararo.nights === 4 && runyararo.destination.includes("Hwange"), "Runyararo is a first-class Stillness Collection journey");
check(existsSync(join(root, "public", "journeys", "runyararo", "hwange-sunset.webp")) && existsSync(join(root, "public", "journeys", "runyararo", "hwange-leopard.webp")), "Both supplied Hwange images are deployable");
const runyararoPage = read("app/journeys/[slug]/RunyararoJourney.jsx");
for (const passage of ["I&apos;ve done the spa weekend", "Functional.", "Never at peace.", "The Long Way In", "The Veld Goes Quiet", "The Middle of Nowhere", "Peace Is a Place", "The Runyararo Principle", "Seven tents.", "January through March.", "A location the noise can&apos;t reach.", "The noise was never really coming from outside."]) check(runyararoPage.includes(passage), `Runyararo retains supplied copy: ${passage}`);
check(runyararo.availableMonths.length === 3 && runyararo.faqs.length >= 4 && runyararoPage.includes("JourneyAvailability") && runyararoPage.includes("Request a private call") && runyararoPage.includes("JourneyProofSection") && runyararoPage.includes("StillnessAlternatives"), "Runyararo has season, availability, private-call, proof, FAQ and related-journey parity");
const utalala = journeys.find((journey) => journey.slug === "utalala");
check(Boolean(utalala) && utalala.arc === "stillness" && utalala.nights === 4 && utalala.destination.includes("South Luangwa"), "Utalala is a first-class Stillness Collection journey");
check(["south-luangwa-scops-owl.webp", "south-luangwa-hippos.jpg", "south-luangwa-dew.webp"].every((image) => existsSync(join(root, "public", "journeys", "utalala", image))), "All three supplied Utalala images are deployable");
const utalalaPage = read("app/journeys/[slug]/UtalalaJourney.jsx");
for (const passage of ["watch that tells me my sleep score", "Fit enough to walk.", "The Last Road", "The First Walk", "Walking Further", "Stillness, Kept", "The Utalala Principle", "small camp under ancient mahogany trees", "May through November.", "Stillness you earn on foot.", "I know how to measure whether I rested."]) check(utalalaPage.includes(passage), `Utalala retains supplied copy: ${passage}`);
check(utalala.availableMonths.length === 7 && utalala.faqs.length >= 5 && utalalaPage.includes("JourneyAvailability") && utalalaPage.includes("Request a private call") && utalalaPage.includes("JourneyProofSection") && utalalaPage.includes("StillnessAlternatives"), "Utalala has season, availability, private-call, proof, FAQ and related-journey parity");
const journeyPlanning = read("app/journeys/[slug]/JourneyPlanning.jsx");
check(journeyPlanning.includes(".slice(0, 3)") && journeyPlanning.includes("Explore the complete Stillness Collection"), "New Stillness tours show three alternatives and one complete-collection path");
check(journeyPlanning.includes("journey.image") && journeyPlanning.includes("journey.imageAlt") && journeyPlanning.includes("relatedCard"), "Related Stillness journeys use accessible image-led cards");
const homepage = read("app/components/HomepageExperience.jsx");
check(homepage.includes('href="/journeys/stillness"') && !homepage.includes('href="/journeys/kimbilio"') && !homepage.includes('href="/journeys/kimya"') && !homepage.includes('href="/journeys/kupona"') && !homepage.includes('href="/journeys/runyararo"') && !homepage.includes('href="/journeys/utalala"'), "Homepage Stillness feature uses one general collection link without individual tour links");
check(homepage.includes('className="stillness-word"') && homepage.includes('>Stillness</h2>') && !homepage.includes("You did not come here to see more.") && !homepage.includes("Private journeys shaped around silence"), "Homepage Stillness feature contains only the faint title and collection action");
const siteCss = ["app/globals.css", "app/homepage.css", "app/journeys/[slug]/KimbilioJourney.module.css", "app/case-studies/case-studies.css", "app/the-return/return.module.css"].map(read).join("\n");
check(read("app/globals.css").includes('--font-sans: "Inter"') && read("app/globals.css").includes('--font-serif: "Playfair Display"'), "Ryravel typography tokens use the homepage Inter and Playfair families");
check(!/font-family:\s*(?:Georgia|Arial|"Outfit")/i.test(siteCss), "Public page styles contain no competing hard-coded font families");
check(read("app/globals.css").includes(".restoration-page") && read("app/globals.css").includes("font-family: var(--font-sans)") && read("app/journeys/[slug]/KimbilioJourney.module.css").includes("font-family: var(--font-sans)"), "Legacy and current journey templates share the canonical body font");
check(read("app/private-bespoke/page.jsx").includes('"@type": "Service"'), "Private travel page publishes Service structured data");
check(existsSync(join(root, "public", "626d871d-6631-466f-ae78-7efafa06cb1e.txt")), "IndexNow ownership key is publicly deployable");
check(existsSync(join(root, "app", "destinations", "tanzania", "page.jsx")), "Tanzania destination landing page exists");
check(existsSync(join(root, "app", "destinations", "zanzibar", "page.jsx")), "Zanzibar destination landing page exists");
check(read("app/sitemap.js").includes("/destinations/tanzania") && read("app/sitemap.js").includes("/destinations/zanzibar"), "Destination landing pages are in the sitemap");
for (const route of ["policies", "terms", "cancellations", "travel-information", "privacy", "cookies"]) {
  check(existsSync(join(root, "app", route, "page.jsx")) && read("app/sitemap.js").includes(`"/${route}"`), `${route} policy page is published and discoverable`);
}
check(read("app/terms/page.jsx").includes("50%") && read("app/terms/page.jsx").includes("Tourvana Inc") && read("app/cancellations/page.jsx").includes("30–44"), "Booking terms reflect operator, deposit and cancellation schedule");
check(read("app/components/SiteChrome.jsx").includes("marketingConsent !== true") && !read("app/components/SiteChrome.jsx").includes("<noscript>"), "Marketing tag waits for consent and has no unconditional fallback");
check(read("app/components/SiteChrome.jsx").includes('href="/policies"') && requestPage.includes('href="/privacy"') && read("app/journeys/[slug]/page.jsx").includes("journey-booking-note"), "Booking reassurance is linked from footer, request and journey pricing");
check(!/student visa|study abroad|work permit|airline ticket/i.test(["app/components/SiteChrome.jsx", "app/policies/page.jsx", "app/terms/page.jsx", "app/travel-information/page.jsx"].map(read).join("\n")), "Current booking pages do not promote retired service lines");
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
