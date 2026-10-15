import { analyticsAllowed } from "./funnel.js";

// Keep the loader in the document head, but do not start a third-party
// recording until the visitor has explicitly allowed analytics.
export const CLARITY_HEAD_SCRIPT = `
  window.ryravelLoadClarity = function () {
    if (document.querySelector('script[src^="https://www.clarity.ms/tag/"]')) return;
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      t.dataset.ryravelClarity="true";
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "yxxz3i32wm");
    window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
  };
`;

export function installClarity() {
  if (typeof window === "undefined" || !analyticsAllowed()) return;
  if (/^\/(curator-desk|newsletter|api)(\/|$)/.test(window.location.pathname)) return;
  window.ryravelLoadClarity?.();
}

export function stopClarity() {
  if (typeof window === "undefined" || !document.querySelector('script[src^="https://www.clarity.ms/tag/"]')) return false;
  window.clarity?.("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });
  window.clarity?.("consent", false);
  return true;
}
