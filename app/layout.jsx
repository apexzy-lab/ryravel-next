import "./globals.css";
import SiteChrome from "./components/SiteChrome";

export const metadata = {
  title: {
    default: "Ryravel — How do you want to feel?",
    template: "%s · Ryravel",
  },
  description: "Luxury journeys designed around how you want to feel. Emotion-led travel, human-curated, transformation-focused.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><SiteChrome>{children}</SiteChrome></body>
    </html>
  );
}
