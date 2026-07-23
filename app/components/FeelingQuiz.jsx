"use client";

import Link from "next/link";
import { useState } from "react";

const steps = [
  ["Right now, honestly—how are you?", ["Running on empty, depleted", "Restless and itching to move", "Disconnected—from myself or others", "Searching for something I cannot name"]],
  ["What do you need more of?", ["Deep stillness", "Raw aliveness", "Real connection", "A clearer sense of self"]],
  ["Which rhythm feels right?", ["Slow and spacious", "Bold and immersive", "Intimate and private", "Shared and celebratory"]],
  ["What should the journey change?", ["My energy", "My courage", "My relationship", "The way I see my life"]],
];

const directions = {
  "Deep stillness": ["exhausted", "The Exhausted Traveller’s Return"],
  "Raw aliveness": ["adventurous", "Adventurous"],
  "Real connection": ["social", "Social"],
  "A clearer sense of self": ["renewed", "Renewed"],
};

export default function FeelingQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const selected = answers[step];

  function choose(answer) {
    const next = [...answers];
    next[step] = answer;
    setAnswers(next);
  }

  function next() {
    if (!selected) return;
    if (step === steps.length - 1) setDone(true);
    else setStep(step + 1);
  }

  const direction = directions[answers[1]] || ["romantic", "A journey designed around you"];

  return (
    <section className="quiz-section" id="feeling-quiz">
      <div className="quiz-intro">
        <div><span className="kicker">How do you want to feel?</span><h2>Find your <em>feeling</em></h2></div>
        <p>Answer four questions. We will show you where to begin.</p>
      </div>
      {!done ? (
        <div className="quiz-panel">
          <div className="quiz-progress"><span>Question {step + 1} of {steps.length}</span><i><b style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></i></div>
          <h3>{steps[step][0]}</h3>
          <div className="quiz-options">
            {steps[step][1].map((answer) => <button type="button" className={selected === answer ? "selected" : ""} onClick={() => choose(answer)} key={answer}>{answer}</button>)}
          </div>
          <div className="quiz-buttons">
            <button type="button" className="text-button" disabled={step === 0} onClick={() => setStep(step - 1)}>← Back</button>
            <button type="button" className="button button-red" disabled={!selected} onClick={next}>{step === steps.length - 1 ? "Reveal my direction" : "Next →"}</button>
          </div>
        </div>
      ) : (
        <div className="quiz-result">
          <span className="kicker">Your direction</span>
          <h3>{direction[1]}</h3>
          <p>Your answers point toward a journey that creates {answers[1]?.toLowerCase()}, at a pace that feels {answers[2]?.toLowerCase()}.</p>
          <div><Link className="button button-red" href={`/journeys/${direction[0]}`}>Explore this arc</Link><Link className="button button-outline" href="/request">Speak to a curator</Link></div>
          <button className="text-button" onClick={() => { setDone(false); setStep(0); setAnswers([]); }}>Start again</button>
        </div>
      )}
    </section>
  );
}
