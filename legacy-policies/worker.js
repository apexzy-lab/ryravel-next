const redirects = new Map([
  ["/", "/policies"],
  ["/docs/po/", "/policies"],
  ["/docs/po/par/trp/", "/cancellations"],
]);

export default {
  async fetch(request) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response(null, { status: 405, headers: { Allow: "GET, HEAD" } });
    }

    const { pathname } = new URL(request.url);
    const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
    const destination = redirects.get(path);
    if (destination) {
      return Response.redirect(`https://ryravel.com${destination}`, 301);
    }

    return new Response(request.method === "HEAD" ? null : "This retired policy page is no longer available. Current Ryravel policies are at https://ryravel.com/policies.", {
      status: 410,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-robots-tag": "noindex",
        "cache-control": "public, max-age=3600",
      },
    });
  },
};
