import Link from "next/link";
import { FeelingQuiz } from "../components/HomepageExperience";
import { absoluteUrl, buildMetadata } from "../seo";
import "./transformational.css";

export const metadata = buildMetadata({
  title: "Transformational Travel Designed Around Feeling | Ryravel",
  description: "Transformational travel that starts with a feeling, not a destination. Ryravel designs emotion-led journeys across Africa and worldwide.",
  path: "/transformational-travel",
  absoluteTitle: true,
});

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Travel styles", item: absoluteUrl("/travel-styles") },
    { "@type": "ListItem", position: 3, name: "Emotion-led journeys", item: absoluteUrl("/transformational-travel") },
  ],
};

export default function TransformationalTravelPage() {
  return <main className="feeling-led-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

    <section className="fl-hero" aria-labelledby="fl-title">
      <nav aria-label="Breadcrumb"><Link href="/">Ryravel</Link><span>·</span><Link href="/travel-styles">Travel styles</Link><span>·</span><span>Emotion-led journeys</span></nav>
      <span className="kicker">The journey begins with you</span>
      <h1 id="fl-title">Transformational travel, designed around how you want to feel</h1>
      <p>Most transformational travel sells you an itinerary. We start with a question: how do you want to feel when you come home?</p>
      <div className="fl-hero-actions"><a className="button button-red" href="#feeling-quiz">Find your arc</a><Link className="fl-text-link" href="/journeys">Explore published journeys <span aria-hidden="true">→</span></Link></div>
    </section>

    <section className="fl-intro paper-section">
      <div><span className="kicker">The difference</span><h2>Not a place first.<br /><em>A person first.</em></h2></div>
      <div className="fl-prose">
        <p>A destination can be beautiful and still be wrong for the person arriving there. An elaborate route can look impressive on paper while leaving no room to breathe. So we begin with the reason for leaving and the life you will return to. We ask about energy, relationships, curiosity, time, privacy and the kind of change you are hoping to carry home.</p>
        <p>Those answers become a practical brief. A traveller who needs genuine rest may need fewer transfers, protected mornings and a place where nothing asks for a decision. Someone who feels restless may need movement, challenge and a landscape that makes effort feel meaningful. Neither traveller is served by the same list of landmarks. The point is not to promise that a trip will change your life. It is to design the conditions in which something useful can happen, without forcing a result.</p>
        <p>That is why we do not ask you to choose a country before you are ready. We can work with a destination you already love, or recommend one after we understand what the journey needs to do. The world is available; the brief remains personal.</p>
      </div>
    </section>

    <section className="fl-method">
      <div className="fl-section-heading"><span className="kicker">How we design</span><h2>From a feeling<br /><em>to a journey.</em></h2><p>There is no personality test that can choose a holiday for you. The quiz can open the conversation; human curators make the decisions with you.</p></div>
      <div className="fl-method-steps">
        <article><span>01 / Listen</span><h3>What is true now?</h3><p>We begin with an honest account of where you are, not a sales category. You can arrive with a clear intention, a rough feeling or simply the knowledge that your usual breaks no longer work. We also ask about your companions, dates, comfort, access needs and investment range so the emotional brief has a real-world shape.</p></article>
        <article><span>02 / Shape</span><h3>What environment serves it?</h3><p>Only then do we consider place. Coast, city, wilderness, island and mountain offer different kinds of attention. We choose the sequence, stays, guides and unstructured time to support the purpose of the journey. Every proposal states what is included, what is not, what remains subject to availability and when payment would be due.</p></article>
        <article><span>03 / Return</span><h3>What should come home?</h3><p>We design the ending as carefully as the arrival. A rushed final day can undo the pace a journey has created. Space to reflect, a gentler final night and a considered return can help you notice what mattered. We cannot promise a particular emotional outcome; we can make the transition back to ordinary life less abrupt.</p></article>
      </div>
    </section>

    <section className="fl-stillness paper-section">
      <div className="fl-stillness-image"><img src="/images/stillness-collection-forest.jpg" alt="A quiet river beneath a dense forest canopy" loading="lazy" /></div>
      <div className="fl-stillness-copy"><span className="kicker">The method in practice</span><h2>The Stillness<br /><em>Collection.</em></h2><p>Stillness is one expression of this approach. Its seven published journeys move through different landscapes and lengths, but share a careful refusal to pack the day for its own sake. A remote fly-in stay in Katavi, an island on Lake Victoria and an unhurried river retreat by Victoria Falls do not feel interchangeable. Each offers a different way to step out of constant demand.</p><p>You can compare the actual journeys, their locations, durations, starting prices and inclusions before you enquire. The published collection is proof of how a feeling becomes a set of concrete choices—not a suggestion that every guest needs the same kind of quiet. If you need movement rather than stillness, we start somewhere else.</p><Link className="fl-text-link" href="/journeys/stillness">Explore all seven Stillness journeys <span aria-hidden="true">→</span></Link></div>
    </section>

    <section className="fl-worldwide paper-section">
      <div><span className="kicker">One approach · many landscapes</span><h2>Personal in method.<br /><em>Worldwide in scope.</em></h2></div>
      <div className="fl-prose"><p>Ryravel is not defined by a single country or by safari travel alone. Our published journeys currently give a closer look at selected experiences in Africa. A private request can begin with a place elsewhere in the world, a milestone, a family dynamic or no destination at all. We will say plainly when a brief is outside our expertise or when a proposed arrangement cannot be confirmed.</p><p>There is also no requirement to buy a published itinerary as it appears online. Those journeys show our taste and give you a useful starting point. Your eventual proposal is shaped around your party, timing and priorities, with named arrangements and clear terms before you authorise payment. If you are not sure which direction fits, the <Link href="/journeys">launched emotional arcs</Link> offer another way to see the approach in action.</p><p>Begin with the question below. It takes only a few choices and leads you toward a relevant arc, not into a booking. When you are ready, a Ryravel curator can turn that direction into a personal conversation and a considered proposal.</p></div>
    </section>

    <div className="new-home fl-feeling-quiz"><FeelingQuiz /></div>

    <section className="fl-close"><span className="kicker">Begin the conversation</span><h2>You do not need to know<br /><em>where to go yet.</em></h2><p>Tell us how you want to return, what your dates might be and who is travelling. We will help shape the next question. An enquiry creates no payment obligation, and nothing is booked until you review and approve a written proposal.</p><div><Link className="button button-red" href="/request?interest=Emotion-led%20journey">Plan my journey</Link><Link className="fl-text-link" href="/policies">How booking works <span aria-hidden="true">→</span></Link></div></section>
  </main>;
}
