"use client";

import { useEffect, useState } from "react";
import "./partners.css";

export default function PartnerManager() {
  const [partners, setPartners] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [email, setEmail] = useState("");
  const [issued, setIssued] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function refresh() {
    const response = await fetch("/api/admin/partners", { cache: "no-store" });
    if (response.status === 401) { window.location.assign("/curator-desk"); return; }
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Partners could not be loaded.");
    setPartners(result.partners || []);
    setLoading(false);
  }
  useEffect(() => { refresh().catch((failure) => { setError(failure.message); setLoading(false); }); }, []);

  async function create(event) {
    event.preventDefault();
    setError(""); setIssued(null);
    try {
      const response = await fetch("/api/admin/partners", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, slug, email }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Partner could not be added.");
      setIssued(result); setName(""); setSlug(""); setEmail("");
      await refresh();
    } catch (failure) { setError(failure.message); }
  }

  async function action(partner, type) {
    if (type === "rotate" && !window.confirm(`Replace ${partner.name}'s private report link? The previous link will stop working.`)) return;
    setError(""); setIssued(null);
    try {
      const response = await fetch(`/api/admin/partners/${encodeURIComponent(partner.slug)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: type }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Partner could not be updated.");
      if (result.privateReportLink) setIssued({ partner, referralLink: `${window.location.origin}/request?partner=${partner.slug}`, privateReportLink: result.privateReportLink });
      await refresh();
    } catch (failure) { setError(failure.message); }
  }

  return <main className="partner-manager" data-clarity-mask="true"><div className="partner-manager-inner">
    <a className="partner-manager-back" href="/curator-desk">← Curator desk</a><p className="partner-manager-kicker">Ryravel operations</p><h1>Curator partners</h1>
    <p>Give each coach a referral link and a separate private, read-only report. A report contains reference numbers and broad stages, never traveller names, email addresses, or briefs.</p>
    <form onSubmit={create} className="partner-manager-form"><h2>Add a coach</h2><div><label>Coach or practice name<input value={name} onChange={(event) => setName(event.target.value)} required maxLength="100" /></label><label>Link name<input value={slug} onChange={(event) => setSlug(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} placeholder="e.g. coach-jane" maxLength="48" /></label><label>Email for your records<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Optional" /></label></div><button type="submit">Create partner links</button></form>
    {error ? <p className="partner-manager-error" role="alert">{error}</p> : null}
    {issued ? <section className="partner-manager-issued" aria-live="polite"><h2>Copy these links now</h2><p>The private report link is shown only once. Share it with {issued.partner.name} securely; it grants access to their referral activity. Never put it in public posts.</p><label>Public referral link<input readOnly value={issued.referralLink} onFocus={(event) => event.target.select()} /></label><label>Private report link<input readOnly value={issued.privateReportLink} onFocus={(event) => event.target.select()} /></label></section> : null}
    <section className="partner-manager-list"><h2>Partners</h2>{loading ? <p>Loading…</p> : partners.length ? <div className="partner-manager-table">{partners.map((partner) => <article key={partner.slug}><div><strong>{partner.name}</strong><span>{partner.slug} · {partner.active ? "Active" : "Paused"}</span><small>{partner.enquiries || 0} enquiries · {partner.booked || 0} booked</small></div><div className="partner-manager-controls"><a href={`/request?partner=${partner.slug}`} target="_blank" rel="noopener noreferrer">Open public link ↗</a><button type="button" onClick={() => action(partner, "rotate")}>New report link</button><button type="button" onClick={() => action(partner, partner.active ? "pause" : "activate")}>{partner.active ? "Pause" : "Activate"}</button></div></article>)}</div> : <p>No partners yet.</p>}</section>
    <p className="partner-manager-note">Attribution shows who submitted through a partner link; it does not determine commission eligibility. Review actual booking and payment against the signed partner terms before paying.</p>
  </div></main>;
}
