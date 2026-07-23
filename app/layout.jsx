import "./globals.css";

export const metadata = {
  title: "Ryravel — How do you want to feel?",
  description:
    "Luxury journeys designed around how you want to feel. Emotion-led travel, human-curated, transformation-focused.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
