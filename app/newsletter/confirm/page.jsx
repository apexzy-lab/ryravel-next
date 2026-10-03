export const metadata = {
  title: "Confirm journey notes | Ryravel",
  robots: { index: false, follow: false },
};

export default async function ConfirmJourneyNotes({ searchParams }) {
  const params = await searchParams;
  const token = typeof params?.token === "string" && /^[a-f0-9]{64}$/i.test(params.token) ? params.token : "";
  return <main className="newsletter-confirm-page">
    <section className="newsletter-confirm-card">
      <span className="kicker">One last choice</span>
      <h1>Keep the journey in mind.</h1>
      <p>You asked to receive occasional traveller case studies and carefully chosen journey notes from Ryravel. Please confirm that choice below. Your journey enquiry is already with our curators, whether or not you subscribe.</p>
      {token ? <form action="/api/newsletter-confirm" method="post">
        <input type="hidden" name="token" value={token} />
        <button className="button button-red" type="submit">Confirm journey notes →</button>
      </form> : <p className="newsletter-confirm-error">This confirmation link is incomplete. Please use the link in your Ryravel email.</p>}
      <small>You can unsubscribe at any time. See our <a href="/privacy">privacy notice</a>.</small>
    </section>
  </main>;
}
