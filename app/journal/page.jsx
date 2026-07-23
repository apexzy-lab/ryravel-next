import Link from "next/link";
import { CTA, PageHero } from "../components/Blocks";
import { journalEntries } from "../data";

export const metadata = { title: "Journal" };

export default function JournalPage() {
  return <main><PageHero kicker="The Ryravel journal" title="Our guide to" emphasis="travelling with intention" copy="Essays, field notes and practical guidance for journeys that begin with a feeling." /><section className="journal-list paper-section">{journalEntries.map((entry, index) => <Link href={`/journal/${entry.slug}`} key={entry.slug}><span>0{index + 1}</span><div><small>{entry.type} · {entry.read}</small><h2>{entry.title}</h2><p>{entry.summary}</p></div><u>Read →</u></Link>)}</section><CTA /></main>;
}
