import Link from "next/link";
import { commercialServices } from "../commercialServices";
import { absoluteUrl, buildMetadata } from "../seo";
import base from "../luxury-corporate-retreats/corporate.module.css";
import cards from "../luxury-wellness-retreats/wellness.module.css";

const service = commercialServices["luxury-honeymoons"];
const path = `/${service.slug}`;
const requestHref = "/request?interest=Bespoke%20Honeymoons";
const description = "Bespoke luxury honeymoons designed for the two people taking them. Private stays, considered routes and seamless planning shaped around your shared brief.";
export const metadata = buildMetadata({ title: "Bespoke Luxury Honeymoons | Ryravel", description, path, keywords: service.keywords });

const principles = [
  ["The right contrast", "City and coast, wilderness and island, movement and stillness are sequenced to create a journey rather than a list of hotels. The route must earn its complexity rather than adding movement for its own sake."],
  ["Privacy with texture", "Private does not have to mean isolated. We balance time alone with people, food, place and experiences worth remembering together. The honeymoon is not a withdrawal from the world. It is a curated encounter with it."],
  ["No planning hangover", "Transfers, timing, room categories and special moments are settled before departure so the honeymoon does not become another project. You have already planned a wedding. This should feel like the opposite."],
];
const arrangements = [
  ["Private villas, suites and hideaways", "Chosen for the couple, not the crowd."],
  ["Multi-stop and multi-country routing", "Sequenced for contrast, not complexity."],
  ["Private transfers and guides", "The journey between places is considered as carefully as the places themselves."],
  ["Dining and celebration moments", "Designed around what you want to remember, not a standard hotel package."],
  ["Restorative time after the wedding", "Protected as deliberately as any scheduled experience."],
  ["Support while you travel", "Dedicated 24/7 support from the team that knows your journey."],
];
const faq = [
  ["Does Ryravel offer honeymoon packages?", "No. We design bespoke honeymoons rather than fixed packages. Published journeys can be a starting point, but the final route, stays and pace are built around the couple."],
  ["Can you combine more than one destination?", "Yes. We use contrast deliberately, such as culture followed by coast or wilderness followed by an island. The route must earn its complexity rather than adding movement for its own sake."],
  ["Can we begin without choosing a destination?", "Yes. Tell us your dates, investment range and how you want the honeymoon to feel. We can recommend a destination after understanding your brief."],
  ["When should we begin planning?", "Begin as soon as your likely dates and investment direction are known. Earlier enquiries create more choice for highly private stays, premium room categories and complex routes."],
  ["How much does a bespoke honeymoon cost?", "Every journey is priced from its brief. As indicative planning figures, a seven-night private honeymoon may start from approximately $18,000 per person, and a ten-night multi-destination journey from approximately $35,000 per person. These are not guaranteed prices. Exact availability, inclusions and pricing are confirmed in your proposal before booking."],
  ["What happens after the honeymoon ends?", "We plan a considered return, including a personal journey summary and an agreed check-in around day 30. The exact follow-up is confirmed in your proposal."],
];
const schema = [
  { "@context": "https://schema.org", "@type": "Service", "@id": `${absoluteUrl(path)}#service`, name: "Bespoke Luxury Honeymoons", serviceType: service.title, description, url: absoluteUrl(path), provider: { "@id": "https://ryravel.com/#organization" }, areaServed: { "@type": "Place", name: "Worldwide" }, audience: { "@type": "Audience", audienceType: service.audience }, availableChannel: { "@type": "ServiceChannel", serviceUrl: absoluteUrl("/request") } },
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
      <nav className={base.breadcrumb} aria-label="Breadcrumb"><Link href="/">Ryravel</Link><span>/</span><Link href="/travel-styles">Travel styles</Link><span>/</span>Honeymoons</nav>
      <span className={base.eyebrow}>Honeymoons &amp; journeys for two</span>
      <h1>A honeymoon designed for the two people <em>taking it.</em></h1>
      <p>The best honeymoon is not the most crowded itinerary or the most photographed resort. It is a private journey whose pace, setting and moments feel unmistakably yours, especially after months of making decisions for everyone else.</p>
      <span className={base.brandline}>Travel for what you&apos;re going through.</span>
    </div></header>

    <section className={base.section} aria-labelledby="principles-heading"><div className={base.wrap}>
      <Heading id="principles-heading" eyebrow="How we design" before="The place follows the purpose. The planning follows" emphasis="you." lead="Three principles govern every honeymoon we design. They are not features. They shape the entire brief." />
      <div className={base.threeGrid}>{principles.map(([title, copy], index) => <article className={base.card} key={title}><span className={base.number}>0{index + 1} / principle</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div></section>

    <section className={base.section} aria-labelledby="arrangements-heading"><div className={base.wrap}>
      <Heading id="arrangements-heading" eyebrow="What we can arrange" before="One brief. One considered" emphasis="journey." lead="Every inclusion is proposed against your dates, destination and priorities. Availability and exact pricing are confirmed before anything is booked." />
      <div className={cards.arrangements}>{arrangements.map(([title, copy], index) => <article className={cards.arrangement} key={title}><span className={base.number}>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div></section>

    <section className={base.section} aria-labelledby="proof-heading"><div className={base.wrap}>
      <Heading id="proof-heading" eyebrow="See our work" before="Journeys designed around" emphasis="people." lead={service.proof.title} />
      <Link className={base.textLink} href={service.proof.href}>{service.proof.label} <span aria-hidden="true">↗</span></Link>
    </div></section>

    <section className={base.section} aria-labelledby="faq-heading"><div className={base.wrap}>
      <Heading id="faq-heading" eyebrow="Before the first conversation" before="Questions we are asked" emphasis="often." lead="If your question is not here, a curator can answer it directly." />
      <div className={base.faq}>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </div></section>

    <section className={base.section} aria-labelledby="more-heading"><div className={base.wrap}>
      <Heading id="more-heading" eyebrow="Continue exploring" before="Other ways to travel" emphasis="together." lead="If your brief points somewhere else, there are more ways to begin." />
      <div className={cards.related}>{[commercialServices["luxury-travel-planning"], commercialServices["luxury-family-travel"], commercialServices["luxury-wellness-retreats"]].map((item) => <Link href={`/${item.slug}`} key={item.slug}>{item.title} <span aria-hidden="true">↗</span></Link>)}</div>
    </div></section>

    <section className={base.cta} aria-labelledby="cta-heading"><div className={base.wrap}><span className={base.eyebrow}>Begin</span><h2 id="cta-heading">Tell us what this journey needs to <em>hold.</em></h2><p>Begin with your dates, investment direction and one honest answer about what you want from your time together. We will review your request and guide the next step.</p><div className={base.actions}><Link className={base.button} href={requestHref}>Plan my honeymoon <span aria-hidden="true">↗</span></Link><a className={base.outlineButton} href="tel:+17605140361">Call +1 760 514 0361</a></div></div></section>
  </main>;
}
