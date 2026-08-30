export const arcs = [
  {
    id: "exhausted",
    label: "Exhausted - The Restoration",
    title: "Exhausted - The Restoration",
    shortTitle: "Exhausted - The Restoration",
    subtitle: "From depletion to restoration",
    intro: "Six restorative journeys for the person who has been running on empty and needs more than a holiday. They need permission to stop, recover and return to themselves.",
    story: "The exhausted traveller is not merely tired. They are depleted. Tired can be helped by a week off. Depletion asks for a deliberate pace, an environment with no demands, and a sequence that moves from rest into genuine restoration.",
    color: "#d7a252",
    principles: [
      ["Permission", "Coast, stillness, no agenda. The body must understand that it is allowed to stop."],
      ["Dissolution", "Spa, beach, and the complete absence of schedule remove every ordinary demand."],
      ["Awakening", "On longer arcs, the Serengeti follows. Curiosity returns before effort does."],
      ["The Return", "A final integration, the Departure Box, and the flight home carrying a different weight."],
    ],
  },
  {
    id: "romantic",
    label: "Romantic - The Reawakening",
    title: "Romantic - The Reawakening",
    shortTitle: "Romantic - The Reawakening",
    subtitle: "Zanzibar does not make people fall in love. It gives people already in love somewhere worthy of that fact.",
    intro: "Three journeys for couples, each built around a private villa, one extraordinary shared experience per day, and three Ryravel Signatures designed for two people.",
    story: "The romantic journey is not designed for romance as performance. It is designed for proximity: two people in the same place, without ordinary demands, long enough for something to shift.",
    color: "#cf708b",
    principles: [
      ["A private villa", "Your own pool, terrace and beach access. Service appears only when summoned."],
      ["One meaningful experience", "One thing each day that earns its place. The remaining time belongs to two people."],
      ["The Couple’s Gift", "A kaftan, a kikoi and two different handwritten cards."],
      ["Two Departure Boxes", "One for each person, written to them as themselves rather than as a unit."],
    ],
  },
  {
    id: "adventurous",
    label: "Restless - The Unleashing",
    title: "Restless - The Unleashing",
    shortTitle: "Restless - The Unleashing",
    subtitle: "I will know what I am made of.",
    intro: "Three journeys to Uhuru Peak. The summit, then the Serengeti, then the crater—in the sequence the body needs to receive each one.",
    story: "The adventurous traveller does not need a challenge for its own sake. They need to discover something about themselves ordinary life cannot reveal.",
    color: "#2aa6ca",
    principles: [
      ["WFR-certified lead guide", "Altitude is assessed nightly by guides who have summited hundreds of times."],
      ["The Summit Gift", "A river stone, Maasai beadwork and a handwritten note arrive before midnight."],
      ["The Serengeti portrait", "The face the mountain made, documented at golden hour on the plains."],
      ["The Departure Box", "Your certificate, volcanic stone, guide’s note and a letter from Ryravel."],
    ],
  },
  {
    id: "social",
    label: "Isolated - The Gathering",
    title: "Isolated - The Gathering",
    shortTitle: "Isolated - The Gathering",
    subtitle: "Connected to My People",
    intro: "Three journeys for groups of four to eight friends. One vehicle. One table. Experiences that create shared memory rather than parallel private ones.",
    story: "Every Social journey follows the same arc: observation first, participation next, celebration to close. The group photograph in every Departure Box is the proof: you were here together.",
    color: "#e27335",
    principles: [
      ["Observe", "Enter without expectations. Context comes before participation."],
      ["Participate", "Cook, sail, make and learn together. Shared physical memories become social substance."],
      ["Celebrate", "Music or ceremony arrives once the group has enough shared experience to receive it."],
      ["Carry it home", "Every individual box contains the same group photograph."],
    ],
  },
  {
    id: "stillness",
    label: "Stillness · Deep Presence & Wilderness Solitude",
    title: "The Stillness Collection",
    shortTitle: "Stillness",
    subtitle: "You came here to need less.",
    intro: "Two wilderness journeys for travellers who are not asking for a safari. They are asking to stop being asked for anything.",
    story: "The Stillness Collection replaces the printed safari schedule with an emotional rhythm. The guest chooses each morning. Guides hold silence, wellness work is integrated, and every landscape is selected for what it allows the nervous system to release.",
    color: "#7a9a7a",
    principles: [
      ["Less, deliberately", "One or two landscapes, chosen as emotional architecture rather than a checklist of sightings."],
      ["Silence as method", "Game drives become moving meditation, with guides trained to speak only when invited."],
      ["The Silent Documentary", "Nothing posed or staged. A hand-bound album arrives weeks after the traveller returns."],
      ["The arc closes", "Founder calls, a Departure Box and a written integration bring the experience home."],
    ],
  },
  {
    id: "disconnected",
    label: "Disconnected - The Return",
    title: "Disconnected - The Return",
    shortTitle: "Disconnected - The Return",
    subtitle: "Reconnect to the earth, to life arriving and departing, to yourself.",
    intro: "Four seasonal wilderness journeys designed to interrupt disconnection: three across the calving plains and one inside the great migration.",
    story: "The disconnected traveller does not need another screen-free promise. They need the wild to interrupt them. These journeys move from a soft landing into genuine isolation, then close through the crater and a deliberate human return.",
    color: "#4a7e2a",
    principles: [
      ["Land & strip back", "Step off the aircraft and onto the plains. No lobby, no unnecessary transition."],
      ["Enter the ecosystem", "Mobile camps and fly camps place the traveller inside the movement rather than beside it."],
      ["Receive the unexpected", "A walk into the herd or migration is held back until the emotional moment is right."],
      ["Reconnect & carry", "The crater, a field note and the Departure Box close the return."],
    ],
  },
];

export const journeys = [
  { slug: "ex6", arc: "exhausted", nights: 11, title: "Exhausted, The Restoration", destination: "Zanzibar · Serengeti · Ngorongoro", tagline: "I arrived heavy with everything my life had asked of me. Eleven nights later, I understood what it means to put something down.", description: "The complete restoration arc across coast, plains and crater.", tags: ["Beach", "Safari", "Crater"], price: "$43,500", image: "/journeys/ex6/exhausted-ngorongoro-sunset.webp", imageAlt: "Sunset over the Ngorongoro landscape from a private lodge deck", phases: ["Dissolve", "Awaken", "Descend", "Close & Carry"] },
  { slug: "ex9", arc: "exhausted", nights: 6, title: "Exhausted, The Restoration", destination: "Zanzibar", tagline: "Six nights. One island. Nothing asked of me except to stop.", description: "Pure decompression on Zanzibar: coast, spa, Stone Town and the permission to stop.", tags: ["Beach", "Spa", "Stone Town"], price: "$14,033", image: "/journeys/ex9/exhausted-zanzibar-coast.webp", imageAlt: "The quiet Zanzibar coastline beneath a clear blue sky", phases: ["Arrive & Exhale", "Stillness Deepens", "Close & Carry"] },
  { slug: "ex11", arc: "exhausted", nights: 11, title: "The Full Tanzania Restoration", destination: "Zanzibar · Serengeti · Ngorongoro", tagline: "Coast. Plains. Crater. The complete arc.", description: "The full progression from exhaustion to arrival across coast, plains and crater.", tags: ["Beach", "Safari", "Crater"], price: "$43,500", phases: ["Permission", "The Wild", "The Crater", "The Return"] },
  { slug: "rn5", arc: "exhausted", nights: 5, title: "The Reset", destination: "Zanzibar", tagline: "Five nights. The body remembers.", description: "Ayurveda, baobab rituals and the ocean float you will never forget.", tags: ["Beach yoga", "Ayurveda", "Baobab"], price: "$12,618", phases: ["Arrive & Soften", "The Foundation", "Integrate"] },
  { slug: "rn7", arc: "exhausted", nights: 7, title: "The Transformation", destination: "Zanzibar", tagline: "Go deeper. Return clearer.", description: "Deep Ayurveda, a baobab forest at dawn and sound healing.", tags: ["Deep Ayurveda", "Baobab forest", "Sound"], price: "$21,192", phases: ["Arrive & Open", "The Deepening", "The Return"] },
  { slug: "rn9", arc: "exhausted", nights: 9, title: "Exhausted, The Restoration", destination: "Zanzibar · Serengeti", tagline: "Beach, then wilderness.", description: "Nine nights of pure decompression across Zanzibar and the Serengeti, with a quiet coastal landing before the return.", tags: ["Zanzibar", "Serengeti", "Tented camp"], price: "$26,611", phases: ["Dissolve", "Awaken", "Return"], image: "/journeys/rn9/exhausted-serengeti-camp.webp", imageAlt: "A tented camp beneath a dramatic sky on the Serengeti plains" },
  { slug: "ro6", arc: "romantic", nights: 6, title: "The Intimate Island", destination: "Zanzibar", tagline: "A private villa. The sandbank on Night Five.", description: "Six nights designed around proximity, privacy and one extraordinary shared moment each day.", tags: ["Private villa", "Dhow", "Sandbank"], price: "$16,462", unit: "couple", phases: ["Seal the World", "The Island Opens", "The Sandbank"] },
  { slug: "ro8", arc: "romantic", nights: 8, title: "The Full Island", destination: "Zanzibar", tagline: "Five registers. The night fishing. The sandbank.", description: "Eight nights of private island rhythm, from Stone Town to the open sea.", tags: ["Private villa", "Night fishing", "Sandbank"], price: "$22,184", unit: "couple", phases: ["Arrive & Still", "Move Together", "Night Water", "Close"] },
  { slug: "ro11", arc: "romantic", nights: 11, title: "The Complete Romantic Arc", destination: "Zanzibar", tagline: "Eleven nights. Every register of the island.", description: "Baobab forest, sandbank, Panchakarma and Taarab in the villa courtyard.", tags: ["Baobab", "Panchakarma", "Sandbank", "Taarab"], price: "$29,773", unit: "couple", phases: ["Open", "Deepen", "Celebrate", "Carry"] },
  { slug: "adv7", arc: "adventurous", nights: 7, title: "Summit, Then Wild", destination: "Kilimanjaro · Serengeti", tagline: "The mountain first. The horizontal world after.", description: "Seven days on Machame. One day on the Serengeti when you come down.", tags: ["Machame", "Barranco Wall", "Serengeti"], price: "$11,177", phases: ["The Mountain", "Above the Clouds", "The Wild Reward"] },
  { slug: "adv9", arc: "adventurous", nights: 9, title: "The Remote Summit & The Wild Reward", destination: "Kilimanjaro · Serengeti · Ngorongoro", tagline: "The remote approach. The wild reward.", description: "Eight days on Lemosho, the Serengeti, then the Ngorongoro Crater.", tags: ["Lemosho", "Serengeti", "Ngorongoro"], price: "$17,363", phases: ["Lemosho", "Uhuru", "The Plains", "The Crater"] },
  { slug: "adv11", arc: "adventurous", nights: 11, title: "The Complete Adventurous Arc", destination: "Kilimanjaro · Serengeti · Ngorongoro", tagline: "Full ascent. Full descent. Full reward.", description: "Lemosho, two Serengeti nights, helicopter over the crater and full descent.", tags: ["Lemosho", "Serengeti", "Helicopter", "Ngorongoro"], price: "$30,816", phases: ["The Mountain", "The Summit", "The Serengeti", "The Crater"] },
  { slug: "so6", arc: "social", nights: 6, title: "The Island Belongs to You", destination: "Zanzibar", tagline: "Stone Town, spice and twelve musicians on a rooftop.", description: "Pure Zanzibar for four to eight friends, ending with music no one expected.", tags: ["Stone Town", "Spice farm", "Taarab"], price: "$4,939", unit: "person · group of 6", phases: ["Observe", "Participate", "Celebrate"] },
  { slug: "so8", arc: "social", nights: 8, title: "Island First, Then the Continent", destination: "Zanzibar · Ngorongoro · Bagamoyo", tagline: "Two destinations. One shared story.", description: "Coast, Maasai compound, Bagamoyo, crater and ceremony by firelight.", tags: ["Zanzibar", "Maasai", "Ngorongoro"], price: "$13,020", unit: "person · group of 6", phases: ["The Island", "The Continent", "The Ceremony"] },
  { slug: "so11", arc: "social", nights: 11, title: "The Full Social Arc", destination: "Zanzibar · Serengeti · Ngorongoro", tagline: "Five on the island. Six on the mainland.", description: "A dhow overnight, Serengeti and fire on the crater rim for four to eight friends.", tags: ["Dhow overnight", "Serengeti", "Ngorongoro"], price: "$18,090", unit: "person · group of 6", phases: ["Enter & Observe", "Make Together", "The Wild", "Celebrate"] },
  { slug: "st6", arc: "stillness", nights: 6, title: "The Return", destination: "Grumeti Reserve", tagline: "Six nights. One camp. One landscape. One uninterrupted descent into stillness.", description: "A singular, guest-paced stay in Grumeti where nothing competes with your own unraveling.", tags: ["Both seasons", "Single camp", "Silent documentary"], price: "$40,000", priceNote: "Green season from $40,000 · Dry season from $50,500", phases: ["Surrender & Unraveling", "Silence & Encounter", "Depth & Integration"] },
  { slug: "st9", arc: "stillness", nights: 9, title: "The Deepening", destination: "Eastern Serengeti · Tarangire", tagline: "Nine nights. Two camps. Two landscapes. A progression from surrender to integration.", description: "The first landscape unravels. The second holds. A deliberate transition turns geography into emotional architecture.", tags: ["Both seasons", "Two camps", "Two landscapes"], price: "$45,800", priceNote: "Green season from $45,800 · Dry season from $58,500", phases: ["The Unraveling", "The Transition", "Grounding & Integration"] },
  { slug: "dc6", arc: "disconnected", nights: 6, title: "The Calving Season", destination: "Southern Serengeti · Ndutu · Ngorongoro", tagline: "Six nights. 500,000 wildebeest calves born in six weeks. The whole truth of the ecosystem.", description: "A lodge landing, three nights at a mobile camp on the calving grounds, then the crater rim to close.", tags: ["Jan–Mar", "Calving plains", "Mobile camp"], price: "$11,075", phases: ["Land & Open", "Ndutu — The Heart of the Calving", "Close & Carry"] },
  { slug: "dc7", arc: "disconnected", nights: 7, title: "Calving Maximum Isolation", destination: "Southern Serengeti · Ndutu · Ngorongoro", tagline: "Seven nights. Two nights at a Ndutu fly camp. No Wi-Fi. No generator.", description: "The deeper calving-season arc: lodge, off-grid fly camp, mobile-camp recovery and the crater.", tags: ["Jan–Mar", "Fly camp", "Maximum isolation"], price: "$11,814", phases: ["Land & Strip Back", "The Fly Camp", "Recovery", "Close & Carry"] },
  { slug: "dc9", arc: "disconnected", nights: 9, title: "The Full Calving Arc", destination: "Southern Serengeti · Ndutu · Ngorongoro", tagline: "Nine nights. Lodge anchor to fly camp to crater. The complete isolation spectrum.", description: "The complete calving-season progression from soft landing through peak isolation to human reconnection.", tags: ["Jan–Mar", "Mobile + fly camp", "Full calving arc"], price: "$15,377", phases: ["Land & Open", "Ndutu Immersion", "Off the Grid", "Descend & Reconnect"] },
  { slug: "dr6", arc: "disconnected", nights: 6, title: "Safari Isolation", destination: "Central Serengeti · Northern Serengeti · Ngorongoro", tagline: "Six nights. No Wi-Fi. No fixed walls. Two million wildebeest within earshot.", description: "Migration first: central plains, a northern mobile camp beside the movement, then the crater's contained stillness.", tags: ["Jul–Oct", "Mara crossings", "Mobile camp"], price: "$35,140", phases: ["Land & Strip Back", "Move North — The Migration", "Reconnect & Close"] },
];

export const journalEntries = [
  { slug: "why-we-ask-how-not-where", type: "Essay", title: "Why we ask how, not where", summary: "The travel industry has optimised for the wrong question. Emotion is a better compass than geography.", read: "8 min" },
  { slug: "how-to-find-stillness-zanzibar", type: "Field guide", title: "How to find stillness in Zanzibar", summary: "Beyond the beaches: a quieter island rhythm built around dawn, tide and human-scale encounters.", read: "7 min" },
  { slug: "field-guide-going-nowhere-slowly", type: "Guide", title: "A field guide to going nowhere slowly", summary: "What we have learned about designing journeys for people who need to stop.", read: "10 min" },
  { slug: "journey-that-understands-how-you-feel", type: "Notes", title: "A journey that understands how you feel", summary: "Why attentive design begins long before a destination enters the conversation.", read: "6 min" },
  { slug: "journey-toward-a-feeling", type: "Essay", title: "The journey toward a feeling", summary: "Designing backwards from the person you want to be when you return.", read: "9 min" },
  { slug: "what-travellers-bring-home", type: "Field notes", title: "What travellers bring home", summary: "Five years of asking what remained. The answers were never souvenirs.", read: "5 min" },
];

export function arcFor(id) {
  return arcs.find((arc) => arc.id === id);
}

export function journeyFor(slug) {
  return journeys.find((journey) => journey.slug === slug);
}
