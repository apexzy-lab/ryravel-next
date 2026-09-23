"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FeelingQuiz } from "../components/HomepageExperience";

const arcProfiles = [
  { id: "exhausted", feeling: "Exhausted", name: "The Restoration", territory: "Physical renewal", status: "Launched", copy: "For the person who has been running on empty. A deliberate progression from arrival and softening to restoration and a gentler return.", who: "You do not need to achieve more on holiday. You need permission to stop, recover and feel your own energy return." },
  { id: "disconnected", feeling: "Disconnected", name: "The Return", territory: "Spiritual homecoming", status: "Launched", copy: "For the person who is present everywhere and connected nowhere. Three calving-season journeys move from close immersion to off-grid nights and a fuller return.", who: "You want to feel present again. You are ready to meet what is real on the calving plains and bring that honesty home." },
  { id: "romantic", feeling: "Romantic", name: "The Reawakening", territory: "Erotic and emotional revival", status: "Waitlist", copy: "Time and privacy for two people to meet each other again, beyond the demands of ordinary life.", who: "You have built a life together and want space to tend to what exists between you." },
  { id: "restless", feeling: "Restless", name: "The Unleashing", territory: "Kinetic liberation", status: "Waitlist", copy: "Movement with meaning: a challenge that gives restless energy somewhere worthy to go.", who: "You are ready to discover what your body and resolve can do." },
  { id: "curious", feeling: "Curious", name: "The Awakening", territory: "Intellectual emergence", status: "Waitlist", copy: "Encounters with people, places and ideas that wake up questions you had stopped asking.", who: "You want to leave with a wider world, not a longer checklist." },
  { id: "celebratory", feeling: "Celebratory", name: "The Milestone", territory: "Peak joy as ritual", status: "Waitlist", copy: "A significant moment given the setting, time and ceremony it deserves.", who: "You have reached a milestone and want to truly inhabit it before moving on." },
  { id: "purposeful", feeling: "Purposeful", name: "The Alignment", territory: "Destiny and integration", status: "Waitlist", copy: "Travel designed for clarity, contribution and a more grounded sense of direction.", who: "You want your time away to connect with what matters in the life you return to." },
  { id: "isolated", feeling: "Isolated", name: "The Gathering", territory: "Communal reconnection", status: "Waitlist", copy: "Shared time and experiences that let important relationships become close again.", who: "You miss the ease of being together, not merely keeping in touch." },
  { id: "overwhelmed", feeling: "Overwhelmed", name: "The Simplicity", territory: "Radical reduction", status: "Waitlist", copy: "Fewer decisions, fewer demands and space to notice what remains.", who: "You do not need another full itinerary. You need life to feel simpler for a while." },
];

const waitlistHref = (arc) => `mailto:hello@ryravel.com?subject=${encodeURIComponent(`Waitlist interest: ${arc.feeling}, ${arc.name}`)}`;

// Preserve the supplied catalogue's country choices. Countries without a
// published journey show an honest empty state and a bespoke-travel route.
const countryOptions = [
  ["botswana", "Botswana"], ["egypt", "Egypt"], ["ethiopia", "Ethiopia"],
  ["ghana", "Ghana"], ["kenya", "Kenya"], ["malawi", "Malawi"],
  ["morocco", "Morocco"], ["mozambique", "Mozambique"], ["namibia", "Namibia"],
  ["rwanda", "Rwanda"], ["senegal", "Senegal"], ["southafrica", "South Africa"],
  ["tanzania", "Tanzania"], ["uganda", "Uganda"], ["zambia", "Zambia"],
  ["zanzibar", "Zanzibar"], ["zimbabwe", "Zimbabwe"],
];

function matchesCountry(journey, country) {
  if (country === "all") return true;
  const destination = journey.destination.toLowerCase();
  if (country === "tanzania") return /tanzania|zanzibar|serengeti|ngorongoro|ndutu|grumeti|tarangire/.test(destination);
  if (country === "southafrica") return destination.includes("south africa");
  return destination.includes(country);
}

function JourneyCard({ journey }) {
  const cardTitle = { "the-reset": "The Reset", ex6: "The Complete Restoration", ex9: "Pure Decompression", rn9: "Beach, Then Wilderness" }[journey.slug] || journey.title;
  return <Link className="jnew-card" href={`/journeys/${journey.slug}`}>
    <div className="jnew-card-image">{journey.image && <img src={journey.image} alt={journey.imageAlt || journey.title} loading="lazy" />}</div>
    <div className="jnew-card-body"><div className="jnew-card-meta"><span>{journey.nights} nights</span><span>{journey.destination}</span></div><h3>{cardTitle}</h3><p>{journey.description}</p><div className="jnew-card-footer"><span>From <strong>{journey.price}</strong> / person</span><b>Explore →</b></div></div>
  </Link>;
}

export default function JourneysExperience({ journeys }) {
  const router = useRouter();
  const [view, setView] = useState("journeys");
  const [arcFilter, setArcFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const exhaustedJourneys = journeys.filter((journey) => journey.arc === "exhausted" && matchesCountry(journey, countryFilter));
  const disconnectedJourneys = journeys.filter((journey) => journey.arc === "disconnected" && matchesCountry(journey, countryFilter));
  const showExhausted = collectionFilter !== "stillness" && (arcFilter === "all" || arcFilter === "exhausted");
  const showDisconnected = collectionFilter !== "stillness" && (arcFilter === "all" || arcFilter === "disconnected");
  const waitlistArcs = countryFilter === "all" && collectionFilter !== "stillness" ? arcProfiles.filter((arc) => arc.status === "Waitlist" && (arcFilter === "all" || arcFilter === arc.id)) : [];
  const hasMatchingJourney = (showExhausted && exhaustedJourneys.length > 0) || (showDisconnected && disconnectedJourneys.length > 0);
  const selectedCountry = countryOptions.find(([value]) => value === countryFilter)?.[1];

  function selectArc(value) {
    if (value === "stillness") {
      router.push("/journeys/stillness");
      return;
    }
    setArcFilter(value);
    if (value !== "all") setCollectionFilter("emotional");
  }

  function selectCollection(value) {
    if (value === "stillness") {
      router.push("/journeys/stillness");
      return;
    }
    setCollectionFilter(value);
  }

  return <main className="journeys-new">
    <header className="jnew-hero"><div><span className="jnew-eyebrow">The collection · worldwide private travel</span><h1>Crafted for the way<br />you want <em>to arrive.</em></h1><p>Every journey begins with a feeling, not a destination. Explore the arcs open now, or tell us which future arc you want to hear about.</p></div></header>
    <div className="jnew-filter"><div className="jnew-filter-inner"><div className="jnew-tabs" role="tablist" aria-label="Explore journeys">{[["journeys","Journeys"],["who","Who it’s for"],["quiz","Feeling quiz"]].map(([key,label]) => <button key={key} type="button" role="tab" aria-selected={view === key} className={view === key ? "active" : ""} onClick={() => setView(key)}>{label}</button>)}</div>{view === "journeys" && <div className="jnew-selects"><label>Emotional arc<select value={arcFilter} onChange={(event) => selectArc(event.target.value)}><option value="all">All arcs</option>{arcProfiles.map((arc) => <option key={arc.id} value={arc.id}>{arc.feeling} · {arc.name}</option>)}<option value="stillness">Stillness Collection</option></select></label><label>Country / region<select value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)}><option value="all">All countries</option>{countryOptions.map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label><label>Collection<select value={collectionFilter} onChange={(event) => selectCollection(event.target.value)}><option value="all">All collections</option><option value="emotional">Emotional arcs</option><option value="stillness">Stillness Collection</option></select></label></div>}</div></div>
    {view === "journeys" && <div className="jnew-main">
      {showExhausted && exhaustedJourneys.length > 0 && <section className="jnew-arc" id="exhausted"><div className="jnew-arc-heading"><div><span>01 · Exhausted · Launched</span><h2>The <em>Restoration</em></h2><small>{exhaustedJourneys.length} {exhaustedJourneys.length === 1 ? "journey" : "journeys"} · physical renewal</small></div><div><p>{arcProfiles[0].copy}</p><Link href="/journeys/exhausted">Explore the arc →</Link></div></div><div className="jnew-card-row">{exhaustedJourneys.map((journey) => <JourneyCard journey={journey} key={journey.slug} />)}</div></section>}
      {showDisconnected && disconnectedJourneys.length > 0 && <section className="jnew-arc jnew-disconnected" id="disconnected"><div className="jnew-arc-heading"><div><span>02 · Disconnected · Launched</span><h2>The <em>Return</em></h2><small>{disconnectedJourneys.length} {disconnectedJourneys.length === 1 ? "journey" : "journeys"} · spiritual homecoming</small></div><div><p>{arcProfiles[1].copy}</p><Link href="/journeys/disconnected">Explore the arc →</Link></div></div><div className="jnew-card-row">{disconnectedJourneys.map((journey) => <JourneyCard journey={journey} key={journey.slug} />)}</div></section>}
      {waitlistArcs.length > 0 && <section className="jnew-waitlist" id="waitlist"><div className="jnew-section-heading"><span>What comes next</span><h2>Arcs in <em>development.</em></h2><p>These are not bookable journey packages yet. Tell us which one resonates and we will contact you when it opens.</p></div><div className="jnew-waitlist-grid">{waitlistArcs.map((arc) => <article id={arc.id} key={arc.id}><span>{arc.territory} · Waitlist</span><h3>{arc.feeling}<br /><em>{arc.name}</em></h3><p>{arc.copy}</p><a href={waitlistHref(arc)}>Ask to be notified →</a></article>)}</div></section>}
      {!hasMatchingJourney && waitlistArcs.length === 0 && <p className="jnew-empty">{selectedCountry ? <>No published journeys in {selectedCountry} match these filters yet. <Link href="/private-bespoke">Ask us to design a private journey →</Link></> : <>No journeys match these filters. Try All arcs or All collections.</>}</p>}
    </div>}
    {view === "who" && <section className="jnew-who"><div className="jnew-section-heading"><span>Start with yourself</span><h2>Who each arc is <em>for.</em></h2><p>These are not destinations. They are ways of recognising where you are and what you might need next.</p></div><div className="jnew-waitlist-grid">{arcProfiles.map((arc,index) => <article key={arc.id}><span>{String(index + 1).padStart(2,"0")} · {arc.territory} · {arc.status}</span><h3>{arc.feeling}<br /><em>{arc.name}</em></h3><p>{arc.who}</p>{arc.status === "Waitlist" ? <a href={waitlistHref(arc)}>Ask to be notified →</a> : <button type="button" onClick={() => { selectArc(arc.id); setCountryFilter("all"); setView("journeys"); }}>Explore the arc →</button>}</article>)}</div></section>}
    {view === "quiz" && <div className="new-home jnew-quiz"><FeelingQuiz /></div>}
  </main>;
}
