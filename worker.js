import handler from "vinext/server/fetch-handler";
import { processDeliveries, alertOperations } from "./app/lib/deliveries";
import { getD1 } from "./db/index";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // Keep preview/local tooling usable; these protections apply at the production boundary.
    // Newsletter confirmation is protected by its single-use email token and may
    // be submitted from privacy-preserving email browsers with Origin: null.
    if (url.protocol === 'https:' && request.method !== 'GET' && request.method !== 'HEAD' && url.pathname !== '/api/newsletter-confirm') {
      const origin = request.headers.get('origin');
      if (origin && origin !== url.origin) return new Response(null, {status:403});
    }
    const response = await handler.fetch(request, env, ctx);
    const secured = new Response(response.body, response);
    secured.headers.set('X-Content-Type-Options','nosniff');
    secured.headers.set('X-Frame-Options','DENY');
    secured.headers.set('Referrer-Policy','strict-origin-when-cross-origin');
    secured.headers.set('Permissions-Policy','camera=(), microphone=(), geolocation=(), payment=()');
    secured.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://snap.licdn.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; media-src 'self' https://media.ryravel.com; connect-src 'self' https://challenges.cloudflare.com https://px.ads.linkedin.com https://snap.licdn.com https://www.google-analytics.com https://www.googleadservices.com https://www.google.com https://googleads.g.doubleclick.net https://www.googletagmanager.com https://pagead2.googlesyndication.com; frame-src https://challenges.cloudflare.com; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests");
    if (url.pathname.startsWith('/api/admin/') || url.pathname.startsWith('/curator-desk')) { secured.headers.set('Cache-Control','no-store'); secured.headers.set('X-Robots-Tag','noindex, noarchive'); }
    if (url.pathname.startsWith('/newsletter/') || url.pathname === '/api/newsletter-confirm') { secured.headers.set('Cache-Control','no-store'); secured.headers.set('Referrer-Policy','no-referrer'); secured.headers.set('X-Robots-Tag','noindex, noarchive'); }
    return secured;
  },
  async scheduled(_controller, _env, ctx) {
    ctx.waitUntil((async()=> {
      await processDeliveries(20);
      await alertOperations();
      await getD1().prepare("DELETE FROM security_rate_limits WHERE expires_at < ?").bind(Math.floor(Date.now()/1000)).run();
      await getD1().prepare("DELETE FROM newsletter_opt_ins WHERE confirmed_at IS NULL AND julianday(expires_at)<julianday('now','-30 days')").run();
      await getD1().prepare("INSERT INTO operations_state(key,value,updated_at) VALUES('scheduler','ok',datetime('now')) ON CONFLICT(key) DO UPDATE SET value='ok',updated_at=datetime('now')").run();
    })().catch(error=>console.error('Ryravel operating task failed',error.message)));
  },
};
