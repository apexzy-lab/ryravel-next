import Link from "next/link";
import styles from "./KimbilioJourney.module.css";
import JourneyTrustLayer, { JourneyPricingNote } from "../../components/JourneyTrustLayer";
import { JourneyAvailability, JourneyFaqs } from "./JourneyPlanning";

const days = [
  {
    number: "01", title: "The World Falls Away", route: "Southern Serengeti · Night 1",
    paragraphs: ["I'd read everything I could find about the calving season before I left, which is exactly the habit this trip was supposed to interrupt, and it turned out none of it prepared me for how close the herds actually come, twenty metres, unbothered, going about being born and dying in front of the vehicle like we weren't there. First night with no signal, and I caught myself reaching for my phone twice before remembering there was nothing to check. The calving season sounds different at night than I expected, less like nature documentary and more like something actually happening."],
  },
  {
    number: "02", title: "The Full Ecosystem", route: "Southern Serengeti · Night 2",
    paragraphs: ["A dawn drive put predator and prey in the same frame without either one performing for us, which felt more honest than I was ready for. We rested through the heat, walked the plains at ground level in the afternoon with a tracker who moved like the terrain was speaking directly to him. That evening my guide gave me a plain, unromantic rundown of what the fly camp would actually be like, no beds, no walls, no way to know what I'd hear in the night. I noticed myself wanting to ask follow-up questions, the way I always do, and he just said I'd find out. I didn't push it a second time."],
  },
  {
    number: "03", title: "Into the Calving Ground", route: "Ndutu Fly Camp · Night 3",
    paragraphs: ["A short drive, then a walk in, and I realized somewhere in that walk that I had no idea what the rest of the day held, no schedule, no rundown, nothing I could have looked up beforehand even if I'd tried. A perimeter walk at Lake Ndutu in the afternoon light. Dinner off the fire, no generator, and for the first time in longer than I can remember, I went to bed with genuinely no idea what tomorrow would ask of me, and instead of the anxiety I expected, I just fell asleep."],
  },
  {
    number: "04", title: "On Foot in the Calving Plains", route: "Ndutu Fly Camp · Night 4",
    paragraphs: ["We walked out from camp before light, my guide and an armed tracker, and stood in the middle of the herd while calves were being born close enough to hear. Nothing about being a threat registered with them at all, they simply carried on. I'd spent the walk in half-composing something to say about the moment once it happened, a habit I have, narrating things before they're finished happening, and standing there I lost the thread of that sentence entirely and never picked it back up. We walked back for breakfast, and the rest of the day had nothing left to plan for, the walk had already done whatever it was going to do. I spent the afternoon with the tent open, the herd visible from where I lay, and didn't reach for a single thing to organize."],
  },
  {
    number: "05", title: "The Morning After", route: "Ndutu Mobile Luxury Camp · Night 5",
    paragraphs: ["Nothing about this day had been written down anywhere I'd seen. A tracker who has read these plains for over twenty years arrived without explanation and told me the day was his to design, I was simply to follow. I'm not used to following an itinerary I have zero input into, and for the first hour I kept waiting for a plan to be revealed to me. There wasn't one, just his read of the wind and the light and where the herds would likely be, adjusted as we went. By afternoon I'd stopped waiting for the plan entirely and just watched where he was watching.", "A woman with a camera met us on the plains at golden hour and gave me nothing to prepare for, no direction, no pose to rehearse. Forty-five minutes, and I forgot to perform for most of it. The pictures reached me three days after I got home, and the person in them looked like someone who hadn't planned the moment before it happened, which, looking back, was probably the first time all week that was actually true.", "Back at camp, a basket was waiting at the tent, a kaftan, something carefully put together, a note that read I'd come here to disappear and was starting to be found. I sat with it longer than I expected to, mostly because it named the thing I'd never said out loud even to myself when I booked this trip. The comfort of the camp landed differently after two nights with none of it. I hadn't planned on noticing that. I did anyway."],
  },
  {
    number: "06", title: "Chosen Day", route: "Ndutu Mobile Luxury Camp · Night 6",
    paragraphs: ["A morning drive with no fixed agenda, my guide reading the day as it came rather than following anything decided in advance. I rested through the afternoon, and the journal at my tent actually got used, not on a schedule, just because I had something to put in it. That evening my guide told me one thing he'd noticed in me over the week, something I hadn't said to him directly and hadn't fully admitted to myself either. I didn't argue with it. I just let it sit there, true."],
  },
  {
    number: "07", title: "The Crater", route: "Ngorongoro Crater · Night 7",
    paragraphs: ["The flight to Ngorongoro put the whole calving plain behind us in a way that felt more final than I expected. A full day down in the crater, black rhino, flamingo lakes, lions, and my guide never once tried to move us along faster than I wanted to go. Dinner on the rim that evening had a stillness to it I didn't have to work for, and it occurred to me I hadn't once, all day, tried to guess what came next."],
  },
  {
    number: "08", title: "Last Morning. The Return.", route: "Ngorongoro · Departure",
    paragraphs: ["We visited a single elder's family that morning, tea, conversation at a pace I made no attempt to hurry along. The box was presented before I left, Maasai beadwork inside it, a pressed wildflower from the calving grounds, oils pressed locally, and a handwritten note from my guide, the same observation he'd said aloud the night before, written down this time. I read it twice before opening the sealed letter beneath it. What that one said is mine to keep. What I noticed, closing it, was that for the first time on this whole trip, I hadn't spent the reading trying to guess what it would say before I got there. On the drive to the airport I held it all on my lap rather than let it go in the boot, seven nights, the walk into the calving grounds, the fly camp fire, the crater, somehow sealed into something small enough to carry."],
  },
];

function Day({ day }) {
  return <article className={styles.day}><div className={styles.dayMeta}><span>Day {day.number}</span><h3>{day.title}</h3><small>{day.route}</small></div><div className={styles.dayCopy}>{day.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article>;
}

export default function CalvingIsolationJourney({ journey }) {
  const requestHref = `/request?journey=${journey.slug}&name=${encodeURIComponent(journey.title)}&destination=${encodeURIComponent(journey.destination)}&nights=${journey.nights}&price=${encodeURIComponent(journey.price)}`;
  const callHref = `${requestHref}&conversation=private-call`;

  return <main className={`${styles.page} ${styles.calvingIsolation}`}>
    <section className={styles.hero}>
      <img src={journey.image} alt={journey.imageAlt} width="1920" height="1280" fetchPriority="high" />
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={styles.heroTop}><Link href="/journeys/disconnected">← Disconnected · The Return</Link><span>Spiritual homecoming</span></div>
      <div className={styles.heroBody}><p className={styles.eyebrow}>Calving Maximum Isolation · January to March</p><h1>Calving Maximum Isolation</h1><p className={styles.meaning}>Southern Serengeti · Fly Camp · Ndutu Mobile · Ngorongoro</p><h2>Nowhere left to get ahead to.</h2></div>
      <dl className={styles.facts}><div><dt>Duration</dt><dd>7 Nights, 8 Days</dd></div><div><dt>Season</dt><dd>January–March · Calving Plains</dd></div><div><dt>From</dt><dd>$11,814 / person</dd></div></dl>
    </section>

    <section className={styles.opening}><div className={styles.openingMain}><span className={styles.sectionLabel}>Why this journey</span><h2>From planning every moment<br />to being in one.</h2><div className={styles.openingCopy}><p>I plan. That's the honest version of it. I've booked things two years out, rehearsed conversations before they happen, read the reviews of the reviews. Somewhere in all that preparation I stopped being anywhere I actually was.</p></div></div><aside className={styles.openingAside}><span>In one sentence</span><p>Seven nights to stop living a few steps ahead.</p></aside></section>

    <section className={styles.fit}><div><span className={styles.sectionLabel}>Who this is for</span><h2>Always prepared.<br />Rarely present.</h2></div><div><p>For the traveller who has researched every detail, but wants to know what happens when a carefully held journey leaves room for the day to be discovered.</p><ul><li>You can spend two nights in a genuinely stripped-back fly camp before returning to comfort.</li><li>You want to encounter the calving plains without promising yourself any particular sighting.</li><li>You want an intentional return through Ngorongoro, not an abrupt flight home.</li></ul><Link href={requestHref}>Ask a curator about Calving Maximum Isolation →</Link></div></section>

    <section className={styles.itinerary} aria-labelledby="calving-isolation-itinerary">
      <header><span className={styles.sectionLabel}>The journey · Phase One · Land &amp; Strip Back</span><h2 id="calving-isolation-itinerary">Eight days of<br /><em>being where you are.</em></h2><p>Nights 1–2 · Southern Serengeti</p></header>
      {days.slice(0, 2).map((day) => <Day day={day} key={day.number} />)}

      <section className={styles.signature}><span>Phase Two · Nights 3–4 · Ndutu, Off the Grid</span><h2>The Fly Camp.</h2><p>No permanent structure visible from the tent. No generator after nine. No Wi-Fi at any point. Lake Ndutu in view, the calving herds around the camp. At night you hear the calves, the predators, and nothing else.</p></section>
      {days.slice(2, 4).map((day) => <Day day={day} key={day.number} />)}

      <figure className={styles.landscape}><img src="/journeys/calving-isolation/guided-nature-walk.webp" alt="A traveller examining a dried seed head during a guided nature walk" width="1920" height="1280" loading="lazy" /><figcaption>Attention returns to the small things on a guided walk.</figcaption></figure>

      <section className={styles.signature}><span>Phase Three · Nights 5–6 · Ndutu Mobile Luxury Camp</span><h2>Recovery.</h2><p>After two nights at the fly camp, the mobile camp receives you back into real comfort, a bed, a proper shower, a cold drink. Same ecosystem, entirely different register.</p></section>
      {days.slice(4, 6).map((day) => <Day day={day} key={day.number} />)}

      <blockquote className={styles.pullQuote}>“The calving season is entirely indifferent to your disconnection. Life arrives on a scale no plan of yours could have accounted for.”</blockquote>

      <section className={styles.signature}><span>Phase Four · Night 7 · Day 8 departure</span><h2>Close &amp; Carry.</h2><p>Ngorongoro Crater gives the journey one final landscape before the return.</p></section>
      {days.slice(6).map((day) => <Day day={day} key={day.number} />)}
    </section>

    <section className={styles.season}><div><span className={styles.sectionLabel}>The calving window</span><h2>January through March.</h2><p>February is the peak calving period in this journey design. Wildlife movement, available camps and departure pricing are confirmed for your dates; no particular sighting can be promised.</p></div><div className={styles.months} aria-label="Calving Maximum Isolation travel window">{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => <span className={index < 3 ? styles.openMonth : ""} key={month}>{month}</span>)}<p className={styles.monthLegend}><b>Open</b> January, February and March<br />March departures from $11,814 per person</p></div></section>
    <JourneyAvailability journey={journey} title="When would you step off the grid?" copy="Tell us your preferred dates and party. We will confirm fly-camp and mobile-camp arrangements, internal flights and the exact investment personally." openMonths={journey.availableMonths} closedNote="This calving-season edition is available January through March only." />
<section className={styles.investment}><div><span className={styles.sectionLabel}>Investment</span><h2>Seven nights.<br /><em>Fly camp. Calving plains.</em><br />Inclusions, clearly stated.</h2></div><div className={styles.price}><small>From · March departures</small><strong>$11,814</strong><span>/ person</span><JourneyPricingNote /><p>International flights not included. Available January through March only. All internal flights, fly camp and mobile camp accommodation, full-day crater descent, the Maasai enkiama visit, Signature Rituals, and Ryravel host support are included. February is peak calving. Exact arrangements and January–March pricing are confirmed in your personal proposal.</p><div className={styles.priceActions}><Link href={requestHref}>Begin the conversation →</Link><Link className={styles.secondaryAction} href={callHref}>Request a private call</Link></div><small className={styles.reassurance}>A curator responds personally within one business day. Nothing is booked until you are ready.</small></div></section>
    <JourneyTrustLayer />

    <JourneyFaqs journey={journey} />
    <section className={styles.nextSteps}><div><span className={styles.sectionLabel}>What happens next</span><h2>A private conversation.<br />Then a more deliberate way in.</h2></div><ol><li><span>01</span><div><h3>Tell us what drew you here</h3><p>Share your dates, party and whether the fly-camp phase feels right.</p></div></li><li><span>02</span><div><h3>Speak with your curator</h3><p>We explain the facilities, safety arrangements and exact departure options.</p></div></li><li><span>03</span><div><h3>Receive your journey direction</h3><p>One considered proposal, with no booking until you are ready.</p></div></li></ol><Link href={requestHref}>Plan Calving Maximum Isolation privately →</Link></section>
    <section className={styles.closing}><div className={styles.backLinks}><Link href="/journeys">← Back to all journeys</Link><Link href="/journeys/disconnected">Disconnected · The Return</Link></div><blockquote>“I have spent my life a few steps ahead of wherever I actually was.<br />Standing in the middle of the herd, there was nowhere left to get ahead to.”</blockquote><p>Ryravel · Calving Maximum Isolation</p></section>
  </main>;
}
