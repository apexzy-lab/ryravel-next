import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "../../seo";
import frame from "../passage.module.css";
import styles from "../transformational-travel-vs-wellness-retreat/article.module.css";
import local from "./service.module.css";

const title = "How Do I Choose a Transformational Travel Service in 2027?";
const path = "/passage/how-to-choose-a-transformational-travel-service-in-2027";
const hero = "/images/passage-choose-service-2027.jpg";

export const metadata = {
  ...buildMetadata({
    title: `${title} | Passage by Ryravel`,
    description: "A practical guide to choosing a transformational travel service in 2027: check the guide, safety plan, payment terms, and what happens after the trip.",
    path,
    image: hero,
    absoluteTitle: true,
  }),
  openGraph: {
    title,
    description: "The trip is only the door. The change lives in the second month.",
    url: `https://ryravel.com${path}`,
    type: "article",
    images: [{ url: `https://ryravel.com${hero}`, width: 720, height: 900, alt: "Two people paddling a canoe through a dark waterway bordered by green vegetation" }],
  },
};

const serviceChoices = [
  ["Worn out, and need life to slow down", "A private or very small journey with rest built in, few moving parts and one named host"],
  ["Hungry for a new view of a culture or a history", "A skilled local guide, a properly registered operator where required, and time to talk through what you see"],
  ["Standing at a crossroads, such as a career change, a loss or a milestone year", "A journey with an appropriately trained facilitator, room for reflection and a clear follow-up plan"],
  ["Looking for discipline and silence", "An established retreat whose practice, expectations and suitability you can assess before booking"],
  ["Hoping travel will treat a health condition", "A licensed clinician first, travel after"],
  ["Curious about psychedelic retreats", "Only consider a setting that is legal where it operates, with qualified medical advice and credible emergency safeguards"],
];

const questions = [
  ["How much does a transformational trip cost in 2027?", "There is no single market price for transformational travel. Programmes range from donation-based retreats to private, guided journeys. Compare what is included, the people responsible, the cancellation terms and the support after you return. Ryravel journeys start at $5,000 USD."],
  ["How long does the change last?", "No provider can promise a duration. Vacation studies disagree about how quickly average wellbeing gains fade, while retreat studies often have short follow-up. Ask what support is available in the weeks after the trip."],
  ["Are psychedelic retreats safe?", "Safety practices vary. A 2026 study of 49 advertised organisations found substantial variation in screening and professional involvement. Speak to a qualified clinician and check local law before considering one; do not stop prescribed medication on a retreat's instruction alone."],
  ["What protection do I have if the company fails?", "That depends on the seller, what was booked, where the contract is made and the applicable law. Ask the provider to identify the contracting company, any insolvency protection, the payment method and the refund process in writing before paying."],
];

const sources = [
  ["Transformational Travel Council, foundational framework", "https://www.transformational.travel/guiding-practices"],
  ["Global Wellness Institute, 2025 Wellness Economy Monitor", "https://globalwellnessinstitute.org/industry-research/2025-global-wellness-economy-monitor/"],
  ["de Bloom and colleagues, 2009 vacation review", "https://pubmed.ncbi.nlm.nih.gov/19096200/"],
  ["Speth and colleagues, 2023 vacation review", "https://fis.tu-dresden.de/portal/en/publications/we-continue-to-recover-through-vacation-metaanalysis-of-vacation-effects-on-wellbeing(afc00f0a-5761-4757-a23f-5b1e50b53604).html"],
  ["Grant and colleagues, 2025 vacation review", "https://pubmed.ncbi.nlm.nih.gov/39836131/"],
  ["Teoh, Wang and Kwek, transformative tourism review", "https://www.sciencedirect.com/science/article/abs/pii/S1447677021000449"],
  ["Residential retreat systematic review", "https://pmc.ncbi.nlm.nih.gov/articles/PMC5761096/"],
  ["McGuire and colleagues, psychedelic retreat safety practices", "https://pubmed.ncbi.nlm.nih.gov/41499117/"],
  ["EU Council, revised package travel directive", "https://www.consilium.europa.eu/en/press/press-releases/2026/03/30/consumer-protection-council-gives-final-sign-off-to-additional-safeguards-for-package-travel-users/"],
  ["European Commission, environmental claims rules", "https://energy.ec.europa.eu/news/new-eu-rules-empower-consumers-green-transition-enter-force-2024-03-27_en"],
];

export default function ChooseServiceArticle() {
  const schema = {
    "@context": "https://schema.org", "@type": "Article", headline: title,
    description: "A practical guide to choosing a transformational travel service in 2027.",
    image: `https://ryravel.com${hero}`, datePublished: "2026-11-03", dateModified: "2026-11-03",
    author: { "@type": "Person", name: "Maryangel Ajuzieogu", url: "https://ryravel.com/about" },
    publisher: { "@type": "Organization", name: "Ryravel", url: "https://ryravel.com" },
    mainEntityOfPage: `https://ryravel.com${path}`,
  };

  return <div className={frame.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <div className={frame.header}>
      <Link className={frame.logo} href="/passage" aria-label="Passage, a Ryravel publication home">Passage <span>A Ryravel Publication</span></Link>
      <nav className={frame.nav} aria-label="Passage sections"><Link href="/passage">Latest</Link><Link href="/passage#issue-01">Issue 01</Link><Link href="/passage#about-passage">About</Link></nav>
    </div>
    <main>
      <header className={styles.articleHeader}>
        <span className={frame.eyebrow}>Passage · Essay 03</span>
        <h1>How Do I Choose a Transformational Travel Service in <em>2027?</em></h1>
        <p className={styles.dek}>The trip is only the door. The change lives in the second month.</p>
        <p className={styles.meta}>By <Link href="/about">Maryangel Ajuzieogu</Link><span>·</span><time dateTime="2026-11-03">November 3, 2026</time><span>·</span>10 min read</p>
      </header>

      <figure className={`${styles.heroFigure} ${local.heroFigure}`}>
        <Image src={hero} alt="Two people paddling a canoe through a dark waterway bordered by green vegetation" width={720} height={900} priority sizes="(max-width: 768px) 100vw, 1100px" />
        <figcaption>The journey is the beginning. Ask what supports the return.</figcaption>
      </figure>

      <article className={styles.body}>
        <p className={styles.lead}>The trip ends on a Sunday, and whether you change is decided somewhere in the second month. Choose the service that plans the weeks around the trip: a guide you can check, a safety plan, clear payment terms, and someone still in touch after you land. Walk away from anyone who guarantees a result.</p>

        <h2>Who this is <em>for</em></h2>
        <p>You are about to spend real money on a trip that promises to change you. You have seen the word transformational on a dozen websites and cannot tell which ones mean it. This is a way to tell.</p>

        <h2>What does transformational travel mean in <em>2027?</em></h2>
        <p>The <a href="https://www.transformational.travel/guiding-practices" target="_blank" rel="noopener noreferrer">Transformational Travel Council</a> defines it as &ldquo;Intentionally traveling to stretch, learn, and grow into new ways of being and engaging with the world.&rdquo; Look at what the sentence leaves out. There is no destination in it, no thread count, no price.</p>
        <p>The council&apos;s framework puts the traveller&apos;s intention and reflection at the centre. A service cannot hand you transformation. It can only help create the conditions for it.</p>
        <p>The money around the wider idea is real. The <a href="https://globalwellnessinstitute.org/industry-research/2025-global-wellness-economy-monitor/" target="_blank" rel="noopener noreferrer">Global Wellness Institute</a> measured wellness tourism at $893.9 billion in 2024 and projected $1.38 trillion by 2029. Those are wellness-tourism figures, not a separate measurement of transformational travel.</p>

        <h2>Why does the change fade after you get <em>home?</em></h2>
        <p>Because a holiday changes your place, and rest changes your load. A <a href="https://pubmed.ncbi.nlm.nih.gov/19096200/" target="_blank" rel="noopener noreferrer">2009 review</a> by Jessica de Bloom and colleagues found a modest lift in wellbeing that faded after people returned to work. A <a href="https://fis.tu-dresden.de/portal/en/publications/we-continue-to-recover-through-vacation-metaanalysis-of-vacation-effects-on-wellbeing(afc00f0a-5761-4757-a23f-5b1e50b53604).html" target="_blank" rel="noopener noreferrer">2023 review</a> found no significant difference from pre-holiday levels after the first week back. A larger <a href="https://pubmed.ncbi.nlm.nih.gov/39836131/" target="_blank" rel="noopener noreferrer">2025 review</a> found benefits that did not fade as quickly. The evidence does not give your own trip an expiry date.</p>
        <p>Here is what that can look like in a real life. <a href="https://www.aljazeera.com/features/2025/9/26/a-soul-mission-the-african-americans-moving-to-ghana" target="_blank" rel="noopener noreferrer">Al Jazeera reported</a> the story of Ashley Haruna, a US-raised health coach whose visit to Cape Coast Castle helped prompt a move to Ghana. The move also brought isolation and practical difficulties. At Villa Diaspora, a shared house run by Michelle Konadu, she found people who helped her navigate daily life and supported her after an accident.</p>
        <p>The moment at the castle was open to anyone with a ticket. The house is what held. A strong moment may start a change, while people, routines and practical help help sustain it. One reported story cannot tell us how often this works, and Haruna did not buy a travel package. It does show what to look for.</p>

        <h2>Which kind of service fits <em>you?</em></h2>
        <div className={styles.tableScroll}><table><thead><tr><th scope="col">If you are...</th><th scope="col">Lean toward...</th></tr></thead><tbody>{serviceChoices.map(([need, choice]) => <tr key={need}><th scope="row">{need}</th><td>{choice}</td></tr>)}</tbody></table></div>
        <div className={local.warning}><p><strong>If you hope travel will treat depression, persistent grief, trauma or addiction,</strong> see a licensed professional before you book. Travel can sit beside care. It should not replace it.</p></div>

        <h2>What do the best services do that the others do <em>not?</em></h2>
        <p>In a <a href="https://www.sciencedirect.com/science/article/abs/pii/S1447677021000449" target="_blank" rel="noopener noreferrer">review of 125 studies</a>, Teoh, Wang and Kwek describe transformative tourism as co-created by the experience, the traveller and other people involved. A guide&apos;s skill matters alongside the place.</p>
        <p>The outcome evidence is encouraging but limited. A <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5761096/" target="_blank" rel="noopener noreferrer">review of 23 residential-retreat studies</a> found reported benefits, but many studies were small or had little follow-up. None reported adverse effects, which means harms were not measured in that review, not that they cannot happen.</p>
        <p>Read across that and a pattern to ask about appears: preparation before departure, challenge that does not overwhelm, a capable person to guide reflection, and a plan for what happens after you land. These are questions for a provider, not a proven formula for change.</p>
        <p>We should say the awkward part. Ryravel sells journeys, so weigh our view accordingly. The evidence cited here does not prove that one itinerary design beats every other. Our own view is that ease can become an obstacle when a schedule is so smooth that nothing asks anything of you.</p>

        <h2>What should you check before you <em>pay?</em></h2>
        <p><strong>Safety.</strong> A <a href="https://pubmed.ncbi.nlm.nih.gov/41499117/" target="_blank" rel="noopener noreferrer">2026 study of 49 organisations</a> advertising psychedelic retreats found substantial variation in screening and professional involvement. Most required or recommended stopping some medication, a step that should never be taken without advice from the prescribing clinician. An <a href="https://www.iceers.org/en/articles/reports/examining-deaths-misattributed-ayahuasca/" target="_blank" rel="noopener noreferrer">ICEERS review of media-reported deaths</a> also illustrates why reported cases must not be mistaken for a measured risk rate. Ask who is qualified to respond in an emergency and how far help is.</p>
        <p><strong>Money.</strong> The EU <a href="https://www.consilium.europa.eu/en/press/press-releases/2026/03/30/consumer-protection-council-gives-final-sign-off-to-additional-safeguards-for-package-travel-users/" target="_blank" rel="noopener noreferrer">adopted a revised Package Travel Directive in 2026</a>, with national implementation still to follow. Protections differ by country, seller and type of booking. Ask which company holds your contract, whether insolvency protection applies, where your payment goes, and what the written refund terms say. Do not assume a bank transfer gives the same dispute rights as a card payment.</p>
        <p><strong>Claims.</strong> <a href="https://energy.ec.europa.eu/news/new-eu-rules-empower-consumers-green-transition-enter-force-2024-03-27_en" target="_blank" rel="noopener noreferrer">EU rules applying from September 2026</a> restrict vague environmental claims made to consumers. Use the same test anywhere: ask what a sustainability claim means, who checked it, and where the evidence is.</p>

        <h2>Six questions to ask any <em>provider</em></h2>
        <ol className={local.questionList}><li>Who will guide me, and how can I check their training?</li><li>What happens if something goes wrong, in body or mind, and how far is the nearest hospital?</li><li>What do you do before I leave, and for how many weeks after I return?</li><li>Who holds my payment, and what happens if you cancel or cannot deliver?</li><li>Where does my payment go, and who owns the places I will stay and use?</li><li>What would make you tell me this journey is wrong for me?</li></ol>
        <p>A provider who answers these plainly, in writing, has started the work. A provider who answers with adjectives has not.</p>

        <h2>What we cannot <em>promise</em></h2>
        <ul><li>We cannot promise you will change.</li><li>We cannot promise a feeling will last, because feelings fade, including the good ones.</li><li>We cannot treat illness, and we will tell you when we think you should see someone before you travel.</li><li>We can promise to plan the return as carefully as the trip.</li></ul>

        <hr />
        <h2>What happens at <em>Ryravel</em></h2>
        <p>Ryravel designs each journey around how you need to feel, not around a destination. We begin with what you are carrying, then choose the place, the pace and the people to match. Journeys start at $5,000 USD.</p>
        <p>Your next step: take the <Link href="/passage#feeling-quiz">Find Your Arc quiz</Link>. It takes a few minutes and helps you explore which kind of journey fits how you feel right now. Then ask every provider you meet the question this whole piece comes down to: <em>what happens in the second month?</em></p>

        <hr />
        <h2>Frequently asked <em>questions</em></h2>
        {questions.map(([question, answer]) => <section className={styles.faq} key={question}><h3>{question}</h3><p>{answer}</p></section>)}
        <div className={styles.ctaBox}><h3>The question this whole piece comes down <em>to:</em></h3><p>What happens in the second month?</p><Link href="/request">Begin the conversation <span aria-hidden="true">→</span></Link><Link href="/journeys">Explore the arcs <span aria-hidden="true">→</span></Link></div>
        <div className={styles.sources}><h2>Sources &amp; further reading</h2><ul>{sources.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{label}</a></li>)}</ul></div>
      </article>

      <aside className={styles.authorBox} aria-label="About the author"><Image src="/people/maryangel-ajuzieogu.webp" alt="Maryangel Ajuzieogu" width={106} height={106} /><div><h2>Maryangel Ajuzieogu</h2><p className={styles.authorRole}>Founder, Ryravel</p><p>Maryangel designs journeys around each traveller&apos;s brief and writes about the emotional territory of travel.</p></div></aside>
      <section className={styles.related} aria-labelledby="related-title"><span className={frame.eyebrow}>More from Passage</span><h2 id="related-title">Keep reading</h2><div className={local.relatedLinks}><Link href="/passage/why-your-last-vacation-did-not-help-you-feel-rested"><span>Recovery · Essay 02</span><strong>Why Your Last Vacation Did Not Help You Feel Rested</strong><small>Read the essay →</small></Link><Link href="/passage/transformational-travel-vs-wellness-retreat"><span>The Category · Essay 01</span><strong>Transformational Travel vs. a Wellness Retreat</strong><small>Read the essay →</small></Link></div><Link className={styles.backLink} href="/passage">Explore Passage <span aria-hidden="true">→</span></Link></section>
    </main>
  </div>;
}
