import Link from "next/link";

const canonical = "https://ryravel.com/case-studies/she-stopped-apologizing-for-needing-to-stop";
const image = "https://ryravel.com/journeys/ex9/exhausted-zanzibar-coast.webp";
const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "She Stopped Apologizing for Needing to Stop",
  description: "How a six-night Ryravel journey in Zanzibar helped one exhausted traveller return with a boundary she could keep.",
  image,
  mainEntityOfPage: canonical,
  articleSection: "Traveller stories",
  author: { "@type": "Organization", name: "Ryravel", url: "https://ryravel.com" },
  publisher: { "@type": "Organization", name: "Ryravel", url: "https://ryravel.com" },
};

export const metadata = {
  title: "She Stopped Apologizing for Needing to Stop",
  description: "How a six-night Ryravel journey in Zanzibar helped one exhausted traveller return with a boundary she could keep.",
  alternates: { canonical },
  openGraph: {
    title: "She Stopped Apologizing for Needing to Stop",
    description: "A Ryravel traveller story about exhaustion, permission and the boundary that came home.",
    url: canonical,
    type: "article",
    images: [{ url: image, alt: "A quiet stretch of Zanzibar coastline" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "She Stopped Apologizing for Needing to Stop",
    description: "A Ryravel traveller story about exhaustion, permission and the boundary that came home.",
    images: [image],
  },
};

export default function AmaraCaseStudyPage() {
  return (
    <main className="case-study-story">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <article>
        <header className="cs-story-hero">
          <img src="/journeys/ex9/exhausted-zanzibar-coast.webp" alt="A quiet stretch of Zanzibar coastline" />
          <div className="cs-story-shade" />
          <div className="cs-story-heading">
            <Link href="/case-studies">← All traveller stories</Link>
            <span className="cs-kicker">Case study 01 · Exhausted, The Restoration</span>
            <h1>She stopped apologizing<br />for needing to <em>stop.</em></h1>
            <p>Six nights. Zanzibar. Nothing asked of her.</p>
          </div>
        </header>

        <section className="cs-story-facts" aria-label="Journey summary">
          <div><span>Traveller</span><strong>Solo, mid-thirties</strong></div>
          <div><span>Starting point</span><strong>Running on empty</strong></div>
          <div><span>Journey</span><strong>6 nights · Zanzibar</strong></div>
          <div><span>What returned</span><strong>Permission and a boundary</strong></div>
        </section>

        <div className="cs-story-layout">
          <aside className="cs-story-rail">
            <span className="cs-kicker">The journey</span>
            <h2>Exhausted,<br />The Restoration</h2>
            <p>Pure decompression designed for the traveller who has tried taking time off and still returned unchanged.</p>
            <Link href="/journeys/ex9">Explore the 6-night journey <span>→</span></Link>
          </aside>

          <div className="cs-story-body">
            <section className="cs-story-opening">
              <span className="cs-section-number">01 · Before</span>
              <h2>She was not looking for a vacation.</h2>
              <p className="cs-dropcap">For two years, Amara woke up already tired. Not the kind of tired sleep fixes. The kind that sits behind the eyes.</p>
              <p>She was building a career she had worked hard for, saying yes to everything because saying no felt like proof she could not handle it. Early starts became late replies. Her phone was in her hand before her feet touched the floor.</p>
              <p>The schedule was not the worst of it. Nothing was landing anymore—not dinner with people she loved, a small win at work, or a weekend off. She was not simply exhausted. She felt estranged from the person who used to feel things fully.</p>
              <blockquote>A different destination was not enough. The journey itself had to ask less of her.</blockquote>
              <p>There was no dramatic breaking point. Just the slow accumulation of nights spent scrolling instead of sleeping, looking for something she could not yet name. She had tried vacations. They changed the light, not the life waiting underneath it.</p>
            </section>

            <section>
              <span className="cs-section-number">02 · The brief</span>
              <h2>Nothing should be asked of her.</h2>
              <p>The idea that stopped her scroll was not an itinerary. It was permission. After years of proving she could handle more, Ryravel would design six nights in which she did not have to perform capability, enthusiasm or even recovery.</p>
              <p>Her hesitation was the investment. Could she justify spending this much on herself for a journey with no landmarks to present afterward—no crowded checklist that would explain the cost to anyone else?</p>
              <p>She went anyway.</p>
              <div className="cs-design-note">
                <span>Designed around</span>
                <strong>Fewer decisions. Protected empty time. A single coastal rhythm. Human care without intrusion.</strong>
              </div>
            </section>

            <figure className="cs-story-image">
              <img src="/journeys/ex9/exhausted-stone-town-spice.webp" alt="Ground spices glowing in the warm light of Stone Town" />
              <figcaption>Zanzibar · A journey paced around her capacity, not a checklist.</figcaption>
            </figure>

            <section>
              <span className="cs-section-number">03 · The turning point</span>
              <h2>A morning asked nothing of her.</h2>
              <p>There was no grand breakthrough. What she remembers is smaller, and more important.</p>
              <p>One morning, Amara woke up and realized no one needed anything from her—not an email, a decision or a version of herself performing okay. She did not journal. She did not optimize the day. She let the morning happen instead of managing it.</p>
              <p>Later, she noticed she had not checked her phone in four hours. Not because it had been taken away, but because she had forgotten it existed. She sat with the strangeness of being unreachable—and the discovery that nothing had gone wrong in her absence.</p>
            </section>

            <section className="cs-return-section">
              <span className="cs-section-number">04 · The Return</span>
              <h2>The change was a line she could keep.</h2>
              <p>Amara did not come home with a new personality or a dramatic life overhaul. She came home and drew one boundary she had never allowed herself before: no work email after 7 pm.</p>
              <p>She did not announce it as a policy. She simply began closing the door each evening, on purpose. Then she took days off without arranging them around a deadline or using them to recover before another sprint.</p>
              <p>The change showed up in what she stopped doing—not in what she needed to announce.</p>
            </section>

            <section className="cs-traveller-quote">
              <span>In her own words</span>
              <blockquote>“Maryangel, thank you for designing this trip for me.”</blockquote>
              <small>Amara · Exhausted, The Restoration</small>
            </section>

            <footer className="cs-privacy-note">
              <p>“Amara” is a pseudonym. Her name and identifying details have been withheld at the traveller&apos;s request.</p>
            </footer>
          </div>
        </div>
      </article>

      <section className="cs-story-conversion">
        <div>
          <span className="cs-kicker">If rest has stopped reaching you</span>
          <h2>You may not need a better vacation.<br /><em>You may need a journey built differently.</em></h2>
          <p>Start with how you feel. A Ryravel curator will listen first, then design the place and pace around what you actually need.</p>
        </div>
        <div className="cs-story-actions">
          <Link className="cs-button" href="/request?journey=Exhausted%2C%20The%20Restoration&source=amara-case-study">Plan my journey <span>→</span></Link>
          <Link className="cs-secondary-link" href="/journeys/ex9">See the journey</Link>
        </div>
      </section>
    </main>
  );
}
