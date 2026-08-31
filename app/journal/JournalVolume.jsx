"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const pages = [
  { type: "cover" },
  { type: "content", eyebrow: "Welcome", headline: "Vol. 1, Stillness", foot: "Welcome, Page 01", body: [
    "We built this issue expecting it to feel like relief. It doesn't.",
    "Stillness isn't the reward at the end of motion, it's what's left when the motion stops and nothing rushes in to replace it. No performance. No itinerary telling you where to look next. Just the noise you'd built a life loud enough to drown out.",
    "This issue won't promise you'll feel restored. Some of what's inside doesn't resolve. A landscape that refuses to perform. An hour with no name. An account that ends without arriving anywhere clean.",
    "We believe that's more honest than the alternative, and closer to what actually happens when you stop.",
    "You may not feel better by the end of this. You may just feel less. That is not a failure.",
  ] },
  { type: "content", eyebrow: "The Big Idea", headline: "The Lie of the Payoff", foot: "The Big Idea, Page 02", body: [
    "We sell rest as a transaction. You pay in discomfort, the digital detox, the silent retreat, the phone in a drawer, and in exchange you receive clarity, delivered on schedule, usually by day three. This is the structure of nearly every piece of travel writing about disconnection ever published: hardship, then epiphany. The screen goes dark and the soul lights up. It's a clean equation, and it sells beautifully, because it promises that stillness is discomfort with better returns than the discomfort you're already enduring at home.",
    "The problem is that it isn't true, and somewhere underneath the marketing, most people already suspect this. They've had the quiet weekend that didn't fix anything. They've sat on the beach with no phone and felt, if anything, worse, twitchier, more exposed, more aware of exactly the things they'd spent years moving fast enough to avoid looking at. And then they've felt guilty about that, because the brochure promised peace and they got noise instead. The wellness narrative assumes that if you didn't find peace, you didn't do it right.",
    "This is the lie of the payoff, and it survives because it flatters everyone involved. It flatters the traveler, who gets to believe their exhaustion is a problem with a purchasable solution. It flatters the industry selling rest, which gets to package something genuinely difficult, sitting with yourself, unmediated, as a luxury good with a predictable return. What the lie obscures is simpler and less marketable: stillness has its own volume. It is not silence. Silence is the absence of sound; stillness is the removal of everything that has been standing in for peace, the notifications, the itinerary, the next obligation, and what rushes in to fill that space is not peace. It's noise you'd simply stopped being able to hear, because you'd spent years building a life loud enough to drown it out. Turn off the external noise and the internal noise doesn't disappear. It gets louder, because for the first time in a long time, it has the floor.",
    "This reframing matters because it changes what we should be promising people. Not clarity. Not renewal. Not the clean transaction of discomfort paid, insight received. What we should be promising is something closer to erosion, the wearing away of a version of yourself built for other people's benefit, a self built for productivity and performance, louder than the one underneath it. Erosion is not a pleasant word. It doesn't sell as easily as \"restoration,\" which implies you're getting something back, returning to a fuller version of who you were. Erosion implies loss. It implies you come back smaller than you left, not bigger, and that this is not a failure of the trip but the actual point of it, one that no itinerary can promise and no brochure will admit, because loss is a harder thing to price than gain.",
  ] },
  { type: "content", eyebrow: "The Big Idea, continued", foot: "The Big Idea, Page 03", body: [
    "But there is something honest in the smaller self, the one stillness reveals rather than restores. Most of what we call \"clarity\" after a trip is really just distance, the ordinary, useful distance of not having looked at a problem for four days, which makes almost anything look more solvable than it did up close. That's not nothing. But it isn't transformation either, and calling it transformation is how the industry keeps selling something it can't control. You cannot manufacture insight on a schedule. You can only manufacture the conditions under which insight sometimes, unpredictably, occurs, and just as often doesn't, and the traveler comes home having been quiet for a while, no wiser, just quieter, and that has to be allowed to be enough.",
    "What we are arguing for, then, is not a better version of the wellness transaction, a more remote lodge, a longer detox, a more dramatic view to stare at while waiting for the epiphany to arrive on schedule. We are arguing against the transaction itself. Rest is not something purchased with discomfort and redeemed for clarity. It is closer to a confrontation you agree to have with a version of yourself you've been too busy to meet. Sometimes that confrontation produces something you can use. Often it just produces quiet, and the quiet has its own weight, its own long half-life that outlasts the trip itself.",
    "The traveler who comes home unable to name what changed, only that the noise is different now, has not failed at rest. They have encountered it honestly, without the payoff anyone promised them, which is the only kind of stillness that was ever real.",
  ] },
  { type: "image", caption: "2:47 PM. No one is coming. Nothing is arranged for you. This is the hour you paid for." },
  { type: "content", eyebrow: "The Voice", headline: "What the Silence Took", byline: "A founder’s account, Volcanoes National Park, Rwanda", foot: "The Voice, Page 05", body: [
    "The signal died somewhere past Musanze, though I didn't notice right away. I was still composing emails in my head, the kind you write to yourself, rehearsing what you'll say once you're back in range. It took until the second night for me to understand that no one was coming through. Not for four more days.",
    "I had planned it that way. That was the joke of it. I had chosen the lodge precisely because it promised no connectivity. I'd told my team with a kind of performative bravado, I need to disconnect, I need to think, the way people announce diets before a holiday, half-meaning it, half-daring themselves to fail.",
    "I did not fail. The mountain simply did not care what I had planned to feel.",
    "The first day was easy in the way exhaustion is easy. I slept ten hours, woke to mist pooling in the valley like something spilled and not yet cleaned, ate alone, and told myself this was the beginning of clarity. I had brought a notebook. I had ideas about what I would write in it, some vision for the company, some reckoning with the year. I wrote four lines and stopped. The lines were fine. They were also exactly what I already knew, dressed up as insight because I was somewhere beautiful when I wrote them.",
    "By the second day the quiet had stopped being restful and started being loud. That's the part no one prepares you for, that stillness has its own volume. Without the phone, without the small violence of notifications, I could hear things I usually drowned out on purpose. The gorillas were two valleys over, and even they made less noise than my own thoughts, which arrived uninvited and did not queue politely. I calculated whether I could pay two people by Friday.",
  ] },
  { type: "content", eyebrow: "The Voice, continued", foot: "The Voice, Page 06", body: [
    "I thought about a conversation I'd been avoiding with my wife for three weeks, not because it was a fight but because it required a kind of attention I'd been rationing. I thought about how long it had been since I'd done something that didn't have a purpose attached to it, a trip that wasn't scouting a location, a conversation that wasn't networking, a silence that wasn't strategic.",
    "I want to tell you I had a breakthrough. That's what these essays are supposed to do, deliver you to the overlook, show you the view, let you feel that the discomfort was worth it because look, here's the payoff. But that's not what happened, and the lie of the payoff is exactly what's wrong with how we sell rest to people who are tired.",
    "What happened is that I got smaller. Not in a bad way, though it didn't feel good, either. The mountain was old in a way that made my four days feel like nothing, my company feel like nothing, my worry about the email I couldn't send feel like the smallest, most temporary thing imaginable. There's a specific vertigo to that. You spend your life building a self that matters, to your team, your family, your own sense of forward motion, and then you sit still long enough, far enough from anyone who needs you, and the self gets quiet too. Not silenced. Just, reduced to its size, which is smaller than the noise had led you to believe.",
    "On the third night it rained without warning, hard, and I lay there and realized I hadn't thought about the company in hours. Not because I'd resolved anything about it. I'd just stopped being able to hold it at the size I usually held it. It had shrunk down to a thing I did, not a thing I was.",
    "I don't know if that's clarity. I've stopped trying to call it that. Clarity implies you can see further, see clean lines where there used to be fog. This was closer to erosion, something being worn down rather than illuminated. I came down the mountain on the fourth day lighter, but not in the way people mean when they say a trip changed them. I wasn't renewed. I wasn't restored. Those words assume you get back something you'd lost, that stillness returns you to a fuller version of yourself.",
    "It didn't. It took something. I'm still not sure what, exactly, some layer of performance, maybe, some version of urgency I'd mistaken for purpose.",
    "The signal came back on the drive down, all at once, a hundred and forty notifications arriving in a single ugly cluster, and I remember looking at the number and feeling nothing at all. Not peace. Not relief. Just a strange, flat distance, like watching my old life through glass.",
    "I did not feel better. I felt less.",
    "And in that less, something else started.",
    "The gorillas were still up there somewhere, two valleys over, unbothered by any of it, they hadn't needed four days to go quiet. They'd never been loud.",
  ] },
  { type: "content", eyebrow: "A Place, Sensorially", headline: "The Hour Nothing Happens", byline: "Tanzania, 2:47 in the afternoon", foot: "A Place, Sensorially, Page 07", body: [
    "There is a specific hour in the Tanzanian bush when everything with sense has already gone still, and you are the last thing left moving. Not sunrise, when the light does the work of being beautiful for you. Not dusk, when the whole sky performs its collapsing colors and you're permitted to feel something on cue. This is 2:47 in the afternoon, the dead hour, the hour with no name in any brochure, when the heat has flattened the grass into something the color of old paper and even the insects have gone quiet, as if they, too, are waiting for something that isn't coming.",
    "The heat at this hour is not a temperature so much as a weight. It sits on your shoulders the way a hand might, not unkindly, just insistently, reminding you that you are a body and bodies are heavy and this is not a metaphor, this is 41 degrees and you will not be moving quickly for a while. Sweat stops being something you notice and becomes something you are, a condition rather than an event. The air doesn't move. Nothing here is in a hurry to cool you down, comfort you, or acknowledge that you've traveled a long way to be uncomfortable in it.",
    "The sound, or the absence that stands in for it, is what does the work of undoing you. Not silence. Silence would be a mercy, a clean nothing. This is closer to a held breath the size of a country. Somewhere very far off, a single bird makes a sound that isn't quite a call, more like a complaint filed and then abandoned. It does not repeat. The grass, dry as it is, doesn't rustle, because nothing is moving through it, not now, not at 2:47, when even the things that eat and are eaten have agreed, without conferring, to pause. You become aware of your own breathing not because it's loud but because it's the only sound with any consistency, and after twenty minutes of it being the only sound, it starts to feel less like breathing and more like evidence.",
    "This is the part no itinerary prepares you for: the bush at 2:47 does not perform for you. It is not arranging itself into a photograph. There is no golden light, no silhouette, no moment engineered to make you reach for your phone. The light at this hour is white and flat and unglamorous, a light that makes everything look slightly overexposed, slightly too honest. The land under that light doesn't ask to be admired. It continues, indifferent to whether you are watching, which is its own kind of confrontation.",
  ] },
  { type: "content", eyebrow: "A Place, Sensorially, continued", foot: "A Place, Sensorially, Page 08", body: [
    "You came a long way, spent a great deal, arranged a great deal, to stand in front of something that has no interest in your arrival. There were elephants an hour ago, and there will likely be elephants again by four, but at 2:47 there is nothing large enough to reassure you that you're somewhere significant. No spectacle. No sighting to justify the heat, the flight, the money, the story you'll tell later. Just land, and the heat sitting on it, and you standing in the middle of both, suddenly aware that the scale of this place was never going to organize itself around your schedule.",
    "Fifty kilometers in one direction, sixty in another, and the horizon doesn't change shape no matter how long you look at it, which is its own quiet, unbothered continuing. You realize you could walk for a day and the land would look almost identical, same heat, same flat light, same indifferent horizon, with you standing in it, small and sweating and entirely unnecessary to its continuing.",
    "This is the thing about scale that no photograph transmits: it isn't the vastness that undoes you. It's the indifference. A landscape can be enormous and still flatter you, still frame you at its center, the way a canyon does, the way an ocean does when you're the only figure on the beach. Tanzania at 2:47 in the afternoon does not do this. It does not care that you are there. It was exactly this hot, exactly this quiet, exactly this flat and white and unphotogenic for several million afternoons before you arrived, and it will be again tomorrow, whether or not you're still standing in it.",
    "You start to understand, standing there, sweat cooling into something colder than the air around you, that this is what you paid for without knowing it. Not the sunrise. Not the animals, though they'll come back, unhurried, uninterested in your having waited. What you paid for was this, an hour with no name, no light worth photographing, nothing arranged for your benefit, in which the only thing required of you is to remain standing in a place that would continue, entirely unchanged, whether you did or not.",
  ] },
  { type: "back" },
];

function PageContent({ page }) {
  if (page.type === "cover") return <div className="jv-page-inner jv-cover"><span>Ryravel Journal, Volume One</span><h1>Stillness</h1><p>Four accounts of what happens when the motion stops and nothing rushes in to replace it.</p><small>2:47 PM</small></div>;
  if (page.type === "back") return <div className="jv-page-inner jv-back"><h2>Vol. 2, Wonder</h2><p>Arriving this November.</p><small>Ryravel Journal</small></div>;
  if (page.type === "image") return <div className="jv-page-inner jv-image"><i /><span>2:47 PM</span><p>{page.caption}</p></div>;
  return <div className="jv-page-inner jv-copy"><span className="jv-eyebrow">{page.eyebrow}</span>{page.headline && <h2>{page.headline}</h2>}{page.byline && <p className="jv-byline">{page.byline}</p>}<i className="jv-rule" /><div className="jv-body">{page.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><footer><span>Ryravel Journal</span><span>{page.foot}</span></footer></div>;
}

export default function JournalVolume() {
  const [current, setCurrent] = useState(0);
  const previous = () => setCurrent((value) => Math.max(0, value - 1));
  const next = () => setCurrent((value) => Math.min(pages.length - 1, value + 1));

  useEffect(() => {
    function handleKey(event) {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return <main className="journal-reader">
    <Link className="jv-back-link" href="/journal">← Journal index</Link>
    <section className="jv-stage" aria-label="Ryravel Journal, Volume One: Stillness">
      <div className="jv-book">
        {pages.map((page, index) => <article className={`jv-page jv-${page.type}${index < current ? " is-flipped" : ""}`} style={{ zIndex: index < current ? index : pages.length - index }} aria-hidden={index !== current} key={`${page.type}-${index}`}><PageContent page={page} /></article>)}
      </div>
      <div className="jv-controls">
        <button type="button" onClick={previous} disabled={current === 0} aria-label="Previous page">‹</button>
        <span aria-live="polite">{current + 1} / {pages.length}</span>
        <button type="button" onClick={next} disabled={current === pages.length - 1} aria-label="Next page">›</button>
      </div>
    </section>
  </main>;
}
