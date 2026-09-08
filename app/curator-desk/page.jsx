import CuratorDeskDemo from "./CuratorDeskDemo";

export const metadata = {
  title: "Ryravel Curator Desk",
  description: "Private workspace for managing Ryravel journey enquiries.",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function CuratorDeskPage() {
  return <CuratorDeskDemo />;
}
