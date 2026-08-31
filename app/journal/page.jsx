import JournalIndex from "./JournalIndex";
import "./journal.css";

export const metadata = {
  title: "The Ryravel Journal",
  description: "Long-form writing on stillness, transformation, and the question no one else thinks to ask.",
};

export default function JournalPage() {
  return <JournalIndex />;
}
