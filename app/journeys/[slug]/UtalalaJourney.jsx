import Link from "next/link";
import styles from "./KimbilioJourney.module.css";
import { JourneyAvailability, JourneyFaqs, JourneyProofSection, StillnessAlternatives } from "./JourneyPlanning";

const days = [
  {
    number: "01",
    title: "The Last Road",
    route: "Lusaka → Mfuwe → Luwi Bush Camp",
    copy: "My watch lost signal to my phone somewhere on the drive in, and for a second I actually reached to fix it before remembering there was nothing to sync it to out here anyway. Tea appeared under mahogany trees old enough that I stopped trying to guess their age. My guide said one thing on arrival, that we walk when I'm ready, and didn't attach a schedule to it or ask me to commit to a time. I liked that more than I expected to. I went to bed early, still half-expecting a notification that never came.",
  },
  {
    number: "02",
    title: "The First Walk",
    copy: "My phone stayed at camp, not locked away, just left, which felt more significant than it should have for an object I usually keep within arm's reach even in the shower. On foot, the bush stopped being something out a window and became something I was actually standing inside of, which changes what you notice, the give of the ground, the specific rhythm of my own steps once I stopped trying to hit a pace. Somewhere in the first hour I noticed I'd stopped counting anything, not steps, not minutes, not the mental tally I usually keep of tasks waiting for me. Sundowners at the riverbed, fire after, and I slept the kind of sleep I usually only get after a long run, except I'd done considerably less running than usual.",
  },
  {
    number: "03",
    title: "Walking Further",
    copy: "A longer walk, deeper into the groves, and around midday something shifted that I can't fully explain except to say my mind finally stopped running slightly ahead of my feet and just matched them. Nobody announced it. I noticed it myself, at sundowners, turning over the fact that I hadn't thought about my phone once all day, not even the reflexive urge to check it that usually shows up whether I've got it on me or not. It felt like finishing a long distance without noticing the last few miles, the strange quiet that shows up only once you stop paying attention to the effort.",
  },
  {
    number: "04",
    title: "Stillness, Kept",
    copy: "The slowest morning of the four, and I didn't ask for a walk, which surprised me more than anything else that happened this week. The journal actually filled a few pages, not because I scheduled it, but because I had something worth putting down that wasn't a task. One last walk in the afternoon, at whatever pace felt right, no distance in mind. Dinner that night was under the same trees we'd arrived beneath, and I noticed I wasn't already dreading the flight home the way I usually dread the end of anything good.",
  },
  {
    number: "05",
    title: "The Return",
    copy: "Out to Mfuwe, then the flight back to Lusaka, and by the time we landed the terminal noise hit me almost physically, announcements, ringtones, a dozen conversations layered over each other. It sounded louder than I remembered airports being, and somehow less like something that belonged to me. I picked my phone back up properly somewhere in the taxi queue, and for the first time in longer than I can place, checking it felt like a choice I was making rather than a reflex I couldn't stop.",
  },
];

export default function UtalalaJourney({ journey }) {
  const requestHref = `/request?journey=${journey.slug}&name=${encodeURIComponent(journey.title)}&destination=${encodeURIComponent(journey.destination)}&nights=${journey.nights}&price=${encodeURIComponent(journey.price)}`;
  const callHref = `${requestHref}&conversation=private-call`;

  return (
    <main className={`${styles.page} ${styles.utalala}`}>
      <section className={styles.hero}>
        <img src="/journeys/utalala/south-luangwa-scops-owl.webp" alt="African scops owl resting among leaves in South Luangwa National Park, Zambia" width="2200" height="1467" fetchPriority="high" />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroTop}><Link href="/journeys/stillness">← The Stillness Collection</Link><span>Exhausted, The Restoration</span></div>
        <div className={styles.heroBody}>
          <p className={styles.eyebrow}>South Luangwa National Park · Zambia</p>
          <h1>Utalala</h1>
          <p className={styles.meaning}>Bemba, quietness, stillness</p>
          <h2>The stillness you<br />can&apos;t find at home.</h2>
        </div>
        <dl className={styles.facts}>
          <div><dt>Duration</dt><dd>4 Nights, 5 Days</dd></div>
          <div><dt>Location</dt><dd>South Luangwa National Park</dd></div>
          <div><dt>From</dt><dd>$6,250 / person sharing</dd></div>
        </dl>
      </section>

      <section className={styles.opening}>
        <div className={styles.openingMain}>
          <span className={styles.sectionLabel}>Why Utalala</span>
          <h2>Stillness is not handed to you.<br />You walk your way into it.</h2>
          <div className={styles.openingCopy}>
            <p>I have a watch that tells me my sleep score every morning, my resting heart rate, how many minutes I spent in something the app calls deep recovery. I have never once trusted a single number it&apos;s given me, and I check it every day anyway. I don&apos;t know how to just be still. I know how to measure whether I was.</p>
            <p>Four nights, on foot, mostly. I didn&apos;t want somewhere that would hand me stillness. I&apos;ve been handed things before and not felt them. I wanted to see if I could actually walk my way into it, the way you walk your way into being tired, except in reverse.</p>
          </div>
        </div>
        <aside className={styles.openingAside}><span>In one sentence</span><p>The stillness you can&apos;t find at home.</p></aside>
      </section>

      <section className={styles.before}>
        <div><span className={styles.sectionLabel}>Who Goes Here</span><h2>Fit enough to walk.<br />Done with being measured.</h2></div>
        <p>I&apos;ve tried lying still before. I&apos;m bad at it. My mind treats stillness like an unclaimed inbox, it just fills the space with something to sort through. I run, or I used to before work ate the mornings I ran in. Something in me has always known that whatever&apos;s wrong gets solved by my legs before it gets solved by sitting down, so when I read that this was walked and not watched, that was the whole pitch.</p>
      </section>

      <section className={styles.fit} aria-labelledby="utalala-fit">
        <div><span className={styles.sectionLabel}>Is Utalala for you?</span><h2 id="utalala-fit">A beach chair will not fix this.<br />Movement might.</h2></div>
        <div><p>Utalala is for the traveller whose mind fills every empty room, but whose body still remembers that a quieter rhythm can be reached one step at a time.</p><ul><li>You are comfortable walking on natural, uneven ground.</li><li>You want one small bush camp rather than a fast-moving itinerary.</li><li>You want the phone left behind without turning disconnection into theatre.</li></ul><Link href={requestHref}>Ask a curator about Utalala →</Link></div>
      </section>

      <section className={styles.itinerary} aria-labelledby="utalala-itinerary">
        <header><span className={styles.sectionLabel}>The journey</span><h2 id="utalala-itinerary">Five days of<br /><em>letting the mind match the feet.</em></h2></header>
        <article className={styles.day}><div className={styles.dayMeta}><span>Day {days[0].number}</span><h3>{days[0].title}</h3><small>{days[0].route}</small></div><p>{days[0].copy}</p></article>

        <figure className={styles.landscape}>
          <img src="/journeys/utalala/south-luangwa-hippos.jpg" alt="A pod of hippos in a South Luangwa lagoon beside a raised wildlife hide" width="600" height="600" loading="lazy" />
          <figcaption>South Luangwa · where the landscape is experienced at the pace of your own footsteps.</figcaption>
        </figure>

        {days.slice(1, 4).map((day) => <article className={styles.day} key={day.number}><div className={styles.dayMeta}><span>Day {day.number}</span><h3>{day.title}</h3></div><p>{day.copy}</p></article>)}

        <figure className={styles.landscape}>
          <img src="/journeys/utalala/south-luangwa-dew.webp" alt="Morning dew gathered on a green leaf in the South Luangwa bush" width="1920" height="1280" loading="lazy" />
          <figcaption>The smaller senses return when nothing is asking to be counted.</figcaption>
        </figure>

        <blockquote className={styles.pullQuote}>“The noise returns at the airport. It sounds different now. Louder, and less like yours.”</blockquote>

        <article className={styles.day}><div className={styles.dayMeta}><span>Day {days[4].number}</span><h3>{days[4].title}</h3></div><p>{days[4].copy}</p></article>
      </section>

      <section className={styles.rule}>
        <span className={styles.sectionLabel}>The Utalala Principle</span>
        <h2>The phone stays at camp when you walk.<br />Stillness is walked, not watched.</h2>
        <p>Nobody hands this to you here. You walk into it, on foot, hour by hour, until your mind finally matches your feet. That&apos;s the entire method, and it&apos;s also the entire point.</p>
      </section>

      <section className={styles.stay}>
        <div><span className={styles.sectionLabel}>Where You Stay</span><h2>A small camp under ancient mahogany trees.</h2><p className={styles.hotelZone}>South Luangwa National Park · Zambia</p><h3>Luwi Bush Camp</h3><p>Operated by Norman Carr Safaris · walking-safari specialists</p></div>
        <strong>Nights 1–4</strong>
      </section>

      <section className={styles.return}>
        <div><span className={styles.sectionLabel}>Act III · The Return</span><h2>The noise comes back.<br /><em>It no longer sounds like yours.</em></h2></div>
        <p>The return is designed around the first moment the phone becomes useful again. Utalala does not ask you to reject ordinary life. It leaves enough space between impulse and action for checking, answering and measuring to become choices again.</p>
      </section>

      <section className={styles.season}>
        <div><span className={styles.sectionLabel}>Available Months</span><h2>May through November.</h2><p>Walking is best once the bush thins out and the paths hold. July through October is the fullest peak stretch. Rates shift with the season, so each departure window is quoted individually rather than against one flat number.</p></div>
        <div className={styles.months} aria-label="Utalala travel season">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => <span className={index >= 4 && index <= 10 ? styles.openMonth : ""} key={month}>{month}</span>)}
          <p className={styles.monthLegend}><b>Open</b> May through November<br />July–October is the peak walking season</p>
        </div>
      </section>

      <JourneyAvailability journey={journey} title="When would you walk into stillness?" copy="Choose a preferred date and who will travel. We will confirm Luwi space, the Lusaka–Mfuwe flight sequence and the exact departure investment, then return with what is genuinely available." openMonths={journey.availableMonths} closedNote="This walking-led edition is intentionally held within May–November." />

      <section className={styles.investment}>
        <div><span className={styles.sectionLabel}>Investment</span><h2>Four nights.<br /><em>Stillness you earn on foot.</em></h2></div>
        <div className={styles.price}><small>From</small><strong>$6,250</strong><span>/ person sharing</span><p>International flights to Lusaka, travel insurance, premium spirits, gratuities, and personal purchases are not included. Four nights fully inclusive at Luwi Bush Camp, guided walking safaris and game drives, park fees, return Lusaka–Mfuwe flights, the Departure Box, and the Ryravel journal are included.</p><div className={styles.priceActions}><Link href={requestHref}>Begin the conversation →</Link><Link className={styles.secondaryAction} href={callHref}>Request a private call</Link></div><small className={styles.reassurance}>A curator responds personally within one business day. Nothing is booked until you are ready.</small></div>
      </section>

      <JourneyProofSection />
      <JourneyFaqs journey={journey} />

      <section className={styles.nextSteps}>
        <div><span className={styles.sectionLabel}>What happens next</span><h2>A private conversation.<br />Then a slower way in.</h2></div>
        <ol><li><span>01</span><div><h3>Tell us how you move</h3><p>Share your dates, walking comfort, pace and what ordinary rest has failed to quiet.</p></div></li><li><span>02</span><div><h3>Speak with your curator</h3><p>We confirm whether Utalala is the right physical and emotional rhythm for you.</p></div></li><li><span>03</span><div><h3>Receive your Utalala direction</h3><p>One considered South Luangwa journey, with camp, flights and re-entry designed together.</p></div></li></ol>
        <Link href={requestHref}>Plan Utalala privately →</Link>
      </section>

      <StillnessAlternatives currentSlug={journey.slug} />

      <section className={styles.closing}>
        <div className={styles.backLinks}><Link href="/journeys">← Back to all journeys</Link><Link href="/journeys/stillness">The Stillness Collection</Link></div>
        <blockquote>“I know how to measure whether I rested.<br />Here, for once, I just did.”</blockquote>
        <p>, Ryravel · Stillness is the only luxury left.</p>
      </section>
    </main>
  );
}
