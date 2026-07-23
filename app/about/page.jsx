import { CTA, PageHero } from "../components/Blocks";

export const metadata = { title: "Our approach" };

export default function AboutPage() {
  return <main>
    <PageHero kicker="Our philosophy" title="Why every journey" emphasis="starts with a feeling" copy="Luxury is not thread count. It is intention—the feeling that every detail understood you before you arrived." />
    <section className="editorial paper-section"><span className="kicker">Not thread count. Intention.</span><h2>Travel designed backwards from <em>The Return.</em></h2><p className="lead">Most travel begins with a map. Ours begins with a person. We listen for what your life has been asking of you, then design the destination, rhythm, people and pauses around the answer.</p><div className="principle-grid">{[
      ["Begin with a feeling", "Before dates or destinations, we ask what needs to change."],
      ["Design the emotional arc", "Arrival, opening, transformation and return each receive their own pace."],
      ["Place only what matters", "A meaningful experience earns its place. Empty time is protected."],
      ["Carry it home", "Every journey closes with a deliberate bridge back into ordinary life."],
    ].map(([title, copy], index) => <article key={title}><span>— 0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="dark-editorial"><span className="kicker">The Ryravel method</span><h2>Human-curated. Emotion-led. <em>Never templated.</em></h2><p>You work with one curator who listens deeply, challenges assumptions and remains present from the first conversation until after you arrive home.</p></section>
    <section className="curators paper-section" id="curators"><div><span className="kicker">The curators</span><h2>Real people who know when to add—and when to leave space.</h2></div><div className="curator-card"><span>Founder & lead curator</span><h3>Maryangel Nnamdi</h3><p>Ryravel was founded on the belief that the right journey can revise a life. Maryangel brings emotional intelligence, destination fluency and an obsessive care for timing to every itinerary.</p></div></section>
    <CTA />
  </main>;
}
