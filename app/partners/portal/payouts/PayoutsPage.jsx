"use client";

import { Icon, ReferralTable, usePartnerReport } from "../PartnerWorkspace";

export default function PayoutsPage() {
  const { report } = usePartnerReport();
  const verified = report.referrals.filter((item) => item.payment !== "Not yet verified");
  return <div className="partner-page"><div className="partner-page-heading"><div><span className="partner-eyebrow">PAYMENTS & PAYOUTS</span><h1>Clear status. No guesswork.</h1><p>See when Ryravel has verified a traveller payment. Commission and payout arrangements are handled separately.</p></div></div>
    <div className="partner-payment-summary"><div><span>Payment-verified journeys</span><strong>{report.totals.paid}</strong><p>Deposit or full payment matched to cleared funds.</p></div><div><span>Payout onboarding</span><strong>Pending</strong><p>Secure bank-account onboarding is not active yet.</p></div></div>
    <section className="partner-panel partner-payout-notice"><div className="partner-notice-icon"><Icon name="shield" size={23} /></div><div><span className="partner-eyebrow">ACCOUNT DETAILS</span><h2>We do not collect bank details here.</h2><p>Ryravel has not selected a payout provider. When secure onboarding is available, we will explain the process directly. Please do not send account numbers by email or in a journey request.</p><a href="mailto:support@ryravel.com?subject=Ryravel%20partner%20payout%20setup">Contact partner support <Icon name="arrow" size={15} /></a></div></section>
    <section className="partner-panel partner-payments-list"><div className="partner-panel-heading"><div><span className="partner-eyebrow">VERIFIED TRAVELLER PAYMENTS</span><h2>Payment activity</h2></div><span className="partner-count">{verified.length} recent</span></div>{verified.length ? <ReferralTable rows={verified} /> : <div className="partner-empty"><Icon name="clock" size={24} /><h3>No verified payments yet</h3><p>After Ryravel matches cleared funds to an invoice, the relevant referral will appear here.</p></div>}</section><p className="partner-legal-note">A payment-verified status is not a commission statement or a promise of payout. Eligibility and terms follow your separate partner agreement.</p>
  </div>;
}
