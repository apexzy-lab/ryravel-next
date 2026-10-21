import { buildMetadata } from "../seo";

export const metadata = { ...buildMetadata({
  title: "Private Curator Conversation",
  description: "Choose a time to speak with a Ryravel curator about a private journey shaped around how you want to feel.",
  path: "/talk",
}), robots: { index: false, follow: false } };

export default function TalkLayout({ children }) { return children; }
