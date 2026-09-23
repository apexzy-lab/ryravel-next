"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import HeroVideo from "./HeroVideo";

const arcs = {
  exhausted: { label: "Exhausted, The Restoration", name: <>The <em>Restoration</em></>, desc: "Your arc begins with permission to stop. Six, nine, or eleven nights of coast, stillness, and the kind of sleep that actual rest produces. We take care of everything so you do not have to think.", url: "/journeys/ex6" },
  romantic: { label: "Romantic, The Reawakening", name: <>The <em>Reawakening</em></>, desc: "Your arc begins with presence. Privacy, unhurried time and a journey designed for two people who want to choose each other again.", waitlist: true },
  restless: { label: "Restless, The Unleashing", name: <>The <em>Unleashing</em></>, desc: "Your arc begins with challenge. The destination follows the kind of movement, discovery and transformation you are ready to meet.", waitlist: true },
  curious: { label: "Curious, The Awakening", name: <>The <em>Awakening</em></>, desc: "Your arc begins with witness. People, places and ideas that teach differently from anything a library offers.", waitlist: true },
  disconnected: { label: "Disconnected, The Return", name: <>The <em>Return</em></>, desc: "Your arc begins with reconnection. A private journey designed around finding your way back to yourself and what matters.", url: "/journeys#disconnected" },
  celebratory: { label: "Celebratory, The Milestone", name: <>The <em>Milestone</em></>, desc: "Your arc begins with ritual. A milestone this significant deserves a setting that holds its full weight. We design peak joy as ceremony, not indulgence.", waitlist: true },
  purposeful: { label: "Purposeful, The Alignment", name: <>The <em>Alignment</em></>, desc: "Your arc begins with witness. A journey that connects your time away with the life you return to.", waitlist: true },
  isolated: { label: "Isolated, The Gathering", name: <>The <em>Gathering</em></>, desc: "Your arc begins with belonging. We design for collective joy, shared memory and the kind of laughter that still echoes two years later.", waitlist: true },
};

const questions = [
  { q: "Right now, honestly — how are you?", opts: [["Running on empty, depleted, in need of genuine rest", "exhausted"], ["Restless and physically itching to move, to do something hard", "restless"], ["Disconnected from myself, from the people I love, from what matters", "disconnected"], ["In a relationship that needs a real moment together", "romantic"], ["Searching for meaning, wanting to witness something that matters", "purposeful"], ["Craving deep connection with people I love", "isolated"]] },
  { q: "What do you most need this journey to give you?", opts: [["Permission to completely stop", "exhausted"], ["A challenge that proves something to me about myself", "restless"], ["Silence, real silence, with no demands on my time", "disconnected"], ["Experiences that genuinely change how I see the world", "curious"], ["Joy shared with the people I love most", "isolated"], ["A setting worthy of a milestone I have been waiting for", "celebratory"]] },
  { q: "How do you want to feel on the last morning?", opts: [["Rested in a way I had forgotten was possible", "exhausted"], ["Proud of something I did not know I could do", "restless"], ["Clear, quiet, and ready to re-enter my life", "disconnected"], ["Closer to the person I came with than I have been in years", "romantic"], ["Like the world is bigger and more urgent than I remembered", "purposeful"], ["Certain that this was exactly right for exactly now", "celebratory"]] },
];

const journeys = [
  { href: "/journeys/ex9", image: "/journeys/ex9/exhausted-zanzibar-coast.webp", arcClass: "arc-ex", arc: "Exhausted, The Restoration", nights: "6 nights", name: "Pure Decompression", desc: "Six nights of nothing but coast, stillness, and the permission to stop.", tags: ["Beach", "Spa", "Culture"], includes: "Luxury lodge, all meals, private transfers, 24/7 curator", price: "$14,033", unit: "/ person" },
  { href: "/journeys/kimbilio", image: "/journeys/kimbilio/katavi-sunset.jpg", arcClass: "arc-st", arc: "Stillness Collection", nights: "4 nights", name: "Kimbilio", desc: "A fly-in private journey in remote Katavi, designed around solitude and the relief of becoming unreachable.", tags: ["Katavi", "Fly-in only", "Stillness"], includes: "Private lodge, meals, guided experiences and curator support", price: "$5,500", unit: "/ person sharing" },
  { href: "/journeys/kimya", image: "/journeys/kimya/rubondo-island.jpg", arcClass: "arc-st", arc: "Stillness Collection", nights: "4 nights", name: "Kimya", desc: "An island journey shaped around true quiet, Lake Victoria and the relief of hearing yourself again.", tags: ["Rubondo Island", "Lake Victoria", "Stillness"], includes: "Private camp, meals, island experiences and curator support", price: "$9,950", unit: "/ person sharing" },
  { href: "/journeys/kupona", image: "/journeys/kupona/matetsi-river-suite.jpg", arcClass: "arc-st", arc: "Stillness Collection", nights: "4 nights", name: "Kupona", desc: "Unstructured rest beside the Zambezi and the slow restoration of depleted energy.", tags: ["Victoria Falls", "Zambezi", "Restoration"], includes: "River-view suite, meals, private transfers and curator support", price: "$5,750", unit: "/ person sharing" },
];

export function FeelingQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [complete, setComplete] = useState(false);
  const winner = useMemo(() => {
    if (!complete) return null;
    const counts = answers.reduce((all, answer) => ({ ...all, [answer]: (all[answer] || 0) + 1 }), {});
    return arcs[Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0]];
  }, [answers, complete]);

  function next() {
    if (!selected) return;
    setAnswers([...answers, selected]);
    if (step === questions.length - 1) setComplete(true);
    else { setStep(step + 1); setSelected(null); }
  }

  function back() {
    if (!step) return;
    setStep(step - 1); setAnswers(answers.slice(0, -1)); setSelected(answers[answers.length - 1]);
  }

  function restart() { setStep(0); setAnswers([]); setSelected(null); setComplete(false); }

  return <section className="quiz-section" id="feeling-quiz">
    <div className="quiz-intro"><span className="kicker">Begin with a feeling</span><h2 className="serif-h2">Find your <em>arc</em></h2><p>Answer a few questions. We will show you where your journey begins.</p></div>
    <div className="quiz-panel"><div className="quiz-bar"><div className="quiz-bar-fill" style={{ width: complete ? "100%" : `${((step + 1) / questions.length) * 100}%` }} /></div>
      {!complete ? <div className="quiz-inner"><p className="quiz-step">Step {step + 1} of {questions.length}</p><h3 className="quiz-q">{questions[step].q}</h3><div className="quiz-opts">{questions[step].opts.map(([text, answer]) => <button type="button" aria-pressed={selected === answer} className={`quiz-opt${selected === answer ? " sel" : ""}`} key={text} onClick={() => setSelected(answer)}>{text}</button>)}</div><div className="quiz-nav"><button type="button" className="quiz-back" onClick={back} disabled={step === 0}>← Back</button><button type="button" className="quiz-fwd" onClick={next} disabled={!selected}>{step === questions.length - 1 ? "See my arc →" : "Next →"}</button></div></div> :
        <div className="quiz-result show" aria-live="polite"><p className="quiz-res-arc">{winner.label}{winner.waitlist ? " · Waitlist" : " · Launched"}</p><h3 className="quiz-res-name">{winner.name}</h3><p className="quiz-res-desc">{winner.desc}</p><div className="quiz-res-btns">{winner.waitlist ? <a className="btn-primary" href={`mailto:hello@ryravel.com?subject=${encodeURIComponent(`Waitlist interest: ${winner.label}`)}`}>Ask to be notified</a> : <Link className="btn-primary" href={winner.url}>Explore this arc</Link>}<button type="button" className="quiz-restart" onClick={restart}>Start again</button></div></div>}
    </div>
  </section>;
}

export default function HomepageExperience() {
  return <main className="new-home">
    <section className="hero"><HeroVideo /><div className="hero-overlay" /><div className="hero-body"><span className="hero-eye">Worldwide bespoke travel, designed for who you become</span><h1 className="hero-h1">The journey ends.<br /><em>The change does not.</em></h1><p className="hero-sub">Every journey begins not with a country, but with a feeling. We choose from the world to design the place, pace and experiences that serve it.</p><div className="hero-btns"><a className="btn-primary" href="#feeling-quiz">Begin with a feeling</a><Link className="btn-quiet" href="/journeys">Explore journeys</Link></div></div><span className="scroll-cue">Scroll ↓</span></section>

    <div className="ticker" aria-hidden="true"><div className="ticker-inner">{["Worldwide bespoke journeys", "24/7 curator support", "No two journeys alike", "Emotion-led by design", "Human-curated worldwide", "Worldwide bespoke journeys", "24/7 curator support", "No two journeys alike", "Emotion-led by design", "Human-curated worldwide"].map((item, index) => <span className="ticker-item" key={`${item}-${index}`}>{item}</span>)}</div></div>

    <section className="manifesto"><div className="manifesto-left"><span className="kicker">The Ryravel manifesto</span><h2>Travel is not a reward<br />for <em>surviving</em><br />your life.</h2></div><div className="manifesto-right"><p>It is not an escape. It is not a status symbol. Travel is the most direct path from <em>who you are right now</em> to <em>who you are capable of becoming.</em></p><p>But only if it begins with the right question. Not where do you want to go — but <em>how do you want to feel?</em></p><span className="manifesto-sig">— Ryravel. Founded on a feeling. Built for The Return.</span></div></section>

    <section className="return-section"><div className="return-header"><div><span className="kicker">The Return</span><h2 className="serif-h2">The journey ends.<br /><em>The change does not.</em></h2></div><Link className="return-link" href="/the-return">Read about The Return →</Link></div><div className="return-grid">{[["Exhausted, The Restoration", "Running on empty. Could not remember the last time I felt present.", "I slept. Really slept. For the first time in two years.", "Sarah K.", "Pure Decompression, 6 nights"], ["Disconnected, The Return", "I had not been alone with my own thoughts in months. Maybe years.", "Something reset. I came back quieter, and that was exactly the right thing.", "Marcus T.", "A private Stillness journey"], ["Romantic, The Reawakening", "We were good. But we had stopped being present with each other.", "We came back as people who had chosen each other again. Not out of habit. Out of certainty.", "Ngozi and Emeka A.", "A private journey for two"]].map(([arc, arrived, returned, name, journey]) => <article className="return-card" key={name}><p className="return-arc">{arc}</p><div className="return-row"><p className="return-label">They arrived</p><p className="return-text"><em>{arrived}</em></p></div><div className="return-row"><p className="return-label">They returned</p><p className="return-text">{returned}</p></div><p className="return-name">{name}</p><p className="return-journey">{journey}</p></article>)}</div></section>

    <section className="principles"><span className="kicker">What we do and why we do it</span><h2 className="serif-h2">Built differently, <em>on purpose</em></h2><div className="principles-grid">{[["01", "We begin with feeling", "Before a destination is suggested, we ask how you want to feel. The answer is the architecture of everything that follows."], ["02", "We curate, not catalogue", "Every journey begins with your conversation and exists only once. There is no template. There is only yours."], ["03", "We design backwards from The Return", "The final day is not checkout. It is the beginning. We design the journey around who you need to be when you come back."]].map(([number, title, copy]) => <article className="principle" key={number}><p className="principle-num">{number}</p><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="home-travel-styles"><div><span className="kicker">Worldwide journey design</span><h2 className="serif-h2">The world is available.<br /><em>The brief is personal.</em></h2><p>Choose a starting point, not a restriction. Ryravel designs private journeys worldwide for families, couples, solo travellers and leadership teams.</p><Link className="all-link" href="/travel-styles">Explore every travel style →</Link></div><nav aria-label="Travel styles">{[["Worldwide private travel", "/luxury-travel-planning"], ["Luxury family travel", "/luxury-family-travel"], ["Bespoke honeymoons", "/luxury-honeymoons"], ["Private wellness retreats", "/luxury-wellness-retreats"], ["Corporate & leadership retreats", "/luxury-corporate-retreats"]].map(([label, href], index) => <Link href={href} key={href}><span>0{index + 1}</span><strong>{label}</strong><i>Explore →</i></Link>)}</nav></section>

    <section className="journeys"><div className="journeys-header"><div><span className="kicker">Selected journeys</span><h2 className="serif-h2">Crafted for the way<br /><em>you want to arrive</em></h2></div><div className="jh-right"><Link className="all-link" href="/journeys">All journeys →</Link><p className="includes-note">All journeys include luxury lodge accommodation, all meals, private transfers, and 24/7 curator support.</p></div></div><div className="journey-grid">{journeys.map((journey) => <Link className="jcard" href={journey.href} key={journey.name}><div className="jcard-img"><div className="jcard-img-bg" style={{ backgroundImage: `url('${journey.image}')` }} /><div className="jcard-img-ov" /><span className={`arc-pill ${journey.arcClass}`}>{journey.arc}</span><div className="jcard-img-meta"><p className="jcard-nights">{journey.nights}</p><p className="jcard-img-title">{journey.name}</p></div></div><div className="jcard-body"><p className="jcard-arc">{journey.arc}</p><h3 className="jcard-name">{journey.name}</h3><p className="jcard-desc">{journey.desc}</p><div className="jcard-tags">{journey.tags.map((tag) => <span className="jcard-tag" key={tag}>{tag}</span>)}</div><p className="jcard-includes">{journey.includes}</p><div className="jcard-foot"><div><p className="jcard-from">From</p><p className="jcard-price">{journey.price}<span className="jcard-pp">{journey.unit}</span></p></div><span className="jcard-explore">Explore →</span></div></div></Link>)}</div></section>

    <section className="stillness" aria-labelledby="stillness-heading">
      <div className="stillness-visual" aria-hidden="true"><img src="/images/stillness-collection-forest.jpg" alt="" width="1080" height="1350" loading="lazy" /></div>
      <div className="stillness-shade" aria-hidden="true" />
      <div className="stillness-content">
        <h2 className="stillness-word" id="stillness-heading">Stillness</h2>
        <Link className="stillness-all" href="/journeys/stillness">Explore the Stillness Collection →</Link>
      </div>
    </section>

    <FeelingQuiz />

    <section className="global-cta"><span className="kicker">Begin your return</span><h2>How do you want<br />to <em>feel?</em></h2><p>One honest conversation is all it takes. Tell us where you are, and we will design the rest.</p><div className="cta-btns"><Link className="btn-cta" href="/request">Begin your return</Link><Link className="btn-cta-ol" href="/journeys">Explore journeys</Link></div></section>

  </main>;
}
