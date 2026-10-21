import { buildMetadata } from "../seo";

export const metadata = buildMetadata({
  title: "Plan a Bespoke Journey",
  description: "Tell a Ryravel curator what brings you to us, then begin a private journey designed around you.",
  path: "/request",
});

export default function RequestLayout({ children }) {
  return children;
}
