"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  ["Journeys", "/journeys"],
  ["Our approach", "/about"],
  ["The Return", "/the-return"],
  ["Journal", "/journal"],
  ["About", "/about"],
];

const linkedInPartnerScript = `_linkedin_partner_id = "10765993";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);`;

const linkedInLoaderScript = `(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);`;

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

  useEffect(() => {
    const saved = window.localStorage.getItem("ryravel-theme");
    const nextLight = saved === "light";
    setLight(nextLight);
    document.documentElement.dataset.theme = nextLight ? "light" : "dark";
  }, []);

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
          <div><b>Journeys</b><Link href="/journeys">By feeling</Link><Link href="/journeys">By traveller</Link><Link href="/journeys">By month</Link><Link href="/private-bespoke">Private & bespoke</Link><Link href="/gifting">Gifting</Link></div>
          <div><b>Company</b><Link href="/about">Our philosophy</Link><Link href="/about#curators">The curators</Link><Link href="/the-return">The Return</Link><Link href="/journal">The journal</Link><Link href="/sustainability">Sustainability</Link></div>
          <div><b>Begin</b><Link href="/request">Start the conversation</Link><a href="tel:+17605140361">Speak to a curator</a><a href="mailto:hello@ryravel.com">Contact us</a><a href="tel:+17605140361">+1 760 514 0361</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Ryravel. All rights reserved.</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · Cookie policy</span></div>
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: linkedInPartnerScript }} />
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: linkedInLoaderScript }} />
        <noscript><img height="1" width="1" style={{ display: "none" }} alt="" src="https://px.ads.linkedin.com/collect/?pid=10765993&fmt=gif" /></noscript>
      </footer>
    </>
  );
}
