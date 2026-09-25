import Link from "next/link";

export function JourneyPricingNote() {
  return <p className="journey-pricing-disclosure">Journey price excludes international flights, visa fees, and travel insurance, all available through Ryravel as add-ons, quoted after your enquiry based on your departure country.</p>;
}

export default function JourneyTrustLayer() {
  return <section className="journey-trust-layer" aria-labelledby="journey-trust-title">
    <div className="journey-trust-heading"><span className="kicker">Booking & care</span><h2 id="journey-trust-title">Considered before you go.<br /><em>Supported while you are away.</em></h2><p>These standard commitments apply to every Ryravel journey. Your written proposal will show the exact price, inclusions and any disclosed supplier-specific conditions before you pay.</p></div>
    <div className="journey-trust-grid">
      <article><span>01 / Payment</span><h3>Clear dates, clear amounts.</h3><p>A 50% deposit secures your journey. The balance is due 30 days before departure. If you book within 45 days of departure, full payment is required.</p></article>
      <article><span>02 / Confirmation</span><h3>A booking you can rely on.</h3><p>We send written confirmation once your service agreement is signed, your payment has been received and the arrangements are available. An enquiry alone is never a booking.</p></article>
      <article><span>03 / Changes</span><h3>Know the cost before deciding.</h3><p>Amendments can be requested until 15 days before departure. More than 30 days out, we charge no Ryravel amendment fee. Within 30 days, supplier costs may apply; we tell you the amount before making a change. Our cancellation schedule applies to cancellations received 30 days or more before departure; later cancellations have no standard cash refund. <Link href="/cancellations">Read the full cancellation policy →</Link></p></article>
      <article><span>04 / During travel</span><h3>A person who knows your journey.</h3><p>Dedicated 24/7 support by direct call and email for the length of your trip, with the relevant contact details in your travel documents.</p></article>
      <article><span>05 / Where you stay</span><h3>Chosen for your brief.</h3><p>We select properties and local partners for their fit with your journey and the feeling you want to carry home—not for appearance alone. Named arrangements are confirmed in your proposal.</p></article>
      <article><span>06 / Travel preparation</span><h3>Help with the practical pieces.</h3><p>International flights, visa assistance and travel insurance can be arranged or sourced as separately quoted add-ons, based on your departure country. You remain responsible for valid entry documents and choosing suitable insurance. <Link href="/travel-information">Before you travel →</Link></p></article>
      <article><span>07 / If plans change</span><h3>No silent substitutions.</h3><p>If a supplier or material part of your itinerary changes, we tell you promptly, explain the options and seek your approval before a replacement is made, subject to any urgent safety need or applicable rights.</p></article>
    </div>
    <div className="journey-trust-links"><Link href="/terms">Full booking terms →</Link><Link href="/policies">All policies →</Link></div>
  </section>;
}
