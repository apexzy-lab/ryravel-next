import Link from "next/link";
import { CTA } from "./Blocks";
import { absoluteUrl } from "../seo";

export default function CommercialServicePage({ service, related = [] }) {
  const path = `/${service.slug}`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url: absoluteUrl(path),
    provider: { "@id": "https://ryravel.com/#organization" },
    areaServed: { "@type": "Place", name: "Worldwide" },
    audience: { "@type": "Audience", audienceType: service.audience },
    availableChannel: { "@type": "ServiceChannel", serviceUrl: absoluteUrl("/request") },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Travel styles", item: absoluteUrl("/travel-styles") },
      { "@type": "ListItem", position: 3, name: service.title, item: absoluteUrl(path) },
    ],
  };
  const requestHref = `/request?interest=${encodeURIComponent(service.title)}`;

  return <main className="commercial-service">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

    <section className="commercial-hero">
      <div>
        <nav aria-label="Breadcrumb"><Link href="/">Ryravel</Link><span>·</span><Link href="/travel-styles">Travel styles</Link></nav>
        <span className="kicker">{service.kicker}</span>
        <h1>{service.headline}</h1>
        <p>{service.intro}</p>
        <div><Link className="button button-red" href={requestHref}>Plan my journey</Link><Link className="button button-outline" href={service.proof.href}>{service.proof.label}</Link></div>
      </div>
    </section>

    <section className="commercial-definition paper-section">
      <span className="kicker">What Ryravel means by bespoke</span>
      <h2>The place follows the purpose.<br /><em>The planning follows you.</em></h2>
      <div className="commercial-pillars">{service.pillars.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className="commercial-arrangements">
      <div><span className="kicker">What we can arrange</span><h2>One brief.<br /><em>One considered journey.</em></h2><p>Every inclusion is proposed against your dates, destination and priorities. Availability and exact pricing are confirmed before anything is booked.</p></div>
      <ul>{service.arrangements.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>

    <section className="commercial-proof paper-section">
      <span className="kicker">Evidence, not adjectives</span>
      <h2>{service.proof.title}</h2>
      <Link className="text-link" href={service.proof.href}>{service.proof.label} →</Link>
    </section>

    <section className="commercial-faq paper-section">
      <header><span className="kicker">Useful answers</span><h2>Before the first conversation.</h2></header>
      <div>{service.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </section>

    {related.length > 0 && <section className="commercial-related paper-section"><span className="kicker">Related travel styles</span><div>{related.map((item) => <Link href={`/${item.slug}`} key={item.slug}><small>{item.kicker}</small><strong>{item.title}</strong><span>Explore →</span></Link>)}</div></section>}
    <CTA title="Tell us what this journey needs to hold." copy="Begin with your dates, investment direction and one honest answer about what you need from the journey. A curator responds within one business day." requestHref={requestHref} />
  </main>;
}
