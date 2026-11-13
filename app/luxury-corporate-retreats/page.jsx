import Link from "next/link";
import { commercialServices } from "../commercialServices";
import { absoluteUrl, buildMetadata } from "../seo";
import styles from "./corporate.module.css";

const service = commercialServices["luxury-corporate-retreats"];
const path = `/${service.slug}`;
const requestHref = "/request?interest=Corporate%20and%20Leadership%20Retreats";
const description = "Corporate retreat planning for teams navigating intense work, organisational change or disconnection. Ryravel designs around the team brief before choosing a destination.";
export const metadata = buildMetadata({ title: "Corporate and Leadership Retreats | Team Restoration", description, path, keywords: service.keywords });

const situations = [
  ["Intense work cycles", "Your team has shipped, closed or launched through sustained intensity. The deadline has passed, but there has been little room to acknowledge what it took."],
  ["Organisational change", "After a restructure, merger or leadership transition, the work continues while trust, clarity and shared direction are still catching up."],
  ["Disconnection", "A remote or hybrid team may collaborate effectively while the relationships beneath the work become increasingly transactional."],
];
const conventional = ["Choose a venue first, then make the agenda fit", "Add wellness activities without connecting them to the team brief", "Move the same meetings into a more beautiful room", "Measure success by how much was covered", "Leave the return to work out of the design"];
const ryravel = ["Clarify what the team has been through before recommending a place", "Shape the pace, working time and recovery time around that brief", "Make room for connection without forced rituals", "Agree on practical commitments for the return", "Design once, for this team, at this moment"];
const method = [
  ["Diagnose", "We speak with team leads and gather a confidential, non-clinical picture of the team's context. We clarify the purpose, constraints and desired return before proposing a programme."],
  ["Design", "Location, pace, sessions, shared experiences and open time are selected against the brief. Each element has a reason to be there."],
  ["Deliver", "We coordinate the agreed travel, accommodation, facilitation and on-site details with named partners. Exact inclusions and separately quoted add-ons are set out in the proposal."],
  ["Return", "Before departure, we agree what the team wants to carry back into work. A re-entry conversation and a check-in around day 30 help revisit those commitments."],
];
const managed = ["Team-context discovery and retreat design", "Destination and property recommendations", "Accommodation, meals and ground logistics in the agreed scope", "Facilitation and activities where included in the proposal", "On-site coordination and contingency support", "A re-entry plan and agreed follow-up"];
const provided = ["Access to relevant team leads for private briefing conversations", "Dates, team size, budget range and material constraints", "One decision-maker or point of contact for approvals", "Travel information and approvals needed for planning", "Ownership of workplace actions after the team returns"];

const serviceSchema = { "@context": "https://schema.org", "@type": "Service", "@id": `${absoluteUrl(path)}#service`, name: "Corporate and Leadership Retreats", serviceType: service.title, description, url: absoluteUrl(path), provider: { "@id": "https://ryravel.com/#organization" }, areaServed: { "@type": "Place", name: "Worldwide" }, audience: { "@type": "Audience", audienceType: service.audience }, availableChannel: { "@type": "ServiceChannel", serviceUrl: absoluteUrl("/request") } };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
  { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
  { "@type": "ListItem", position: 2, name: "Travel styles", item: absoluteUrl("/travel-styles") },
  { "@type": "ListItem", position: 3, name: service.title, item: absoluteUrl(path) },
] };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: service.faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };

function Heading({ id, eyebrow, before, emphasis, lead }) {
  return <div className={styles.sectionHead}><span className={styles.eyebrow}>{eyebrow}</span><h2 id={id}>{before} <em>{emphasis}</em></h2><p>{lead}</p></div>;
}
function ListPanel({ title, items }) {
  return <article className={styles.listPanel}><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>;
}

export default function Page() {
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
    <header className={styles.hero}><div className={styles.wrap}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Ryravel</Link><span>/</span><Link href="/travel-styles">Travel styles</Link><span>/</span>Corporate retreats</nav>
      <span className={styles.eyebrow}>Team Restoration</span><h1>Corporate retreats for teams that need more than a change of scenery.</h1>
      <p>Ryravel designs and manages corporate retreats around what your team has been going through, combining recovery, meaningful connection and focused work with clear commitments for the return.</p>
      <span className={styles.brandline}>Travel for what you&apos;re going through.</span>
    </div></header>

    <section className={styles.section} aria-labelledby="situations-heading"><div className={styles.wrap}>
      <Heading id="situations-heading" eyebrow="When to consider this" before="Three situations this retreat is designed" emphasis="for." lead="Not every team needs a retreat. These are conditions where a restoration-led journey may be a useful investment." />
      <div className={styles.threeGrid}>{situations.map(([title, copy], index) => <article className={styles.card} key={title}><span className={styles.number}>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div></section>

    <section className={styles.section} aria-labelledby="difference-heading"><div className={styles.wrap}>
      <Heading id="difference-heading" eyebrow="What this is not" before="The difference between a Ryravel retreat and everything" emphasis="else." lead="We are not a wellness resort, a retreat marketplace or a burnout cure. We begin with the team's situation, not a destination." />
      <div className={styles.twoGrid}><ListPanel title="What you may have experienced before" items={conventional} /><ListPanel title="How Ryravel approaches it" items={ryravel} /></div>
    </div></section>

    <section className={styles.section} aria-labelledby="method-heading"><div className={styles.wrap}>
      <Heading id="method-heading" eyebrow="Our method" before="Diagnose, Design, Deliver," emphasis="Return." lead="Four commitments, from the first conversation through the team's re-entry into work." />
      <div className={styles.fourGrid}>{method.map(([name, copy], index) => <article className={styles.card} key={name}><span className={styles.number}>Stage 0{index + 1}</span><h3>{name}</h3><p>{copy}</p></article>)}</div>
    </div></section>

    <section className={styles.section} aria-labelledby="responsibilities-heading"><div className={styles.wrap}>
      <Heading id="responsibilities-heading" eyebrow="What to expect" before="What we manage, what you" emphasis="provide." lead="The proposal defines the exact scope. We make responsibilities visible before anything is booked." />
      <div className={styles.twoGrid}><ListPanel title="What Ryravel manages" items={managed} /><ListPanel title="What the client provides" items={provided} /></div>
      <p className={styles.scopeNote}>International flights, visas and travel insurance are available as separately quoted add-ons. We confirm suppliers, availability, inclusions and any additional costs before you commit.</p>
    </div></section>

    <section className={styles.section} aria-labelledby="measurement-heading"><div className={styles.wrap}>
      <Heading id="measurement-heading" eyebrow="Honest outcomes" before="What we measure, and what we" emphasis="won't claim." lead="We can design the conditions for useful time together and review what the team chose to carry home. We cannot promise a workplace outcome." />
      <div className={styles.twoGrid}><article className={styles.card}><h3>What we measure</h3><p>With your agreement, we establish a practical baseline in the initial brief, record the team's own commitments before departure and revisit them at follow-up. We report on those agreed measures, not invented transformation scores.</p></article><article className={styles.card}><h3>What we won't claim</h3><p>We do not treat burnout, fix a dysfunctional organisation or guarantee retention. Leaders remain responsible for workplace conditions and actions after the trip. Ryravel provides the travel design and the structure for an honest return.</p></article></div>
    </div></section>

    <section className={styles.section} aria-labelledby="proof-heading"><div className={styles.wrap}>
      <Heading id="proof-heading" eyebrow="A team journey in practice" before="What changed when they finally" emphasis="met." lead={service.proof.title} />
      <Link className={styles.textLink} href={service.proof.href}>{service.proof.label} <span aria-hidden="true">↗</span></Link>
    </div></section>

    <section className={styles.section} aria-labelledby="faq-heading"><div className={styles.wrap}>
      <Heading id="faq-heading" eyebrow="Before we begin" before="Questions leadership teams" emphasis="ask." lead="The details are shaped by your brief and confirmed in your proposal." />
      <div className={styles.faq}>{service.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </div></section>

    <section className={styles.briefSection} aria-labelledby="brief-heading"><div className={styles.wrap}><div className={styles.briefGrid}>
      <div><Heading id="brief-heading" eyebrow="For your leadership team" before="Begin with the" emphasis="Retreat Brief." lead="Share the context, timing and investment range for your team. We will review it and tell you what a considered first proposal would need." /><Link className={styles.button} href={requestHref}>Send a private retreat brief <span aria-hidden="true">↗</span></Link><p className={styles.briefNote}>No document is downloaded or emailed automatically. Your enquiry goes to the Ryravel team for review.</p></div>
      <aside className={styles.preview}><h3>What to include</h3><ul><li>What the team has been through</li><li>What needs to feel different on return</li><li>Group size and possible dates</li><li>Budget range and approval process</li><li>Relevant access, privacy or travel needs</li></ul></aside>
    </div></div></section>

    <section className={styles.cta} aria-labelledby="cta-heading"><div className={styles.wrap}><span className={styles.eyebrow}>Begin</span><h2 id="cta-heading">Tell us what your team has been <em>going through.</em></h2><p>A private conversation begins with listening. We will tell you honestly whether a restoration-led retreat fits the situation.</p><div className={styles.actions}><Link className={styles.button} href={requestHref}>Start the conversation <span aria-hidden="true">↗</span></Link><a className={styles.outlineButton} href="tel:+17605140361">Call +1 760 514 0361</a></div></div></section>
  </main>;
}
