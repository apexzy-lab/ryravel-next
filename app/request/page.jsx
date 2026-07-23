"use client";

import { useState } from "react";

export default function RequestPage() {
  const [sent, setSent] = useState(false);
  return <main>
    <section className="request-hero"><div><span className="kicker">Begin the conversation</span><h1>Every journey begins<br /><em>with one honest answer.</em></h1><p>You do not need to know where. Tell us how you are, how you want to feel and what this moment needs to make possible.</p></div></section>
    <section className="request-layout paper-section">
      <div><span className="kicker">Speak to a curator directly</span><h2>We are listening.</h2><p>Prefer a conversation? Call <a href="tel:+442070000000">+44 20 7000 0000</a> or email <a href="mailto:hello@ryravel.com">hello@ryravel.com</a>.</p><p>We respond personally within one working day.</p></div>
      {sent ? <div className="form-success"><span>✓</span><h2>Thank you.</h2><p>Your note is ready for a curator. For this demonstration no personal data was transmitted; email us directly to begin the live conversation.</p><a className="button button-red" href="mailto:hello@ryravel.com">Email the curator</a></div> :
      <form className="request-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
        <label>Your name<input name="name" required /></label>
        <label>Email address<input name="email" type="email" required /></label>
        <label>Telephone<input name="phone" type="tel" /></label>
        <label>Who is travelling?<select name="travellers" defaultValue=""><option value="" disabled>Select one</option><option>Just me</option><option>Two of us</option><option>Family</option><option>Friends · group</option></select></label>
        <label>How do you want to feel?<select name="feeling" defaultValue=""><option value="" disabled>Select a feeling</option><option>Rested and restored</option><option>Renewed and clear</option><option>Closer to someone</option><option>Alive and challenged</option><option>Connected to my people</option></select></label>
        <label className="wide">What should we understand about this journey?<textarea name="message" rows="6" required /></label>
        <label>Preferred month<input name="month" type="month" /></label>
        <label>Approximate investment<select name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>$10,000–$20,000</option><option>$20,000–$40,000</option><option>$40,000+</option><option>Let us discuss</option></select></label>
        <button className="button button-red wide" type="submit">Send to a curator →</button>
      </form>}
    </section>
  </main>;
}
