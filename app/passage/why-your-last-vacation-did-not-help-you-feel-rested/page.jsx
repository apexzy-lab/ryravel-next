import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "../../seo";
import frame from "../passage.module.css";
import styles from "../transformational-travel-vs-wellness-retreat/article.module.css";
import local from "./vacation.module.css";

const title = "Why Your Last Vacation Did Not Help You Feel Rested";
const path = "/passage/why-your-last-vacation-did-not-help-you-feel-rested";
const hero = "/images/passage-vacation-rested.jpg";

export const metadata = {
  ...buildMetadata({
    title: `${title} | Passage by Ryravel`,
    description: "You changed the view, but the tiredness kept its seat. What vacation research says about recovery, the return to work, and choosing a journey that fits.",
    path,
    image: hero,
    absoluteTitle: true,
  }),
  openGraph: {
    title,
    description: "You changed the view, but the tiredness kept its seat. The research suggests the trip was given the wrong job.",
    url: `https://ryravel.com${path}`,
    type: "article",
    images: [{ url: `https://ryravel.com${hero}`, width: 1280, height: 1600, alt: "A pale frog resting on a green lily pad over dark water" }],
  },
};

const questions = [
  ["Why am I still exhausted after my vacation?", "Work that followed you, poor sleep, a difficult return, or continuing demands may all play a part. A holiday cannot diagnose the reason for persistent exhaustion."],
  ["How long do the benefits of a vacation last?", "Studies differ. Some found that average gains faded soon after work resumed, while a larger, more recent review found benefits that lasted longer. Your experience cannot be predicted from an average."],
  ["Is post-vacation burnout real?", "A difficult return is real, but a vacation is not a treatment for burnout. WHO describes burnout as an occupational phenomenon linked to chronic workplace stress."],
  ["What kind of vacation helps with rest?", "The research points to psychological detachment from work, control over your time, and opportunities to recover. The right destination depends on the person and the demands awaiting them."],
  ["Can a trip help with grief or a breakup?", "Travel can offer space, but the vacation studies discussed here do not establish what a trip will do for grief or separation. If distress persists, seek appropriate professional support."],
];

const sources = [
  ["de Bloom and colleagues, 2009 vacation meta-analysis", "https://pubmed.ncbi.nlm.nih.gov/19096200/"],
  ["Speth and colleagues, 2023 vacation meta-analysis", "https://fis.tu-dresden.de/portal/en/publications/we-continue-to-recover-through-vacation-metaanalysis-of-vacation-effects-on-wellbeing(afc00f0a-5761-4757-a23f-5b1e50b53604).html"],
  ["Grant and colleagues, 2025 vacation meta-analysis", "https://pubmed.ncbi.nlm.nih.gov/39836131/"],
  ["de Bloom and colleagues, summer vacation study", "https://research.rug.nl/en/publications/vacation-after-effects-on-employee-health-and-well-being-and-the-/"],
  ["Nawijn and colleagues, vacation and happiness study", "https://pubmed.ncbi.nlm.nih.gov/20234864/"],
  ["Holidaily randomized trial, 2026", "https://pubmed.ncbi.nlm.nih.gov/42099929/"],
  ["Pew Research Center, paid time off survey", "https://www.pewresearch.org/short-reads/2023/08/10/more-than-4-in-10-u-s-workers-dont-take-all-their-paid-time-off/"],
  ["World Health Organization, burnout classification", "https://www.who.int/standards/classifications/frequently-asked-questions/burn-out-an-occupational-phenomenon"],
  ["World Bank, paid leave among Nigerian wage workers", "https://blogs.worldbank.org/en/opendata/why-do-so-many-nigerian-workers-remain-poor-labor-force-surveys-may-have-answer"],
];

export default function VacationRestedArticle() {
  const schema = {
    "@context": "https://schema.org", "@type": "Article", headline: title,
    description: "What vacation research says about recovery, exhaustion, and the return to work.",
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
        <span className={frame.eyebrow}>Passage · Essay 02</span>
        <h1>Why Your Last Vacation Did Not Help You Feel <em>Rested</em></h1>
        <p className={styles.dek}>You changed the view, but the tiredness kept its seat. The research suggests the trip was given the wrong job.</p>
        <p className={styles.meta}>By <Link href="/about">Maryangel Ajuzieogu</Link><span>·</span><time dateTime="2026-11-03">November 3, 2026</time><span>·</span>9 min read</p>
      </header>

      <figure className={`${styles.heroFigure} ${local.heroFigure}`}>
        <Image src={hero} alt="A pale frog resting on a green lily pad over dark water" width={1280} height={1600} priority sizes="(max-width: 768px) 100vw, 1100px" />
        <figcaption>Stillness and recovery are not always the same thing.</figcaption>
      </figure>

      <article className={styles.body}>
        <p>By the second Monday back, the holiday has begun to feel like something that happened to someone else. The photographs are on your phone. The suitcase stands half unpacked in the corner, a shirt still folded over its edge. Someone asks whether you had a good time, and you say yes, and mean it, and the word arrives from a long way off.</p>
        <p>Underneath is a quieter fact. The tiredness you assumed you had left behind is sitting exactly where you put it down.</p>
        <p>I know this because I have lived it.</p>

        <h2>The trip I gave the wrong <em>job</em></h2>
        <p>I took a resort trip to Zanzibar because I wanted solitude, and Zanzibar was where you go when you need to stop. I chose the resort first, the dates second, and my own needs not at all.</p>
        <p>Nothing about the trip was broken. It simply was not made for me. I came home more tired than I left, and I spent weeks puzzled by it. How could so little be wrong and nothing shift? Then I saw it. I had asked <em>where</em> and skipped <em>why.</em> I had chosen the destination and let the destination choose the rest.</p>
        <p>That mistake is what this article is about. Someone who needs rest can book a challenge. Someone who needs challenge can book rest. Either way the trip works as designed and fails the traveller. The question under everything below is simple: is the trip built around what you need, or around where you want to be?</p>

        <h2>Why a place cannot answer <em>that</em></h2>
        <p>In my view, a destination is the easiest thing to sell, because a photograph of a beach is more immediate than a conversation about exhaustion. But a beach cannot tell whether you need to move or to stop. A mountain cannot tell whether you need to prove something or to surrender. The place is neutral. Your need is not.</p>
        <p>When you start with where, you hand the design to geography. The place decides the pace, the activities, the company. You hope it guesses right.</p>

        <h2>What the research actually <em>says</em></h2>
        <p>In a <a href="https://pubmed.ncbi.nlm.nih.gov/19096200/" target="_blank" rel="noopener noreferrer">2009 review of seven studies</a>, Jessica de Bloom and colleagues found a modest improvement in health and wellbeing during vacation that faded soon after work resumed. A <a href="https://fis.tu-dresden.de/portal/en/publications/we-continue-to-recover-through-vacation-metaanalysis-of-vacation-effects-on-wellbeing(afc00f0a-5761-4757-a23f-5b1e50b53604).html" target="_blank" rel="noopener noreferrer">2023 review of 13 studies</a> found no significant difference from pre-vacation levels after the first week back.</p>
        <p>A larger <a href="https://pubmed.ncbi.nlm.nih.gov/39836131/" target="_blank" rel="noopener noreferrer">2025 review of 32 studies</a>, led by Ryan Grant, found a larger benefit that did not fade as quickly as earlier research suggested. The studies do not give one reliable expiry date for your own trip. The fair reading is that recovery varies with the person, the time away and what follows it.</p>
        <p>One <a href="https://research.rug.nl/en/publications/vacation-after-effects-on-employee-health-and-well-being-and-the-/" target="_blank" rel="noopener noreferrer">study of summer holidays</a> found that health and wellbeing climbed quickly, peaked around the eighth day, and returned to baseline within roughly the first week back at work.</p>
        <div className={local.pullStat} aria-label="One study found wellbeing peaked around vacation day eight"><strong>8</strong><span>The day wellbeing peaked in one summer-holiday study</span></div>
        <p>It is a single study, so read it as a shape, not a prescription. If you came home feeling that you wasted the money, or that something is wrong with you, the research offers a more ordinary possibility: a real gain can fade when the demands return.</p>

        <h2>The real reason the tiredness <em>stayed</em></h2>
        <p>Psychologists Sabine Sonnentag and Charlotte Fritz describe four experiences involved in recovery: <em>detachment, relaxation, mastery and control.</em> The 2025 review found psychological detachment and physical activity among the experiences most associated with improved wellbeing. Not thinking about work is different from merely being away from it.</p>
        <p>You can sit on a terrace for ten days, body perfectly still, while your attention stays with a hiring decision, a client, a number that looked wrong on the last call. The body has travelled. The load has not.</p>
        <p>The return squeezes the trip from the other end. A <a href="https://www.pewresearch.org/short-reads/2023/08/10/more-than-4-in-10-u-s-workers-dont-take-all-their-paid-time-off/" target="_blank" rel="noopener noreferrer">Pew survey</a> found that 46% of US workers offered paid time off took less than they were allowed. Among those who took less, 49% worried about falling behind and 43% felt badly about colleagues taking on extra work. For a founder with no one to hand the work to, the fear may run deeper, though that is inference, not a finding.</p>

        <h2>Rest and challenge are not <em>rivals</em></h2>
        <p>The evidence does not crown either. It offers a better question than &ldquo;where do I want to go?&rdquo; It is &ldquo;what do I need taken off, and what, if anything, put on?&rdquo;</p>
        <p>If you are worn out and work still reaches you, the research points toward protected detachment. If you are restless more than tired, movement may help. None of this means a travel company can diagnose what you need from a questionnaire.</p>
        <p>A <a href="https://pubmed.ncbi.nlm.nih.gov/20234864/" target="_blank" rel="noopener noreferrer">Dutch study of 1,530 people</a> adds a caution. Holidaymakers reported more happiness than non-holidaymakers before departure, possibly because of anticipation. Generally, they were no happier after returning, except following a very relaxed holiday. A trip asked to carry a whole year of fatigue may be asked to do too much.</p>

        <h2>Five questions only you can <em>answer</em></h2>
        <p>Research describes averages. It cannot tell you what happened inside your own holiday. Sit with these for a moment.</p>
        <ol className={local.questionList}><li>On the sixth day, what were you thinking about?</li><li>Was there a point when work could reach you, and did you check?</li><li>How did you sleep on the nights that mattered?</li><li>What was waiting for you, and how many days did you give yourself before you met it?</li><li>Did you want to be stilled or stretched, and was the trip built for that?</li></ol>
        <p>If your honest answers are &ldquo;work,&rdquo; &ldquo;yes,&rdquo; &ldquo;badly,&rdquo; &ldquo;no days at all&rdquo; and &ldquo;I am not sure,&rdquo; you have not failed at resting. You have found where the load stayed.</p>

        <h2>If what you are carrying is not <em>work</em></h2>
        <p>The studies discussed here largely concern employees and work strain. They cannot tell you what a trip will do for a separation or a bereavement. A new place may offer room and fewer demands, but it cannot be prescribed as a remedy for grief.</p>
        <p>The <a href="https://www.who.int/standards/classifications/frequently-asked-questions/burn-out-an-occupational-phenomenon" target="_blank" rel="noopener noreferrer">World Health Organization</a> describes burnout as an occupational phenomenon arising from chronic workplace stress that has not been successfully managed. It is not classified as a medical condition, and a vacation is not a treatment for it.</p>
        <p><em>This article reviews research on vacation and wellbeing. It is not medical advice or a diagnosis. Persistent exhaustion, low mood, disrupted sleep or loss of interest deserves assessment by an appropriate healthcare professional before booking travel.</em></p>

        <h2>How to come <em>home</em></h2>
        <p>The studies suggest a different shape for the next trip. Give yourself time to prepare. While you are away, decide in advance who can reach you and for what. Treat the return as part of the trip, leaving room to reacclimate before work resumes.</p>
        <p>In a <a href="https://pubmed.ncbi.nlm.nih.gov/42099929/" target="_blank" rel="noopener noreferrer">2026 randomized trial of 190 workers</a>, participants using a recovery app reported less work-related rumination two weeks after vacation than those on a waiting list. The groups included 91 and 99 people, and the between-group effect size was 0.67 in magnitude. It is one trial of one tool, not a rule for every traveller.</p>
        <p>When you choose a provider, ask what state the trip is designed to leave you in, how work will reach you, and what happens on your first two days home.</p>

        <h2>What we cannot <em>promise</em></h2>
        <ul><li>A trip will not repair chronic workplace stress, a separation or a stalled company.</li><li>No study can say how long a benefit will last for you.</li><li>Much of this research relies on participants&apos; own reports. It should not be generalized to every worker or every country. A <a href="https://blogs.worldbank.org/en/opendata/why-do-so-many-nigerian-workers-remain-poor-labor-force-surveys-may-have-answer" target="_blank" rel="noopener noreferrer">World Bank analysis</a> found that only about one fifth of Nigerian wage workers had paid leave.</li></ul>

        <hr />
        <h2>Where Ryravel <em>fits</em></h2>
        <p>Ryravel designs journeys around the state a person needs, not the place. We begin with how you feel, design the arc from there, and let the destination emerge last. Journeys start at $5,000 USD, and we stay in touch after the trip because the weeks after deserve attention too.</p>
        <p>If you are unsure what you need, the <Link href="/passage#feeling-quiz">Find Your Arc quiz</Link> takes a few minutes. The suitcase can stay half unpacked a little longer. Start with what was in it before you left.</p>

        <hr />
        <h2>Frequently asked <em>questions</em></h2>
        {questions.map(([question, answer]) => <section className={styles.faq} key={question}><h3>{question}</h3><p>{answer}</p></section>)}

        <div className={styles.ctaBox}><h3>The suitcase can stay half unpacked a little <em>longer.</em></h3><p>Start with what was in it before you left.</p><Link href="/request">Begin the conversation <span aria-hidden="true">→</span></Link><Link href="/journeys">Explore the arcs <span aria-hidden="true">→</span></Link></div>

        <div className={styles.sources}><h2>Sources &amp; further reading</h2><ul>{sources.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{label}</a></li>)}</ul></div>
      </article>

      <aside className={styles.authorBox} aria-label="About the author"><Image src="/people/maryangel-ajuzieogu.webp" alt="Maryangel Ajuzieogu" width={106} height={106} /><div><h2>Maryangel Ajuzieogu</h2><p className={styles.authorRole}>Founder, Ryravel</p><p>Maryangel designs journeys around each traveller&apos;s brief and writes about the emotional territory of travel.</p></div></aside>

      <section className={styles.related} aria-labelledby="related-title"><span className={frame.eyebrow}>More from Passage</span><h2 id="related-title">Keep reading</h2><div className={local.relatedLinks}><Link href="/passage/transformational-travel-vs-wellness-retreat"><span>The Category · Essay 01</span><strong>Transformational Travel vs. a Wellness Retreat</strong><small>Read the essay →</small></Link><Link href="/the-return"><span>From Ryravel</span><strong>The Return</strong><small>Explore the approach →</small></Link></div><Link className={styles.backLink} href="/passage">Explore Passage <span aria-hidden="true">→</span></Link></section>
    </main>
  </div>;
}
