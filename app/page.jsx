"use client";

import { useEffect, useState } from "react";

const quizSteps = [
  {
    question: "What best describes where you are right now?",
    options: [
      "Running on empty, depleted",
      "Restless and itching to move",
      "Disconnected — from myself or others",
      "Searching for something I can't name",
    ],
  },
  {
    question: "What do you want more of?",
    options: ["Deep stillness", "Raw aliveness", "Real connection", "A new perspective"],
  },
  {
    question: "Which rhythm feels right?",
    options: ["Slow and spacious", "Bold and immersive", "Intimate and private", "Surprising and unplanned"],
  },
  {
    question: "When you return, what should have changed?",
    options: ["My energy", "My courage", "My relationships", "The way I see my life"],
  },
];

const journeys = [
  {
    mood: "For those who need to breathe again",
    title: "Silence & Forest Immersion, Yakushima",
    meta: "Japan · 7 nights · From £6,400pp",
    className: "journey-large forest",
  },
  {
    mood: "For two seeking only each other",
    title: "Under Saharan Stars",
    meta: "Morocco · 5 nights · From £4,800pp",
    className: "journey-small sahara",
  },
  {
    mood: "For those who need to feel alive again",
    title: "Patagonia Edge Expedition",
    meta: "Chile · 10 nights · From £9,200pp",
    className: "journey-small patagonia",
  },
  {
    mood: "For those ready to reconnect",
    title: "Amalfi Slow Journey",
    meta: "Italy · 8 nights · From £5,600pp",
    className: "journey-small amalfi",
  },
];

const returnStories = [
  {
    arrived: "Running on empty. Couldn't remember the last time I felt present.",
    returned: "I slept. Really slept. For the first time in two years.",
    quote: "I didn't know stillness was something you could travel to.",
    person: "Sarah K.",
    place: "Yakushima Forest · 7 nights",
  },
  {
    arrived: "Successful, but somehow further from each other than when we started.",
    returned: "We remembered how to be curious about each other.",
    quote: "Five nights under Saharan stars gave us back a conversation we'd lost.",
    person: "Amara & David",
    place: "Morocco · 5 nights",
  },
  {
    arrived: "Certain of everything. Excited by almost nothing.",
    returned: "The world feels wide again. So do my choices.",
    quote: "Patagonia didn't give me answers. It gave me better questions.",
    person: "Michael T.",
    place: "Chile · 10 nights",
  },
];

function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M9 20.8V10.5h6.8c4.4 0 6.8 1.8 6.8 5 0 2.2-1.2 3.7-3.3 4.5l3.6 4.4h-4.6l-3-3.8h-3.5v.2H9Zm3.8-3.3h3c2 0 3-.6 3-1.9s-1-1.9-3-1.9h-3v3.8Z" fill="currentColor" transform="translate(0 -2)" />
      </svg>
      <b>Ryravel</b>
    </span>
  );
}

export default function Home() {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = light ? "light" : "dark";
  }, [light]);

  function choose(option) {
    const next = [...answers];
    next[step] = option;
    setAnswers(next);
  }

  function nextStep() {
    if (!answers[step]) return;
    if (step === quizSteps.length - 1) setFinished(true);
    else setStep(step + 1);
  }

  function beginQuiz() {
    setQuizOpen(true);
    requestAnimationFrame(() => document.querySelector("#feeling-quiz")?.scrollIntoView({ behavior: "smooth" }));
  }

  return (
    <>
      <nav className="nav">
        <a href="#home" aria-label="Ryravel home"><Logo /></a>
        <div className="nav-links">
          <a href="#journeys">Journeys</a>
          <a href="#approach">Our approach</a>
          <a href="#return">The Return</a>
          <a href="#journal">Journal</a>
          <a href="#about">About</a>
        </div>
        <div className="nav-right">
          <div className="theme-control">
            <span>Theme:</span>
            <button className={`theme-toggle ${light ? "light" : ""}`} onClick={() => setLight(!light)} aria-label="Toggle light and dark theme">
              <i />
            </button>
            <small>{light ? "Light" : "Dark"}</small>
          </div>
          <a className="btn btn-primary nav-cta" href="#contact">Plan my journey</a>
          <button className={`burger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><i /><i /><i /></button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {["Journeys", "Our approach", "The Return", "Journal", "About"].map((item) => (
          <a key={item} href={`#${item.toLowerCase().replace("our ", "").replace("the ", "").replace(" ", "-")}`} onClick={() => setMenuOpen(false)}>{item}</a>
        ))}
        <a href="#contact" className="btn btn-primary">Plan my journey</a>
      </div>

      <main id="home">
        <section className="hero">
          <div className="hero-video">
            <video autoPlay muted loop playsInline preload="auto">
              <source src="https://media.ryravel.com/ryravel-hero.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="hero-fade" />
          <div className="hero-content">
            <div className="hero-left">
              <span className="eyebrow"><i />The luxury travel experts</span>
              <h1>How do you<br />want to feel?</h1>
              <p>Every journey we design begins with a single honest question. The answer shapes everything that follows.</p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={beginQuiz}>Take the feeling quiz</button>
                <a className="btn btn-ghost" href="#journeys">Explore journeys</a>
              </div>
            </div>
            <span className="scroll-label">Scroll</span>
          </div>
        </section>

        <div className="trust-bar">
          {["100% bespoke journeys", "10+ destinations", "24/7 curator support", "No two journeys alike", "Emotion-led by design"].map((item) => <span key={item}><i>◆</i>{item}</span>)}
        </div>

        <section className="manifesto" id="approach">
          <div>
            <span className="manifesto-label">The Ryravel Manifesto</span>
            <p>
              We believe travel is <em>not a reward</em> for surviving your life.<b />
              It is not an escape. It is not a status symbol.<b />
              Travel is the most direct path<br />from <em>who you are right now</em><br />to <em>who you are capable of becoming.</em><b />
              But only if it begins with the <u>right question.</u><b />
              Not <i>where</i> do you want to go —<br />but <em>how do you want to feel?</em>
            </p>
            <small>— Ryravel, founded on a feeling</small>
          </div>
        </section>

        <section className={`quiz ${quizOpen ? "expanded" : ""}`} id="feeling-quiz">
          <div className="section-intro">
            <div><span className="kicker">Find your feeling</span><h2>Answer four questions.<br /><em>We&apos;ll show you where to begin.</em></h2></div>
            <p>There are no right answers. Only honest ones.</p>
          </div>
          {!quizOpen ? (
            <button className="btn btn-primary quiz-start" onClick={() => setQuizOpen(true)}>Begin the feeling quiz</button>
          ) : !finished ? (
            <div className="quiz-card">
              <div className="quiz-progress"><span>0{step + 1}</span><div><i style={{ width: `${((step + 1) / quizSteps.length) * 100}%` }} /></div><span>0{quizSteps.length}</span></div>
              <h3>{quizSteps[step].question}</h3>
              <div className="quiz-options">
                {quizSteps[step].options.map((option) => <button key={option} className={answers[step] === option ? "selected" : ""} onClick={() => choose(option)}>{option}</button>)}
              </div>
              <div className="quiz-nav">
                <button disabled={step === 0} onClick={() => setStep(step - 1)}>← Back</button>
                <button className="btn btn-primary" disabled={!answers[step]} onClick={nextStep}>{step === quizSteps.length - 1 ? "Reveal my direction" : "Next →"}</button>
              </div>
            </div>
          ) : (
            <div className="quiz-result">
              <span className="kicker">Your direction</span>
              <h3>You&apos;re ready for a journey of <em>{answers[1]?.toLowerCase()}.</em></h3>
              <p>One of our curators will translate that feeling into places, pace and experiences chosen only for you.</p>
              <a href="#contact" className="btn btn-primary">Speak to a curator</a>
              <button onClick={() => { setStep(0); setAnswers([]); setFinished(false); }}>Start again</button>
            </div>
          )}
        </section>

        <section className="philosophy">
          <div className="philosophy-number">01</div>
          <div>
            <span className="kicker">Our philosophy</span>
            <h2>The question no one else<br /><em>thinks to ask</em></h2>
          </div>
          <div>
            <p>The places that change us are rarely the ones we planned. They&apos;re the ones that matched something we needed and didn&apos;t know how to say. We begin there — every time, for every traveller.</p>
            <a href="#approach" className="text-link">Read our philosophy →</a>
          </div>
        </section>

        <section className="testimonials">
          <div className="section-header">
            <div><span className="kicker">In their own words</span><h2>Journeys that<br /><em>stay with you</em></h2></div>
            <a className="text-link dark-link" href="#return">All reviews</a>
          </div>
          <div className="testimonial-grid">
            {[
              ["I came home quieter — in the best possible way.", "Sarah K.", "Yakushima · 7 nights"],
              ["We remembered why we chose each other.", "Amara & David", "Morocco · 5 nights"],
              ["Not just luxurious — precisely right for who we were at that exact moment.", "Ngozi & Emeka A.", "Amalfi & Puglia · 9 nights"],
            ].map(([quote, person, trip]) => (
              <article key={person}><div className="stars">★★★★★</div><blockquote>“{quote}”</blockquote><b>{person}</b><small>{trip}</small></article>
            ))}
          </div>
        </section>

        <section className="journeys" id="journeys">
          <div className="section-header">
            <div><span className="kicker">Selected journeys</span><h2>Crafted for the way<br /><em>you want to arrive</em></h2></div>
            <a className="text-link dark-link" href="#contact">All journeys</a>
          </div>
          <div className="journey-grid">
            {journeys.map((journey) => (
              <a href="#contact" className={journey.className} key={journey.title}>
                <div className="journey-glow" />
                <div><span>{journey.mood}</span><h3>{journey.title}</h3><small>{journey.meta}</small></div>
              </a>
            ))}
          </div>
          <div className="center-action"><a className="btn btn-outline-dark" href="#contact">Explore all journeys</a></div>
        </section>

        <section className="stillness">
          <div className="stillness-art"><i /><b>Stillness</b></div>
          <div className="stillness-copy">
            <strong>Stillness</strong>
            <span className="kicker">Featured collection</span>
            <h2>The most radical thing<br />we offer is the permission to stop</h2>
            <p>In a world that rewards motion, choosing stillness is an act of defiance. Our Stillness journeys are designed for the person who has achieved everything — and lost something they can&apos;t name.</p>
            <a href="#contact" className="text-link">Explore Stillness journeys →</a>
          </div>
        </section>

        <div className="partner-strip">
          <span>Trusted partners</span>
          <div>{["Amanresorts", "Four Seasons", "Singita", "&Beyond", "Belmond", "Soneva", "Six Senses", "Wilderness Safaris"].map((name) => <b key={name}>{name}</b>)}</div>
        </div>

        <section className="why" id="about">
          <span className="kicker">What we do & why we do it</span>
          <h2>Built differently, <em>on purpose</em></h2>
          <div className="why-grid">
            {[
              ["01", "We begin with feeling", "Before a single destination is suggested, we ask how you want to feel. That answer becomes the architecture of everything we build for you."],
              ["02", "We curate, not catalogue", "There is no Ryravel package. Every journey is built from a single conversation — yours — and exists only once."],
              ["03", "We design for The Return", "The journey ends. We think about what you come back to. A well-designed trip changes the life you return to, not just the days you are away."],
            ].map(([n, title, copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>

        <section className="return-section" id="return">
          <div className="return-head">
            <div><span className="kicker">The Return</span><h2>The journey ends.<br /><em>The change doesn&apos;t.</em></h2></div>
            <p>We think about the life you come back to, not just the days you&apos;re away. The Return is our name for what happens when a journey is designed with enough intention that it changes the world you return to.</p>
          </div>
          <div className="return-grid">
            {returnStories.map((story) => (
              <article key={story.person}>
                <span>They arrived</span><h3>{story.arrived}</h3>
                <span className="red">They returned</span><h3>{story.returned}</h3>
                <blockquote>“{story.quote}”</blockquote><b>{story.person}</b><small>{story.place}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="journal" id="journal">
          <div className="section-header">
            <div><span className="kicker">The Ryravel journal</span><h2>Ideas for travelling<br /><em>with intention</em></h2></div>
            <a className="text-link" href="#journal">Full journal</a>
          </div>
          <div className="journal-grid">
            {[
              ["Essay", "Why we ask how, not where", "The travel industry has optimised for the wrong question. Here is why emotion is a better compass than geography."],
              ["Guide", "A field guide to going nowhere slowly", "Everything we've learned about designing trips for people who need to stop — and why it's the hardest journey to plan."],
              ["Field notes", "What travellers bring home", "Notes from five years of asking our clients what they carried back. The answers are never what you'd expect."],
            ].map(([type, title, copy], index) => <article key={title}><span>0{index + 1} · {type}</span><h3>{title}</h3><p>{copy}</p><a href="#contact">Read →</a></article>)}
          </div>
        </section>

        <section className="contact" id="contact">
          <div><span className="kicker">Begin with a feeling</span><h2>Not just different.<br /><em>Built that way.</em></h2></div>
          <div><p>Tell us how you want to feel — and we&apos;ll build the rest. One conversation with a Ryravel curator is all it takes to begin.</p><a className="btn btn-light" href="mailto:hello@ryravel.com">Begin the conversation</a></div>
        </section>
      </main>

      <footer>
        <div><Logo /><p>We travel not to escape life,<br />but for life not to escape us.</p></div>
        <div><b>Explore</b><a href="#journeys">By feeling</a><a href="#journeys">By traveller</a><a href="#journeys">By month</a><a href="#journeys">Private bespoke</a></div>
        <div><b>Ryravel</b><a href="#approach">Our philosophy</a><a href="#about">The curators</a><a href="#journal">The journal</a><a href="#return">The Return</a></div>
        <div><b>Contact</b><a href="mailto:hello@ryravel.com">Speak to a curator</a><a href="tel:+442070000000">+44 20 7000 0000</a><a href="mailto:hello@ryravel.com">hello@ryravel.com</a></div>
        <small>© 2026 Ryravel Travels · Privacy · Terms</small>
      </footer>
    </>
  );
}
