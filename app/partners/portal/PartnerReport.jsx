"use client";

import { useEffect, useMemo, useState } from "react";
import "./partner-report.css";

const filters = ["All activity", "Received", "In review", "Booked", "Closed"];

function Icon({ name }) {
  const paths = {
    overview: <><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></>,
    activity: <><path d="M4 5h16M4 12h16M4 19h16" /><circle cx="7" cy="5" r="1" /><circle cx="7" cy="12" r="1" /><circle cx="7" cy="19" r="1" /></>,
    wallet: <><rect x="3" y="6" width="18" height="15" rx="2" /><path d="M3 10V6a3 3 0 0 1 3-3h12M16 14h5" /></>,
    copy: <><rect x="8" y="8" width="13" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
    link: <><path d="M10 13a5 5 0 0 0 7 .3l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7-.3l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></>,
    arrow: <><path d="M4 12h16m-6-6 6 6-6 6" /></>,
    refresh: <><path d="M20 11a8 8 0 1 0-2.2 6M20 4v7h-7" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    check: <><path d="m4 12 5 5L20 6" /></>,
    shield: <><path d="m12 2 8 4v6c0 5-3 8-8 10-5-2-8-5-8-10V6z" /><path d="m9 12 2 2 4-4" /></>,
    logout: <><path d="M10 4H4v16h6M14 7l5 5-5 5M19 12H9" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function dateLabel(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function PartnerReport() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(filters[0]);
  const [copyMessage, setCopyMessage] = useState("");

  async function loadReport({ refresh = false } = {}) {
    if (refresh) setRefreshing(true);
    setError("");
    try {
      const response = await fetch("/api/partners/me", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "This report could not be opened.");
      setReport(result);
      setUpdatedAt(new Date());
    } catch (failure) {
      setError(failure.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => { loadReport(); }, []);

  const referralLink = report ? `https://ryravel.com/request?partner=${encodeURIComponent(report.partner.slug)}` : "";
  const visible = useMemo(() => (report?.referrals || []).filter((item) => {
    const matchesFilter = filter === "All activity" || item.stage === filter;
    const matchesQuery = item.reference.toLowerCase().includes(query.trim().toLowerCase());
    return matchesFilter && matchesQuery;
  }), [report, filter, query]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopyMessage("Referral link copied.");
    } catch {
      setCopyMessage("Copy unavailable here. Select the link text to share it.");
    }
  }

  async function signOut() {
    try { await fetch("/api/partners/logout", { method: "POST" }); } catch { /* Local view is cleared regardless. */ }
    setReport(null);
    setError("You have signed out. Open your private report link to return.");
  }

  return <main className="partner-workspace" data-clarity-mask="true">
    <div className="partner-shell">
      <aside className="partner-sidebar">
        <a className="partner-brand" href="/" aria-label="Ryravel home"><img src="/brand/ryravel-mark.png" alt="" /><span><strong>Ryravel</strong><small>PARTNER STUDIO</small></span></a>
        <div className="partner-sidebar-label">YOUR WORKSPACE</div>
        <nav aria-label="Partner workspace"><a href="#overview"><Icon name="overview" /> Overview</a><a href="#referrals"><Icon name="activity" /> Referrals</a><a href="#payouts"><Icon name="wallet" /> Payouts <small>Pending</small></a></nav>
        <div className="partner-sidebar-bottom"><p><Icon name="shield" /> Your travellers’ private details stay with Ryravel.</p><a href="mailto:support@ryravel.com">Partner support <span aria-hidden="true">↗</span></a>{report ? <button type="button" onClick={signOut}><Icon name="logout" /> Sign out</button> : null}</div>
      </aside>

      <div className="partner-main" id="overview">
        <header className="partner-topbar"><div><span className="partner-overline">PRIVATE PARTNER DASHBOARD</span><span className="partner-topbar-separator" aria-hidden="true">/</span><span>Referral overview</span></div><div className="partner-topbar-right"><span className="partner-private-pill"><Icon name="shield" /> Private access</span>{report ? <button type="button" onClick={() => loadReport({ refresh: true })} disabled={refreshing}><Icon name="refresh" /> {refreshing ? "Refreshing" : "Refresh"}</button> : null}</div></header>

        <div className="partner-content">
          {error && !report ? <section className="partner-access-state" role="alert"><span className="partner-overline">PRIVATE ACCESS</span><h1>Your report is unavailable.</h1><p>{error}</p><p>Ask your Ryravel contact for a new private report link.</p></section> : loading ? <section className="partner-access-state" role="status"><span className="partner-overline">PRIVATE ACCESS</span><h1>Opening your workspace.</h1><p>Checking your private partner link.</p></section> : report ? <>
            <section className="partner-intro"><div><span className="partner-overline">WELCOME BACK, {report.partner.name.toUpperCase()}</span><h1>Every introduction<br /><em>deserves a clear view.</em></h1><p>See the journey requests attributed to your link and where each one stands. Traveller conversations and private briefs remain with the Ryravel team.</p></div><div className="partner-intro-stamp"><span>RYRAVEL</span><strong>CURATOR<br />PARTNERS</strong><i aria-hidden="true">✦</i></div></section>

            <section className="partner-stats" aria-label="Referral summary"><article><span>01 / INTRODUCTIONS</span><strong>{report.totals.referred}</strong><p>Requests received through your link</p></article><article><span>02 / JOURNEYS BOOKED</span><strong>{report.totals.booked}</strong><p>Marked booked by the curator team</p></article><article><span>03 / PAYMENT VERIFIED</span><strong>{report.totals.paid}</strong><p>Deposit or full payment confirmed</p></article></section>

            <section className="partner-share"><div><span className="partner-overline">YOUR UNIQUE REFERRAL LINK</span><h2>One link to make<br /><em>the introduction.</em></h2><p>Share this with someone ready to begin a private journey. Their request comes directly to Ryravel and appears in your referral activity.</p></div><div className="partner-share-action"><label htmlFor="partner-referral-link">Referral URL</label><div className="partner-copy-field"><input id="partner-referral-link" readOnly value={referralLink} onFocus={(event) => event.target.select()} /><button type="button" onClick={copyLink} aria-label="Copy referral link"><Icon name="copy" /><span>Copy link</span></button></div><a href={referralLink} target="_blank" rel="noopener noreferrer">Open the request page <Icon name="arrow" /></a><span className="partner-copy-feedback" role="status">{copyMessage}</span></div></section>

            <section className="partner-referral-section" id="referrals"><div className="partner-section-heading"><div><span className="partner-overline">THE CONVERSATION, AT A GLANCE</span><h2>Referral activity</h2><p>References and broad status only. No traveller contact details or journey briefs.</p></div><small>{updatedAt ? `Updated ${updatedAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}` : ""}</small></div>
              <div className="partner-table-card"><div className="partner-table-toolbar"><label className="partner-search"><Icon name="search" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search reference" aria-label="Search referral reference" /></label><label className="partner-filter">Show <select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter referrals by stage">{filters.map((item) => <option value={item} key={item}>{item}</option>)}</select></label></div>
                {error ? <p className="partner-refresh-error" role="alert">Refresh failed: {error}. Showing the last loaded report.</p> : null}
                {visible.length ? <><div className="partner-table-head"><span>REFERENCE</span><span>RECEIVED</span><span>JOURNEY STAGE</span><span>PAYMENT STATUS</span></div><div className="partner-table-body">{visible.map((item) => <div className="partner-table-row" key={item.reference}><strong data-label="Reference">{item.reference}</strong><span data-label="Received">{dateLabel(item.submitted)}</span><span data-label="Journey stage"><b className={`partner-stage partner-stage-${item.stage.toLowerCase().replace(/\s+/g, "-")}`}>{item.stage}</b></span><span data-label="Payment status"><b className={item.payment === "Not yet verified" ? "partner-payment-pending" : "partner-payment-verified"}>{item.payment === "Not yet verified" ? null : <Icon name="check" />}{item.payment}</b></span></div>)}</div><div className="partner-table-count">Showing {visible.length} of {report.referrals.length} recent referrals{report.totals.referred > report.referrals.length ? ` · ${report.totals.referred} total introductions` : ""}</div></> : <div className="partner-empty"><div aria-hidden="true"><Icon name={report.referrals.length ? "search" : "link"} /></div><h3>{report.referrals.length ? "No referrals match this view." : "Your introductions will appear here."}</h3><p>{report.referrals.length ? "Try another reference or choose All activity." : "Share your unique link above. When someone sends a journey request through it, you’ll see its reference and progress here."}</p>{report.referrals.length ? <button type="button" onClick={() => { setQuery(""); setFilter(filters[0]); }}>Clear filters</button> : null}</div>}
              </div>
            </section>

            <div className="partner-lower-grid"><section className="partner-status-guide"><span className="partner-overline">HOW TO READ THE REPORT</span><h2>What each status means.</h2><div><strong>Received</strong><p>A journey request was submitted through your link.</p></div><div><strong>In review</strong><p>Ryravel is discussing or shaping the request.</p></div><div><strong>Booked</strong><p>The curator team marked the journey booked. This alone does not mean payment has cleared.</p></div><div><strong>Payment verified</strong><p>Ryravel matched cleared funds to its invoice. This is separate from commission eligibility.</p></div></section><section className="partner-payout" id="payouts"><span className="partner-overline">PAYOUTS & ACCOUNT DETAILS</span><div className="partner-payout-icon"><Icon name="wallet" /></div><h2>A considered setup,<br /><em>coming next.</em></h2><p>Secure bank-account onboarding is not active yet. We will invite you through a verified payout service when it is ready. Please do not send bank details by email or in a journey request.</p><a href="mailto:support@ryravel.com?subject=Ryravel%20partner%20payout%20setup">Ask about payout setup <Icon name="arrow" /></a></section></div>
            <footer className="partner-footer"><p>This dashboard is a referral activity report, not a commission statement or a promise of payout. Eligibility follows your separate partner agreement.</p><span>© {new Date().getFullYear()} Ryravel</span></footer>
          </> : null}
        </div>
      </div>
    </div>
  </main>;
}
