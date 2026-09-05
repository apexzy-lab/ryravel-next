import JournalIndex from "./JournalIndex";
import "./journal.css";

export const metadata = {
  title: "The Ryravel Journal",
  description: "Long-form writing on stillness, transformation, and the question no one else thinks to ask.",
  alternates: { canonical: "https://ryravel.com/journal" },
  openGraph: {
    title: "The Ryravel Journal",
    description: "Long-form writing on stillness, transformation, and the question no one else thinks to ask.",
    url: "https://ryravel.com/journal",
    images: [{ url: "https://ryravel.com/journal/empty-felt-anchored.png", width: 1536, height: 1024, alt: "Empty. felt. Anchored" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Ryravel Journal",
    description: "Long-form writing on stillness, transformation, and the question no one else thinks to ask.",
    images: ["https://ryravel.com/journal/empty-felt-anchored.png"],
  },
};

export default function JournalPage() {
  return <JournalIndex />;
}
