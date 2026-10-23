"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon, ReferralTable, usePartnerReport } from "./PartnerWorkspace";

export function ReferralLinkCard() {
  const { report } = usePartnerReport();
  const [copyMessage, setCopyMessage] = useState("");
  const link = `https://ryravel.com/request?partner=${encodeURIComponent(report.partner.slug)}`;
  async function copyLink() {
    try { await navigator.clipboard.writeText(link); setCopyMessage("Referral link copied."); }
    catch { setCopyMessage("Select the link text to copy it."); }
  }
  return <section className="partner-link-card"><div><span className="partner-eyebrow">YOUR REFERRAL LINK</span><h2>Share one clear starting point.</h2><p>Requests made through this link are attributed to you. The Ryravel team handles the private conversation.</p></div><div className="partner-link-control"><label htmlFor="partner-referral-link">Personal link</label><div><input id="partner-referral-link" readOnly value={link} onFocus={(event) => event.target.select()} /><button type="button" onClick={copyLink}><Icon name="copy" size={16} /> Copy link</button></div><a href={link} target="_blank" rel="noopener noreferrer">Preview request page <Icon name="arrow" size={14} /></a><span role="status">{copyMessage}</span></div></section>;
}

function MetricCard({ label, number, description, href, tone = "" }) {
  return <Link href={href} className={`partner-metric ${tone}`}><span>{label}<Icon name="arrow" size={15} /></span><strong>{number}</strong><small>{description}</small></Link>;
}

export default function PartnerReport() {
  const { report, updatedAt } = usePartnerReport();
  const recent = report.referrals.slice(0, 5);
  const open = report.referrals.filter((item) => item.stage === "Received" || item.stage === "In review").length;
  return <div className="partner-page"><div className="partner-page-heading"><div><span className="partner-eyebrow">PARTNER OVERVIEW</span><h1>Welcome, {report.partner.name.split(" ")[0]}.</h1><p>Here is where your introductions stand.</p></div><span className="partner-updated">{updatedAt ? `Updated ${updatedAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}` : ""}</span></div>
    <div className="partner-metrics"><MetricCard label="Introductions" number={report.totals.referred} description="Requests received" href="/partners/portal/referrals" /><MetricCard label="Open requests" number={open} description="Among recent referrals" href="/partners/portal/referrals" /><MetricCard label="Journeys booked" number={report.totals.booked} description="Marked by Ryravel" href="/partners/portal/referrals" /><MetricCard label="Payment verified" number={report.totals.paid} description="Cleared funds matched" href="/partners/portal/payouts" tone="is-highlight" /></div>
    <ReferralLinkCard />
    <div className="partner-dashboard-grid"><section className="partner-panel partner-recent"><div className="partner-panel-heading"><div><span className="partner-eyebrow">LATEST ACTIVITY</span><h2>Recent referrals</h2></div><Link href="/partners/portal/referrals">See all <Icon name="arrow" size={15} /></Link></div>{recent.length ? <ReferralTable rows={recent} /> : <div className="partner-empty"><Icon name="referrals" size={24} /><h3>No referrals yet</h3><p>Share your personal link to start tracking introductions here.</p></div>}</section><aside className="partner-panel partner-next"><span className="partner-eyebrow">AT A GLANCE</span><h2>What happens next</h2><div className="partner-step"><span>01</span><div><strong>Request received</strong><p>A traveller submits through your link.</p></div></div><div className="partner-step"><span>02</span><div><strong>Journey reviewed</strong><p>Ryravel works directly with the traveller.</p></div></div><div className="partner-step"><span>03</span><div><strong>Payment verified</strong><p>Cleared funds are matched to an invoice before this status appears.</p></div></div><Link href="/partners/portal/payouts">Understand payment status <Icon name="arrow" size={15} /></Link></aside></div>
  </div>;
}
