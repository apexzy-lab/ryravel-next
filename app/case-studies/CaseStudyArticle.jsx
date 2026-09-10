import Link from "next/link";

export default function CaseStudyArticle({ study, articleJsonLd, breadcrumbJsonLd }) {
  return (
    <main className="case-study-story">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <article>
        <header className={`cs-story-hero cs-tone-${study.theme}${study.image ? " cs-has-image" : ""}`}>
          {study.image ? <img src={study.image} alt={study.imageAlt} /> : <div className="cs-story-field" aria-hidden="true"><span>{study.destination}</span></div>}
          <div className="cs-story-shade" />
          <div className="cs-story-heading">
            <Link href="/case-studies">← All case studies</Link>
            <span className="cs-kicker">Case study {study.number} · {study.arc}</span>
            <h1>{study.headline}</h1>
            <p>{study.destination} · {study.dates}</p>
          </div>
        </header>

        <section className="cs-story-facts" aria-label="Journey summary">
          <div><span>Traveller</span><strong>{study.traveller}</strong></div>
          <div><span>Journey design</span><strong>{study.arc}</strong></div>
          <div><span>Place and time</span><strong>{study.destination} · {study.dates}</strong></div>
          <div><span>What returned</span><strong>{study.returnLabel}</strong></div>
        </section>

        <div className="cs-story-layout">
          <aside className="cs-story-rail">
            <span className="cs-kicker">The journey</span>
            <h2>{study.arc}</h2>
            <p>{study.intro}</p>
            <Link href={study.relatedJourney}>{study.relatedLabel} <span>→</span></Link>
          </aside>

          <div className="cs-story-body">
            {study.sections.map((section, index) => (
              <section className={index === 0 ? "cs-story-opening" : index === study.sections.length - 1 ? "cs-return-section" : undefined} key={section.label}>
                <span className="cs-section-number">{section.label}</span>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => <p className={index === 0 && paragraphIndex === 0 ? "cs-dropcap" : undefined} key={paragraph}>{paragraph}</p>)}
                {section.pullQuote ? <blockquote>{section.pullQuote}</blockquote> : null}
                {index === 1 ? <div className="cs-design-note"><span>Designed around</span><strong>{study.designedAround}</strong></div> : null}
              </section>
            ))}

            <section className="cs-traveller-quote">
              <span>In their own words</span>
              <blockquote>“{study.quote}”</blockquote>
              <small>{study.quoteBy}</small>
            </section>

            {study.privacy ? <footer className="cs-privacy-note"><p>{study.privacy}</p></footer> : null}
          </div>
        </div>
      </article>

      <section className="cs-story-conversion">
        <div>
          <span className="cs-kicker">Your journey will not look exactly like theirs</span>
          <h2>It should be designed around <em>what you need now.</em></h2>
          <p>Tell a Ryravel curator how you want to feel when you return. We will recommend the place, pace and private details from there.</p>
        </div>
        <div className="cs-story-actions">
          <Link className="cs-button" href={`/request?source=case-study-${study.slug}`}>Plan my journey <span>→</span></Link>
          <Link className="cs-secondary-link" href={study.relatedJourney}>{study.relatedLabel}</Link>
        </div>
      </section>
    </main>
  );
}
