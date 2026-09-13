import Link from "next/link";
import styles from "./KimbilioJourney.module.css";
import { JourneyAvailability, JourneyFaqs, JourneyProofSection, StillnessAlternatives } from "./JourneyPlanning";

const days = [
  {
    number: "01",
    title: "The Crossing",
    route: "Mwanza → Lake Victoria → Rubondo Island",
    copy: "The flight to Mwanza had wifi, which I used the entire time, out of habit more than need. The charter across the lake didn't, and somewhere past the halfway mark I noticed the engine noise had become the only sound left, no notification underneath it, no vibration in my pocket I was half-waiting for. Nobody made an announcement about it. I just noticed, the way you notice a fridge has stopped humming only once it has. My guide met the boat with one sentence, that there was nothing I had to do here, and then didn't add to it. I went to bed that night without setting an alarm and lay awake for a while, oddly unsettled by how little there was to listen to.",
  },
  {
    number: "03",
    title: "The Middle of the Lake",
    copy: "I went out for Nile perch mostly because someone else was going and I didn't want to think of a reason to say no. We caught almost nothing, and somewhere around the second hour I stopped waiting for something to happen, which felt like the actual point, even though nobody told me that in advance. Sundowners on the beach that evening were quiet in the same way the morning had been, just conversation, low, with long gaps in it that nobody rushed to fill.",
  },
  {
    number: "04",
    title: "Hearing Yourself Again",
    copy: "Slept later than I meant to, and didn't correct for it. The journal came out that morning, not because it was on any schedule, just because for the first time in days I had something in my head worth writing down instead of something I was trying to drown out. I wrote for longer than I meant to and didn't reread any of it. The last sunset on the bay had the same low-conversation quality as the night before, and I noticed I wasn't already thinking about my inbox the way I usually start doing the night before I fly home.",
  },
  {
    number: "05",
    title: "The Return",
    copy: "Breakfast, then the crossing back, and I watched my phone's signal bar reappear somewhere over open water before I'd decided whether I wanted it to. I left it face down for the rest of the crossing, not as a statement to anyone, just because I wasn't ready for the ping yet. When I finally turned the sound on, I turned it on quiet, ringer off, notifications silent, which I hadn't done in years without someone telling me to. That felt like the actual souvenir, more than anything I could have packed.",
  },
];

export default function KimyaJourney({ journey }) {
  const requestHref = `/request?journey=${journey.slug}&name=${encodeURIComponent(journey.title)}&destination=${encodeURIComponent(journey.destination)}&nights=${journey.nights}&price=${encodeURIComponent(journey.price)}`;
  const callHref = `${requestHref}&conversation=private-call`;

  return (
    <main className={`${styles.page} ${styles.kimya}`}>
      <section className={styles.hero}>
        <img src="/journeys/kimya/rubondo-island.jpg" alt="Rubondo Island across the still waters of Lake Victoria, Tanzania" width="1986" height="1366" fetchPriority="high" />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroTop}><Link href="/journeys/stillness">← The Stillness Collection</Link><span>Exhausted, The Restoration</span></div>
        <div className={styles.heroBody}>
          <p className={styles.eyebrow}>Rubondo Island · Lake Victoria</p>
          <h1>Kimya</h1>
          <p className={styles.meaning}>Swahili, silence, quiet</p>
          <h2>The first silence<br />you&apos;ve heard in years.</h2>
        </div>
        <dl className={styles.facts}>
          <div><dt>Duration</dt><dd>4 Nights, 5 Days</dd></div>
          <div><dt>Location</dt><dd>Rubondo Island, Lake Victoria</dd></div>
          <div><dt>From</dt><dd>$9,950 / person sharing</dd></div>
        </dl>
      </section>

      <section className={styles.opening}>
        <div className={styles.openingMain}>
          <span className={styles.sectionLabel}>Why Kimya</span>
          <h2>The point is not to escape noise.<br />It is to hear yourself again.</h2>
          <div className={styles.openingCopy}>
            <p>My apartment has a white noise machine, a fan I never turn off, and a fridge that hums louder than it should. I didn&apos;t notice any of that until someone pointed it out. I&apos;d stopped hearing my own home a long time ago. What I hadn&apos;t stopped hearing was the ping, always the ping, from somewhere in the flat, at every hour a person could reasonably be asleep.</p>
            <p>Four nights on an island with no road in. I didn&apos;t book this because I was burned out. I booked it because I genuinely could not remember the last time a room was quiet, actually quiet, not “no one&apos;s talking” quiet, but nothing-asking-anything-of-my-ears quiet.</p>
          </div>
        </div>
        <aside className={styles.openingAside}><span>In one sentence</span><p>The first silence you have heard in years.</p></aside>
      </section>

      <section className={styles.before}>
        <div><span className={styles.sectionLabel}>Who Goes Here</span><h2>Not burned out.<br />Just never quiet.</h2></div>
        <p>I&apos;m still good at my job. That was the confusing part, going into this. I wasn&apos;t dropping anything, wasn&apos;t missing deadlines, wasn&apos;t the person people were worried about in meetings. I&apos;d just built my entire nervous system around a background hum I&apos;d stopped registering as a hum. It took a lake with no way to reach the other side by road for me to notice how loud my own life had gotten.</p>
      </section>

      <section className={styles.fit} aria-labelledby="kimya-fit">
        <div><span className={styles.sectionLabel}>Is Kimya for you?</span><h2 id="kimya-fit">You do not need to fall apart<br />before you choose quiet.</h2></div>
        <div><p>Kimya is designed for the traveller who is still functioning, still delivering, and quietly aware that every room in their life is asking for attention.</p><ul><li>You want one island, not a checklist of destinations.</li><li>You want unstructured time without having to manufacture stillness.</li><li>You want the return home protected as carefully as the journey out.</li></ul><Link href={requestHref}>Ask a curator about Kimya →</Link></div>
      </section>

      <section className={styles.itinerary} aria-labelledby="kimya-itinerary">
        <header><span className={styles.sectionLabel}>The journey</span><h2 id="kimya-itinerary">Five days of<br /><em>hearing less.</em></h2></header>
        <article className={styles.day}><div className={styles.dayMeta}><span>Day {days[0].number}</span><h3>{days[0].title}</h3><small>{days[0].route}</small></div><p>{days[0].copy}</p></article>

        <figure className={styles.landscape}>
          <img src="/journeys/kimya/rubondo-birds.jpg" alt="Waterbirds resting on rocks along the Rubondo Island shoreline" width="2067" height="1360" loading="lazy" />
          <figcaption>Rubondo Island · Lake Victoria · an island with no road in and no need to fill the quiet.</figcaption>
        </figure>

        <article className={styles.day}><div className={styles.dayMeta}><span>Day 02</span><h3>The First Silence</h3></div><p>We walked to the eastern beach before it was properly light, nobody speaking, which I found strangely hard for the first ten minutes, my brain kept reaching for something to fill the space with.</p></article>

        <aside className={styles.signature}>
          <span>The Signature Moment</span>
          <p className={styles.signatureName}>The Listening</p>
          <h2>An hour with nothing asking<br />anything of my ears.</h2>
          <p>Then it just stopped, the reaching. There was the sound of water doing very little, some bird I couldn&apos;t name working through its morning routine, and under all of it, actual quiet, the kind I don&apos;t think my ears had been offered in years without a fan or a fridge or a notification sitting underneath it. About twenty minutes in, without deciding to, I started crying, not from sadness, more like something had been turned down that had been turned up so long I&apos;d forgotten it had a dial at all. Nobody said anything about it. Nobody needed to.</p>
        </aside>

        <article className={styles.day}><div className={styles.dayMeta}><span>Day 02 · Afternoon</span><h3>Nothing written into it</h3></div><p>The rest of the day had nothing written into it on purpose. I took the optional chimp forest walk in the cool part of the afternoon mostly to have something to do with my legs, and found I didn&apos;t mind, for once, not talking to anyone for two straight hours.</p></article>

        {days.slice(1, 3).map((day) => <article className={styles.day} key={day.number}><div className={styles.dayMeta}><span>Day {day.number}</span><h3>{day.title}</h3></div><p>{day.copy}</p></article>)}

        <blockquote className={styles.pullQuote}>“The decision is made on the lake, not at the airport. That&apos;s the part you actually take home.”</blockquote>

        <article className={styles.day}><div className={styles.dayMeta}><span>Day {days[3].number}</span><h3>{days[3].title}</h3></div><p>{days[3].copy}</p></article>
      </section>

      <section className={styles.rule}>
        <span className={styles.sectionLabel}>The Kimya Rule</span>
        <h2>One signal window a day,<br />set by you.</h2>
        <p>Most guests stop using it by day two, not because anyone tells them to, but because by then the noise has stopped feeling like something they&apos;re missing. The island enforces the quiet. We just don&apos;t get in the way of it.</p>
      </section>

      <section className={styles.stay}>
        <div><span className={styles.sectionLabel}>Where You Stay</span><h2>One camp, on an island with no road in.</h2><p className={styles.hotelZone}>Rubondo Island, Lake Victoria</p><h3>Rubondo Island Camp</h3><p>Full board, house drinks, all camp activities</p></div>
        <strong>Nights 1–4</strong>
      </section>

      <section className={styles.season}>
        <div><span className={styles.sectionLabel}>Available Months</span><h2>June through March.</h2><p>Rubondo Island Camp closes in April and May for the long rains. June through October is cooler and drier; the quieter green months bring migratory birds, butterflies and a more tropical rhythm.</p></div>
        <div className={styles.months} aria-label="Kimya travel season">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => <span className={![3, 4].includes(index) ? styles.openMonth : ""} key={month}>{month}</span>)}
          <p className={styles.monthLegend}><b>Open</b> June–March<br /><b>Closed</b> April–May for the long rains</p>
        </div>
      </section>

      <JourneyAvailability journey={journey} title="When would you choose quiet?" copy="Choose a preferred date and who will travel. We will check the camp, internal flight and island transfer together, then return with a considered route—not a disconnected list of bookings." openMonths={journey.availableMonths} closedNote="Rubondo Island Camp closes in April and May for the long rains." />

      <section className={styles.investment}>
        <div><span className={styles.sectionLabel}>Investment</span><h2>Four nights.<br />A silence you don&apos;t<br /><em>have to manufacture.</em></h2></div>
        <div className={styles.price}><small>From</small><strong>$9,950</strong><span>/ person sharing</span><p>International flights to and from Mwanza not included, along with travel insurance beyond medical evacuation cover, premium spirits, gratuities, and personal purchases. All transfers and internal flights, four nights full board with house drinks, all camp activities, The Listening, the Departure Box, and the Ryravel journal are included.</p><div className={styles.priceActions}><Link href={requestHref}>Begin the conversation →</Link><Link className={styles.secondaryAction} href={callHref}>Request a private call</Link></div><small className={styles.reassurance}>A curator responds personally within one business day. Nothing is booked until you are ready.</small></div>
      </section>

      <JourneyProofSection />
      <JourneyFaqs journey={journey} />

      <section className={styles.nextSteps}>
        <div><span className={styles.sectionLabel}>What happens next</span><h2>A private conversation.<br />Then a considered direction.</h2></div>
        <ol><li><span>01</span><div><h3>Tell us where you are</h3><p>Share the dates, pace and kind of quiet you need.</p></div></li><li><span>02</span><div><h3>Speak with your curator</h3><p>We clarify what the journey must protect and what it should leave out.</p></div></li><li><span>03</span><div><h3>Receive your Kimya direction</h3><p>A considered journey shaped around you, not a catalogue itinerary.</p></div></li></ol>
        <Link href={requestHref}>Plan Kimya privately →</Link>
      </section>

      <StillnessAlternatives currentSlug={journey.slug} />

      <section className={styles.closing}>
        <div className={styles.backLinks}><Link href="/journeys">← Back to all journeys</Link><Link href="/journeys/stillness">The Stillness Collection</Link></div>
        <blockquote>“I didn&apos;t know how loud my life was.<br />I only noticed once it stopped.”</blockquote>
        <p>, Ryravel · Stillness is the only luxury left.</p>
      </section>
    </main>
  );
}
