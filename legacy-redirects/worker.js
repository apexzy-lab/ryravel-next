const ROOT = "https://ryravel.com";

const redirects = new Map([
  ["app.ryravel.com/", "/"],
  ["app.ryravel.com/about-us", "/about"],
  ["app.ryravel.com/contact-us", "/request"],
  ["app.ryravel.com/trips/southern-world", "/destinations/tanzania"],
  ["app.ryravel.com/trips/northern-classic", "/destinations/tanzania"],
  ["app.ryravel.com/trips/zanzibar-cultural-beach", "/destinations/zanzibar"],
  ["app.ryravel.com/trips/love-in-the-wild", "/journeys/romantic"],
  ["app.ryravel.com/togo_trip_types/private-tour", "/private-bespoke"],
  ["app.ryravel.com/togo_trip_types/daily-tour", "/journeys"],
  ["app.ryravel.com/togo_trip_destinations/africa", "/destinations/tanzania"],
  ["app.ryravel.com/togo_trip_activities/romantic-tours", "/journeys/romantic"],
  ["app.ryravel.com/togo_trip_activities/family-friendly-tours", "/journeys"],
  ["blog.ryravel.com/", "/case-studies"],
  ["blog.ryravel.com/zanzibar-luxury-resorts-2026-new-hotel-openings-private-island-retreats", "/destinations/zanzibar"],
  ["blog.ryravel.com/tanzania-safari-and-beach-itinerary-the-ultimate-luxury-combination-guide-2026", "/destinations/tanzania"],
  ["blog.ryravel.com/beyond-serengeti-safari-7-luxury-tanzania-experiences-for-2026-hidden-gems-guide", "/destinations/tanzania"],
  ["blog.ryravel.com/serengeti-vs-masai-mara-which-safari-destination-is-right-for-you", "/destinations/tanzania"],
]);

export default {
  fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
    const destination = redirects.get(`${url.hostname}${path}`);
    if (destination) return Response.redirect(`${ROOT}${destination}`, 301);
    return new Response("This retired Ryravel page is gone.", {
      status: 410,
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex, nofollow" },
    });
  },
};
