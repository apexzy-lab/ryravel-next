import { buildMetadata } from "../seo";

export const metadata = buildMetadata({
  title: "Plan a Bespoke Journey",
  description: "Tell a Ryravel curator how you want to feel, then begin a private journey designed around you.",
  path: "/request",
});

export default function RequestLayout({ children }) {
  return children;
}
