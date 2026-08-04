"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const stages = ["new", "qualified", "discovery", "shaping", "proposal", "won", "declined", "closed"];
const curatorEmail = "curator@ryravel.com";

function title(value) {
  return String(value || "").replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function initials(name) {
  return String(name || "?").split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function relativeTime(value) {
  const seconds = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function StagePill({ stage }) {
  return <span className={`desk-stage stage-${stage}`}>{title(stage)}</span>;
}

export default function CuratorDeskDemo() {
  const [overview, setOverview] = useState({ actor: "", counts: {}, enquiries: [] });
  const [selectedId, setSelectedId] = useState("");
  const [detail, setDetail] = useState(null);
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("active");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [accessKeyDraft, setAccessKeyDraft] = useState("");
  const [authReady, setAuthReady] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [needsAccess, setNeedsAccess] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [loginTurnstile, setLoginTurnstile] = useState({ enabled: false, siteKey: "" });
  const [loginTurnstileToken, setLoginTurnstileToken] = useState("");
  const loginTurnstileMount = useRef(null);
  const loginTurnstileWidget = useRef(null);

  useEffect(() => {
    const storedKey = window.sessionStorage.getItem("ryravel-curator-key") || "";
    setAccessKey(storedKey);
    setNeedsAccess(!storedKey);
    setLoading(Boolean(storedKey));
    setCheckingAccess(Boolean(storedKey));
    setAuthReady(true);
  }, []);

  useEffect(() => {
    fetch("/api/turnstile", { cache: "no-store" })
      .then((response) => response.json())
      .then((config) => setLoginTurnstile({ enabled: Boolean(config.enabled), siteKey: config.siteKey || "" }))
      .catch(() => setError("The security check could not be loaded. Please refresh and try again."));
  }, []);

  useEffect(() => {
    if (!needsAccess || !loginTurnstile.enabled || !loginTurnstile.siteKey) return undefined;
    let cancelled = false;
    const render = () => {
      if (cancelled || !loginTurnstileMount.current || !window.turnstile || loginTurnstileWidget.current !== null) return;
      loginTurnstileWidget.current = window.turnstile.render(loginTurnstileMount.current, {
        sitekey: loginTurnstile.siteKey,
        theme: "light",
        action: "curator_login",
        callback: setLoginTurnstileToken,
        "expired-callback": () => setLoginTurnstileToken(""),
        "error-callback": () => setLoginTurnstileToken(""),
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
    return () => {
      cancelled = true;
      if (window.turnstile && loginTurnstileWidget.current !== null) window.turnstile.remove(loginTurnstileWidget.current);
      loginTurnstileWidget.current = null;
      setLoginTurnstileToken("");
    };
  }, [needsAccess, loginTurnstile]);

  const authHeaders = useCallback((json = false) => ({
    ...(json ? { "Content-Type": "application/json" } : {}),
    ...(accessKey ? { Authorization: `Bearer ${accessKey}` } : {}),
  }), [accessKey]);

  const loadOverview = useCallback(async () => {
    setError("");
    const response = await fetch(`/api/admin/enquiries?view=${view}`, { cache: "no-store", headers: authHeaders() });
    const result = await response.json();
    if (response.status === 401) {
      window.sessionStorage.removeItem("ryravel-curator-key");
      setAccessKey("");
      setNeedsAccess(true);
    }
    if (!response.ok) throw new Error(result.error || "The curator desk could not be loaded.");
    setNeedsAccess(false);
    setOverview(result);
    setSelectedId((current) => result.enquiries?.some((record) => record.id === current) ? current : result.enquiries?.[0]?.id || "");
  }, [authHeaders, view]);

  const loadDetail = useCallback(async (id) => {
    if (!id) { setDetail(null); return; }
    const response = await fetch(`/api/admin/enquiries/${encodeURIComponent(id)}`, { cache: "no-store", headers: authHeaders() });
    const result = await response.json();
    if (response.status === 401) setNeedsAccess(true);
    if (!response.ok) throw new Error(result.error || "This enquiry could not be loaded.");
    setDetail(result);
  }, [authHeaders]);

  useEffect(() => {
    if (authReady && accessKey) loadOverview().catch((loadError) => setError(loadError.message)).finally(() => { setLoading(false); setCheckingAccess(false); });
  }, [authReady, accessKey, loadOverview]);

  useEffect(() => {
    loadDetail(selectedId).catch((loadError) => setError(loadError.message));
  }, [selectedId, loadDetail]);

  const visible = useMemo(() => overview.enquiries.filter((record) => {
    const matchesFilter = filter === "all" || record.status === filter;
    const haystack = `${record.reference} ${record.name} ${record.email} ${record.feeling}`.toLowerCase();
    return matchesFilter && haystack.includes(query.toLowerCase());
  }), [overview.enquiries, filter, query]);

  async function update(fields, successMessage = "Enquiry updated.") {
    if (!selectedId) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/admin/enquiries/${encodeURIComponent(selectedId)}`, {
        method: "PATCH",
        headers: authHeaders(true),
        body: JSON.stringify(fields),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The update could not be saved.");
      setDetail(result);
      await loadOverview();
      if (fields.deleted === true || fields.restored === true) {
        setSelectedId("");
        setDetail(null);
      }
      setNotice(successMessage);
    } catch (updateError) {
      setError(updateError.message);
    } finally {
      setSaving(false);
    }
  }

  async function signIn(event) {
    event.preventDefault();
    setError("");
    const key = accessKeyDraft.trim();
    if (!key) return;
    if (loginTurnstile.enabled && !loginTurnstileToken) {
      setError("Please complete the security check before signing in.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessKey: key, turnstileToken: loginTurnstileToken }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The curator workspace could not be opened.");
      window.sessionStorage.setItem("ryravel-curator-key", key);
      setCheckingAccess(true);
      setAccessKey(key);
      setNeedsAccess(false);
    } catch (signInError) {
      setError(signInError.message);
      if (window.turnstile && loginTurnstileWidget.current !== null) window.turnstile.reset(loginTurnstileWidget.current);
      setLoginTurnstileToken("");
      setLoading(false);
    }
  }

  function signOut() {
    window.sessionStorage.removeItem("ryravel-curator-key");
    setAccessKey("");
    setAccessKeyDraft("");
    setOverview({ actor: "", counts: {}, enquiries: [] });
    setDetail(null);
    setNeedsAccess(true);
    setCheckingAccess(false);
    setNotice("");
    setError("");
  }

  function changeView(nextView) {
    setView(nextView);
    setSelectedId("");
    setDetail(null);
    setFilter("all");
    setQuery("");
    setLoading(true);
  }

  async function copyReference() {
    if (!request?.reference) return;
    await navigator.clipboard.writeText(request.reference);
    setNotice(`Copied ${request.reference}.`);
  }

  async function exportCsv() {
    try {
      const response = await fetch("/api/admin/enquiries.csv", { headers: authHeaders() });
      if (!response.ok) throw new Error("The export could not be created.");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ryravel-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (exportError) {
      setError(exportError.message);
    }
  }

  const request = detail?.enquiry;
  const counts = overview.counts || {};

  if (checkingAccess) {
    return <main className="curator-desk-demo desk-login-page"><div className="desk-login desk-session-check" role="status"><img src="/brand/ryravel-mark.png" alt="" /><span>Private curator workspace</span><h1>Checking secure access.</h1><p>Confirming your curator session before opening the workspace.</p><div className="desk-check-pulse" aria-hidden="true" /></div></main>;
  }

  if (needsAccess) {
    return <main className="curator-desk-demo desk-login-page"><form className="desk-login" onSubmit={signIn}><img src="/brand/ryravel-mark.png" alt="" /><span>Private curator workspace</span><h1>Welcome back.</h1><p>Enter the curator access key to view traveller enquiries.</p><label>Curator email<input type="email" value={curatorEmail} readOnly aria-readonly="true" /></label><label>Access key<input type="password" value={accessKeyDraft} onChange={(event) => setAccessKeyDraft(event.target.value)} placeholder="Curator access key" autoComplete="current-password" required /></label>{loginTurnstile.enabled ? <div className="desk-login-turnstile"><div ref={loginTurnstileMount} /><small>Protected by Cloudflare Turnstile.</small></div> : null}{error ? <div className="desk-alert desk-alert-error" role="alert">{error}</div> : null}<button type="submit" disabled={loading}>{loading ? "Verifying…" : "Open curator desk →"}</button><a href="/">Return to Ryravel</a></form></main>;
  }

  return (
    <main className="curator-desk-demo">
      <div className="command-desk live-command-desk">
        <aside className="command-sidebar">
          <div className="desk-brand"><img src="/brand/ryravel-mark.png" alt="" /><div><strong>Ryravel</strong><span>Curator desk</span></div></div>
          <nav><button className={view === "active" ? "active" : ""} type="button" onClick={() => changeView("active")}><span>◆</span> Enquiries <b>{counts.active_count || 0}</b></button><button className={view === "trash" ? "active" : ""} type="button" onClick={() => changeView("trash")}><span>♲</span> Trash <b>{counts.deleted_count || 0}</b></button><button type="button" onClick={exportCsv}><span>↧</span> Export CSV</button><a href="/journeys"><span>◫</span> Journeys</a><a href="/"><span>↗</span> View website</a></nav>
          <div className="desk-user"><span>{initials(overview.actor)}</span><div><b>{overview.actor || "Ryravel curator"}</b><small>Authorised workspace</small></div><button className="desk-logout" type="button" onClick={signOut}>Log out</button></div>
        </aside>

        <section className="command-main">
          <header><div><span>{new Intl.DateTimeFormat("en", { weekday: "long", day: "numeric", month: "long" }).format(new Date())}</span><h1>{view === "trash" ? "Deleted enquiries" : "Journey enquiries"}</h1><p>{view === "trash" ? "Recover a submission that was removed by mistake." : "Every conversation, held with intention."}</p></div><button className="desk-refresh" type="button" onClick={() => loadOverview().catch((loadError) => setError(loadError.message))}>Refresh</button></header>
          {error ? <div className="desk-alert desk-alert-error" role="alert">{error}</div> : null}
          {notice ? <div className="desk-alert" role="status">{notice}</div> : null}
          <section className="desk-metrics">
            <article><span>Need a response</span><strong>{counts.new_count || 0}</strong><small>New enquiries</small></article>
            <article><span>Open conversations</span><strong>{counts.active_count || 0}</strong><small>Across every stage</small></article>
            <article><span>Overdue actions</span><strong>{counts.overdue_count || 0}</strong><small>Follow up today</small></article>
            <article><span>All enquiries</span><strong>{counts.total || 0}</strong><small>Active records</small></article>
          </section>

          <section className="command-workspace">
            <div className="command-list">
              <div className="desk-tools"><label><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search enquiries" /></label><select value={filter} onChange={(event) => setFilter(event.target.value)}><option value="all">All stages</option>{stages.map((stage) => <option value={stage} key={stage}>{title(stage)}</option>)}</select></div>
              <div className="desk-list-heading"><span>{visible.length} {view === "trash" ? "deleted submissions" : "conversations"}</span><button type="button">Newest first ↓</button></div>
              <div className="desk-request-list">
                {loading ? <p className="desk-empty">Loading enquiries…</p> : null}
                {!loading && visible.length === 0 ? <p className="desk-empty">No enquiries match this view.</p> : null}
                {visible.map((record) => <button className={selectedId === record.id ? "selected" : ""} type="button" key={record.id} onClick={() => setSelectedId(record.id)}><span className="desk-avatar">{initials(record.name)}</span><div><div><b>{record.name}</b><small>{relativeTime(record.created_at)}</small></div><p>{record.feeling} · {record.travel_month} {record.travel_year}</p><footer><StagePill stage={record.status} /><span className={`priority-${record.priority}`}>{title(record.priority)}</span><em>{record.assigned_to || "Unassigned"}</em></footer></div></button>)}
              </div>
            </div>

            <aside className="desk-detail">
              {!request ? <div className="desk-empty desk-empty-detail"><h2>No conversation selected</h2><p>Choose an enquiry from the queue to review it.</p></div> : <>
                <div className="desk-detail-top"><div><button className="desk-reference" type="button" onClick={copyReference} title="Copy reference">{request.reference}</button><h2>{request.name}</h2><p>{request.feeling}</p></div><StagePill stage={request.status} /></div>
                <div className="desk-score"><div><span>Fit score</span><strong>{request.fit_score ?? "—"}</strong><small>/ 100</small></div><label>Priority<select value={request.priority} onChange={(event) => update({ priority: event.target.value })} disabled={saving}><option value="normal">Normal</option><option value="high">High</option><option value="urgent">Urgent</option></select></label></div>
                <section><span className="desk-label">What they told us</span><blockquote>{request.message ? `“${request.message}”` : "No additional message was provided."}</blockquote></section>
                <section className="desk-facts">{[["Feeling", request.feeling], ["Travel window", `${request.travel_month} ${request.travel_year}`], ["Duration", request.duration], ["Travellers", request.people], ["Investment", request.budget], ["Found us through", request.referral || "Not provided"]].map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</section>
                <section><span className="desk-label">Contact</span><div className="desk-contact"><a href={`mailto:${request.email}`}>{request.email}</a><a href={`tel:${request.country_code}${request.phone}`}>{request.country_code} {request.phone}</a></div></section>
                <section className="desk-operations"><span className="desk-label">Curator operations</span><div className="desk-operation-grid"><label>Stage<select value={request.status} onChange={(event) => update({ status: event.target.value }, `Moved to ${title(event.target.value)}.`)} disabled={saving}>{stages.map((stage) => <option value={stage} key={stage}>{title(stage)}</option>)}</select></label><label>Fit score<input type="number" min="0" max="100" value={request.fit_score ?? ""} onChange={(event) => setDetail((current) => ({ ...current, enquiry: { ...current.enquiry, fit_score: event.target.value } }))} onBlur={(event) => update({ fitScore: event.target.value })} /></label><label>Owner<input value={request.assigned_to || ""} placeholder="curator@ryravel.com" onChange={(event) => setDetail((current) => ({ ...current, enquiry: { ...current.enquiry, assigned_to: event.target.value } }))} /></label><label>Due<input type="datetime-local" value={request.next_action_due_at?.slice(0, 16) || ""} onChange={(event) => setDetail((current) => ({ ...current, enquiry: { ...current.enquiry, next_action_due_at: event.target.value } }))} /></label></div><label>Next action<input value={request.next_action || ""} placeholder="Book discovery call" onChange={(event) => setDetail((current) => ({ ...current, enquiry: { ...current.enquiry, next_action: event.target.value } }))} /></label><button className="desk-note-button" type="button" disabled={saving} onClick={() => update({ assignedTo: request.assigned_to, nextAction: request.next_action, nextActionDueAt: request.next_action_due_at }, "Operations saved.")}>Save operations</button></section>
                <section><label className="desk-label" htmlFor="curator-tags">Tags</label><input className="desk-tags-input" id="curator-tags" value={(() => { try { return JSON.parse(request.tags || "[]").join(", "); } catch { return ""; } })()} onChange={(event) => setDetail((current) => ({ ...current, enquiry: { ...current.enquiry, tags: JSON.stringify(event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean)) } }))} placeholder="honeymoon, vip, repeat traveller" /><button className="desk-note-button" type="button" disabled={saving} onClick={() => update({ tags: (() => { try { return JSON.parse(request.tags || "[]"); } catch { return []; } })() }, "Tags saved.")}>Save tags</button></section>
                <section><label className="desk-label" htmlFor="curator-note">Private curator note</label><textarea id="curator-note" value={request.admin_note || ""} onChange={(event) => setDetail((current) => ({ ...current, enquiry: { ...current.enquiry, admin_note: event.target.value } }))} placeholder="Add context for the next curator…" /><button className="desk-note-button" type="button" disabled={saving} onClick={() => update({ note: request.admin_note }, "Private note saved.")}>Save note</button></section>
                <section className="desk-history"><span className="desk-label">Activity</span>{detail.events?.length ? detail.events.map((event) => <p key={event.id}><b>{title(event.event_type)}</b><span>{event.actor_email} · {relativeTime(event.created_at)}</span></p>) : <p><b>Enquiry received</b><span>{relativeTime(request.created_at)}</span></p>}</section>
                <div className="desk-danger-actions">{view === "trash" ? <button className="desk-restore" type="button" disabled={saving} onClick={() => update({ restored: true }, "Enquiry restored.")}>Restore enquiry</button> : <><button type="button" disabled={saving} onClick={() => update({ archived: true }, "Enquiry archived.")}>Archive</button><button type="button" disabled={saving} onClick={() => update({ spam: true }, "Enquiry marked as spam.")}>Mark as spam</button><button className="desk-delete" type="button" disabled={saving} onClick={() => setPendingDelete(true)}>Delete</button></>}</div>
              </>}
            </aside>
          </section>
        </section>
      </div>
      {pendingDelete && request ? <div className="desk-confirm-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPendingDelete(false); }}><section className="desk-confirm" role="dialog" aria-modal="true" aria-labelledby="delete-title"><span>Move to trash</span><h2 id="delete-title">Delete {request.name}’s submission?</h2><p>This removes it from the active desk. It stays recoverable in Trash with its activity history intact.</p><div><button type="button" onClick={() => setPendingDelete(false)}>Cancel</button><button className="desk-delete-confirm" type="button" disabled={saving} onClick={async () => { setPendingDelete(false); await update({ deleted: true }, "Enquiry moved to Trash."); }}>Move to Trash</button></div></section></div> : null}
    </main>
  );
}
