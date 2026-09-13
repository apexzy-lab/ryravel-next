"use client";

import { useEffect, useRef, useState } from "react";
import { journeys } from "../data";

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
  ["6", "Countries · 3 regions"],
  ["24/7", "Curator support"],
  ["< 24h", "Response time"],
];

const countryCodes = [
  ["US / Canada", "+1"], ["United Kingdom", "+44"], ["Nigeria", "+234"],
  ["South Africa", "+27"], ["Tanzania", "+255"], ["Kenya", "+254"],
  ["UAE", "+971"], ["Qatar", "+974"], ["Europe", "+33"],
];

export default function RequestPage() {
  const [feeling, setFeeling] = useState("");
  const [budget, setBudget] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [turnstileEnabled, setTurnstileEnabled] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [journeyContext, setJourneyContext] = useState(null);
  const [contactPreference, setContactPreference] = useState("written-enquiry");
  const [preferredCallTime, setPreferredCallTime] = useState("");
  const [travelMonth, setTravelMonth] = useState("");
  const [travelYear, setTravelYear] = useState("");
  const [people, setPeople] = useState("");
  const turnstileMount = useRef(null);
  const turnstileWidget = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("journey");
    const selectedJourney = journeys.find((journey) => journey.slug === slug);
    const name = params.get("name") || selectedJourney?.title || (params.get("arc") ? params.get("name") : "");
    if (slug || name) {
      setJourneyContext({
        slug: slug || params.get("arc") || "bespoke",
        name: name || "Bespoke journey",
        destination: params.get("destination") || selectedJourney?.destination || "To be shaped with your curator",
        nights: params.get("nights") || (selectedJourney?.nights ? String(selectedJourney.nights) : ""),
        price: params.get("price") || selectedJourney?.price || "",
      });
    }
    if (params.get("conversation") === "private-call") setContactPreference("private-call");
    const startDate = params.get("start-date");
    if (startDate && /^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
      const [year, month] = startDate.split("-");
      setTravelYear(year);
      setTravelMonth(new Intl.DateTimeFormat("en", { month: "long", timeZone: "UTC" }).format(new Date(`${year}-${month}-01T00:00:00Z`)));
    }
    const party = params.get("party");
    if (party) setPeople(party === "Solo traveller" ? "1 person" : party === "2 people sharing" ? "2 people" : party);
  }, []);

  function requestPrivateCall() {
    setContactPreference("private-call");
    window.requestAnimationFrame(() => document.getElementById("journey-request")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  useEffect(() => {
    let cancelled = false;
    async function prepareTurnstile() {
      try {
        const response = await fetch("/api/turnstile", { cache: "no-store" });
        const config = await response.json();
        if (cancelled || !config.enabled || !config.siteKey) return;
        setTurnstileEnabled(true);
        const render = () => {
          if (cancelled || !turnstileMount.current || !window.turnstile || turnstileWidget.current !== null) return;
          turnstileWidget.current = window.turnstile.render(turnstileMount.current, {
            sitekey: config.siteKey,
            theme: "auto",
            action: "journey_request",
            callback: setTurnstileToken,
            "expired-callback": () => setTurnstileToken(""),
            "error-callback": () => setTurnstileToken(""),
          });
        };
        if (window.turnstile) render();
        else {
          let script = document.getElementById("ryravel-turnstile-script");
          if (!script) {
            script = document.createElement("script");
            script.id = "ryravel-turnstile-script";
            script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
          }
          script.addEventListener("load", render, { once: true });
        }
      } catch {
        setError("The security check could not be loaded. Please refresh and try again.");
      }
    }
    prepareTurnstile();
    return () => {
      cancelled = true;
      if (window.turnstile && turnstileWidget.current !== null) window.turnstile.remove(turnstileWidget.current);
      turnstileWidget.current = null;
    };
  }, []);

  async function submit(event) {
    event.preventDefault();
    setError("");
    if (!feeling || !budget) {
      setError("Please choose the feeling and investment range that fit this journey.");
      return;
    }
    if (turnstileEnabled && !turnstileToken) {
      setError("Please complete the security check before submitting.");
      return;
    }
    setSending(true);
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.emailConfirmation = form.get("email-confirmation");
    payload.countryCode = form.get("country-code");
    payload.newsletter = form.has("newsletter");
    payload.journey = journeyContext;
    payload.contactPreference = contactPreference;
    payload.preferredCallTime = preferredCallTime;
    payload.sourceUrl = window.location.href;
    payload.turnstileToken = turnstileToken;
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Your enquiry could not be sent.");
      setReference(result.reference || "");
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (submissionError) {
      setError(submissionError.message || "Your enquiry could not be sent. Please try again.");
      if (window.turnstile && turnstileWidget.current !== null) {
        window.turnstile.reset(turnstileWidget.current);
        setTurnstileToken("");
      }
    } finally {
      setSending(false);
    }
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
          <button className="request-call-button" type="button" onClick={requestPrivateCall}>Request a private conversation <span>→</span></button>
          <div className="hours-card">
            <span>Office hours</span>
            {officeHours.map(([day, time]) => <div key={day}><b>{day}</b><small className={time === "Closed" ? "closed" : ""}>{time}</small></div>)}
            <em>West Africa Time (UTC+1) · excluding national holidays</em>
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
          <p>Your enquiry is safely with our curators. We will respond within one business day.{journeyContext ? <> We have preserved your interest in <strong>{journeyContext.name}</strong>.</> : null}{reference ? <> Your reference is <strong>{reference}</strong>.</> : null}</p>
          <div className="request-thanks-next"><span>What happens now</span><ol><li>Your curator reviews the feeling and journey details you shared.</li><li>{contactPreference === "private-call" ? "We contact you to arrange the private conversation." : "We reply personally with the next best question."}</li><li>Only then do we shape destinations, pace and an initial investment direction.</li></ol></div>
          <button className="button button-red" type="button" onClick={() => { setSent(false); setReference(""); }}>Return to the form</button>
        </section>
      ) : (
        <form className="journey-request-form" id="journey-request" onSubmit={submit}>
          <label className="request-honeypot" aria-hidden="true">Website<input name="website" tabIndex="-1" autoComplete="off" /></label>
          {journeyContext ? <section className="request-journey-context" aria-label="Selected journey"><div><span>Your selected journey</span><h2>{journeyContext.name}</h2><p>{journeyContext.nights ? `${journeyContext.nights} nights · ` : ""}{journeyContext.destination}</p></div><div>{journeyContext.price ? <><small>From</small><strong>{journeyContext.price}</strong></> : <strong>Bespoke</strong>}<a href={`/journeys/${journeyContext.slug}`}>Review journey ↗</a></div></section> : null}
          <section className="request-contact-choice" aria-labelledby="contact-choice-title"><div><span className="kicker">How would you like to begin?</span><h2 id="contact-choice-title">Choose the kind of first conversation.</h2></div><div><button type="button" className={contactPreference === "written-enquiry" ? "selected" : ""} onClick={() => setContactPreference("written-enquiry")}><strong>Written journey request</strong><small>Share the essentials now. A curator replies personally within one business day.</small></button><button type="button" className={contactPreference === "private-call" ? "selected" : ""} onClick={() => setContactPreference("private-call")}><strong>Private curator call</strong><small>Tell us the essentials, then we will contact you to arrange a private conversation.</small></button></div></section>
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
              <label>When would you like to go? <b>*</b><select name="month" value={travelMonth} onChange={(event) => setTravelMonth(event.target.value)} required><option value="" disabled>Select month</option>{["January","February","March","April","May","June","July","August","September","October","November","December"].map((month) => <option key={month}>{month}</option>)}</select></label>
              <label>Year <b>*</b><select name="year" value={travelYear} onChange={(event) => setTravelYear(event.target.value)} required><option value="" disabled>Select year</option>{[2026, 2027, 2028, 2029].map((year) => <option key={year}>{year}</option>)}</select></label>
              <label>How long? <b>*</b><select name="duration" defaultValue="" required><option value="" disabled>Select duration</option><option>5–6 nights</option><option>7–9 nights</option><option>10–12 nights</option><option>More than 12 nights</option></select></label>
              <label>How many people? <b>*</b><select name="people" value={people} onChange={(event) => setPeople(event.target.value)} required><option value="" disabled>Select</option><option>1 person</option><option>2 people</option><option>3–4 people</option><option>5–8 people</option><option>9+ people</option></select></label>
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
              <label className="wide">Telephone <b>*</b><span className="phone-field"><select name="country-code" defaultValue="" required aria-label="Country calling code"><option value="" disabled>Code</option>{countryCodes.map(([country, code]) => <option value={code} key={`${country}-${code}`}>{country} {code}</option>)}</select><input name="phone" type="tel" placeholder="Phone number" autoComplete="tel-national" required /></span></label>
              {contactPreference === "private-call" ? <label className="wide">Best time for your curator to contact you <b>*</b><select name="preferred-call-time" value={preferredCallTime} onChange={(event) => setPreferredCallTime(event.target.value)} required><option value="" disabled>Select a window</option><option>Weekday morning</option><option>Weekday afternoon</option><option>Weekday evening</option><option>Saturday</option><option>Let the curator propose a time by email</option></select></label> : null}
            </div>
            <label className="newsletter-field"><input name="newsletter" type="checkbox" /><span>Send me occasional traveller case studies and carefully chosen journey notes from Ryravel.</span></label>
            {turnstileEnabled ? <div className="request-turnstile"><div ref={turnstileMount} /><small>Protected by Cloudflare Turnstile.</small></div> : null}
            <section className="request-next-steps" aria-labelledby="request-next-title"><span className="kicker">What happens next</span><h2 id="request-next-title">One request. Then a human conversation.</h2><ol><li><b>01</b><span><strong>Personal review</strong>Your curator reads the feeling, timing and investment direction you shared.</span></li><li><b>02</b><span><strong>Private conversation</strong>We reply within one business day and arrange a call when that is how you prefer to begin.</span></li><li><b>03</b><span><strong>Journey direction</strong>Only after listening do we shape the place, pace and first investment direction.</span></li><li><b>04</b><span><strong>Your proposal</strong>You receive a considered journey proposal. Nothing is booked until you are ready.</span></li></ol></section>
            <div className="request-submit">
              <p>Your enquiry is handled personally by a Ryravel curator. You will hear from a real person within one business day.</p>
              <div>{error ? <p className="request-error" role="alert">{error}</p> : null}<button className="button button-red" type="submit" disabled={sending}>{sending ? "Sending…" : "Submit enquiry →"}</button></div>
            </div>
          </section>
        </form>
      )}
    </main>
  );
}
