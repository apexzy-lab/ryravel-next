export const metadata = {
  title: "Confirmation link unavailable | Ryravel",
  robots: { index: false, follow: false },
};

export default function JourneyNotesExpired() {
  return <main className="newsletter-confirm-page"><section className="newsletter-confirm-card">
    <span className="kicker">Link unavailable</span>
    <h1>Your enquiry is still safe with us.</h1>
    <p>This journey-notes confirmation link is invalid or has expired. No marketing permission was added. Your journey enquiry is unaffected; if you would still like our notes, please ask the curator team for a new confirmation link.</p>
    <a className="button button-red" href="mailto:hello@ryravel.com?subject=Journey%20notes%20confirmation">Contact Ryravel →</a>
  </section></main>;
}
