import Link from "next/link";
import styles from "./KimbilioJourney.module.css";
import { ExhaustedAlternatives, JourneyAvailability, JourneyFaqs, JourneyProofSection } from "./JourneyPlanning";

const days = [
  { number: "01", title: "You Are Here Now", content: [
    { text: "The welcome tray had a rosewater towel, a small bottle of baobab oil, and a handwritten card, and I found myself already wondering if I was meant to use the oil that night or wait until morning, before I caught the thought and let it go unanswered on purpose. No programme, no evening session to attend. I ate a small dinner and went to bed without setting an alarm, which felt oddly like skipping homework." },
  ] },
  { number: "02", title: "The Body Remembers", content: [
    { label: "Morning Practice", text: "Sunrise beach yoga, and the instructor said something at the start that stuck with me all week, that the session was guided but not corrective, that I could move at my own pace inside the flow. I kept waiting for the gentle correction anyway, a hand adjusting my shoulder, a note about my alignment. It never came. I spent the first twenty minutes slightly thrown by that, and the last twenty actually moving instead of performing movement." },
    { text: "An Ayurvedic consultation followed, forty-five minutes of questions about my sleep, my digestion, my temperament, nothing I could have researched in advance to give the \"right\" answers to. The midday stretched out with nothing in it, and I sat with that discomfort longer than I expected to." },
    { label: "Evening Ritual", text: "A ninety-minute Abhyanga massage, warm baobab and sesame oil in long strokes matched to whatever my practitioner had read in me that morning. I didn't ask what type I was. For once, I didn't need the label to feel the effect of it." },
  ] },
  { number: "03", title: "The Island as Teacher", content: [
    { label: "Morning Practice", text: "Breathwork on the beach at dawn, no movement required, and I kept catching myself trying to breathe correctly, counting beats, checking my own form as if someone were about to grade it. Nobody was. Eventually I just let the tide set the pace instead of my own internal metronome." },
    { text: "A spice garden visit at a family's own plot, no script to follow, no facts I was expected to retain. I walked, I smelled things, I didn't take a single note, which for me is unusual enough to mention." },
    { label: "Evening Ritual", text: "A hot oil scalp and neck treatment, then a foot soak in sea salt and frangipani. Nobody asked me how I was progressing. There was nothing to progress toward that evening, just the treatment itself." },
  ] },
  { number: "04", title: "Sand, Sky, Nothing Else", content: [
    { label: "Morning Practice", text: "Yin yoga, long held poses, no flow to master, no sequence to remember for later. My instructor didn't fill the silence between poses the way I half-expected her to, no verbal cues to hold onto, and the not-being-guided was harder than the actual stretching." },
    { text: "The midday was a free beach day, and a basket was waiting at my sunbed, a kaftan that fit exactly, a small bottle of baobab oil, a note that said I wasn't behind, I was exactly here. I read it twice, mostly because I don't think anyone had told me that in those words before, that showing up as I already was counted as enough." },
    { text: "Later that afternoon, a photographer met me at golden hour and gave no posing instructions unless I asked for them, which I found myself not doing. Forty-five minutes, and for most of it I wasn't performing for the camera the way I usually do, chin at the angle I've practiced, the smile I know reads well. The pictures arrived three days after I got home, and the person in them looked less rehearsed than I expected to see." },
    { label: "Evening Ritual, Shirodhara", text: "Warm oil poured in a continuous stream over my forehead for thirty minutes, then guided yoga nidra. I have never once fallen asleep during a guided anything, I'm always tracking whether I'm doing the relaxation correctly. That night I lost the thread of the instructions halfway through and didn't notice until I woke up." },
  ] },
  { number: "05", title: "The Morning You Didn't Expect", content: [
    { label: "Morning Practice", text: "Guided meditation on the beach, seated, ocean-facing, a body scan and a question about what I was releasing and what I was carrying forward. I didn't have a tidy answer ready, which would usually bother me, arriving somewhere without the right response prepared. It didn't that morning." },
    { text: "The final free stretch of the trip had nothing written into it, and nothing about that felt unfinished for once." },
    { text: "That evening, without warning, a private ocean float was arranged, a Zanzibari sound healer playing a singing bowl from the shoreline while I floated, supported, in the warm water. I didn't try to breathe correctly or hold any particular posture. There was no posture to hold. The resonance just moved through the water and through me, and I let it, which is not a sentence I expected to be able to say about myself this week. Dinner afterward was alone, at a table with my name on the reservation, and I didn't feel the need to fill that silence either." },
  ] },
  { number: "06", title: "Late Checkout. The Return Begins.", content: [
    { text: "A final sunrise yoga session, shorter and softer than Day Two's, and I noticed the instructor had adjusted the pace without me asking, the same way she'd read the first session, except this time what she was reading back to me had actually changed. A closing wellness consultation gave me a written protocol for the first thirty days home, and I caught myself already planning to follow it to the letter before catching myself catching myself, and deciding I'd let it be a loose guide instead of a syllabus." },
    { text: "Checkout wasn't until one, and I let the morning stay slow. A box was presented before I left, the baobab oil I'd used all week, a small woven pouch, dried spices from the family garden, a rolled copy of my wellness notes, and a sealed letter from my host. I read the letter in the car, and for the first time all week, I didn't reread it immediately looking for something I'd missed. I just let it have said what it said." },
  ] },
];

const monthBands = [
  ["Jan", "shoulderMonth"], ["Feb", "shoulderMonth"], ["Mar", "lowMonth"], ["Apr", "lowMonth"],
  ["May", "lowMonth"], ["Jun", "shoulderMonth"], ["Jul", "highMonth"], ["Aug", "highMonth"],
  ["Sep", "highMonth"], ["Oct", "highMonth"], ["Nov", "shoulderMonth"], ["Dec", "shoulderMonth"],
];

function Day({ day }) {
  return <article className={styles.day}><div className={styles.dayMeta}><span>Day {day.number}</span><h3>{day.title}</h3><small>Zanzibar</small></div><div className={styles.dayCopy}>{day.content.map(({ label, text }) => <div key={text}>{label && <strong className={styles.dayCue}>{label}</strong>}<p>{text}</p></div>)}</div></article>;
}

export default function ResetJourney({ journey }) {
  const requestHref = `/request?journey=${journey.slug}&name=${encodeURIComponent(journey.title)}&destination=${encodeURIComponent(journey.destination)}&nights=${journey.nights}&price=${encodeURIComponent(journey.price)}`;
  const callHref = `${requestHref}&conversation=private-call`;

  return <main className={`${styles.page} ${styles.reset}`}>
    <section className={styles.hero}><img src={journey.image} alt={journey.imageAlt} width="800" height="533" fetchPriority="high" /><div className={styles.heroShade} aria-hidden="true" /><div className={styles.heroTop}><Link href="/journeys/exhausted">← Exhausted, The Restoration</Link><span>Five nights · Pure coastal wellness</span></div><div className={styles.heroBody}><p className={styles.eyebrow}>Zanzibar · Private wellness retreat</p><h1>The Reset</h1><p className={styles.meaning}>Five nights. One island. No syllabus for rest.</p><h2>Nothing to perform.<br />Nowhere to be graded.</h2></div><dl className={styles.facts}><div><dt>Duration</dt><dd>5 Nights, 6 Days</dd></div><div><dt>Destination</dt><dd>Zanzibar · Tanzania</dd></div><div><dt>From</dt><dd>$12,618 / person sharing</dd></div></dl></section>

    <section className={styles.opening}><div className={styles.openingMain}><span className={styles.sectionLabel}>Why The Reset</span><h2>A practice at dawn.<br />A ritual at dusk.<br />The hours between are yours.</h2><div className={styles.openingCopy}><p>I have never once shown up late to a class in my life, yoga included. I arrive early, I set up my mat exactly where the instructor can see me, and some part of me is always quietly waiting to be told I'm doing it right.</p><p>Five nights, one island. I've done wellness retreats before, plural, and I usually come home with a new routine to maintain, a new thing to be diligent about. This one didn't hand me a routine. Every day had a practice at dawn and a ritual at dusk, and between them, nothing, no agenda, no instructor to please for seven straight hours. I didn't know what to do with that at first, which tells you something about what I actually needed.</p></div></div><aside className={styles.openingAside}><span>In one sentence</span><p>Rest is not another thing to get right.</p></aside></section>

    <section className={styles.before}><div><span className={styles.sectionLabel}>The Daily Rhythm</span><h2>Bookended days.<br />Open middles.</h2></div><p>Every day is bookended, a morning practice at dawn, an evening ritual at day's end. Between roughly ten and five, nothing is scheduled. That stretch belongs entirely to the traveler. The unstructured hours are not a gap in the plan, they are the plan.</p></section>

    <section className={styles.fit}><div><span className={styles.sectionLabel}>Is The Reset for you?</span><h2>Good at doing.<br />Ready to stop proving.</h2></div><div><p>For the traveller who arrives early, follows instructions and wants a restorative break that does not become another performance target.</p><ul><li>You want a private Zanzibar stay with guided morning and evening experiences.</li><li>You need genuinely unstructured daylight hours, not a tightly programmed retreat.</li><li>You want a considered return without a new syllabus to keep up with.</li></ul><Link href={requestHref}>Ask a curator about The Reset →</Link></div></section>

    <section className={styles.itinerary} aria-labelledby="reset-itinerary"><header><span className={styles.sectionLabel}>The journey · Phase One · Arrive &amp; Soften</span><h2 id="reset-itinerary">Six days of<br /><em>letting rest be enough.</em></h2><p>Nights 1–2 · Zanzibar</p></header>
      {days.slice(0, 2).map((day) => <Day day={day} key={day.number} />)}
      <figure className={styles.landscape}><img src="/journeys/the-reset/wellness-treatment.jpg" alt="Practitioner giving a guest a shoulder and back treatment in warm light" width="1556" height="2048" loading="lazy" /><figcaption>A quiet treatment, without a performance to measure.</figcaption></figure>
      <section className={styles.signature}><span>Phase Two · Nights 3–4 · Zanzibar</span><h2>The Deepening.</h2><p>Guided mornings, considered evening treatments and long unscheduled afternoons make room for the island to do its work.</p></section>
      {days.slice(2, 4).map((day) => <Day day={day} key={day.number} />)}
      <blockquote className={styles.pullQuote}>“The renewal happens in the unscheduled hours, not the programmed ones. Nobody is grading how well you rest.”</blockquote>
      <section className={styles.signature}><span>Phase Three · Night 5 · Day 6 departure</span><h2>Integration &amp; Close.</h2><p>A final free stretch, one unexpected evening and a slow checkout let the journey close without a sudden return to urgency.</p></section>
      {days.slice(4).map((day) => <Day day={day} key={day.number} />)}
    </section>

    <section className={styles.season}><div><span className={styles.sectionLabel}>Prices by Month</span><h2>Available year-round.</h2><p>The Reset is designed for all twelve months. Prices are per person based on two people sharing and vary by season, not by experience quality. Resort and practitioner availability are confirmed for your dates.</p></div><div className={styles.months} aria-label="The Reset seasonal price bands">{monthBands.map(([month, band]) => <span className={styles[band]} key={month}>{month}</span>)}<p className={styles.monthLegend}><b>High</b> July · August · September · October<br /><b>Shoulder</b> January · February · June · November · December<br /><b>Low</b> March · April · May</p></div></section>
    <JourneyAvailability journey={journey} title="When would you give yourself five nights?" copy="Share your preferred dates and party. We will confirm the Zanzibar stay, treatments and exact seasonal investment personally." openMonths={journey.availableMonths} closedNote="Prices vary by season; the experience is tailored to your dates." confirmationNote="We confirm the resort, practitioner and treatment space personally before anything is booked." />
    <section className={styles.investment}><div><span className={styles.sectionLabel}>Investment</span><h2>Five nights.<br /><em>Pure coastal wellness.</em><br />Everything included.</h2></div><div className={styles.price}><small>From</small><strong>$12,618</strong><span>/ person · based on two sharing</span><p>International flights not included. No internal flights required, Zanzibar throughout. All transfers, morning practices, evening treatments, Ayurvedic consultations, activities, Signature Rituals, and Ryravel host support are included. The exact resort, treatments and seasonal price are confirmed in your personal proposal.</p><div className={styles.priceActions}><Link href={requestHref}>Begin the conversation →</Link><Link className={styles.secondaryAction} href={callHref}>Request a private call</Link></div><small className={styles.reassurance}>A curator responds personally within one business day. Nothing is booked until you are ready.</small></div></section>
    <JourneyProofSection arc="exhausted" />
    <JourneyFaqs journey={journey} />
    <section className={styles.nextSteps}><div><span className={styles.sectionLabel}>What happens next</span><h2>A private conversation.<br />Then a gentler rhythm.</h2></div><ol><li><span>01</span><div><h3>Tell us what rest would mean</h3><p>Share your dates, party and the space you need between practices.</p></div></li><li><span>02</span><div><h3>Speak with your curator</h3><p>We confirm the stay, practitioner schedule and exact seasonal investment.</p></div></li><li><span>03</span><div><h3>Receive your Reset direction</h3><p>One personal proposal, with no booking until you are ready.</p></div></li></ol><Link href={requestHref}>Plan The Reset privately →</Link></section>
    <ExhaustedAlternatives currentSlug={journey.slug} />
    <section className={styles.closing}><div className={styles.backLinks}><Link href="/journeys">← Back to all journeys</Link><Link href="/journeys/exhausted">The Exhausted Collection</Link></div><blockquote>“I have spent my life trying to be the best student in the room.<br />Here, there was no syllabus, and I stayed anyway.”</blockquote><p>Ryravel · The Reset</p></section>
  </main>;
}
