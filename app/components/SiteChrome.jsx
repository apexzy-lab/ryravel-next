"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { clearAnalyticsSession, readTrackingChoice, saveTrackingChoice, trackFunnel } from "../lib/funnel";
import { installGoogleAdsTag, installGoogleAnalyticsTag, updateGoogleAdsConsent } from "../lib/googleAds";
import { installClarity, stopClarity } from "../lib/clarity";
import { journeys } from "../data";

const nav = [
  ["Journeys", "/journeys"],
  ["Our approach", "/about"],
  ["The Return", "/the-return"],
  ["Case studies", "/case-studies"],
  ["Newsroom", "/newsroom"],
];

// Brand icon paths from Bootstrap Icons; see THIRD_PARTY_NOTICES.md.
const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/ryravelhq/", path: "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" },
  { label: "Instagram, account suspended", href: "https://www.instagram.com/journeybyry/", path: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" },
  { label: "LinkedIn", href: "https://linkedin.com/company/ryravel", path: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" },
  { label: "Pinterest", href: "https://www.pinterest.com/ryravels/", path: "M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0" },
  { label: "X", href: "https://x.com/ryravelhq", path: "M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" },
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
  const isCuratorPage = /^\/(curator-desk|partners)(?:\/|$)/.test(pathname || "");
  const isPartnerPortal = /^\/partners\/portal(?:\/|$)/.test(pathname || "");
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(undefined);
  const [analyticsConsent, setAnalyticsConsent] = useState(undefined);
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);
  const [cookieCustomizeOpen, setCookieCustomizeOpen] = useState(false);
  const [customAnalytics, setCustomAnalytics] = useState(false);
  const [customMarketing, setCustomMarketing] = useState(false);
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
    const openSettings = () => {
      const choice = readTrackingChoice();
      setCustomAnalytics(choice === "analytics" || choice === "all");
      setCustomMarketing(choice === "marketing" || choice === "all");
      setCookieCustomizeOpen(false);
      setCookieSettingsOpen(true);
    };
    window.addEventListener("ryravel:cookie-settings", openSettings);
    return () => window.removeEventListener("ryravel:cookie-settings", openSettings);
  }, []);

  useEffect(() => {
    if (marketingConsent !== true || isCuratorPage || linkedInLoaded.current) return;
    linkedInLoaded.current = true;
    window._linkedin_partner_id = "10765993";
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(window._linkedin_partner_id);
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    script.dataset.ryravelMarketing = "linkedin";
    document.head.appendChild(script);
  }, [marketingConsent, isCuratorPage]);

  useEffect(() => {
    if (marketingConsent === true && !isCuratorPage) installGoogleAdsTag();
  }, [marketingConsent, isCuratorPage]);

  useEffect(() => {
    if (analyticsConsent === true && !isCuratorPage) {
      installClarity();
      installGoogleAnalyticsTag();
    }
  }, [analyticsConsent, pathname, isCuratorPage]);

  useEffect(() => {
    if (/^\/(curator-desk|partners|newsletter)(\/|$)/.test(pathname || "") && stopClarity()) window.location.reload();
  }, [pathname]);

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
    updateGoogleAdsConsent(choice);
    setCookieSettingsOpen(false);
    setCookieCustomizeOpen(false);
    if (!["all", "analytics"].includes(choice)) { clearAnalyticsSession(); lastTrackedPath.current = ""; }
    const clarityWasRunning = !["all", "analytics"].includes(choice) && stopClarity();
    if (clarityWasRunning || (!["all", "marketing"].includes(choice) && linkedInLoaded.current)) {
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

  if (isPartnerPortal) return children;

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
          <div className="footer-brand"><Logo forceLight /><p>We travel not to escape life,<br />but for life not to escape us.</p><div className="footer-social-links" aria-label="Ryravel social media">{socialLinks.map(({ label, href, path }) => <a key={href} href={href} aria-label={label} title={label} target="_blank" rel="noopener noreferrer"><svg aria-hidden="true" viewBox="0 0 16 16" focusable="false"><path d={path} /></svg></a>)}</div><p className="footer-social-status">Instagram @journeybyry is suspended. <Link href="/newsroom/instagram-account-update">Read our account update</Link>.</p></div>
          <div><b>Journeys</b><Link href="/journeys">By feeling</Link><Link href="/travel-styles">By travel style</Link><Link href="/transformational-travel">Emotion-led journeys</Link><Link href="/luxury-travel-planning">Worldwide private travel</Link><Link href="/luxury-family-travel">Family travel</Link><Link href="/luxury-honeymoons">Honeymoons</Link><Link href="/luxury-wellness-retreats">Wellness retreats</Link><Link href="/luxury-corporate-retreats">Corporate retreats</Link><Link href="/journeys/stillness">Stillness Collection</Link></div>
          <div><b>Company</b><Link href="/about">Our philosophy</Link><Link href="/about#curators">The curators</Link><Link href="/the-return">The Return</Link><Link href="/passage">Passage, our publication</Link><Link href="/newsroom">Newsroom</Link><Link href="/case-studies">Case studies</Link><Link href="/sustainability">Sustainability</Link><b className="footer-subheading">Connect</b><Link href="/newsroom/instagram-account-update">Official Instagram update</Link></div>
          <div><b>Begin</b><Link href="/request">Start the conversation</Link><Link href="/request?conversation=private-call">Request a private call</Link><a href="mailto:hello@ryravel.com">Contact the team</a><a href="tel:+17605140361">+1 760 514 0361</a><b className="footer-subheading">Booking & care</b><Link href="/policies">Policy overview</Link><Link href="/terms">Booking terms</Link><Link href="/cancellations">Cancellations & refunds</Link><Link href="/travel-information">Before you travel</Link></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Ryravel. All rights reserved.</span><span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <Link href="/cookies">Cookies</Link> · <button type="button" onClick={() => window.dispatchEvent(new Event("ryravel:cookie-settings"))}>Cookie settings</button></span></div>
      </footer>
      {!isCuratorPage && (marketingConsent === null || cookieSettingsOpen) &&
        <section className="cookie-choice" aria-label="Privacy choices">
          <div className="cookie-choice-main">
            <div className="cookie-choice-copy">
              <h2>A more thoughtful way to understand visits.</h2>
              <p>May we use analytics and ad measurement to improve Ryravel? Analytics includes Google Analytics and masked Clarity replays. Marketing measures ads with Google and LinkedIn. Your answer will not affect your access.</p>
            </div>
            <div className="cookie-choice-actions">
              <button type="button" className="cookie-accept" onClick={() => chooseTracking("all")}>Allow both</button>
              <button type="button" onClick={() => chooseTracking("reject")}>Reject optional</button>
            </div>
          </div>
          <div className="cookie-choice-foot">
            <button type="button" className="cookie-customise" aria-expanded={cookieCustomizeOpen} aria-controls="cookie-customise-panel" onClick={() => setCookieCustomizeOpen(!cookieCustomizeOpen)}>Customise choices</button>
            <Link href="/cookies">Read the cookie notice</Link>
            <span>Change your choice anytime in the footer.</span>
            {cookieSettingsOpen && marketingConsent !== null && <button type="button" className="cookie-close" onClick={() => { setCookieSettingsOpen(false); setCookieCustomizeOpen(false); }}>Close</button>}
          </div>
          {cookieCustomizeOpen && <div id="cookie-customise-panel" className="cookie-customise-panel">
            <label><input type="checkbox" checked={customAnalytics} onChange={(event) => setCustomAnalytics(event.target.checked)} /><span><strong>Analytics</strong>Journey and form interactions, Google Analytics and masked Clarity replays.</span></label>
            <label><input type="checkbox" checked={customMarketing} onChange={(event) => setCustomMarketing(event.target.checked)} /><span><strong>Marketing measurement</strong>Google Ads and LinkedIn attribution. Personalised ads remain off.</span></label>
            <button type="button" onClick={() => chooseTracking(customAnalytics ? customMarketing ? "all" : "analytics" : customMarketing ? "marketing" : "reject")}>Save my choices</button>
          </div>}
        </section>}
    </>
  );
}
