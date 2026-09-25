import Link from "next/link";
import styles from "./KimbilioJourney.module.css";
import JourneyTrustLayer, { JourneyPricingNote } from "../../components/JourneyTrustLayer";
import { JourneyAvailability, JourneyFaqs, JourneyProofSection, StillnessAlternatives } from "./JourneyPlanning";

const days = [
  {
    number: "01",
    title: "The Landing",
    route: "Victoria Falls → Matetsi Private Reserve",
    copy: "Nobody handed me a laminated schedule at check-in, which after years of conferences and hospital rotations felt almost suspicious at first. My guide showed me the room, the plunge pool facing the river, and said essentially nothing else needed deciding today. I sat by the water until I lost track of how long I'd been sitting, ate something simple, and fell asleep before nine without meaning to, the kind of sleep where you don't remember choosing to close your eyes, you just find yourself somewhere else.",
  },
  {
    number: "02",
    title: "Water, Not Walls",
    copy: "No alarm, and I woke up anyway at my usual hour, then made myself lie there instead of getting up, which felt oddly like resisting a craving. Breakfast came whenever I actually wanted it, not whenever a buffet closed. I spent most of midday doing nothing, which for me has always meant secretly reviewing something in my head, except this time there was nothing urgent enough to review, so I just watched the river do what it does, which is move without asking anyone's permission. Late afternoon was a cruise on the water, and something about watching it slide past without effort undid a kind of static I hadn't noticed building behind my eyes for months. A massage was arranged for whenever I said I was ready, not on a printed slot, and by the time I said the word, my shoulders had already started dropping an inch I didn't know they'd been holding.",
  },
  {
    number: "03",
    title: "The Long Middle",
    copy: "Nothing was scheduled, and for the first hour I didn't know what to do with a day that wasn't asking anything of me. By midmorning, unprompted, I found myself actually wanting to go out on a game drive, which surprised me more than the animals did. We found a pair of hyenas resting in the shade, entirely unbothered, and I remember thinking that they looked exactly as tired as I'd felt for the last year, except they weren't apologizing for it. I hadn't expected to want to go out today. Wanting something again, instead of just agreeing to it because it was offered, felt like the first real sign that something in me was refilling.",
  },
  {
    number: "04",
    title: "Strength Returns",
    copy: "I woke up before the alarm I hadn't set, which took me a second to even register as unusual, since for years the only thing that's woken me early has been a pager. We took a canoe out at a pace I set myself, no one pushing to cover more river than I felt like covering. The farewell dinner that night was on the riverbank, quiet, unhurried, and I noticed, somewhere between courses, that I'd stopped doing the thing where I calculate how many hours of sleep I'll get before the next obligation. There wasn't a next obligation being calculated at all.",
  },
  {
    number: "05",
    title: "The Return",
    copy: "Breakfast was slow, and I let it be, even with a flight to think about. On the transfer back to the Falls, I noticed my hands weren't doing the small restless thing they usually do, tapping a pen, refreshing something, some low hum of readiness for the next demand. I wasn't fixed. Four days doesn't undo however long it took to get here. But something had stopped running quite so close to empty, and for the first time in longer than I can place, I didn't feel guilty about not being finished with the recovering.",
  },
];

export default function KuponaJourney({ journey }) {
  const requestHref = `/request?journey=${journey.slug}&name=${encodeURIComponent(journey.title)}&destination=${encodeURIComponent(journey.destination)}&nights=${journey.nights}&price=${encodeURIComponent(journey.price)}`;
  const callHref = `${requestHref}&conversation=private-call`;

  return (
    <main className={`${styles.page} ${styles.kupona}`}>
      <section className={styles.hero}>
        <img src="/journeys/kupona/matetsi-river-suite.jpg" alt="Private plunge pool overlooking the Zambezi River at Matetsi Victoria Falls" width="1024" height="682" fetchPriority="high" />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroTop}><Link href="/journeys/stillness">← The Stillness Collection</Link><span>Exhausted, The Restoration</span></div>
        <div className={styles.heroBody}>
          <p className={styles.eyebrow}>Matetsi · Victoria Falls · Zimbabwe</p>
          <h1>Kupona</h1>
          <p className={styles.meaning}>Shona, to heal, to recover</p>
          <h2>Where what is depleted<br />is restored.</h2>
        </div>
        <dl className={styles.facts}>
          <div><dt>Duration</dt><dd>4 Nights, 5 Days</dd></div>
          <div><dt>Location</dt><dd>Matetsi, Victoria Falls</dd></div>
          <div><dt>From</dt><dd>$5,750 / person sharing</dd></div>
        </dl>
      </section>

      <section className={styles.opening}>
        <div className={styles.openingMain}>
          <span className={styles.sectionLabel}>Why Kupona</span>
          <h2>The point is not to do more gently.<br />It is to let the tank refill.</h2>
          <div className={styles.openingCopy}>
            <p>I&apos;ve been running a clinic that never technically closes, not on paper, in the sense that my phone is always the backup line when the on-call doctor is stuck in traffic. I stopped drinking coffee because I liked it years ago. I drink it now the way you top up a car that&apos;s already running on fumes, just enough to make it to the next thing.</p>
            <p>Four nights. I didn&apos;t want an itinerary. I wanted somewhere that wouldn&apos;t ask me what I felt like doing until my body actually had an answer, because for longer than I can measure, it hasn&apos;t had one.</p>
          </div>
        </div>
        <aside className={styles.openingAside}><span>In one sentence</span><p>Where what is depleted is restored.</p></aside>
      </section>

      <section className={styles.before}>
        <div><span className={styles.sectionLabel}>Who Goes Here</span><h2>Not looking for adventure.<br />Looking for the tank to fill back up.</h2></div>
        <p>Everyone around me treats me like the reserve tank, the one they call when their own runs out. I&apos;ve been good at that for a long time, good enough that nobody, including me, noticed how long I&apos;d been running on empty myself. I came here alone, on purpose, because the one person I don&apos;t have to perform for had a work trip of her own that week, and honestly, some of this I needed to do without an audience of any kind, even a kind one.</p>
      </section>

      <section className={styles.fit} aria-labelledby="kupona-fit">
        <div><span className={styles.sectionLabel}>Is Kupona for you?</span><h2 id="kupona-fit">You are still carrying everyone.<br />You can feel the reserve thinning.</h2></div>
        <div><p>Kupona is designed for the traveller who remains capable, dependable and deeply depleted—and who needs the journey to ask less before the body can answer honestly.</p><ul><li>You want one riverfront reserve, not a moving itinerary.</li><li>You want meals, mornings and movement to follow your body rather than a clock.</li><li>You want restoration to continue after the flight home.</li></ul><Link href={requestHref}>Ask a curator about Kupona →</Link></div>
      </section>

      <section className={styles.itinerary} aria-labelledby="kupona-itinerary">
        <header><span className={styles.sectionLabel}>The journey</span><h2 id="kupona-itinerary">Five days of<br /><em>letting the reserve return.</em></h2></header>
        <article className={styles.day}><div className={styles.dayMeta}><span>Day {days[0].number}</span><h3>{days[0].title}</h3><small>{days[0].route}</small></div><p>{days[0].copy}</p></article>

        <figure className={styles.landscape}>
          <img src="/journeys/kupona/zambezi-boat-aerial.jpg" alt="A single boat tracing a quiet wake across the Zambezi River at Matetsi" width="1024" height="682" loading="lazy" />
          <figcaption>Zambezi River · Matetsi Private Reserve · water moving without urgency.</figcaption>
        </figure>

        {days.slice(1, 4).map((day) => <article className={styles.day} key={day.number}><div className={styles.dayMeta}><span>Day {day.number}</span><h3>{day.title}</h3></div><p>{day.copy}</p></article>)}

        <blockquote className={styles.pullQuote}>“You leave before you feel done. That&apos;s correct. This doesn&apos;t finish the recovery. It starts it.”</blockquote>

        <article className={styles.day}><div className={styles.dayMeta}><span>Day {days[4].number}</span><h3>{days[4].title}</h3></div><p>{days[4].copy}</p></article>
      </section>

      <section className={styles.rule}>
        <span className={styles.sectionLabel}>The Kupona Principle</span>
        <h2>No alarms. No enforced meal times.<br />Nothing before your body asks for it.</h2>
        <p>The schedule bends to the depleted person, not the other way round. That&apos;s not a nice line in a brochure here, it&apos;s the entire design of the four days.</p>
      </section>

      <section className={styles.stay}>
        <div><span className={styles.sectionLabel}>Where You Stay</span><h2>One reserve, 15 kilometres of river to yourself.</h2><p className={styles.hotelZone}>Matetsi Private Reserve, Victoria Falls</p><h3>Matetsi Victoria Falls</h3><p>Private suite with plunge pool · Zambezi River frontage</p></div>
        <strong>Nights 1–4</strong>
      </section>

      <section className={styles.return}>
        <div><span className={styles.sectionLabel}>Act III · The Return</span><h2>Recovery is not finished.<br /><em>It has started.</em></h2></div>
        <p>Kupona does not promise that four days will undo the years that emptied the tank. It protects the first part of the return instead: the pace you rediscovered, the demands you no longer answer automatically, and a curator check-in that asks what must remain different once ordinary life begins asking again.</p>
      </section>

      <section className={styles.season}>
        <div><span className={styles.sectionLabel}>Available Months</span><h2>January through March.</h2><p>This journey is timed to when depletion actually peaks, the stretch just past the year&apos;s end, when the tank is at its emptiest and the reserve&apos;s own long-stay rhythm makes the quiet easiest to hold.</p></div>
        <div className={styles.months} aria-label="Kupona travel season">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => <span className={index <= 2 ? styles.openMonth : ""} key={month}>{month}</span>)}
          <p className={styles.monthLegend}><b>Open</b> January, February, March<br />A deliberately limited annual edition</p>
        </div>
      </section>

      <JourneyAvailability journey={journey} title="When would you let the reserve return?" copy="Choose a preferred date and who will travel. We will confirm the riverfront suite and the complete Matetsi sequence, then return with what is genuinely available." openMonths={journey.availableMonths} closedNote="This edition is intentionally held within January–March." />

      <section className={styles.investment}>
        <div><span className={styles.sectionLabel}>Investment</span><h2>Four nights.<br />What&apos;s depleted,<br /><em>given room to refill.</em></h2></div>
<div className={styles.price}><small>From</small><strong>$5,750</strong><span>/ person sharing</span><JourneyPricingNote /><p>International flights, travel insurance, premium spirits, gratuities, personal purchases, and additional spa treatments beyond the one included massage are not included. All meals and house drinks, game drives, walks, the Zambezi boat cruise, canoeing, fishing, internal transfers, a guided tour of the Falls, laundry, emergency medical evacuation cover, one river-view massage, the Departure Box, and the Ryravel journal are included.</p><div className={styles.priceActions}><Link href={requestHref}>Begin the conversation →</Link><Link className={styles.secondaryAction} href={callHref}>Request a private call</Link></div><small className={styles.reassurance}>A curator responds personally within one business day. Nothing is booked until you are ready.</small></div>
      </section>

      <JourneyTrustLayer />
      <JourneyProofSection />
      <JourneyFaqs journey={journey} />

      <section className={styles.nextSteps}>
        <div><span className={styles.sectionLabel}>What happens next</span><h2>A private conversation.<br />Then room to recover.</h2></div>
        <ol><li><span>01</span><div><h3>Tell us what has depleted you</h3><p>Share your dates, pace and the demands the journey needs to quiet.</p></div></li><li><span>02</span><div><h3>Speak with your curator</h3><p>We confirm whether Kupona is the right shape of restoration for you.</p></div></li><li><span>03</span><div><h3>Receive your Kupona direction</h3><p>One considered journey, including Matetsi and the return you carry home.</p></div></li></ol>
        <Link href={requestHref}>Plan Kupona privately →</Link>
      </section>

      <StillnessAlternatives currentSlug={journey.slug} />

      <section className={styles.closing}>
        <div className={styles.backLinks}><Link href="/journeys">← Back to all journeys</Link><Link href="/journeys/stillness">The Stillness Collection</Link></div>
        <blockquote>“I didn&apos;t come here to be fixed.<br />I came here to stop running on empty long enough to notice I could refill.”</blockquote>
        <p>, Ryravel · Stillness is the only luxury left.</p>
      </section>
    </main>
  );
}
