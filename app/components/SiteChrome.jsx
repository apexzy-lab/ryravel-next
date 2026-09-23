"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const nav = [
  ["Journeys", "/journeys"],
  ["Our approach", "/about"],
  ["The Return", "/the-return"],
  ["Case studies", "/case-studies"],
];

const consentKey = "ryravel-cookie-choice-v1";

export function Logo({ forceLight = false }) {
  return (
    <span className={`brand${forceLight ? " force-light" : ""}`} role="img" aria-label="Ryravel">
      <img className="brand-light" src="/brand/ryravel-logo-light.png" alt="" width="366" height="96" />
      <img className="brand-dark" src="/brand/ryravel-logo-dark.png" alt="" width="366" height="96" />
    </span>
  );
}

export default function SiteChrome({ children }) {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(undefined);
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);
  const linkedInLoaded = useRef(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("ryravel-theme");
    const nextLight = saved === "light";
    setLight(nextLight);
    document.documentElement.dataset.theme = nextLight ? "light" : "dark";
  }, []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(consentKey);
      setMarketingConsent(saved === "accept" ? true : saved === "reject" ? false : null);
    } catch {
      setMarketingConsent(null);
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

  function chooseMarketing(allowed) {
    try { window.localStorage.setItem(consentKey, allowed ? "accept" : "reject"); } catch { /* Browsing can continue without storage. */ }
    setCookieSettingsOpen(false);
    if (!allowed && linkedInLoaded.current) {
      window.location.reload();
      return;
    }
    setMarketingConsent(allowed);
  }

  function toggleTheme() {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
    window.localStorage.setItem("ryravel-theme", next ? "light" : "dark");
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
          <button className={`menu-button ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><i /><i /><i /></button>
        </div>
      </header>
      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        {nav.map(([label, href]) => <Link href={href} key={`${label}-${href}`} onClick={() => setMenuOpen(false)}>{label}</Link>)}
        <Link className="button button-red" href="/request" onClick={() => setMenuOpen(false)}>Plan my journey</Link>
      </div>
      {children}
      <footer className="site-footer">
        <div className="footer-grid">
          <div><Logo forceLight /><p>We travel not to escape life,<br />but for life not to escape us.</p></div>
          <div><b>Journeys</b><Link href="/journeys">By feeling</Link><Link href="/travel-styles">By travel style</Link><Link href="/luxury-travel-planning">Worldwide private travel</Link><Link href="/luxury-family-travel">Family travel</Link><Link href="/luxury-honeymoons">Honeymoons</Link><Link href="/luxury-wellness-retreats">Wellness retreats</Link><Link href="/luxury-corporate-retreats">Corporate retreats</Link><Link href="/journeys/stillness">Stillness Collection</Link></div>
          <div><b>Company</b><Link href="/about">Our philosophy</Link><Link href="/about#curators">The curators</Link><Link href="/the-return">The Return</Link><Link href="/case-studies">Case studies</Link><Link href="/sustainability">Sustainability</Link></div>
          <div><b>Begin</b><Link href="/request">Start the conversation</Link><Link href="/request?conversation=private-call">Request a private call</Link><a href="mailto:hello@ryravel.com">Contact the team</a><a href="tel:+17605140361">+1 760 514 0361</a><b className="footer-subheading">Booking & care</b><Link href="/policies">Policy overview</Link><Link href="/terms">Booking terms</Link><Link href="/cancellations">Cancellations & refunds</Link><Link href="/travel-information">Before you travel</Link></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Ryravel. All rights reserved.</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <Link href="/cookies">Cookies</Link> · <button type="button" onClick={() => setCookieSettingsOpen(true)}>Cookie settings</button></span></div>
      </footer>
      {(marketingConsent === null || cookieSettingsOpen) && <div className="cookie-choice" role="region" aria-label="Cookie choices"><div><strong>Your privacy, your choice.</strong><p>We use essential storage for site preferences and enquiry security. With your permission, we also use LinkedIn’s marketing tag. You can change your choice at any time.</p><Link href="/cookies">Read the cookie notice</Link></div><div className="cookie-choice-actions"><button type="button" onClick={() => chooseMarketing(false)}>Reject marketing</button><button type="button" onClick={() => chooseMarketing(true)}>Allow marketing</button>{cookieSettingsOpen && marketingConsent !== null && <button type="button" onClick={() => setCookieSettingsOpen(false)}>Close</button>}</div></div>}
    </>
  );
}
