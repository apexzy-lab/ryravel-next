import Link from "next/link";
import styles from "./KimbilioJourney.module.css";
import { JourneyAvailability, JourneyFaqs, JourneyProofSection, StillnessAlternatives } from "./JourneyPlanning";

const days = [
  {
    number: "01",
    title: "The Leaving",
    route: "Arusha → Ikuu Airstrip → Katavi",
    copy: "The charter was small enough that I had to duck to get in, and somewhere over the first stretch of bush, my phone gave up on its own, no dramatic swipe to airplane mode on my part, just a bar dropping to nothing and staying there. I watched the land get emptier the way you watch a number count down. My guide met the plane at Ikuu and said exactly one sentence before we drove off, that there was nothing I had to do here. I waited for the rest of the sentence. There wasn't one. We saw a herd of buffalo on the way to camp, close enough to hear them breathing, and nobody radioed anyone about it.",
  },
  {
    number: "02",
    title: "Unreachable",
    copy: "Dawn came with no other vehicles anywhere near us, which I hadn't understood as a real feature until I was sitting in it. Elephants at first light, unhurried, in numbers I didn't try to count. Midday was built to hold nothing, deliberately, and I spent most of it lying flat in the shade doing genuinely nothing, which is a sentence I'm not used to being able to write about myself. In the evening my guide checked in briefly, one short question, nothing performative about it, and left it at that. Somewhere around dinner I realized nobody on this earth currently knew which country I was in, and instead of the panic I expected, I just felt oddly light.",
  },
  {
    number: "03",
    title: "The Middle of Nowhere",
    copy: "I was offered a full day of driving or a full day of nothing, and I chose both, badly, switching my mind twice before settling on a walking safari in the afternoon that left my legs more tired than any gym session I've paid for in years. Nobody pushed either option on me. It was said once and left alone, which I've come to understand is the actual house style here.",
  },
  {
    number: "04",
    title: "Being Found by Yourself",
    copy: "I slept later than I have in years and didn't set an alarm to correct it. The journal, which I'd been treating as a formality, suddenly had something in it worth keeping, four pages I wrote in one sitting without stopping to edit myself, which is not how I write anything, ever. Dinner that night was just for me, out past the last light of camp, and it was the last one where nobody on the planet could have reached me even if they'd known where to look. I noticed I wasn't dreading that ending. Most things I enjoy, I start dreading the end of almost immediately. Not this.",
  },
  {
    number: "05",
    title: "The Return Crossing",
    copy: "Breakfast, then the charter back, and somewhere over open bush the signal returned to my phone before I'd decided whether I wanted it to. I let it sit there, unlocked screen full of everything that had piled up, for longer than felt comfortable, just to prove to myself I could. When I finally turned it back on properly, I did it on my terms, mid-flight, looking out at land I'd never see again in exactly this state of mind. Nobody at the airstrip made a scene of saying goodbye. My guide handed me a card with something written on it for later and stepped back before I could even find the right thing to say in return.",
  },
];

export default function KimbilioJourney({ journey }) {
  const requestHref = `/request?journey=${journey.slug}&name=${encodeURIComponent(journey.title)}&destination=${encodeURIComponent(journey.destination)}&nights=${journey.nights}&price=${encodeURIComponent(journey.price)}`;
  const callHref = `${requestHref}&conversation=private-call`;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <img src="/journeys/kimbilio/katavi-sunset.jpg" alt="Sunset through acacia trees in Katavi National Park, Tanzania" width="2048" height="1365" fetchPriority="high" />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroTop}><Link href="/journeys/stillness">← The Stillness Collection</Link><span>Exhausted, The Restoration</span></div>
        <div className={styles.heroBody}>
          <p className={styles.eyebrow}>Katavi National Park · Tanzania</p>
          <h1>Kimbilio</h1>
          <p className={styles.meaning}>Swahili, refuge, shelter</p>
          <h2>A place the world<br />cannot reach you.</h2>
        </div>
        <dl className={styles.facts}>
          <div><dt>Duration</dt><dd>4 Nights, 5 Days</dd></div>
          <div><dt>Location</dt><dd>Katavi National Park</dd></div>
          <div><dt>From</dt><dd>$5,500 / person sharing</dd></div>
        </dl>
      </section>

      <section className={styles.opening}>
        <p>Nobody has said no to me in about a decade. My assistant screens the calls that don&apos;t matter and puts through the ones that do, and lately the ones that “do” arrive at 6am, 11pm, on a Sunday, without apology. I didn&apos;t come to Katavi tired. I came here done being found.</p>
        <p>Four nights. Fly-in only, which mattered more to me than any amenity list. I didn&apos;t want a spa menu. I wanted a place that made the decision for me, the way a locked door makes a decision a closed one doesn&apos;t.</p>
      </section>

      <section className={styles.before}>
        <div><span className={styles.sectionLabel}>Before the journey</span><h2>The box arrived<br />a week early.</h2></div>
        <div>
          <p>It sat on my kitchen counter for two days before I opened it, mostly out of spite toward my own schedule, which had no room in it for a box. Inside: a journal, a card with the word Kimbilio on it and nothing else explaining it, a smaller card with what I can only call a protocol for turning my phone off, and tea I didn&apos;t recognize the name of. A note, handwritten, said the disappearing starts now, not at the airport.</p>
          <p>I wrote four lines in the journal that first night, mostly complaining about the week I&apos;d had. I didn&apos;t know yet that those four lines would be the ones I&apos;d go back to.</p>
        </div>
      </section>

      <section className={styles.fit} aria-labelledby="kimbilio-fit">
        <div><span className={styles.sectionLabel}>Is Kimbilio for you?</span><h2 id="kimbilio-fit">You are not looking for more to do.<br />You are looking to become unreachable.</h2></div>
        <div><p>Kimbilio is designed for the traveller whose rest is usually interrupted by access, decisions and the expectation of an immediate answer.</p><ul><li>You want one remote camp rather than a moving itinerary.</li><li>You are comfortable letting Katavi, weather and wildlife set the rhythm.</li><li>You want boundaries for the return home, not only four quiet nights away.</li></ul><Link href={requestHref}>Ask a curator about Kimbilio →</Link></div>
      </section>

      <section className={styles.itinerary} aria-labelledby="kimbilio-itinerary">
        <header><span className={styles.sectionLabel}>The journey</span><h2 id="kimbilio-itinerary">Five days of<br /><em>becoming unreachable.</em></h2></header>
        <article className={styles.day}>
          <div className={styles.dayMeta}><span>Day {days[0].number}</span><h3>{days[0].title}</h3><small>{days[0].route}</small></div>
          <p>{days[0].copy}</p>
        </article>

        <figure className={styles.landscape}>
          <img src="/journeys/kimbilio/katavi-floodplain.jpg" alt="Antelope crossing the open Katavi floodplain in Tanzania" width="2048" height="1365" loading="lazy" />
          <figcaption>Katavi National Park, Tanzania · a landscape chosen for the distance it puts between you and everything asking for you.</figcaption>
        </figure>

        {days.slice(1, 3).map((day) => <article className={styles.day} key={day.number}><div className={styles.dayMeta}><span>Day {day.number}</span><h3>{day.title}</h3></div><p>{day.copy}</p></article>)}

        <aside className={styles.signature}>
          <span>The Signature Moment</span>
          <p className={styles.signatureName}>Usiku · The Night Drive</p>
          <h2>The hour that belongs<br />to no schedule.</h2>
          <p>Every other vehicle in the park had gone to bed by the time we went out. The spotlight stayed off more than it was on, and for long stretches we just sat in the dark listening to something move without needing to see what it was. Eyes caught the light twice, low to the ground, gone before I could ask what they belonged to. I didn&apos;t check the time once, and when I finally thought to, hours had passed that felt like a fraction of that.</p>
          <p>I have sat in a lot of rooms making decisions that mattered to a lot of people. I have never sat somewhere that made it so completely irrelevant whether I made a decision at all.</p>
        </aside>

        <article className={styles.day}>
          <div className={styles.dayMeta}><span>Day {days[3].number}</span><h3>{days[3].title}</h3></div>
          <p>{days[3].copy}</p>
        </article>

        <blockquote className={styles.pullQuote}>“She decides when to turn the phone back on, over the bush, not at the airport. That decision is the whole point.”</blockquote>

        <article className={styles.day}>
          <div className={styles.dayMeta}><span>Day {days[4].number}</span><h3>{days[4].title}</h3></div>
          <p>{days[4].copy}</p>
        </article>
      </section>

      <section className={styles.rule}>
        <span className={styles.sectionLabel}>The Kimbilio rule</span>
        <h2>You never have to<br />explain yourself.</h2>
        <p>Where signal exists at all, you set one window a day, on your terms. Most of camp has none, and that&apos;s not a limitation anyone is apologizing for. The park is the excuse. It doesn&apos;t negotiate, and neither do you, not with anyone who calls asking where you&apos;ve been.</p>
      </section>

      <section className={styles.stay}>
        <div><span className={styles.sectionLabel}>Where You Stay</span><h2>One camp. No alternative offered, on purpose.</h2><p className={styles.hotelZone}>Katavi National Park</p><h3>Mbali Mbali Katavi</h3><p>Game package · fly-in only</p></div>
        <strong>Nights 1–4</strong>
      </section>

      <section className={styles.return}>
        <div><span className={styles.sectionLabel}>Act III · The Return</span><h2>Thirty days,<br /><em>at home.</em></h2></div>
        <p>Nobody warned me that the hard part might actually be here, not there. On day seven, my curator checked in, one message, no pressure attached to it, just a question about what had already started slipping back into old shape. I answered honestly, more honestly than I expected to. On day thirty, the second check-in landed the same way, unhurried, and by then I&apos;d started noticing which parts of the old findable version of me I actually wanted back, and which parts I&apos;d been quietly relieved to put down in Katavi.</p>
      </section>

      <section className={styles.season}>
        <div><span className={styles.sectionLabel}>Available Months</span><h2>June through October.</h2><p>Katavi is fly-in only, and the park itself sets the calendar, not the other way round. Outside these months the airstrips and roads are largely unusable, which is the same reason the disappearing works so well when it&apos;s open.</p></div>
        <div className={styles.months} aria-label="Kimbilio travel season">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => <span className={index >= 5 && index <= 9 ? styles.openMonth : ""} key={month}>{month}</span>)}
          <p className={styles.monthLegend}><b>Open</b> June, July, August, September, October<br />Closed to travel the rest of the year, due to rains</p>
        </div>
      </section>

      <JourneyAvailability journey={journey} title="When would you disappear?" copy="Choose a preferred date and who will travel. We will check the remote camp and shared-charter sequence as one itinerary, then return with what is genuinely available." openMonths={journey.availableMonths} closedNote="This edition pauses outside June–October because the remote access is part of the design." />

      <section className={styles.investment}>
        <div><span className={styles.sectionLabel}>Investment</span><h2>Four nights.<br />One decision that<br /><em>outlasts them.</em></h2></div>
        <div className={styles.price}><small>From</small><strong>$5,500</strong><span>/ person sharing</span><p>International flights to Arusha not included. Shared charter flights, four nights full board with drinks at meals, two daily game drives, the Usiku night drive, walking safari, park and concession fees, emergency medical evacuation cover, the Departure Box, and the full Return protocol with two curator check-ins are included.</p><div className={styles.priceActions}><Link href={requestHref}>Begin the conversation →</Link><Link className={styles.secondaryAction} href={callHref}>Request a private call</Link></div><small className={styles.reassurance}>A curator responds personally within one business day. Nothing is booked until you are ready.</small></div>
      </section>

      <JourneyProofSection />
      <JourneyFaqs journey={journey} />

      <section className={styles.nextSteps}>
        <div><span className={styles.sectionLabel}>What happens next</span><h2>A private conversation.<br />Then a protected way out.</h2></div>
        <ol><li><span>01</span><div><h3>Tell us what keeps finding you</h3><p>Share your dates, pace and the access you need to leave behind.</p></div></li><li><span>02</span><div><h3>Speak with your curator</h3><p>We confirm whether Kimbilio is the right degree of distance for you.</p></div></li><li><span>03</span><div><h3>Receive your Kimbilio direction</h3><p>One coherent journey, including the flight in and the boundaries you carry home.</p></div></li></ol>
        <Link href={requestHref}>Plan Kimbilio privately →</Link>
      </section>

      <StillnessAlternatives currentSlug={journey.slug} />

      <section className={styles.closing}>
        <div className={styles.backLinks}><Link href="/journeys">← Back to all journeys</Link><Link href="/journeys/stillness">The Stillness Collection</Link></div>
        <blockquote>“I did not come here to be found.<br />I came here to decide, for once, who gets to find me.”</blockquote>
        <p>, Ryravel · Stillness is the only luxury left.</p>
      </section>
    </main>
  );
}
