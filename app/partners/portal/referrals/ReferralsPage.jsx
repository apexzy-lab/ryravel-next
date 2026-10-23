"use client";

import { useMemo, useState } from "react";
import { Icon, ReferralTable, usePartnerReport } from "../PartnerWorkspace";

const stages = ["All activity", "Received", "In review", "Booked", "Closed"];

export default function ReferralsPage() {
  const { report, updatedAt } = usePartnerReport();
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState(stages[0]);
  const rows = useMemo(() => report.referrals.filter((item) => (stage === stages[0] || item.stage === stage) && item.reference.toLowerCase().includes(query.trim().toLowerCase())), [report, query, stage]);
  return <div className="partner-page"><div className="partner-page-heading"><div><span className="partner-eyebrow">REFERRAL ACTIVITY</span><h1>Every introduction, accounted for.</h1><p>References and broad progress only. Traveller contact details and briefs stay private.</p></div><span className="partner-updated">{updatedAt ? `Updated ${updatedAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}` : ""}</span></div>
    <div className="partner-referral-summary"><div><span>Total introductions</span><strong>{report.totals.referred}</strong></div><div><span>Recent referrals shown</span><strong>{report.referrals.length}</strong></div><div><span>Journeys booked</span><strong>{report.totals.booked}</strong></div></div>
    <section className="partner-panel partner-referrals-panel"><div className="partner-panel-heading"><div><span className="partner-eyebrow">YOUR REFERRALS</span><h2>Referral register</h2></div><span className="partner-count">{rows.length} shown</span></div><div className="partner-filters"><label className="partner-search"><Icon name="search" size={17} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search reference" aria-label="Search referral reference" /></label><label className="partner-select">Stage <select value={stage} onChange={(event) => setStage(event.target.value)} aria-label="Filter referrals by stage">{stages.map((item) => <option key={item}>{item}</option>)}</select></label></div>{rows.length ? <ReferralTable rows={rows} /> : <div className="partner-empty"><Icon name="search" size={24} /><h3>{report.referrals.length ? "No matching referrals" : "No referrals yet"}</h3><p>{report.referrals.length ? "Try another reference or select All activity." : "Requests sent through your referral link will appear here."}</p>{report.referrals.length > 0 && <button type="button" onClick={() => { setQuery(""); setStage(stages[0]); }}>Clear filters</button>}</div>}<p className="partner-panel-note">Showing up to 200 recent referrals. Payment status appears only after Ryravel verifies cleared funds against an invoice.</p></section>
    <div className="partner-guide"><div><span className="partner-eyebrow">STATUS GUIDE</span><h2>How to read the register</h2></div><dl><div><dt>Received</dt><dd>A request came through your link.</dd></div><div><dt>In review</dt><dd>The curator team is working with the traveller.</dd></div><div><dt>Booked</dt><dd>The journey was marked booked. Payment may still be outstanding.</dd></div><div><dt>Closed</dt><dd>The conversation was closed without a booking.</dd></div></dl></div>
  </div>;
}
