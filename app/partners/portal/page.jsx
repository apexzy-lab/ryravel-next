import PartnerReport from "./PartnerReport";

export const metadata = {
  title: "Partner referrals",
  description: "Private Ryravel partner referral report.",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function PartnerPortalPage() { return <PartnerReport />; }
