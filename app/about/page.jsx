import { CTA, PageHero } from "../components/Blocks";

export const metadata = { title: "About Ryravel" };

export default function AboutPage() {
  return (
    <main>
      <PageHero
        kicker="Our story"
        title="Ryravel began"
        emphasis="with the trip that did not work"
        copy="A beautiful destination is not enough. A journey has to understand who you are when you leave—and what you need to return to."
      />

      <article className="founder-story paper-section">
        <header>
          <span className="kicker">Maryangel’s story</span>
          <h2>The Trip That Didn’t Work</h2>
        </header>

        <div className="founder-story-body">
          <section>
            <p className="lead">I needed to disappear. Not on vacation, disappear. Quiet. Solitude. Whatever was left of myself, I needed to sit with it.</p>
            <p>So I booked Zanzibar. Seven nights. A resort with a pool and a schedule and a lobby full of people. I picked the destination and let the destination pick everything else.</p>
            <p className="founder-pullquote">I came home exactly as I left.</p>
            <p>Not relaxed. Not renewed. Just unchanged, and now also tired from travelling. I remember sitting in my own living room a few days later, trying to figure out what had gone wrong, and realizing the trip had never had a chance. I hadn’t planned a journey for what I needed. I’d planned the opposite of it—crowds instead of quiet, noise instead of stillness—and called it a getaway because it had a beach.</p>
            <p><strong>That was the beginning of Ryravel. Not the beach. The mistake.</strong></p>
          </section>

          <section>
            <span className="story-number">01</span>
            <h3>What I got wrong</h3>
            <p>Most trips are built around a place. Where you’re going, what you’ll see, what’s on the itinerary. The feeling you’re chasing, the reason you booked it in the first place, is treated as a side effect—something the destination will supposedly hand you if the destination is nice enough.</p>
            <p>It doesn’t work that way. I’m proof.</p>
            <p>A place doesn’t know what you need. A resort doesn’t know you’re depleted. A packed itinerary doesn’t know you came looking for silence. Without someone designing <em>around</em> the actual condition you’re in, you can travel thousands of miles and still come home having missed yourself entirely.</p>
          </section>

          <section>
            <span className="story-number">02</span>
            <h3>What changed</h3>
            <p>After Zanzibar, I stopped researching destinations and started researching <em>why trips fail people who need them to work.</em> What separates a trip that changes something from one that’s just relocation with better weather.</p>
            <p>What I found: it’s rarely the place. It’s whether the trip was ever built around a feeling in the first place, or just around a place that photographs well.</p>
            <p>That’s the difference Ryravel is built on. Every journey starts with a question most travellers never ask: not <em>where do you want to go</em>, but <em>who are you right now, and what do you need to come back to</em>. The destination comes second. It’s chosen to serve the feeling, not the other way around.</p>
          </section>

          <section>
            <span className="story-number">03</span>
            <h3>Why this matters to me</h3>
            <p>I’m not building this for people chasing a nicer photo. I’m building it for people who’ve already had that trip—the well-reviewed, well-located, perfectly nice trip—and come home no different, the way I did.</p>
            <p>You can travel and stay exactly who you were. Or the trip can be built with enough intention that you don’t. I’ve done both. I know which one I’m building now.</p>
            <footer><strong>Maryangel</strong><span>Founder, Ryravel</span></footer>
          </section>
        </div>
      </article>

      <section className="editorial paper-section">
        <span className="kicker">Not thread count. Intention.</span>
        <h2>Travel designed backwards from <em>The Return.</em></h2>
        <p className="lead">Most travel begins with a map. Ours begins with a person. We listen for what your life has been asking of you, then design the destination, rhythm, people and pauses around the answer.</p>
        <div className="principle-grid">{[
          ["Begin with a feeling", "Before dates or destinations, we ask what needs to change."],
          ["Design the emotional arc", "Arrival, opening, transformation and return each receive their own pace."],
          ["Place only what matters", "A meaningful experience earns its place. Empty time is protected."],
          ["Carry it home", "Every journey closes with a deliberate bridge back into ordinary life."],
        ].map(([title, copy], index) => <article key={title}><span>— 0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="dark-editorial"><span className="kicker">The Ryravel method</span><h2>Human-curated. Emotion-led. <em>Never templated.</em></h2><p>You work with one curator who listens deeply, challenges assumptions and remains present from the first conversation until after you arrive home.</p></section>
      <section className="curators paper-section" id="curators"><div><span className="kicker">The curators</span><h2>Real people who know when to add—and when to leave space.</h2></div><div className="curator-card"><span>Founder & lead curator</span><h3>Maryangel</h3><p>Ryravel was founded on the belief that the right journey can revise a life. Maryangel brings emotional intelligence, destination fluency and an obsessive care for timing to every itinerary.</p></div></section>
      <CTA />
    </main>
  );
}
