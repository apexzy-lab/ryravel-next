"use client";

import { useEffect, useRef, useState } from "react";
import { journeys } from "../data";
import { trackFunnel } from "../lib/funnel";

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

const arcToFeeling = {
  exhausted: "Exhausted",
  romantic: "Romantic",
  adventurous: "Restless",
  social: "Celebratory",
  stillness: "Exhausted",
  disconnected: "Disconnected",
};

const countryCodes = [
  ["US / Canada", "+1"], ["United Kingdom", "+44"], ["Nigeria", "+234"],
  ["UAE", "+971"], ["Qatar", "+974"], ["Saudi Arabia", "+966"],
  ["South Africa", "+27"], ["Kenya", "+254"], ["Tanzania", "+255"],
  ["Australia", "+61"], ["New Zealand", "+64"], ["Singapore", "+65"],
  ["Hong Kong", "+852"], ["India", "+91"], ["France", "+33"],
  ["Germany", "+49"], ["Italy", "+39"], ["Spain", "+34"],
  ["Netherlands", "+31"], ["Switzerland", "+41"],
];

function FeelingIcon({ name }) {
  const common = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5" };
  const icons = {
    Exhausted: <><path {...common} d="M15.6 3.2a7 7 0 1 0 5.2 10.9A8.2 8.2 0 0 1 15.6 3.2Z" /><path {...common} d="M6.5 5.5h.01M4.5 8h.01" /></>,
    Restless: <><path {...common} d="M4 18 10.2 5.5 14 14l2.1-4L20 18" /><path {...common} d="M7 18h10" /></>,
    Disconnected: <><path {...common} d="m8.7 15.3-1.4 1.4a3.5 3.5 0 0 1-5-5l3-3a3.5 3.5 0 0 1 4.9 0" /><path {...common} d="m15.3 8.7 1.4-1.4a3.5 3.5 0 0 1 5 5l-3 3a3.5 3.5 0 0 1-4.9 0M8 12h8" /></>,
    Romantic: <path {...common} d="M20.8 5.8a5 5 0 0 0-7.1 0L12 7.5l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21l8.8-8.1a5 5 0 0 0 0-7.1Z" />,
    Curious: <><path {...common} d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle {...common} cx="12" cy="12" r="2.5" /></>,
    Celebratory: <><path {...common} d="m12 3 1.7 4.8 5.1.2-4 3.2 1.4 4.9-4.2-2.9-4.2 2.9 1.4-4.9-4-3.2 5.1-.2L12 3Z" /><path {...common} d="M19 3v2M20 4h-2" /></>,
    Purposeful: <><circle {...common} cx="12" cy="12" r="8.5" /><circle {...common} cx="12" cy="12" r="4" /><path {...common} d="M12 3.5V7M20.5 12H17M12 20.5V17M3.5 12H7" /></>,
    Open: <><path {...common} d="M3 15.5c2.5-2 5.5-3 9-3s6.5 1 9 3" /><path {...common} d="M6.5 12a5.5 5.5 0 0 1 11 0M12 3v2M4.9 6.2l1.4 1.4M19.1 6.2l-1.4 1.4" /></>,
  };

  return <svg className="progressive-feeling-icon" viewBox="0 0 24 24" aria-hidden="true">{icons[name]}</svg>;
}

export default function RequestPage() {
  const [step, setStep] = useState(1);
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
  const [fieldErrors, setFieldErrors] = useState({});
  const formRef = useRef(null);
  const founderNoteRef = useRef(null);
  const turnstileMount = useRef(null);
  const turnstileWidget = useRef(null);
  const analyticsStarted = useRef(false);
  const analyticsSubmitted = useRef(false);
  const analyticsAbandoned = useRef(false);
  const analyticsJourneySlug = useRef("");

  function analyticsContext() {
    return analyticsJourneySlug.current ? { journey_slug: analyticsJourneySlug.current } : {};
  }

  function startForm() {
    if (analyticsStarted.current) return;
    analyticsStarted.current = true;
    trackFunnel("form_started", analyticsContext());
  }

  useEffect(() => {
    const onLeave = () => {
      if (!analyticsStarted.current || analyticsSubmitted.current || analyticsAbandoned.current) return;
      analyticsAbandoned.current = true;
      trackFunnel("form_abandoned", analyticsContext());
    };
    const onNavigation = (event) => {
      const link = event.target.closest?.("a[href]");
      if (link && new URL(link.href).pathname !== "/request") onLeave();
    };
    window.addEventListener("pagehide", onLeave);
    window.addEventListener("popstate", onLeave);
    document.addEventListener("click", onNavigation, true);
    return () => { window.removeEventListener("pagehide", onLeave); window.removeEventListener("popstate", onLeave); document.removeEventListener("click", onNavigation, true); };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("journey");
    const selectedJourney = journeys.find((journey) => journey.slug === slug);
    analyticsJourneySlug.current = selectedJourney?.slug || "";
    const requestedFeeling = params.get("feeling");
    const journeyFeeling = feelings.some(([name]) => name === requestedFeeling)
      ? requestedFeeling
      : arcToFeeling[selectedJourney?.arc || params.get("arc")];
    const name = params.get("name") || params.get("interest") || selectedJourney?.title || (params.get("arc") ? params.get("name") : "");
    if (slug || name) {
      setJourneyContext({
        slug: selectedJourney?.slug || "",
        name: name || "Bespoke journey",
        destination: params.get("destination") || selectedJourney?.destination || "To be shaped with your curator",
        nights: params.get("nights") || (selectedJourney?.nights ? String(selectedJourney.nights) : ""),
        price: params.get("price") || selectedJourney?.price || "",
        image: selectedJourney?.image || "",
        imageAlt: params.get("image-alt") || selectedJourney?.imageAlt || `${name || "Selected journey"} landscape`,
      });
    }
    if (selectedJourney && journeyFeeling) {
      setFeeling(journeyFeeling);
      setStep(2);
    }
    if (params.get("conversation") === "private-call") setContactPreference("private-call");
    const startDate = params.get("start-date");
    if (startDate && /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(startDate)) {
      const [year, month] = startDate.split("-");
      setTravelYear(year);
      setTravelMonth(new Intl.DateTimeFormat("en", { month: "long", timeZone: "UTC" }).format(new Date(`${year}-${month}-01T00:00:00Z`)));
    }
    const party = params.get("party");
    if (party) setPeople(party === "Solo traveller" ? "1 person" : party === "2 people sharing" ? "2 people" : party);
  }, []);

  useEffect(() => {
    if (step !== 3) return undefined;
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
  }, [step]);

  function formValue(name) {
    return String(new FormData(formRef.current).get(name) || "").trim();
  }

  function validateStep(activeStep) {
    const errors = {};
    if (activeStep === 1 && !feeling) errors.feeling = "Choose the feeling closest to where you are right now.";
    if (activeStep === 2) {
      if (!travelMonth) errors.month = "Choose a travel month.";
      if (!travelYear) errors.year = "Choose a travel year.";
      if (!formValue("duration")) errors.duration = "Choose a journey length.";
      if (!people) errors.people = "Tell us how many people will travel.";
      if (!budget) errors.budget = "Choose an investment range.";
    }
    if (activeStep === 3) {
      const name = formValue("name");
      const email = formValue("email");
      const countryCode = formValue("country-code");
      const phone = formValue("phone");
      if (!name) errors.name = "Enter your name.";
      if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email address.";
      if (!/^\+[1-9]\d{0,3}$/.test(countryCode)) errors.countryCode = "Enter a calling code, such as +1 or +44.";
      if (!phone) errors.phone = "Enter your telephone number.";
      if (contactPreference === "private-call" && !preferredCallTime) errors.preferredCallTime = "Choose when Ryravel should contact you.";
      if (turnstileEnabled && !turnstileToken) errors.turnstile = "Complete the security check before submitting.";
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length) trackFunnel("validation_error", { ...analyticsContext(), step: activeStep, error_fields: Object.keys(errors) });
    return Object.keys(errors).length === 0;
  }

  function changeStep(nextStep) {
    setError("");
    setFieldErrors({});
    setStep(nextStep);
    if (window.matchMedia("(max-width: 900px), (max-height: 719px)").matches) {
      window.requestAnimationFrame(() => document.getElementById("request-progress")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }

  function continueRequest(event) {
    event?.preventDefault();
    startForm();
    if (validateStep(step)) changeStep(Math.min(step + 1, 3));
  }

  async function submit(event) {
    event.preventDefault();
    if (step < 3) { continueRequest(); return; }
    setError("");
    if (!validateStep(3)) return;
    setSending(true);
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
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
      if (!response.ok) {
        if ([400, 422].includes(response.status)) trackFunnel("validation_error", { ...analyticsContext(), step: 3, error_fields: ["submission"] });
        throw new Error(result.error || "Your enquiry could not be sent.");
      }
      analyticsSubmitted.current = true;
      trackFunnel("enquiry_submitted", analyticsContext());
      if (contactPreference === "private-call") trackFunnel("private_call_requested", analyticsContext());
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
    <main className={`request-page${sent ? " request-page-complete" : ""}`}>
      {sent ? (
        <section className="request-thanks">
          <span>✓</span>
          <p className="kicker">Enquiry received</p>
          <h1>Thank you.<br /><em>The conversation has begun.</em></h1>
          <p>Your enquiry has reached Ryravel. Maryangel reads every request and replies personally within one business day.{journeyContext ? <> We have preserved your interest in <strong>{journeyContext.name}</strong>.</> : null}{reference ? <> Your reference is <strong>{reference}</strong>.</> : null}</p>
          <div className="request-thanks-next"><span>What happens now</span><ol><li>Maryangel reviews the feeling and journey details you shared.</li><li>{contactPreference === "private-call" ? "We contact you to arrange the private conversation." : "Maryangel replies with a considered next question."}</li><li>Only then do we shape destinations, pace and an initial investment direction.</li></ol></div>
          <button className="button button-red" type="button" onClick={() => { setSent(false); setReference(""); }}>Return to the form</button>
        </section>
      ) : (
        <section className="progressive-request" id="request-progress">
          <header className="progressive-request-header">
            <div className="progressive-request-title"><h1 className="kicker">Plan my journey</h1><p>Private journeys, shaped personally.</p></div>
            <ol className="progressive-stepper" aria-label={`Step ${step} of 3`}>
              {["How you feel", "Your journey", "Your details"].map((label, index) => <li className={step === index + 1 ? "active" : step > index + 1 ? "complete" : ""} aria-current={step === index + 1 ? "step" : undefined} key={label}><b>0{index + 1}</b><span>{label}</span></li>)}
            </ol>
          </header>
          <button className="progressive-founder-mobile" type="button" onClick={() => founderNoteRef.current?.showModal()}><span className="progressive-founder-mark" aria-hidden="true">MA</span><span><strong>A note from Maryangel</strong><small>Founder &amp; Journey Curator · Personal reply within one business day</small></span><span aria-hidden="true">↗</span></button>

          <form className="progressive-form" id="journey-request" ref={formRef} onSubmit={submit} onChangeCapture={startForm} noValidate>
            <label className="request-honeypot" aria-hidden="true">Website<input name="website" tabIndex="-1" autoComplete="off" /></label>
            <div className="progressive-workspace">
              <div className={`progressive-stage-card progressive-stage-card-step-${step}`}>
                <section className="progressive-stage progressive-feeling-stage" hidden={step !== 1} aria-labelledby="feeling-stage-title">
                  <div className="progressive-stage-heading"><div><span className="kicker">01 · How you feel</span><h2 id="feeling-stage-title">Right now, honestly—<br />how are you?</h2></div><small>Step 1 of 3 · about 30 seconds</small></div>
                  <p className="progressive-intro">Choose the feeling closest to where you are. This shapes what comes next.</p>
                  <div className="progressive-feelings">
                    {feelings.map(([name, title]) => <button className={feeling === name ? "selected" : ""} type="button" key={name} onClick={() => { startForm(); setFeeling(name); setFieldErrors({}); trackFunnel("feeling_selected", { ...analyticsContext(), feeling: name }); }} aria-pressed={feeling === name}><span className="progressive-feeling-mark" aria-hidden="true"><FeelingIcon name={name} />{feeling === name ? <span className="progressive-feeling-check">✓</span> : null}</span><em>{name}</em><strong>{title}</strong></button>)}
                  </div>
                  <input type="hidden" name="feeling" value={feeling} />
                  {fieldErrors.feeling ? <p className="progressive-field-error" role="alert">{fieldErrors.feeling}</p> : null}
                </section>

                <section className="progressive-stage progressive-journey-stage" hidden={step !== 2} aria-labelledby="journey-stage-title">
                  <div className="progressive-stage-heading"><div><span className="kicker">02 · Your journey</span><h2 id="journey-stage-title">What shape should<br />this journey take?</h2></div><small>Step 2 of 3 · about 1 minute</small></div>
                  <div className="progressive-fields">
                    <label>Travel month <b>*</b><select name="month" value={travelMonth} onChange={(event) => { setTravelMonth(event.target.value); setFieldErrors({}); }}><option value="" disabled>Select month</option>{["January","February","March","April","May","June","July","August","September","October","November","December"].map((month) => <option key={month}>{month}</option>)}</select>{fieldErrors.month ? <small role="alert">{fieldErrors.month}</small> : null}</label>
                    <label>Year <b>*</b><select name="year" value={travelYear} onChange={(event) => { setTravelYear(event.target.value); setFieldErrors({}); }}><option value="" disabled>Select year</option>{[2026, 2027, 2028, 2029].map((year) => <option key={year}>{year}</option>)}</select>{fieldErrors.year ? <small role="alert">{fieldErrors.year}</small> : null}</label>
                    <label>Journey length <b>*</b><select name="duration" defaultValue="" onChange={() => setFieldErrors({})}><option value="" disabled>Select duration</option><option>5–6 nights</option><option>7–9 nights</option><option>10–12 nights</option><option>More than 12 nights</option></select>{fieldErrors.duration ? <small role="alert">{fieldErrors.duration}</small> : null}</label>
                    <label>Travelling as <b>*</b><select name="people" value={people} onChange={(event) => { setPeople(event.target.value); setFieldErrors({}); }}><option value="" disabled>Select</option><option>1 person</option><option>2 people</option><option>3–4 people</option><option>5–8 people</option><option>9+ people</option></select>{fieldErrors.people ? <small role="alert">{fieldErrors.people}</small> : null}</label>
                  </div>
                  <fieldset className="progressive-budget"><legend>Investment per person <b>*</b></legend><p>This gives Maryangel a useful direction. It does not commit you to a booking.</p><div>{budgets.map((value) => <button className={budget === value ? "selected" : ""} type="button" key={value} onClick={() => { startForm(); setBudget(value); setFieldErrors({}); }} aria-pressed={budget === value}><strong>{value}</strong><small>per person</small></button>)}</div><input type="hidden" name="budget" value={budget} />{fieldErrors.budget ? <small className="progressive-field-error" role="alert">{fieldErrors.budget}</small> : null}</fieldset>
                  <label className="progressive-message">Anything else that matters<textarea name="message" rows="4" placeholder="A milestone, a pace you need, or something you want Maryangel to understand…" /></label>
                </section>

                <section className="progressive-stage progressive-details-stage" hidden={step !== 3} aria-labelledby="details-stage-title">
                  <div className="progressive-stage-heading"><div><span className="kicker">03 · Your details</span><h2 id="details-stage-title">Where should the<br />conversation begin?</h2></div><small>Final step · about 45 seconds</small></div>
                  <div className="progressive-contact-choice" aria-label="Conversation preference"><button type="button" className={contactPreference === "written-enquiry" ? "selected" : ""} onClick={() => { startForm(); setContactPreference("written-enquiry"); }}><strong>Written journey request</strong><small>Maryangel replies personally within one business day.</small></button><button type="button" className={contactPreference === "private-call" ? "selected" : ""} onClick={() => { startForm(); setContactPreference("private-call"); }}><strong>Private curator call</strong><small>We contact you to arrange a private conversation.</small></button></div>
                  <div className="progressive-fields progressive-details">
                    <label>Your name <b>*</b><input name="name" placeholder="Full name" autoComplete="name" onChange={() => setFieldErrors({})} />{fieldErrors.name ? <small role="alert">{fieldErrors.name}</small> : null}</label>
                    <label>Email address <b>*</b><input name="email" type="email" placeholder="your@email.com" autoComplete="email" onChange={() => setFieldErrors({})} />{fieldErrors.email ? <small role="alert">{fieldErrors.email}</small> : null}</label>
                    <label className="wide">Telephone <b>*</b><span className="phone-field"><input className="calling-code" name="country-code" type="tel" list="calling-code-options" placeholder="+Code" aria-label="Country calling code" autoComplete="tel-country-code" onChange={() => setFieldErrors({})} /><datalist id="calling-code-options">{countryCodes.map(([country, code]) => <option value={code} key={`${country}-${code}`}>{country}</option>)}</datalist><input name="phone" type="tel" placeholder="Phone number" autoComplete="tel-national" onChange={() => setFieldErrors({})} /></span>{fieldErrors.countryCode || fieldErrors.phone ? <small role="alert">{fieldErrors.countryCode || fieldErrors.phone}</small> : null}</label>
                    {contactPreference === "private-call" ? <label className="wide">Best contact time <b>*</b><select name="preferred-call-time" value={preferredCallTime} onChange={(event) => { setPreferredCallTime(event.target.value); setFieldErrors({}); }}><option value="" disabled>Select a window</option><option>Weekday morning</option><option>Weekday afternoon</option><option>Weekday evening</option><option>Saturday</option><option>Let Ryravel propose a time by email</option></select>{fieldErrors.preferredCallTime ? <small role="alert">{fieldErrors.preferredCallTime}</small> : null}</label> : null}
                    <label>How did you hear about us?<select name="referral" defaultValue=""><option value="" disabled>Select</option><option>Recommendation</option><option>Google</option><option>Instagram</option><option>Press</option><option>Other</option></select></label>
                  </div>
                  <label className="newsletter-field"><input name="newsletter" type="checkbox" /><span>Send me occasional traveller case studies and carefully chosen journey notes from Ryravel.</span></label>
                  <p className="progressive-policy-note">Sending an enquiry does not book a journey or require payment. Your proposal will show the final price, optional add-ons and payment dates before you decide. Standard bookings require a 50% deposit, with the balance due 30 days before departure; bookings within 45 days require full payment. <a href="/privacy">Privacy</a> · <a href="/terms">Booking terms</a> · <a href="/cancellations">Cancellations</a></p>
                  {turnstileEnabled ? <div className="request-turnstile"><div ref={turnstileMount} /><small>Protected by Cloudflare Turnstile.</small></div> : null}
                  {fieldErrors.turnstile ? <p className="progressive-field-error" role="alert">{fieldErrors.turnstile}</p> : null}
                  {error ? <p className="request-error" role="alert">{error}</p> : null}
                </section>

                <div className="progressive-actions">
                  {step > 1 ? <button className="progressive-back" type="button" onClick={() => changeStep(step - 1)}>← Back</button> : <span>Your answers are preserved between steps.</span>}
                  {step < 3 ? <button key="continue" className="progressive-next" type="button" onClick={continueRequest}>Continue →</button> : <button key="submit" className="progressive-next" type="submit" disabled={sending}>{sending ? "Sending…" : contactPreference === "private-call" ? "Request private call →" : "Submit journey request →"}</button>}
                </div>
              </div>

              <aside className="progressive-summary">
                {journeyContext?.image ? <figure className="progressive-summary-journey-image"><img src={journeyContext.image} alt={journeyContext.imageAlt} /></figure> : null}
                <span className="kicker">Your direction so far</span>
                <h3>{journeyContext?.name || feeling || "Your journey"}</h3>
                <p>{journeyContext ? `${journeyContext.nights ? `${journeyContext.nights} nights · ` : ""}${journeyContext.destination}` : "Maryangel will use these answers to shape the destination, pace and experience."}</p>
                <dl><div><dt>Feeling</dt><dd>{feeling || "Not selected"}</dd></div><div><dt>Travellers</dt><dd>{people || "Not selected"}</dd></div><div><dt>Window</dt><dd>{travelMonth && travelYear ? `${travelMonth} ${travelYear}` : "Not selected"}</dd></div>{budget ? <div><dt>Investment</dt><dd>{budget}</dd></div> : null}</dl>
                {journeyContext?.slug ? <a href={`/journeys/${journeyContext.slug}`}>Review selected journey ↗</a> : null}
                <div className="progressive-founder-note">
                  <span className="progressive-founder-mark" aria-hidden="true">MA</span>
                  <div><span className="progressive-founder-kicker">A note from Maryangel</span><p>“I read every request myself. Tell me where you are; I’ll reply with real thoughts, not a brochure.”</p><strong>Maryangel Ajuzieogu</strong><small>Founder &amp; Journey Curator · Replies within one business day</small><button type="button" onClick={() => founderNoteRef.current?.showModal()}>Read her note <span aria-hidden="true">↗</span></button></div>
                </div>
                <small>Nothing is booked until you are ready.</small>
              </aside>
            </div>
          </form>
          <dialog className="progressive-founder-dialog" ref={founderNoteRef} aria-labelledby="founder-note-title" aria-describedby="founder-note-body">
            <button className="progressive-founder-close" type="button" onClick={() => founderNoteRef.current?.close()} aria-label="Close Maryangel's note">×</button>
            <span className="kicker">A note from Maryangel</span>
            <h2 id="founder-note-title">The conversation begins with you.</h2>
            <div id="founder-note-body"><p>Hi, I’m Maryangel. I founded Ryravel, and I still read every journey request that comes through this page myself.</p><p>When you tell me you’re exhausted and haven’t stopped in two years, I don’t see a form field. I see the beginning of a real conversation.</p><p>The brief is everything. An itinerary can be assembled from preferences. A journey worth taking starts with understanding where you are now and how you hope to feel when you come home.</p><p>Tell me where you are. You may receive an automatic confirmation that your request arrived; the considered reply comes from me within one business day, with real thoughts, not a brochure.</p></div>
            <p className="progressive-founder-signature"><strong>Maryangel Ajuzieogu</strong><span>Founder &amp; Journey Curator, Ryravel</span></p>
          </dialog>
        </section>
      )}
    </main>
  );
}
