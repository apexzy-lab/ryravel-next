import Link from "next/link";

const policyLinks = [
  ["Overview", "/policies"],
  ["Booking terms", "/terms"],
  ["Cancellations & refunds", "/cancellations"],
  ["Before you travel", "/travel-information"],
  ["Privacy", "/privacy"],
  ["Cookies", "/cookies"],
];

export default function PolicyPage({ eyebrow = "Booking & care", title, intro, updated, children }) {
  return <main className="policy-page">
    <header className="policy-hero"><span>{eyebrow}</span><h1>{title}</h1><p>{intro}</p>{updated && <small>Effective {updated}</small>}</header>
    <div className="policy-layout">
      <nav className="policy-nav" aria-label="Booking and policy pages"><span>In this section</span>{policyLinks.map(([label, href]) => <Link href={href} key={href}>{label} →</Link>)}</nav>
      <article className="policy-content">{children}<div className="policy-help"><span>Need a specific answer?</span><p>Your curator can explain the terms applicable to your exact journey before you pay anything.</p><a href="mailto:hello@ryravel.com">Ask the Ryravel team →</a></div></article>
    </div>
  </main>;
}
