import Link from "next/link";
import FeelingQuiz from "./components/FeelingQuiz";
import { CTA, JourneyCard } from "./components/Blocks";
import { journeys, journalEntries } from "./data";

const featured = ["ex6", "rn7", "ro8", "adv9"].map((slug) => journeys.find((journey) => journey.slug === slug));

export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-orbit one" /><div className="hero-orbit two" />
        <div className="home-hero-copy">
          <span className="kicker">The luxury travel experts</span>
          <h1>How do you<br /><em>want to feel?</em></h1>
          <p>Every journey we design begins with a single honest question. The answer shapes everything that follows.</p>
          <div><a className="button button-red" href="#feeling-quiz">Take the feeling quiz</a><Link className="button button-quiet" href="/journeys">Explore journeys</Link></div>
        </div>
        <span className="scroll-cue">Scroll ↓</span>
      </section>
      <div className="trust-strip">{["100% bespoke journeys", "15 Tanzania journeys", "24/7 curator support", "No two journeys alike", "Emotion-led by design"].map((item) => <span key={item}>◆ {item}</span>)}</div>
      <section className="manifesto-section"><span className="kicker">The Ryravel manifesto</span><p>We believe travel is <em>not a reward</em> for surviving your life.<br />It is not an escape. It is not a status symbol.<br />Travel is the most direct path from <em>who you are right now</em><br />to <em>who you are capable of becoming.</em><br />But only if it begins with the right question.<br />Not where do you want to go—but <em>how do you want to feel?</em></p><small>— Ryravel, founded on a feeling</small></section>
      <FeelingQuiz />
      <section className="split-story paper-section"><div><span className="kicker">Why every journey starts with a feeling</span><h2>The question<br />no one else<br /><em>thinks to ask</em></h2></div><div><p>The places that change us are rarely the ones we planned. They are the ones that matched something we needed and did not know how to say. We begin there—every time, for every traveller.</p><Link className="text-link" href="/about">Read our philosophy →</Link></div></section>
      <section className="reviews-preview paper-section"><div className="section-heading"><div><span className="kicker">What travellers say</span><h2>Journeys that stay<br /><em>with you</em></h2></div><Link className="text-link" href="/reviews">All reviews</Link></div><div className="review-grid">{[
        ["They did not ask where I wanted to go. They asked how I had been. That changed everything.", "Amara O.", "Kyoto & Yakushima · 10 nights"],
        ["I came back lighter. The journey knew what I needed before I did.", "James & Clara R.", "Patagonia Edge · 12 nights"],
        ["Not just luxurious—precisely right for who we were at that exact moment.", "Ngozi & Emeka A.", "Amalfi & Puglia · 9 nights"],
      ].map(([quote, name, trip]) => <article key={name}><span>★★★★★</span><blockquote>“{quote}”</blockquote><b>{name}</b><small>{trip}</small></article>)}</div></section>
      <section className="journey-preview paper-section"><div className="section-heading"><div><span className="kicker">Selected journeys</span><h2>Crafted for the way<br /><em>you want to arrive</em></h2></div><Link className="text-link" href="/journeys">All journeys</Link></div><div className="journey-cards">{featured.map((journey) => <JourneyCard journey={journey} key={journey.slug} />)}</div></section>
      <section className="stillness-feature"><div><strong>Stillness</strong></div><div><span className="kicker">Featured collection</span><h2>The most radical thing we offer is the permission to stop</h2><p>In a world that rewards motion, choosing stillness is an act of defiance. These journeys are for the person who has achieved everything—and lost something they cannot name.</p><Link className="text-link" href="/journeys/exhausted">Explore stillness journeys →</Link></div></section>
      <section className="principles paper-section"><span className="kicker">What we do & why we do it</span><h2>Built differently, <em>on purpose</em></h2><div>{[
        ["01", "We begin with feeling", "Before a destination is suggested, we ask how you want to feel."],
        ["02", "We curate, not catalogue", "Every journey begins with your conversation and exists only once."],
        ["03", "We design for The Return", "The journey ends. We think about the life you come back to."],
      ].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
      <section className="return-preview"><div><span className="kicker">The Return</span><h2>The journey ends.<br /><em>The change does not.</em></h2></div><div><p>We think about the life you come back to, not just the days you are away. A well-designed journey changes the world you return to.</p><Link className="text-link" href="/the-return">Read about The Return →</Link></div></section>
      <section className="journal-preview"><div className="section-heading"><div><span className="kicker">Our guide to luxury travel</span><h2>The Ryravel <em>Journal</em></h2></div><Link className="text-link" href="/journal">Full journal</Link></div><div className="journal-grid">{journalEntries.slice(0, 3).map((entry, index) => <Link href={`/journal/${entry.slug}`} key={entry.slug}><span>0{index + 1} · {entry.type}</span><h3>{entry.title}</h3><p>{entry.summary}</p><u>Read →</u></Link>)}</div></section>
      <CTA />
    </main>
  );
}
