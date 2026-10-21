"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import "./talk.css";

const FEELINGS = ["", "Exhausted", "Disconnected", "Restless", "Romantic", "Curious", "Celebratory", "Purposeful", "Open"];
const COMMON_ZONES = ["Africa/Lagos", "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "Europe/London", "Europe/Paris", "Asia/Dubai", "Asia/Qatar", "Asia/Singapore", "Australia/Sydney"];

function dateInZone(instant, timeZone) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(instant).filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function humanDate(value, timeZone, options = {}) {
  return new Intl.DateTimeFormat("en-US", { timeZone, ...options }).format(new Date(value));
}

export default function TalkPage() {
  const [step, setStep] = useState(0);
  const [timeZone, setTimeZone] = useState("Africa/Lagos");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [unavailable, setUnavailable] = useState(false);
  const [result, setResult] = useState(null);
  const [turnstileEnabled, setTurnstileEnabled] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feeling, setFeeling] = useState("");
  const [journey, setJourney] = useState("");
  const [note, setNote] = useState("");
  const turnstileMount = useRef(null);
  const turnstileWidget = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const preferred = params.get("timezone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
    try { new Intl.DateTimeFormat("en-US", { timeZone: preferred }); setTimeZone(preferred); } catch { /* Keep default. */ }
    const requestedFeeling = params.get("feeling");
    if (FEELINGS.includes(requestedFeeling)) setFeeling(requestedFeeling);
    setJourney((params.get("name") || params.get("interest") || params.get("journey") || "").slice(0, 160));
    fetch("/api/talk/config", { cache: "no-store" }).then((response) => response.json()).then((config) => {
      if (!config.open) setUnavailable(true);
    }).catch(() => setUnavailable(true));
  }, []);

  const dates = useMemo(() => {
    const values = new Set();
    for (let day = 1; day <= 21; day += 1) values.add(dateInZone(Date.now() + day * 86400000, timeZone));
    return [...values].slice(0, 20);
  }, [timeZone]);

  useEffect(() => {
    if (date && !dates.includes(date)) setDate("");
  }, [date, dates]);

  useEffect(() => {
    if (!date || step !== 1 || unavailable) return undefined;
    const controller = new AbortController();
    setLoading(true); setError(""); setSelected(null); setSlots([]);
    fetch(`/api/talk/availability?date=${encodeURIComponent(date)}&timeZone=${encodeURIComponent(timeZone)}`, { signal: controller.signal, cache: "no-store" })
      .then(async (response) => { const data = await response.json(); if (!response.ok) throw new Error(data.error || "Available times could not be checked."); return data; })
      .then((data) => { setSlots(data.slots || []); setUnavailable(false); })
      .catch((caught) => { if (caught.name !== "AbortError") { setError(caught.message); setUnavailable(caught.message.includes("not open yet")); } })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [date, timeZone, step, unavailable]);

  useEffect(() => {
    if (step !== 3) return undefined;
    let cancelled = false;
    fetch("/api/turnstile", { cache: "no-store" }).then((response) => response.json()).then((config) => {
      if (cancelled || !config.enabled || !config.siteKey) return;
      setTurnstileEnabled(true);
      const render = () => {
        if (cancelled || !turnstileMount.current || !window.turnstile || turnstileWidget.current !== null) return;
        turnstileWidget.current = window.turnstile.render(turnstileMount.current, { sitekey: config.siteKey, theme: "auto", action: "talk_booking", callback: setTurnstileToken, "expired-callback": () => setTurnstileToken(""), "error-callback": () => setTurnstileToken("") });
      };
      if (window.turnstile) render();
      else {
        let script = document.getElementById("ryravel-turnstile-script");
        if (!script) { script = document.createElement("script"); script.id = "ryravel-turnstile-script"; script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"; script.async = true; document.head.appendChild(script); }
        script.addEventListener("load", render, { once: true });
      }
    }).catch(() => setError("The security check could not be loaded. Please refresh and try again."));
    return () => { cancelled = true; if (window.turnstile && turnstileWidget.current !== null) { window.turnstile.remove(turnstileWidget.current); turnstileWidget.current = null; } };
  }, [step]);

  async function confirm() {
    if (!selected || !date || sending) return;
    if (turnstileEnabled && !turnstileToken) { setError("Complete the security check first."); return; }
    setSending(true); setError("");
    try {
      const response = await fetch("/api/talk/book", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ date, timeZone, start: selected.start, name, email, feeling, journey, note, turnstileToken }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The appointment could not be confirmed.");
      setResult(data); setStep(4);
    } catch (caught) { setError(caught.message); }
    finally { setSending(false); }
  }

  const zones = [...new Set([timeZone, ...COMMON_ZONES])];
  const dateLabel = date ? new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`)) : "";
  const timeLabel = selected ? humanDate(selected.start, timeZone, { hour: "numeric", minute: "2-digit", timeZoneName: "short" }) : "";

  return <main className="talk-page" data-clarity-mask="true">
    <div className="talk-head"><span>RYRAVEL · PRIVATE CONVERSATIONS</span><span>25 MINUTES · GOOGLE MEET</span></div>
    {step === 0 ? <section className="talk-hero"><div className="talk-hero-copy"><span className="talk-eyebrow">A private conversation</span><h1>Begin with how you want to feel.</h1><p>Tell us what matters. Then choose a time to speak with a Ryravel curator about the journey that could take shape.</p><button type="button" className="talk-primary" onClick={() => setStep(1)}>Find a time <span aria-hidden="true">→</span></button><small>No obligation to book a journey or make a payment.</small></div><div className="talk-hero-art"><i aria-hidden="true" /><p>Not a sales call.<br />A place to begin.</p></div></section> : null}
    {step > 0 && step < 4 ? <div className="talk-flow"><div className="talk-progress" aria-label="Booking progress"><span className={step === 1 ? "active" : ""}>01 &nbsp; Time</span><span className={step === 2 ? "active" : ""}>02 &nbsp; Your details</span><span className={step === 3 ? "active" : ""}>03 &nbsp; Confirm</span></div>
      {step === 1 ? <section className="talk-step"><div><span className="talk-eyebrow">Your time, your time zone</span><h2>When would you like to talk?</h2><p>Available times are checked against our curator’s calendar. Your appointment is reserved only after you confirm it.</p>{unavailable ? <div className="talk-unavailable"><h3>Online scheduling is opening soon.</h3><p>Until the calendar is connected, send us a private-call request and we’ll arrange a time by email.</p><Link className="talk-secondary" href="/request?conversation=private-call">Request a private call →</Link></div> : <><label className="talk-label" htmlFor="talk-zone">Show times in</label><select id="talk-zone" value={timeZone} onChange={(event) => { setTimeZone(event.target.value); setDate(""); setSelected(null); }}>{zones.map((zone) => <option key={zone} value={zone}>{zone}</option>)}</select><div className="talk-dates" aria-label="Choose a date">{dates.map((value) => <button type="button" key={value} className={date === value ? "selected" : ""} onClick={() => setDate(value)} aria-pressed={date === value}><small>{new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`))}</small><strong>{value.slice(-2)}</strong></button>)}</div>{date ? <><h3>{dateLabel}</h3>{loading ? <p role="status">Checking the calendar…</p> : slots.length ? <div className="talk-slots">{slots.map((slot) => <button type="button" key={slot.start} className={selected?.start === slot.start ? "selected" : ""} aria-pressed={selected?.start === slot.start} onClick={() => setSelected(slot)}>{humanDate(slot.start, timeZone, { hour: "numeric", minute: "2-digit" })}</button>)}</div> : !error ? <p>No times remain on this date. Please choose another.</p> : null}</> : <p className="talk-hint">Choose a date to see available times.</p>}{error ? <p className="talk-error" role="alert">{error}</p> : null}<div className="talk-actions"><button type="button" className="talk-primary" disabled={!selected} onClick={() => { setError(""); setStep(2); }}>Continue →</button></div></>}</div><aside className="talk-aside"><span className="talk-eyebrow">A considered beginning</span><h3>Your conversation</h3><p>Twenty-five minutes to understand what you need, where you hope to go, and whether we are the right people to shape it.</p></aside></section> : null}
      {step === 2 ? <section className="talk-step"><div><span className="talk-eyebrow">So we can prepare thoughtfully</span><h2>A little about you.</h2><div className="talk-fields"><label>Full name <input autoComplete="name" maxLength={120} value={name} onChange={(event) => setName(event.target.value)} required /></label><label>Email address <input type="email" autoComplete="email" maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>How you want to feel <select value={feeling} onChange={(event) => setFeeling(event.target.value)}>{FEELINGS.map((item) => <option key={item} value={item}>{item || "Choose if you know"}</option>)}</select></label><label>Journey interest <input maxLength={160} value={journey} onChange={(event) => setJourney(event.target.value)} placeholder="A journey, destination, or open to ideas" /></label></div><label className="talk-note">Anything you would like us to know? <span>Optional</span><textarea maxLength={600} value={note} onChange={(event) => setNote(event.target.value)} placeholder="A few words are enough. We can explore the rest together." /></label><p className="talk-fine">We use these details to prepare for your call. See our <Link href="/privacy">privacy notice</Link>.</p><div className="talk-actions"><button type="button" className="talk-primary" disabled={!name.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())} onClick={() => { setError(""); setStep(3); }}>Review your call →</button><button type="button" className="talk-text" onClick={() => setStep(1)}>← Change time</button></div></div><aside className="talk-aside"><span className="talk-eyebrow">Your selection</span><h3>{dateLabel}</h3><p>{timeLabel}<br />25-minute Google Meet call</p></aside></section> : null}
      {step === 3 ? <section className="talk-step"><div><span className="talk-eyebrow">One last look</span><h2>Ready to begin?</h2><div className="talk-review"><div><span>When</span><strong>{dateLabel} · {timeLabel}</strong></div><div><span>Where</span><strong>Google Meet · details from curator@ryravel.com</strong></div><div><span>Length</span><strong>25 minutes</strong></div><div><span>Guest</span><strong>{name} · {email}</strong></div>{feeling ? <div><span>Feeling</span><strong>{feeling}</strong></div> : null}</div><p className="talk-fine">A call is not a journey booking. We’ll email your Meet link and calendar file after the calendar confirms this time. No payment is required.</p><div ref={turnstileMount} className="talk-turnstile" />{error ? <p className="talk-error" role="alert">{error}</p> : null}<div className="talk-actions"><button type="button" className="talk-primary" disabled={sending || (turnstileEnabled && !turnstileToken)} onClick={confirm}>{sending ? "Confirming…" : "Confirm my call →"}</button><button type="button" className="talk-text" onClick={() => setStep(2)}>← Edit details</button></div></div><aside className="talk-aside"><span className="talk-eyebrow">Before we speak</span><h3>No perfect brief required.</h3><p>Bring your questions, your uncertainty, or simply the feeling you want to leave with.</p></aside></section> : null}
    </div> : null}
    {step === 4 && result ? <section className="talk-success"><div className="talk-check" aria-hidden="true">✓</div><span className="talk-eyebrow">Confirmed · {result.reference}</span><h1>We’ll see you there.</h1><p>Your 25-minute conversation is on the calendar. We’ll email the Meet link and a calendar file to <strong>{email}</strong> from <strong>curator@ryravel.com</strong>.</p><div className="talk-review"><div><span>When</span><strong>{humanDate(result.start, timeZone, { weekday: "long", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" })}</strong></div><div><span>Format</span><strong>Google Meet</strong></div></div><p className="talk-fine">Need to change your appointment? Reply to the confirmation email or email <a href="mailto:curator@ryravel.com">curator@ryravel.com</a> with your reference.</p></section> : null}
  </main>;
}
