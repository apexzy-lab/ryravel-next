"use client";

import { useEffect, useState } from "react";
import "./partner-report.css";

export default function PartnerReport() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/api/partners/me", { cache: "no-store" }).then(async (response) => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "This report could not be opened.");
      setReport(result);
    }).catch((failure) => setError(failure.message));
  }, []);

  async function signOut() {
    await fetch("/api/partners/logout", { method: "POST" });
    setReport(null);
    setError("You have signed out. Open your private report link to return.");
  }

  return <main className="partner-report" data-clarity-mask="true">
    <div className="partner-report-inner">
      <p className="partner-report-kicker">Ryravel curator partners</p>
      <h1>Your introductions,<br /><em>thoughtfully followed through.</em></h1>
      {error ? <div className="partner-report-empty" role="alert"><h2>Private report unavailable</h2><p>{error}</p><p>Ask your Ryravel contact for a new private report link.</p></div> : !report ? <p role="status">Opening your private report…</p> : <>
        <p className="partner-report-lede">Welcome, {report.partner.name}. Your Ryravel referral link is <a href={`/request?partner=${report.partner.slug}`}>ryravel.com/request?partner={report.partner.slug}</a>.</p><button className="partner-report-logout" type="button" onClick={signOut}>Sign out</button>
        <div className="partner-report-metrics"><div><strong>{report.totals.referred}</strong><span>Introductions received</span></div><div><strong>{report.totals.booked}</strong><span>Journeys booked</span></div></div>
        <section className="partner-report-list"><h2>Referral activity</h2><p>Only reference numbers, dates, and broad stages appear here. Traveller contact details and private briefs stay with Ryravel.</p>
          {report.referrals.length ? <div className="partner-report-table"><div className="partner-report-row partner-report-heading"><span>Reference</span><span>Received</span><span>Stage</span></div>{report.referrals.map((item) => <div className="partner-report-row" key={item.reference}><strong>{item.reference}</strong><span>{new Date(item.submitted).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span><span className="partner-report-stage">{item.stage}</span></div>)}</div> : <div className="partner-report-empty">No requests have been attributed to your link yet.</div>}
        </section><p className="partner-report-footnote">This is a referral activity report, not a commission statement. Booking eligibility and payment follow your separate partner agreement. If a traveller contacted us without your link, ask them to mention your name to Ryravel.</p>
      </>}
    </div>
  </main>;
}
