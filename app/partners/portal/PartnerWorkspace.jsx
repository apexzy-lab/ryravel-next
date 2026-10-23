"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import "./partner-report.css";

const PartnerContext = createContext(null);

export function Icon({ name, size = 18 }) {
  const shapes = {
    overview: <><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></>,
    referrals: <><path d="M7 5h14M7 12h14M7 19h14" /><circle cx="3.5" cy="5" r=".75" /><circle cx="3.5" cy="12" r=".75" /><circle cx="3.5" cy="19" r=".75" /></>,
    payouts: <><rect x="2.5" y="5" width="19" height="16" rx="2" /><path d="M3 9h18M16 15h3" /></>,
    copy: <><rect x="8" y="8" width="13" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>,
    arrow: <><path d="M4 12h16m-6-6 6 6-6 6" /></>,
    refresh: <><path d="M20 11a8 8 0 1 0-2.2 6M20 4v7h-7" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    check: <><path d="m4 12 5 5L20 6" /></>,
    shield: <><path d="m12 2 8 4v6c0 5-3 8-8 10-5-2-8-5-8-10V6z" /><path d="m9 12 2 2 4-4" /></>,
    logout: <><path d="M10 4H4v16h6M14 7l5 5-5 5M19 12H9" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{shapes[name]}</svg>;
}

export function usePartnerReport() {
  const value = useContext(PartnerContext);
  if (!value) throw new Error("Partner report must be inside its workspace.");
  return value;
}

export function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function StagePill({ stage }) {
  return <span className={`partner-pill partner-pill-${stage.toLowerCase().replace(/\s+/g, "-")}`}>{stage}</span>;
}

export function PaymentPill({ payment }) {
  const verified = payment !== "Not yet verified";
  return <span className={`partner-pill ${verified ? "partner-pill-verified" : "partner-pill-unverified"}`}>{verified && <Icon name="check" size={13} />}{payment}</span>;
}

export function ReferralTable({ rows, compact = false }) {
  return <div className="partner-table-wrap"><table className="partner-table"><thead><tr><th scope="col">Reference</th><th scope="col">Received</th><th scope="col">Journey stage</th><th scope="col">Payment</th></tr></thead><tbody>{rows.map((item) => <tr key={item.reference}><th scope="row">{item.reference}</th><td>{formatDate(item.submitted)}</td><td><StagePill stage={item.stage} /></td><td><PaymentPill payment={item.payment} /></td></tr>)}</tbody></table>{compact && <Link className="partner-table-more" href="/partners/portal/referrals">View all referrals <Icon name="arrow" size={15} /></Link>}</div>;
}

const links = [
  { href: "/partners/portal", label: "Overview", icon: "overview" },
  { href: "/partners/portal/referrals", label: "Referrals", icon: "referrals" },
  { href: "/partners/portal/payouts", label: "Payouts", icon: "payouts" },
];

export default function PartnerWorkspace({ children }) {
  const pathname = usePathname();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [updatedAt, setUpdatedAt] = useState(null);

  async function loadReport(refresh = false) {
    if (refresh) setRefreshing(true);
    setError("");
    try {
      const response = await fetch("/api/partners/me", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "This report could not be opened.");
      setReport(result);
      setUpdatedAt(new Date());
    } catch (failure) {
      setError(failure.message || "This report could not be opened.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => { loadReport(); }, []);

  async function signOut() {
    try { await fetch("/api/partners/logout", { method: "POST" }); } catch { /* Clear this view regardless. */ }
    setReport(null);
    setError("You have signed out. Open your private report link to return.");
  }

  const current = links.find((item) => item.href === pathname) || links[0];
  return <PartnerContext.Provider value={{ report, updatedAt, refreshing, reload: () => loadReport(true) }}><div className="partner-workspace" data-clarity-mask="true"><div className="partner-app">
    <aside className="partner-sidebar"><div className="partner-sidebar-main"><Link className="partner-brand" href="/" aria-label="Ryravel home"><img src="/brand/ryravel-mark.png" alt="" /><span><strong>Ryravel</strong><small>PARTNER DESK</small></span></Link><p className="partner-nav-label">WORKSPACE</p><nav aria-label="Partner dashboard">{links.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={pathname === item.href ? "is-active" : ""}><Icon name={item.icon} /> <span>{item.label}</span>{item.label === "Payouts" && <small>Pending</small>}</Link>)}</nav></div><div className="partner-sidebar-bottom"><p><Icon name="shield" /> Traveller details remain private to Ryravel.</p><a href="mailto:support@ryravel.com">Partner support <Icon name="arrow" size={14} /></a><button type="button" onClick={signOut}><Icon name="logout" /> Sign out</button></div></aside>
    <div className="partner-main"><header className="partner-topbar"><div className="partner-breadcrumb"><span>Partner desk</span><span aria-hidden="true">/</span><strong>{current.label}</strong></div><div className="partner-topbar-actions"><span className="partner-session"><Icon name="shield" size={15} /> Private dashboard</span>{report && <button type="button" onClick={() => loadReport(true)} disabled={refreshing}><Icon name="refresh" size={16} /> {refreshing ? "Refreshing" : "Refresh"}</button>}</div></header><div className="partner-scroll-content">{loading ? <div className="partner-state" role="status"><span className="partner-eyebrow">SECURE ACCESS</span><h1>Opening your dashboard</h1><p>Checking your private partner session.</p></div> : !report ? <div className="partner-state" role="alert"><span className="partner-eyebrow">PRIVATE ACCESS</span><h1>Your report is unavailable</h1><p>{error}</p><p>Ask your Ryravel contact for a new private report link.</p></div> : <>{error && <p className="partner-inline-error" role="alert">Refresh failed: {error}. Showing your last loaded report.</p>}{children}</>}<footer className="partner-app-footer"><span>Ryravel Partner Desk</span><span>Private referral activity, not a commission statement.</span></footer></div></div>
  </div></div></PartnerContext.Provider>;
}
