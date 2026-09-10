import "./globals.css";
import "./homepage.css";
import SiteChrome from "./components/SiteChrome";
import { DEFAULT_DESCRIPTION, organizationJsonLd, SITE_NAME, SITE_URL } from "./seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ryravel — How do you want to feel?",
    template: "%s · Ryravel",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: ["bespoke luxury travel", "Tanzania luxury travel", "private Zanzibar journeys", "Serengeti journeys", "emotion-led travel"],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
