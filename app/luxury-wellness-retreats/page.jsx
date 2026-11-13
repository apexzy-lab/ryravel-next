import Link from "next/link";
import { commercialServices } from "../commercialServices";
import { absoluteUrl, buildMetadata } from "../seo";
import base from "../luxury-corporate-retreats/corporate.module.css";
import styles from "./wellness.module.css";

const service = commercialServices["luxury-wellness-retreats"];
const path = `/${service.slug}`;
const requestHref = "/request?interest=Private%20Wellness%20Retreats";
const description = "Private luxury wellness retreats designed around your need for rest, space and a considered return. Bespoke restorative travel, not a generic spa itinerary or medical programme.";
export const metadata = buildMetadata({ title: "Private Luxury Wellness Retreats | Ryravel", description, path, keywords: service.keywords });

const principles = [
  ["Rest before programming", "We protect sleep, silence and unscheduled time before deciding which treatments or practices deserve a place. The condition you arrive in determines the pace, not the other way around."],
  ["The right environment", "Coast, forest, mountain, desert and wilderness offer different kinds of space. We select a setting against your needs, preferences and comfort, not the destination that photographs best."],
  ["A return you can keep", "The journey closes deliberately, with room to understand what should, and should not, follow you home. We do not promise transformation. We design the conditions for a return you can practice."],
];
const arrangements = [
  ["Private restorative stays", "Settings chosen for your brief, not their popularity."],
  ["Spa and non-clinical wellness", "Experiences vetted for quality and relevance to what you need."],
  ["Nature, movement and contemplation", "Time outside paced to your energy, not a fixed schedule."],
  ["Dining and dietary coordination", "Food preferences and requirements considered in the plan."],
  ["Unstructured days and digital boundaries", "Open time protected as deliberately as scheduled experiences."],
  ["Support while you travel", "Dedicated 24/7 support from the team that knows your journey."],
];
const faq = [
  ["Is this a medical wellness programme?", "No. Ryravel designs travel and non-clinical restorative experiences. We do not diagnose conditions or replace medical care. Any clinical programme must be delivered and governed by its qualified provider."],
  ["Can I travel alone?", "Yes. Solo journeys can be designed around privacy, appropriate support and a pace that does not require you to perform being sociable. Your curator remains your point of contact."],
  ["Do I have to follow a fixed schedule?", "No. We protect unstructured time and only add experiences that serve your brief. The degree of structure is agreed before booking. If you want to change plans while travelling, we will discuss availability and any supplier costs with you before making a change."],
  ["Can a wellness journey be designed anywhere?", "We can consider destinations worldwide, subject to whether the available partners and setting genuinely support your brief. We recommend a place only after understanding what you need from the journey."],
  ["How much does a private restorative journey cost?", "Every journey is priced from its brief. The published five-night Zanzibar journey, The Reset, starts at $12,618 per person based on two sharing. A solo or different journey is quoted separately. We confirm availability, inclusions and the exact price before you commit."],
  ["What happens after the journey ends?", "We make space for a deliberate return, including a personal re-entry note and an agreed follow-up around day 30. The exact support is confirmed in your journey proposal."],
];
const schema = [
  { "@context": "https://schema.org", "@type": "Service", "@id": `${absoluteUrl(path)}#service`, name: "Private Luxury Wellness Retreats", serviceType: service.title, description, url: absoluteUrl(path), provider: { "@id": "https://ryravel.com/#organization" }, areaServed: { "@type": "Place", name: "Worldwide" }, audience: { "@type": "Audience", audienceType: service.audience }, availableChannel: { "@type": "ServiceChannel", serviceUrl: absoluteUrl("/request") } },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Travel styles", item: absoluteUrl("/travel-styles") },
    { "@type": "ListItem", position: 3, name: service.title, item: absoluteUrl(path) },
  ] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
];

function Heading({ id, eyebrow, before, emphasis, lead }) {
  return <div className={base.sectionHead}><span className={base.eyebrow}>{eyebrow}</span><h2 id={id}>{before} <em>{emphasis}</em></h2><p>{lead}</p></div>;
}

export default function Page() {
  return <main className={base.page}>
    {schema.map((entry) => <script key={entry["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(entry).replace(/</g, "\\u003c") }} />)}
    <header className={base.hero}><div className={base.wrap}>
      <nav className={base.breadcrumb} aria-label="Breadcrumb"><Link href="/">Ryravel</Link><span>/</span><Link href="/travel-styles">Travel styles</Link><span>/</span>Private wellness retreats</nav>
      <span className={base.eyebrow}>Private wellness</span>
      <h1>A private restorative journey designed around what recovery means to <em>you.</em></h1>
      <p>Some travellers need sleep and protected silence. Others need movement, nature, nourishing food or expert-led practice. Ryravel designs restorative journeys around the person, not a generic wellness menu, and never substitutes travel for medical care.</p>
      <span className={base.brandline}>Travel for what you&apos;re going through.</span>
    </div></header>

    <section className={base.section} aria-labelledby="principles-heading"><div className={base.wrap}>
      <Heading id="principles-heading" eyebrow="The philosophy" before="The place follows the purpose. The planning follows" emphasis="you." lead="Three principles govern every restorative journey we design. They are not features. They are the starting point." />
      <div className={base.threeGrid}>{principles.map(([title, copy], index) => <article className={base.card} key={title}><span className={base.number}>0{index + 1} / principle</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div></section>

    <section className={base.section} aria-labelledby="arrangements-heading"><div className={base.wrap}>
      <Heading id="arrangements-heading" eyebrow="What we arrange" before="One brief. One considered" emphasis="journey." lead="Every inclusion is proposed against your dates, destination and priorities. Availability and exact pricing are confirmed before anything is booked." />
      <div className={styles.arrangements}>{arrangements.map(([title, copy], index) => <article className={styles.arrangement} key={title}><span className={base.number}>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div></section>

    <section className={styles.honesty} aria-labelledby="care-heading"><div className={base.wrap}><span className={base.eyebrow}>An important distinction</span><h2 id="care-heading">We do not replace <em>medical care.</em></h2><div><p>Ryravel designs travel and non-clinical restorative experiences. We do not diagnose conditions or replace medical care. Any clinical programme must be delivered and governed by its qualified provider.</p><p>If you are managing a diagnosed condition, please discuss travel suitability with your care team. With your permission, we can account for relevant requirements in the journey brief.</p></div></div></section>

    <section className={base.section} aria-labelledby="proof-heading"><div className={base.wrap}>
      <Heading id="proof-heading" eyebrow="A journey in practice" before="Restoration, designed for" emphasis="one person." lead={service.proof.title} />
      <Link className={base.textLink} href={service.proof.href}>{service.proof.label} <span aria-hidden="true">↗</span></Link>
    </div></section>

    <section className={base.section} aria-labelledby="faq-heading"><div className={base.wrap}>
      <Heading id="faq-heading" eyebrow="Before we begin" before="Questions we are asked" emphasis="often." lead="If your question is not here, a curator can answer it directly." />
      <div className={base.faq}>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}{question === "How much does a private restorative journey cost?" && <> <Link className={styles.inlineLink} href="/journeys/the-reset">Explore The Reset</Link></>}</p></details>)}</div>
    </div></section>

    <section className={base.section} aria-labelledby="more-heading"><div className={base.wrap}>
      <Heading id="more-heading" eyebrow="Continue exploring" before="Other ways to travel" emphasis="with intention." lead="If your brief points somewhere else, there are more ways to begin." />
      <div className={styles.related}>{[commercialServices["luxury-travel-planning"], commercialServices["luxury-honeymoons"], commercialServices["luxury-family-travel"]].map((item) => <Link href={`/${item.slug}`} key={item.slug}>{item.title} <span aria-hidden="true">↗</span></Link>)}</div>
    </div></section>

    <section className={base.cta} aria-labelledby="cta-heading"><div className={base.wrap}><span className={base.eyebrow}>Begin</span><h2 id="cta-heading">Tell us what this journey needs to <em>hold.</em></h2><p>Begin with your dates, investment direction and one honest answer about what you need. We will review your request and guide the next step.</p><div className={base.actions}><Link className={base.button} href={requestHref}>Plan my journey <span aria-hidden="true">↗</span></Link><a className={base.outlineButton} href="tel:+17605140361">Call +1 760 514 0361</a></div></div></section>
  </main>;
}
