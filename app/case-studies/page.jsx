import Link from "next/link";
import { absoluteUrl, buildMetadata } from "../seo";
import { caseStudies } from "./caseStudies";

export const metadata = buildMetadata({
  title: "Luxury Travel Case Studies",
  description: "Read real Ryravel case studies of bespoke solo, family and team journeys across Africa, the Middle East and the Indian Ocean—and what changed after each traveller returned.",
  path: "/case-studies",
  image: "/journeys/ex9/exhausted-zanzibar-coast.webp",
});

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${absoluteUrl("/case-studies")}#collection`,
  name: "Ryravel luxury travel case studies",
  url: absoluteUrl("/case-studies"),
  description: metadata.description,
  isPartOf: { "@id": "https://ryravel.com/#website" },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: caseStudies.length,
    itemListElement: caseStudies.map((study, index) => ({ "@type": "ListItem", position: index + 1, url: absoluteUrl(`/case-studies/${study.slug}`), name: study.headline })),
  },
};

export default function CaseStudiesPage() {
  const [featured, ...stories] = caseStudies;
  return (
    <main className="case-studies-index">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <section className="cs-index-hero">
        <div className="cs-index-intro">
          <span className="cs-kicker">The Return · Seven traveller stories</span>
          <h1>The journey is only half<br />the <em>story.</em></h1>
          <p>Solo travellers, families and teams came to us with different lives and different reasons. The measure was never how much they saw. It was what remained after they returned.</p>
          <a className="cs-index-jump" href="#stories">Meet the travellers <span>↓</span></a>
        </div>
        <aside className="cs-index-manifesto">
          <span>Our measure</span>
          <p>Not the number of countries.<br />The change that came home.</p>
          <small>Some names and identifying details are changed when privacy requires it. Outcomes are personal and never promised.</small>
        </aside>
      </section>

      <section className="cs-featured" id="stories">
        <Link className="cs-featured-image" href={`/case-studies/${featured.slug}`} aria-label={`Read: ${featured.headline}`}>
          <img src={featured.image} alt={featured.imageAlt} />
          <span>Case study {featured.number} · {featured.destination}</span>
        </Link>
        <div className="cs-featured-copy">
          <span className="cs-kicker">{featured.arc}</span>
          <h2>{featured.headline}</h2>
          <p className="cs-featured-lead">{featured.intro}</p>
          <dl>
            <div><dt>Traveller</dt><dd>{featured.traveller}</dd></div>
            <div><dt>Journey</dt><dd>{featured.dates}</dd></div>
            <div><dt>Place</dt><dd>{featured.destination}</dd></div>
            <div><dt>The Return</dt><dd>{featured.returnLabel}</dd></div>
          </dl>
          <Link className="cs-arrow-link" href={`/case-studies/${featured.slug}`}>Read the story <span>→</span></Link>
        </div>
      </section>

      <section className="cs-library" aria-labelledby="case-study-library-title">
        <div className="cs-library-heading">
          <div><span className="cs-kicker">The case study collection</span><h2 id="case-study-library-title">Different journeys.<br /><em>Specific returns.</em></h2></div>
          <p>These are not destination reviews. They show how private travel can be designed around exhaustion, family presence, team trust, restlessness and the discipline of returning before you need rescue.</p>
        </div>
        <div className="cs-story-grid">
          {stories.map((study) => (
            <article className={`cs-story-card cs-tone-${study.theme}`} key={study.slug}>
              <Link href={`/case-studies/${study.slug}`} aria-label={`Read: ${study.headline}`}>
                <div className="cs-card-topline"><span>Case study {study.number}</span><span>{study.destination}</span></div>
                <div className="cs-card-copy"><span className="cs-kicker">{study.arc}</span><h3>{study.headline}</h3><p>{study.intro}</p></div>
                <div className="cs-card-footer"><span>{study.traveller}</span><strong>Read story →</strong></div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="cs-method">
        <div><span className="cs-kicker">What these stories hold</span><h2>A journey, documented from the inside.</h2></div>
        <div className="cs-method-grid">
          <article><span>01</span><h3>Before</h3><p>The honest condition the traveller was in—not the destination they thought they should choose.</p></article>
          <article><span>02</span><h3>The design</h3><p>The pace, place and protected space chosen to serve that specific emotional need.</p></article>
          <article><span>03</span><h3>The Return</h3><p>The observable change that made the journey matter after the suitcase was unpacked.</p></article>
        </div>
      </section>

      <section className="cs-index-close">
        <span className="cs-kicker">Your story begins before the airport</span>
        <h2>Tell us how you feel now.<br /><em>We will design from there.</em></h2>
        <p>You do not need to know where to go. One honest conversation with a Ryravel curator is enough to begin.</p>
        <Link className="cs-button" href="/request?source=case-studies">Plan my journey <span>→</span></Link>
      </section>
    </main>
  );
}
