"use client";

import Link from "next/link";

export default function JournalIndex() {
  function requestNotification(event) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    const subject = encodeURIComponent("Ryravel Journal subscription");
    const body = encodeURIComponent(`Please notify ${email} when the next Ryravel Journal issue is published.`);
    window.location.href = `mailto:journal@ryravel.com?subject=${subject}&body=${body}`;
  }

  return <main className="journal-index">
    <section className="ji-hero">
      <div className="ji-hero-noise" />
      <div className="ji-hero-word" aria-hidden="true">Journal</div>
      <div className="ji-hero-body">
        <span className="ji-eyebrow ji-gold">journal.ryravel.com</span>
        <h1>The Ryravel<br /><em>Journal</em></h1>
        <p className="ji-hero-desc">Long-form writing on stillness, transformation, and the question no one else thinks to ask. Published when we have something worth saying.</p>
        <div className="ji-hero-meta">
          <div><small>Year</small><strong>2026</strong></div>
          <div><small>Issues published</small><strong>1 of 2</strong></div>
          <div><small>Next issue</small><strong><em>Vol. 2, Wonder</em></strong></div>
          <div><small>Cadence</small><strong>Twice yearly</strong></div>
        </div>
      </div>
      <span className="ji-scroll">Scroll ↓</span>
    </section>

    <section className="ji-feature">
      <Link className="ji-feature-cover" href="/journal/volume-one-stillness" aria-label="Read Ryravel Journal, Volume One: Stillness">
        <img src="/journal/empty-felt-anchored.png" alt="Dew on a green leaf with the words Empty. felt. Anchored" />
        <span className="ji-feature-cover-label">Ryravel Journal · Volume One</span>
      </Link>
      <div className="ji-feature-copy">
        <div className="ji-current"><i />Current issue</div>
        <p className="ji-volume">Volume One, 2026</p>
        <h2>Stillness</h2>
        <p className="ji-feature-desc">We built this issue expecting it to feel like relief. It doesn&apos;t. Stillness isn&apos;t the reward at the end of motion. It&apos;s what&apos;s left when the motion stops and nothing rushes in to replace it.</p>
        <div className="ji-contents">
          <p>In this issue</p>
          <ul>
            <li><span>The Big Idea</span> The Lie of the Payoff</li>
            <li><span>A Place</span> The Hour Nothing Happens</li>
            <li><span>The Voice</span> What the Silence Took</li>
            <li><span>Image</span> 2:47 PM</li>
          </ul>
        </div>
        <Link className="ji-read" href="/journal/volume-one-stillness">Read Vol. 1 →</Link>
      </div>
    </section>

    <section className="ji-coming">
      <div>
        <span className="ji-eyebrow">Next issue</span>
        <h2>Vol. 2, <em>Wonder</em></h2>
        <p>What happens when you encounter something so much larger than yourself that the self temporarily stops being interesting? Wonder is not awe. It doesn&apos;t flatten you. It reorganises you. Arriving November 2026.</p>
      </div>
      <div className="ji-coming-list">
        <article><small>The Big Idea</small><h3>The Difference Between Awe and Wonder</h3><p>On scale, smallness, and what reorganises rather than flattens.</p></article>
        <article><small>A Place, Sensorially</small><h3>Title withheld</h3><p>A landscape that performs nothing and changes everything.</p></article>
        <article><small>The Voice</small><h3>Account not yet in print</h3><p>A traveller&apos;s encounter, 2026. Submitted by permission.</p></article>
      </div>
    </section>

    <section className="ji-subscribe">
      <div>
        <span className="ji-eyebrow ji-gold">The Journal</span>
        <h2>Published when we have<br />something <em>worth saying</em></h2>
        <p>Twice a year. No padding, no frequency for frequency&apos;s sake. When the next issue is ready, you will be the first to know.</p>
      </div>
      <form onSubmit={requestNotification}>
        <p>Two issues per year. No other correspondence unless you ask for it.</p>
        <div><label className="sr-only" htmlFor="journal-email">Your email address</label><input id="journal-email" name="email" type="email" placeholder="Your email address" required /><button type="submit">Notify me</button></div>
        <small>Vol. 2, Wonder — November 2026</small>
      </form>
    </section>
  </main>;
}
