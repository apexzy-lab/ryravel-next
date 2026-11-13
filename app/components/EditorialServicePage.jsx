import Link from "next/link";
import { absoluteUrl } from "../seo";
import styles from "./editorialService.module.css";

export default function EditorialServicePage({ content, service }) {
  const path = `/${service.slug}`;
  const requestHref = `/request?interest=${encodeURIComponent(content.interest)}`;
  const serviceSchema = {
    "@context": "https://schema.org", "@type": "Service", "@id": `${absoluteUrl(path)}#service`,
    name: content.serviceName, serviceType: service.title, description: content.description,
    url: absoluteUrl(path), provider: { "@id": "https://ryravel.com/#organization" },
    audience: { "@type": "Audience", audienceType: service.audience },
    availableChannel: { "@type": "ServiceChannel", serviceUrl: absoluteUrl("/request") },
  };
  const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Travel styles", item: absoluteUrl("/travel-styles") },
    { "@type": "ListItem", position: 3, name: service.title, item: absoluteUrl(path) },
  ] };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: content.faq.map(([question, answer]) => ({
    "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer },
  })) };

  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <section className={styles.hero}><div className={styles.wrap}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Ryravel</Link><span>/</span><Link href="/travel-styles">Travel styles</Link><span>/</span>{service.title}</nav>
      <span className={styles.eyebrow}>{content.eyebrow}</span><h1>{content.heading[0]} <em>{content.heading[1]}</em></h1>
      <p className={styles.heroCopy}>{content.intro}</p><Link className={styles.primaryButton} href={requestHref}>{content.heroCta} <span aria-hidden="true">↗</span></Link>
    </div></section>

    <section className={`${styles.section} ${styles.paper}`} aria-labelledby="situations-heading"><div className={styles.wrap}>
      <span className={styles.eyebrow}>{content.situationsEyebrow}</span><h2 id="situations-heading">{content.situationsTitle[0]} <em>{content.situationsTitle[1]}</em></h2>
      {content.situationsLead && <p className={styles.lead}>{content.situationsLead}</p>}
      <div className={styles.situations}>{content.situations.map(([title, copy], i) => <article key={title}><span className={styles.number}>0{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
    </div></section>

    {content.comparison && <section className={`${styles.section} ${styles.dark}`} aria-labelledby="comparison-heading"><div className={styles.wrap}>
      <span className={styles.eyebrow}>The difference</span><h2 id="comparison-heading">Not a better offsite. <em>A different kind.</em></h2>
      <div className={styles.comparison}>{content.comparison.map((column) => <article key={column.title}><span className={styles.smallLabel}>{column.label}</span><h3>{column.title}</h3><ul>{column.points.map((point) => <li key={point}>{point}</li>)}</ul></article>)}</div>
    </div></section>}

    <section className={`${styles.section} ${content.comparison ? styles.paper : styles.dark}`} aria-labelledby="pillars-heading"><div className={styles.wrap}>
      <span className={styles.eyebrow}>{content.pillarsEyebrow}</span><h2 id="pillars-heading">{content.pillarsTitle[0]} <em>{content.pillarsTitle[1]}</em></h2>
      {content.pillarsLead && <p className={styles.lead}>{content.pillarsLead}</p>}
      <div className={styles.pillars}>{content.pillars.map(([title, copy], i) => <article key={title}><span className={styles.number}>0{i + 1} / 0{content.pillars.length}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div></section>

    {content.responsibilities && <section className={`${styles.section} ${styles.tan}`} aria-labelledby="responsibility-heading"><div className={styles.wrap}>
      <span className={styles.eyebrow}>Shared responsibility</span><h2 id="responsibility-heading">What leadership and the internal organiser need to <em>bring.</em></h2>
      <div className={styles.comparison}>{content.responsibilities.map((column) => <article key={column.title}><span className={styles.smallLabel}>{column.label}</span><h3>{column.title}</h3><ul>{column.points.map((point) => <li key={point}>{point}</li>)}</ul></article>)}</div>
    </div></section>}

    {content.arrangements && <section className={`${styles.section} ${styles.paper}`} aria-labelledby="arrangements-heading"><div className={styles.wrap}>
      <span className={styles.eyebrow}>What we can arrange</span><h2 id="arrangements-heading">What we can <em>arrange.</em></h2><p className={styles.lead}>Every inclusion is proposed against your dates, destination and priorities. Availability and exact pricing are confirmed before anything is booked.</p>
      <div className={styles.pillars}>{content.arrangements.map(([title, copy], i) => <article key={title}><span className={styles.number}>0{i + 1} / 0{content.arrangements.length}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div></section>}

    <section className={`${styles.section} ${styles.processSection}`} aria-labelledby="process-heading"><div className={styles.wrap}>
      <span className={styles.eyebrow}>How it works</span><h2 id="process-heading">{content.processTitle[0]} <em>{content.processTitle[1]}</em></h2>
      <div className={styles.process}>{content.process.map(([title, copy], i) => <article key={title}><span className={styles.number}>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div></section>

    {service.proof && <section className={`${styles.section} ${styles.proof}`} aria-labelledby="proof-heading"><div className={styles.wrap}><span className={styles.eyebrow}>A journey in practice</span><h2 id="proof-heading">{service.proof.title}</h2><Link className={styles.textLink} href={service.proof.href}>{service.proof.label} ↗</Link></div></section>}

    <section className={`${styles.section} ${styles.paper}`} aria-labelledby="faq-heading"><div className={styles.wrap}>
      <span className={styles.eyebrow}>Before we begin</span><h2 id="faq-heading">Questions people <em>ask.</em></h2>
      <div className={styles.faq}>{content.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </div></section>

    <section className={`${styles.section} ${styles.cta}`} aria-labelledby="cta-heading"><div className={styles.wrap}>
      <span className={styles.eyebrow}>Begin here</span><h2 id="cta-heading">Tell us what this journey needs to <em>hold.</em></h2><p>{content.ctaCopy}</p>
      <div className={styles.actions}><Link className={styles.primaryButton} href={requestHref}>{content.ctaLabel} <span aria-hidden="true">↗</span></Link><Link className={styles.outlineButton} href={content.secondaryHref}>{content.secondaryLabel} <span aria-hidden="true">↗</span></Link></div>
    </div></section>
  </main>;
}
