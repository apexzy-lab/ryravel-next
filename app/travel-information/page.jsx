import Link from "next/link";
import PolicyPage from "../components/PolicyPage";
import { buildMetadata } from "../seo";

export const metadata = buildMetadata({ title: "Before You Travel | Journey Support", description: "Travel preparation, insurance, passports, visas, partner selection and 24/7 in-travel support for Ryravel journeys.", path: "/travel-information" });

export default function TravelInformationPage() {
  return <PolicyPage title="The practical side of going far." intro="A private journey is easier to enjoy when preparation and support are clear before departure." updated="23 September 2026">
    <section><h2>Support while travelling</h2><p>Ryravel provides 24/7 in-travel support by email and direct call. We share the relevant contact details with your confirmed travel documents. Tell us promptly about a missed connection, supplier problem, health concern or material change so we can help coordinate the next step with local partners.</p></section>
    <section><h2>Passports, visas and health</h2><p>Travellers are responsible for ensuring their passports, entry permission or visas, transit documents and health requirements are valid for the complete itinerary. Rules vary by nationality, route and date and may change. Check official destination and transit guidance before booking and again before departure. We can flag itinerary-specific questions, but you remain responsible for meeting entry requirements.</p></section>
    <section><h2>Insurance</h2><p>Arrange travel insurance suitable for your trip and circumstances, including medical care, emergency evacuation, cancellation and interruption where appropriate. Review exclusions and coverage limits carefully. Ryravel does not assume that a journey price includes your personal insurance unless your proposal expressly says it does.</p></section>
    <section><h2>Properties and local partners</h2><p>We select properties and local partners for suitability to the journey, considering location, character, service and the experience you request. Your proposal names the arrangements being offered and notes what remains subject to availability. If a supplier must change before or during travel, we explain the material difference and the available alternatives or remedies rather than presenting a substitution as identical.</p></section>
    <section><h2>Accessibility and personal needs</h2><p>Tell us early about mobility, dietary or other needs that affect the journey. We will check with the relevant suppliers and explain what can be accommodated before confirmation. Never assume a remote property or activity is accessible without written confirmation.</p></section>
    <section><h2>Before you commit</h2><p>A written proposal details the itinerary, inclusions, exclusions, payment dates and any supplier-specific conditions. Read our <Link href="/terms">booking terms</Link> and <Link href="/cancellations">cancellation policy</Link>, then ask us to clarify anything before you pay.</p></section>
  </PolicyPage>;
}
