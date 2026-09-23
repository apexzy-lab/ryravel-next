import Link from "next/link";
import PolicyPage from "../components/PolicyPage";
import { buildMetadata } from "../seo";

export const metadata = buildMetadata({ title: "Booking & Care | Ryravel Policies", description: "Clear information about Ryravel journey bookings, cancellations, travel preparation and how we handle your information.", path: "/policies" });

const sections = [
  ["01", "Booking terms", "How a proposal becomes a confirmed private journey, when payment is due, and how changes are handled.", "/terms"],
  ["02", "Cancellations & refunds", "The standard cancellation schedule and why a named supplier condition may change it.", "/cancellations"],
  ["03", "Before you travel", "Insurance, passports, visas, health requirements and help while you are away.", "/travel-information"],
  ["04", "Privacy", "What happens to information you share with our curator team.", "/privacy"],
  ["05", "Cookies & choices", "Essential site functions and your choice about marketing tracking.", "/cookies"],
];

export default function PoliciesPage() {
  return <PolicyPage title="Clarity is part of the journey." intro="The practical details should feel as considered as the itinerary. These pages explain our standard approach; your written proposal identifies the exact terms for your journey."><div className="policy-cards">{sections.map(([number, title, copy, href]) => <Link href={href} key={href}><span>{number}</span><h2>{title}</h2><p>{copy}</p><b>Read more →</b></Link>)}</div><section><h2>One important distinction</h2><p>A journey enquiry or private call does not reserve travel or create a payment obligation. Before you book, we provide a written proposal with the price, inclusions, available arrangements, payment dates and any supplier-specific cancellation terms. Please read and ask about those details before authorising payment.</p></section></PolicyPage>;
}
