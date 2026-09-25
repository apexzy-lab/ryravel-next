import Link from "next/link";
import styles from "./KimbilioJourney.module.css";
import JourneyTrustLayer, { JourneyPricingNote } from "../../components/JourneyTrustLayer";
import { JourneyAvailability, JourneyFaqs, JourneyProofSection, StillnessAlternatives } from "./JourneyPlanning";

const days = [
  {
    number: "01",
    title: "The Long Way In",
    route: "Victoria Falls → Hwange National Park",
    copy: "I watched the bars on my phone drop, one at a time, as the road thinned into something less like a road, and caught myself already composing the out-of-office reply in my head before I noticed I didn't need one anymore, nobody was expecting a reply from me this week at all. By the time the veld properly opened up, wide and flat and going gold at the edges, I realized the draft in my head had quietly stopped writing itself. Camp appeared at dusk, fire already going, and I sat by it long after dinner without once reaching for anything to fill the quiet with.",
  },
  {
    number: "02",
    title: "The Veld Goes Quiet",
    copy: "I chose the night before whether to get up for the dawn drive, which was somehow harder than it should have been, I kept waiting for someone to tell me the right answer. I went, and watched the light come up over the floodplain with nothing in my head competing with it for once. Back at camp, elephants came to drink right in front of the deck while I sat with tea I didn't rush through. The afternoon had nothing scheduled, and instead of filling it with a plan of my own, I just let it stay empty, which took real effort the first hour and none at all by the second.",
  },
  {
    number: "03",
    title: "The Middle of Nowhere",
    copy: "We walked far enough from the vehicle that it disappeared behind a rise, and somewhere in that walk, without deciding to, I stopped narrating my own life to myself, the constant background commentary I hadn't clocked as constant until it wasn't there. My guide didn't fill the silence either, just pointed out a track in the dust every so often and let the rest sit. Sundowners on the plains, dinner after, and for the first time in longer than I can place, I wasn't performing being relaxed for anyone, including myself.",
  },
  {
    number: "04",
    title: "Peace Is a Place",
    copy: "The slowest morning yet, and the journal actually got used, not because I'd scheduled it, but because for once there was nothing louder in my head competing with the page. One last drive across the floodplain in the afternoon. That night I was in bed early, and it wasn't because I was tired, there was just nothing left worth staying up for, no argument to keep having with myself in the dark.",
  },
  {
    number: "05",
    title: "The Return",
    copy: "Early drive out to the gate, the bars climbing back one by one the way they'd dropped on the way in, and I watched my phone gather three days of nothing urgent without reaching for it. I didn't rush to check any of it. That was the part I noticed most, not the silence itself, but how little I needed to end it the moment it was technically available to me again.",
  },
];

export default function RunyararoJourney({ journey }) {
  const requestHref = `/request?journey=${journey.slug}&name=${encodeURIComponent(journey.title)}&destination=${encodeURIComponent(journey.destination)}&nights=${journey.nights}&price=${encodeURIComponent(journey.price)}`;
  const callHref = `${requestHref}&conversation=private-call`;

  return (
    <main className={`${styles.page} ${styles.runyararo}`}>
      <section className={styles.hero}>
        <img src="/journeys/runyararo/hwange-sunset.webp" alt="Golden sunset behind acacia trees in Hwange National Park, Zimbabwe" width="1024" height="640" fetchPriority="high" />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroTop}><Link href="/journeys/stillness">← The Stillness Collection</Link><span>Exhausted, The Restoration</span></div>
        <div className={styles.heroBody}>
          <p className={styles.eyebrow}>Hwange National Park · Zimbabwe</p>
          <h1>Runyararo</h1>
          <p className={styles.meaning}>Shona, tranquility, peace</p>
          <h2>Where the noise<br />cannot follow.</h2>
        </div>
        <dl className={styles.facts}>
          <div><dt>Duration</dt><dd>4 Nights, 5 Days</dd></div>
          <div><dt>Location</dt><dd>Hwange National Park</dd></div>
          <div><dt>From</dt><dd>$4,950 / person sharing</dd></div>
        </dl>
      </section>

      <section className={styles.opening}>
        <div className={styles.openingMain}>
          <span className={styles.sectionLabel}>Why Runyararo</span>
          <h2>The point is not to find a quieter room.<br />It is to let the noise run out.</h2>
          <div className={styles.openingCopy}>
            <p>I&apos;ve done the spa weekend. Twice, actually. Both times I lay on the table getting a facial I couldn&apos;t feel because I was three steps deep into a reply I hadn&apos;t sent yet, to an email that could have waited until Monday. The room was quiet. I wasn&apos;t.</p>
            <p>Four nights in Hwange. I didn&apos;t need less to look at. I needed somewhere so far past the edge of my usual life that the part of my brain that keeps drafting things I don&apos;t need to draft would finally run out of material.</p>
          </div>
        </div>
        <aside className={styles.openingAside}><span>In one sentence</span><p>Where the noise cannot follow.</p></aside>
      </section>

      <section className={styles.before}>
        <div><span className={styles.sectionLabel}>Who Goes Here</span><h2>Functional.<br />Never at peace.</h2></div>
        <p>Nothing about me looks broken. I show up, I deliver, I&apos;ve never once missed something because I couldn&apos;t cope. What nobody sees is that I can be sitting in total silence, no phone in reach, and still be mid-argument with someone in my head about a meeting from three weeks ago. Relaxing has never actually worked on me, because the noise was never really coming from outside.</p>
      </section>

      <section className={styles.fit} aria-labelledby="runyararo-fit">
        <div><span className={styles.sectionLabel}>Is Runyararo for you?</span><h2 id="runyararo-fit">Nothing looks broken.<br />Nothing inside feels quiet.</h2></div>
        <div><p>Runyararo is designed for the traveller who is still delivering, still composed and unable to stop mentally rehearsing what ordinary life has already finished asking of them.</p><ul><li>You want one intimate camp rather than a moving itinerary.</li><li>You want silence without having to perform relaxation.</li><li>You want the re-entry home protected as carefully as the way into Hwange.</li></ul><Link href={requestHref}>Ask a curator about Runyararo →</Link></div>
      </section>

      <section className={styles.itinerary} aria-labelledby="runyararo-itinerary">
        <header><span className={styles.sectionLabel}>The journey</span><h2 id="runyararo-itinerary">Five days of<br /><em>letting the noise end.</em></h2></header>
        <article className={styles.day}><div className={styles.dayMeta}><span>Day {days[0].number}</span><h3>{days[0].title}</h3><small>{days[0].route}</small></div><p>{days[0].copy}</p></article>

        <figure className={styles.landscape}>
          <img src="/journeys/runyararo/hwange-leopard.webp" alt="A leopard in the warm grasslands of Hwange National Park, Zimbabwe" width="1024" height="683" loading="lazy" />
          <figcaption>Hwange National Park · a wild presence that asks for attention without asking for performance.</figcaption>
        </figure>

        {days.slice(1, 4).map((day) => <article className={styles.day} key={day.number}><div className={styles.dayMeta}><span>Day {day.number}</span><h3>{day.title}</h3></div><p>{day.copy}</p></article>)}

        <blockquote className={styles.pullQuote}>“You don&apos;t rush to check anything when the bars come back. That noticing is the whole trip.”</blockquote>

        <article className={styles.day}><div className={styles.dayMeta}><span>Day {days[4].number}</span><h3>{days[4].title}</h3></div><p>{days[4].copy}</p></article>
      </section>

      <section className={styles.rule}>
        <span className={styles.sectionLabel}>The Runyararo Principle</span>
        <h2>No news. No feed.<br />One signal window a day, if your life truly demands it.</h2>
        <p>The bush doesn&apos;t perform for anyone, and out here, neither do you. There&apos;s no audience for the version of you that has to look calm. There&apos;s just the version that actually is.</p>
      </section>

      <section className={styles.stay}>
        <div><span className={styles.sectionLabel}>Where You Stay</span><h2>Seven tents. Not enough people here to make noise even if they tried.</h2><p className={styles.hotelZone}>Hwange National Park</p><h3>Somalisa Camp</h3><p>Canvas tents under acacia trees · private-concession floodplain</p></div>
        <strong>Nights 1–4</strong>
      </section>

      <section className={styles.return}>
        <div><span className={styles.sectionLabel}>Act III · The Return</span><h2>The signal returns.<br /><em>The urgency does not.</em></h2></div>
        <p>The return is designed around the moment access becomes possible again. Runyararo does not ask you to abandon your life. It helps you notice which noise deserves to come back with you, which can stay in Hwange, and how to protect the quiet once nobody else can do it for you.</p>
      </section>

      <section className={styles.season}>
        <div><span className={styles.sectionLabel}>Available Months</span><h2>January through March.</h2><p>Hwange&apos;s quiet season lines up with when most people feel the most talked-out, the stretch right after everything wraps up for the year. Rates shift slightly year to year, so exact departure pricing is confirmed at booking rather than fixed in advance.</p></div>
        <div className={styles.months} aria-label="Runyararo travel season">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => <span className={index <= 2 ? styles.openMonth : ""} key={month}>{month}</span>)}
          <p className={styles.monthLegend}><b>Open</b> January, February, March<br />Exact departure pricing confirmed at booking</p>
        </div>
      </section>

      <JourneyAvailability journey={journey} title="When would you let the noise end?" copy="Choose a preferred date and who will travel. We will confirm Somalisa space, the Hwange transfer sequence and the exact departure investment, then return with what is genuinely available." openMonths={journey.availableMonths} closedNote="This quiet-season edition is intentionally held within January–March." />

      <section className={styles.investment}>
        <div><span className={styles.sectionLabel}>Investment</span><h2>Four nights.<br /><em>A location the noise can&apos;t reach.</em></h2></div>
<div className={styles.price}><small>From</small><strong>$4,950</strong><span>/ person sharing</span><JourneyPricingNote /><p>International flights, travel insurance, premium spirits, gratuities, and personal purchases are not included. Four nights fully inclusive at Somalisa, including all meals, selected drinks and laundry, game drives, walking safaris, night drives in the private concession, park fees, transfers from Victoria Falls, the Departure Box, and the Ryravel journal are included.</p><div className={styles.priceActions}><Link href={requestHref}>Begin the conversation →</Link><Link className={styles.secondaryAction} href={callHref}>Request a private call</Link></div><small className={styles.reassurance}>A curator responds personally within one business day. Nothing is booked until you are ready.</small></div>
      </section>

      <JourneyTrustLayer />
      <JourneyProofSection />
      <JourneyFaqs journey={journey} />

      <section className={styles.nextSteps}>
        <div><span className={styles.sectionLabel}>What happens next</span><h2>A private conversation.<br />Then a quieter way in.</h2></div>
        <ol><li><span>01</span><div><h3>Tell us what will not go quiet</h3><p>Share your dates, pace and the noise the journey needs to interrupt.</p></div></li><li><span>02</span><div><h3>Speak with your curator</h3><p>We confirm whether Runyararo is the right degree of distance for you.</p></div></li><li><span>03</span><div><h3>Receive your Runyararo direction</h3><p>One considered Hwange journey and a protected way back into ordinary life.</p></div></li></ol>
        <Link href={requestHref}>Plan Runyararo privately →</Link>
      </section>

      <StillnessAlternatives currentSlug={journey.slug} />

      <section className={styles.closing}>
        <div className={styles.backLinks}><Link href="/journeys">← Back to all journeys</Link><Link href="/journeys/stillness">The Stillness Collection</Link></div>
        <blockquote>“The noise was never really coming from outside.<br />Here, it finally ran out of things to say.”</blockquote>
        <p>, Ryravel · Stillness is the only luxury left.</p>
      </section>
    </main>
  );
}
