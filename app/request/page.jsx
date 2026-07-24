"use client";

import { useState } from "react";

const feelings = [
  ["Exhausted", "I need to stop", "Running on empty. I need silence more than scenery and permission to be completely still."],
  ["Restless", "I need to be pushed", "I have been careful for too long. I need a landscape that asks something of me."],
  ["Disconnected", "I need to reconnect", "From someone I love, from myself, from a sense of what my life is actually for."],
  ["Romantic", "Just the two of us", "Three days with no itinerary, just proximity. Designed for two people who want to find each other again."],
  ["Curious", "I want to feel alive", "I want to be surprised by my own capacity. To encounter something I have no framework for yet."],
  ["Celebratory", "This moment deserves it", "A milestone worth marking. Something that says: this chapter of your life was significant."],
  ["Purposeful", "I am searching", "For clarity. For direction. For the version of myself I sense is there but cannot quite reach yet."],
  ["Open", "I trust you to decide", "I do not know exactly what I need. That is why I am here. Let the curator ask the questions."],
];

const budgets = ["$5,000 – $7,000", "$7,000 – $12,000", "$12,000 – $20,000", "$20,000 – $30,000", "$30,000+"];

const officeHours = [
  ["Monday", "9:00am – 11:00pm"],
  ["Tuesday", "9:00am – 11:00pm"],
  ["Wednesday", "9:00am – 11:00pm"],
  ["Thursday", "9:00am – 11:00pm"],
  ["Friday", "9:00am – 11:00pm"],
  ["Saturday", "9:00am – 11:00pm"],
  ["Sunday", "Closed"],
];

const stats = [
  ["100%", "Bespoke journeys"],
  ["20+", "Partner properties"],
  ["3", "Regions · Tanzania"],
  ["24/7", "Curator support"],
  ["< 24h", "Response time"],
];

export default function RequestPage() {
  const [feeling, setFeeling] = useState("");
  const [budget, setBudget] = useState("");
  const [sent, setSent] = useState(false);

  function submit(event) {
    event.preventDefault();
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="request-page">
      <section className="request-opening">
        <div className="request-hero">
          <div>
            <span className="kicker">Plan my journey</span>
            <h1>Every journey begins<br />with one honest<br /><em>conversation.</em></h1>
            <p>Tell us how you want to feel. We will take it from there. A dedicated curator will respond within one business day.</p>
          </div>
        </div>
        <aside className="curator-hours">
          <span className="kicker">We are here</span>
          <h2>Speak to a curator directly</h2>
          <p>Prefer a call before filling anything in? We understand. Our curators are available during office hours and always lead with listening.</p>
          <div className="hours-card">
            <span>Office hours</span>
            {officeHours.map(([day, time]) => <div key={day}><b>{day}</b><small className={time === "Closed" ? "closed" : ""}>{time}</small></div>)}
            <em>Excluding national holidays</em>
          </div>
        </aside>
      </section>

      <section className="request-stats">
        {stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </section>

      {sent ? (
        <section className="request-thanks">
          <span>✓</span>
          <p className="kicker">Enquiry received</p>
          <h1>Thank you.<br /><em>The conversation has begun.</em></h1>
          <p>Your answers are ready for a Ryravel curator. This demonstration does not transmit personal data, so please email <a href="mailto:hello@ryravel.com">hello@ryravel.com</a> to begin the live conversation.</p>
          <button className="button button-red" type="button" onClick={() => setSent(false)}>Return to the form</button>
        </section>
      ) : (
        <form className="journey-request-form" onSubmit={submit}>
          <section className="feeling-fieldset">
            <div className="request-section-heading"><span>Your feeling</span><small>Select the feeling closest to where you are right now.</small></div>
            <p className="feeling-intro">Before we ask where, we ask how. Choose the feeling that is truest to you right now. This shapes everything we build for you.</p>
            <div className="feeling-grid">
              {feelings.map(([name, title, copy]) => (
                <button className={feeling === name ? "selected" : ""} type="button" key={name} onClick={() => setFeeling(name)} aria-pressed={feeling === name}>
                  <em>{name}</em><strong>{title}</strong><small>{copy}</small>
                </button>
              ))}
            </div>
            <input type="hidden" name="feeling" value={feeling} />
            <small className="selection-note">You can select the answer that feels most honest.</small>
          </section>

          <section className="request-form-card">
            <div className="request-section-heading"><span>Your trip</span></div>
            <div className="request-fields">
              <label>When would you like to go? <b>*</b><select name="month" defaultValue="" required><option value="" disabled>Select month</option>{["January","February","March","April","May","June","July","August","September","October","November","December"].map((month) => <option key={month}>{month}</option>)}</select></label>
              <label>Year <b>*</b><select name="year" defaultValue="" required><option value="" disabled>Select year</option>{[2026, 2027, 2028, 2029].map((year) => <option key={year}>{year}</option>)}</select></label>
              <label>How long? <b>*</b><select name="duration" defaultValue="" required><option value="" disabled>Select duration</option><option>5–6 nights</option><option>7–9 nights</option><option>10–12 nights</option><option>More than 12 nights</option></select></label>
              <label>How many people? <b>*</b><select name="people" defaultValue="" required><option value="" disabled>Select</option><option>1 person</option><option>2 people</option><option>3–4 people</option><option>5–8 people</option><option>9+ people</option></select></label>
            </div>
            <fieldset className="budget-fieldset">
              <legend>Investment per person <b>*</b></legend>
              <p>All Ryravel journeys are fully bespoke. Select the range that best reflects your intention.</p>
              <div>{budgets.map((value) => <button className={budget === value ? "selected" : ""} type="button" key={value} onClick={() => setBudget(value)} aria-pressed={budget === value}><strong>{value}</strong><small>per person</small></button>)}</div>
              <input type="hidden" name="budget" value={budget} />
            </fieldset>
            <label className="request-message">Any other comments or requests<textarea name="message" rows="5" placeholder="Tell us anything else that feels important. A milestone you are marking, a specific experience you have in mind, something you read that made you think of us…" /></label>
          </section>

          <section className="request-form-card">
            <div className="request-section-heading"><span>Your details</span></div>
            <div className="request-fields">
              <label>Your name <b>*</b><input name="name" placeholder="Full name" required /></label>
              <label>How did you hear about us?<select name="referral" defaultValue=""><option value="" disabled>Select</option><option>Recommendation</option><option>Google</option><option>Instagram</option><option>Press</option><option>Other</option></select></label>
              <label>Email address <b>*</b><input name="email" type="email" placeholder="your@email.com" required /></label>
              <label>Confirm email address <b>*</b><input name="email-confirmation" type="email" placeholder="Confirm your email" required /></label>
              <label className="wide">Telephone <b>*</b><span className="phone-field"><select name="country-code" defaultValue="+234"><option>+234</option><option>+44</option><option>+1</option><option>+27</option><option>+255</option></select><input name="phone" type="tel" placeholder="Phone number" required /></span></label>
            </div>
            <label className="newsletter-field"><input name="newsletter" type="checkbox" /><span>Sign up to our newsletter for weekly inspiration curated by our Travel Experts—stories, destinations, and the questions worth asking before you go anywhere.</span></label>
            <div className="request-submit">
              <p>Your enquiry is handled personally by a Ryravel curator. We do not use automated responses. You will hear from a real person within one business day.</p>
              <button className="button button-red" type="submit">Submit enquiry →</button>
            </div>
          </section>
        </form>
      )}
    </main>
  );
}
