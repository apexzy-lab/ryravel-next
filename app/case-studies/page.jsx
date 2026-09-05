import Link from "next/link";

export const metadata = {
  title: "Traveller Stories",
  description: "Real accounts of journeys designed around how a traveller needed to feel—and what changed after they returned.",
  alternates: { canonical: "https://ryravel.com/case-studies" },
  openGraph: {
    title: "Traveller Stories · Ryravel",
    description: "What brought a traveller to Ryravel, what was designed around them, and what remained when they came home.",
    url: "https://ryravel.com/case-studies",
    type: "website",
    images: [{ url: "https://ryravel.com/journeys/ex9/exhausted-zanzibar-coast.webp", alt: "A quiet stretch of Zanzibar coastline" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Traveller Stories · Ryravel",
    description: "Journeys documented by what changed after the traveller returned.",
    images: ["https://ryravel.com/journeys/ex9/exhausted-zanzibar-coast.webp"],
  },
};

export default function CaseStudiesPage() {
  return (
    <main className="case-studies-index">
      <section className="cs-index-hero">
        <div className="cs-index-intro">
          <span className="cs-kicker">The Return · Traveller stories</span>
          <h1>The trip is only half<br />the <em>story.</em></h1>
          <p>We document what brought a traveller to us, what we designed around them, and what remained when they came home.</p>
        </div>
        <aside className="cs-index-manifesto">
          <span>Our measure</span>
          <p>Not how much they saw.<br />What changed when they returned.</p>
          <small>Names and identifying details are changed when privacy requires it.</small>
        </aside>
      </section>

      <section className="cs-featured">
        <Link className="cs-featured-image" href="/case-studies/she-stopped-apologizing-for-needing-to-stop" aria-label="Read Amara's story">
          <img src="/journeys/ex9/exhausted-zanzibar-coast.webp" alt="A quiet stretch of Zanzibar coastline" />
          <span>Case study 01</span>
        </Link>
        <div className="cs-featured-copy">
          <span className="cs-kicker">Exhausted · The Restoration</span>
          <h2>She stopped apologizing for needing to stop.</h2>
          <p className="cs-featured-lead">For two years, Amara woke up already tired. Six nights in Zanzibar did not overhaul her life. They helped her draw one line she had never let herself draw before.</p>
          <dl>
            <div><dt>Traveller</dt><dd>Solo</dd></div>
            <div><dt>Journey</dt><dd>6 nights</dd></div>
            <div><dt>Place</dt><dd>Zanzibar</dd></div>
            <div><dt>The return</dt><dd>A boundary</dd></div>
          </dl>
          <Link className="cs-arrow-link" href="/case-studies/she-stopped-apologizing-for-needing-to-stop">Read Amara&apos;s story <span>→</span></Link>
        </div>
      </section>

      <section className="cs-method">
        <div>
          <span className="cs-kicker">What these stories hold</span>
          <h2>A journey, documented from the inside.</h2>
        </div>
        <div className="cs-method-grid">
          <article><span>01</span><h3>Before</h3><p>The honest condition a traveller was in—not the destination they thought they should choose.</p></article>
          <article><span>02</span><h3>The design</h3><p>The pace, place and protected space chosen to serve that specific emotional need.</p></article>
          <article><span>03</span><h3>The Return</h3><p>The small, observable change that made the journey matter after the suitcase was unpacked.</p></article>
        </div>
      </section>

      <section className="cs-index-close">
        <span className="cs-kicker">Your story begins before the airport</span>
        <h2>Tell us how you feel now.<br /><em>We will design from there.</em></h2>
        <p>You do not need to know where to go. One honest conversation is enough to begin.</p>
        <Link className="cs-button" href="/request?source=traveller-stories">Plan my journey <span>→</span></Link>
      </section>
    </main>
  );
}
