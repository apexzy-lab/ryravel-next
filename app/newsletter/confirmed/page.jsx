export const metadata = {
  title: "Journey notes confirmed | Ryravel",
  robots: { index: false, follow: false },
};

export default function JourneyNotesConfirmed() {
  return <main className="newsletter-confirm-page"><section className="newsletter-confirm-card">
    <span className="kicker">Choice confirmed</span>
    <h1>We will stay in touch.</h1>
    <p>Your email confirmation has been recorded. You may receive occasional Ryravel traveller stories and journey notes. Your private journey enquiry remains a separate conversation.</p>
    <a className="button button-red" href="/journeys">Explore journeys →</a>
    <small>You can unsubscribe from future emails at any time.</small>
  </section></main>;
}
