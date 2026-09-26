"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { clearAnalyticsSession, readTrackingChoice, saveTrackingChoice, trackFunnel } from "../lib/funnel";
import { journeys } from "../data";

const nav = [
  ["Journeys", "/journeys"],
  ["Our approach", "/about"],
  ["The Return", "/the-return"],
  ["Case studies", "/case-studies"],
];

export function Logo({ forceLight = false }) {
  return (
    <span className={`brand${forceLight ? " force-light" : ""}`} role="img" aria-label="Ryravel">
      <img className="brand-light" src="/brand/ryravel-logo-light.png" alt="" width="366" height="96" />
      <img className="brand-dark" src="/brand/ryravel-logo-dark.png" alt="" width="366" height="96" />
    </span>
  );
}

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(undefined);
  const [analyticsConsent, setAnalyticsConsent] = useState(undefined);
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);
  const linkedInLoaded = useRef(false);
  const lastTrackedPath = useRef("");
  const menuButton = useRef(null);

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    let saved;
    try { saved = window.localStorage.getItem("ryravel-theme"); } catch { /* Theme remains usable when storage is blocked. */ }
    const nextLight = saved === "light";
    setLight(nextLight);
    document.documentElement.dataset.theme = nextLight ? "light" : "dark";
  }, []);

  useEffect(() => {
    try {
      const saved = readTrackingChoice();
      setMarketingConsent(saved === "all" || saved === "marketing" ? true : saved ? false : null);
      setAnalyticsConsent(saved === "all" || saved === "analytics" ? true : saved ? false : null);
    } catch {
      setMarketingConsent(null);
      setAnalyticsConsent(null);
    }
    const openSettings = () => setCookieSettingsOpen(true);
    window.addEventListener("ryravel:cookie-settings", openSettings);
    return () => window.removeEventListener("ryravel:cookie-settings", openSettings);
  }, []);

  useEffect(() => {
    if (marketingConsent !== true || linkedInLoaded.current) return;
    linkedInLoaded.current = true;
    window._linkedin_partner_id = "10765993";
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(window._linkedin_partner_id);
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    script.dataset.ryravelMarketing = "linkedin";
    document.head.appendChild(script);
  }, [marketingConsent]);

  useEffect(() => {
    if (analyticsConsent !== true || !pathname || lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;
    const journey = /^\/journeys\/([a-z0-9-]+)$/.exec(pathname);
    const study = /^\/case-studies\/([a-z0-9-]+)$/.exec(pathname);
    if (journey && journeys.some((item) => item.slug === journey[1])) trackFunnel("journey_viewed", { journey_slug: journey[1] });
    if (study) trackFunnel("case_study_opened", { case_study_slug: study[1] });
  }, [analyticsConsent, pathname]);

  useEffect(() => {
    if (analyticsConsent !== true) return undefined;
    const trackRequestLink = (event) => {
      const link = event.target.closest?.('a[href^="/request"]');
      if (!link) return;
      const journeySlug = new URL(link.href).searchParams.get("journey");
      trackFunnel("plan_journey_clicked", journeySlug && /^[a-z0-9-]{1,80}$/.test(journeySlug) ? { journey_slug: journeySlug } : {});
    };
    document.addEventListener("click", trackRequestLink, true);
    return () => document.removeEventListener("click", trackRequestLink, true);
  }, [analyticsConsent]);

  function chooseTracking(choice) {
    saveTrackingChoice(choice);
    setCookieSettingsOpen(false);
    if (!["all", "analytics"].includes(choice)) { clearAnalyticsSession(); lastTrackedPath.current = ""; }
    if (!["all", "marketing"].includes(choice) && linkedInLoaded.current) {
      window.location.reload();
      return;
    }
    setMarketingConsent(choice === "all" || choice === "marketing");
    setAnalyticsConsent(choice === "all" || choice === "analytics");
  }

  function toggleTheme() {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
    try { window.localStorage.setItem("ryravel-theme", next ? "light" : "dark"); } catch { /* Keep the current tab's choice even without persistence. */ }
  }

  return (
    <>
      <header className="site-header">
        <Link href="/" aria-label="Ryravel home"><Logo /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, href]) => <Link href={href} key={`${label}-${href}`}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <a className="phone" href="tel:+17605140361">+1 760 514 0361</a>
          <div className="theme-switch">
            <span>{light ? "Light" : "Dark"}</span>
            <button type="button" className={light ? "is-light" : ""} onClick={toggleTheme} aria-label={`Switch to ${light ? "dark" : "light"} mode`} aria-pressed={light}>
              <i />
            </button>
          </div>
          <Link className="button button-outline header-cta" href="/request">Plan my journey</Link>
          <button ref={menuButton} type="button" className={`menu-button ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation"><i /><i /><i /></button>
        </div>
      </header>
      <nav id="mobile-navigation" aria-label="Mobile navigation" inert={!menuOpen} className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        {nav.map(([label, href]) => <Link href={href} key={`${label}-${href}`} onClick={() => setMenuOpen(false)}>{label}</Link>)}
        <Link className="button button-red" href="/request" onClick={() => setMenuOpen(false)}>Plan my journey</Link>
      </nav>
      {children}
      <footer className="site-footer">
        <div className="footer-grid">
          <div><Logo forceLight /><p>We travel not to escape life,<br />but for life not to escape us.</p></div>
          <div><b>Journeys</b><Link href="/journeys">By feeling</Link><Link href="/travel-styles">By travel style</Link><Link href="/transformational-travel">Emotion-led journeys</Link><Link href="/luxury-travel-planning">Worldwide private travel</Link><Link href="/luxury-family-travel">Family travel</Link><Link href="/luxury-honeymoons">Honeymoons</Link><Link href="/luxury-wellness-retreats">Wellness retreats</Link><Link href="/luxury-corporate-retreats">Corporate retreats</Link><Link href="/journeys/stillness">Stillness Collection</Link></div>
          <div><b>Company</b><Link href="/about">Our philosophy</Link><Link href="/about#curators">The curators</Link><Link href="/the-return">The Return</Link><Link href="/case-studies">Case studies</Link><Link href="/sustainability">Sustainability</Link><b className="footer-subheading">Connect</b><a href="https://www.instagram.com/journeybyry/" target="_blank" rel="noopener noreferrer">Instagram · @journeybyry</a><Link href="/official-instagram">Official account update</Link></div>
          <div><b>Begin</b><Link href="/request">Start the conversation</Link><Link href="/request?conversation=private-call">Request a private call</Link><a href="mailto:hello@ryravel.com">Contact the team</a><a href="tel:+17605140361">+1 760 514 0361</a><b className="footer-subheading">Booking & care</b><Link href="/policies">Policy overview</Link><Link href="/terms">Booking terms</Link><Link href="/cancellations">Cancellations & refunds</Link><Link href="/travel-information">Before you travel</Link></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Ryravel. All rights reserved.</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <Link href="/cookies">Cookies</Link> · <button type="button" onClick={() => setCookieSettingsOpen(true)}>Cookie settings</button></span></div>
      </footer>
      {(marketingConsent === null || cookieSettingsOpen) && <div className="cookie-choice" role="region" aria-label="Cookie choices"><div><strong>Your privacy, your choice.</strong><p>Essential site functions always work. With permission, we measure journey and form interactions using a random session ID; you can also allow LinkedIn marketing tracking. Change your choice at any time.</p><Link href="/cookies">Read the cookie notice</Link></div><div className="cookie-choice-actions"><button type="button" onClick={() => chooseTracking("reject")}>Reject optional</button><button type="button" onClick={() => chooseTracking("analytics")}>Analytics only</button><button type="button" onClick={() => chooseTracking("marketing")}>Marketing only</button><button type="button" onClick={() => chooseTracking("all")}>Allow both</button>{cookieSettingsOpen && marketingConsent !== null && <button type="button" onClick={() => setCookieSettingsOpen(false)}>Close</button>}</div></div>}
    </>
  );
}
