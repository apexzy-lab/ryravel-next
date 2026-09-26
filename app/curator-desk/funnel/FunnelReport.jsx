"use client";

import { useEffect, useState } from "react";
import "./funnel.css";

const stages = [
  ["journey_viewed", "Journey viewed"], ["plan_journey_clicked", "Plan clicked"],
  ["form_started", "Form started"], ["enquiry_submitted", "Enquiry submitted"],
  ["private_call_requested", "Private call requested"],
];

export default function FunnelReport() {
  const [days, setDays] = useState(30);
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/admin/funnel?days=${days}`, { cache: "no-store" })
      .then(async (response) => { const data = await response.json(); if (!response.ok) throw new Error(data.error || "The report could not be loaded."); return data; })
      .then((data) => { if (active) { setReport(data); setError(""); } })
      .catch((failure) => { if (active) setError(failure.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [days]);

  const events = report?.events || [];
  const overall = (name) => Number(report?.totals?.find((row) => row.event_type === name)?.sessions || 0);
  const slugs = [...new Set(events.map((row) => row.journey_slug).filter(Boolean))];
  const count = (slug, name) => Number(events.find((row) => row.journey_slug === slug && row.event_type === name)?.sessions || 0);
  const identified = (slug) => report?.identified?.find((row) => row.journey_slug === slug);
  const cases = overall("case_study_opened");
  const errors = overall("validation_error");
  const abandoned = overall("form_abandoned");

  return <main className="funnel-report">
    <div className="funnel-report-top"><div><a href="/curator-desk">← Curator desk</a><span>Private measurement</span><h1>Journey funnel</h1><p>Consent-based interactions, beside identified enquiry outcomes.</p></div><label>Reporting window<select value={days} onChange={(event) => setDays(Number(event.target.value))}><option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option></select></label></div>
    {error ? <p className="funnel-report-error" role="alert">{error} <a href="/curator-desk">Open curator desk</a></p> : null}
    {loading ? <p>Loading the funnel…</p> : null}
    {report && !loading ? <>
      <div className="funnel-report-stages">{stages.map(([key, label]) => <article key={key}><span>{label}</span><strong>{overall(key)}</strong><small>consenting sessions</small></article>)}</div>
      <p className="funnel-report-note">{report.note} These stages are counts, not a verified person-by-person conversion path; ad blockers and consent choices affect coverage.</p>
      <section><h2>By selected journey</h2><div className="funnel-report-table-wrap"><table><thead><tr><th>Journey slug</th>{stages.slice(0, 4).map(([, label]) => <th key={label}>{label}</th>)}<th>Identified enquiries</th><th>Qualified in curator desk</th></tr></thead><tbody>{slugs.map((slug) => <tr key={slug}><th><a href={`/journeys/${slug}`}>{slug}</a></th>{stages.slice(0, 4).map(([key]) => <td key={key}>{count(slug, key)}</td>)}<td>{Number(identified(slug)?.submitted || 0)}</td><td>{Number(identified(slug)?.qualified || 0)}</td></tr>)}</tbody></table>{!slugs.length ? <p>No consented journey events in this window yet.</p> : null}</div></section>
      <section className="funnel-report-secondary"><h2>Where the form needs attention</h2><div><article><strong>{cases}</strong><span>Case studies opened</span></article><article><strong>{errors}</strong><span>Sessions with a validation error</span></article><article><strong>{abandoned}</strong><span>Sessions that left an unfinished form</span></article></div></section>
    </> : null}
  </main>;
}
