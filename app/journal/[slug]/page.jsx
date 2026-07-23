import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CTA } from "../../components/Blocks";
import { journalEntries } from "../../data";

export function generateStaticParams() {
  return journalEntries.map((entry) => ({ slug: entry.slug }));
}

const aliases = {
  "how-to-feel-not-where-to-go": "why-we-ask-how-not-where",
  "guide-to-stillness-travel": "field-guide-going-nowhere-slowly",
  "the-return-field-notes": "what-travellers-bring-home",
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = journalEntries.find((item) => item.slug === slug);
  return entry ? { title: entry.title, description: entry.summary } : {};
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  if (aliases[slug]) redirect(`/journal/${aliases[slug]}`);
  const entry = journalEntries.find((item) => item.slug === slug);
  if (!entry) notFound();
  return <main>
    <article className="article">
      <header><Link href="/journal">← Journal</Link><span className="kicker">{entry.type} · {entry.read}</span><h1>{entry.title}</h1><p>{entry.summary}</p></header>
      <div className="article-body"><p className="lead">The best journeys do not begin with a list of places. They begin with attention: to the season of life, to the body, to the relationship between effort and rest, and to the person who will eventually come home.</p><h2>The wrong question creates the wrong itinerary</h2><p>Where do you want to go is useful only after something more important is understood. A destination cannot compensate for a rhythm that ignores the traveller. The work is to listen before choosing, then let the feeling become a design constraint.</p><blockquote>“Travel is the most direct path from who you are right now to who you are capable of becoming.”</blockquote><h2>Space is part of the design</h2><p>Luxury itineraries are often crowded because visible activity is easy to justify. Yet the moments that stay with people are frequently unplanned: the conversation after dinner, the walk that took longer than expected, the morning with nowhere else to be.</p><p>We protect those moments with the same care used to reserve a private table or arrange an expert guide. Empty time is not an omission. It is a material.</p><h2>Design for the person returning</h2><p>The final measure is not how much was seen. It is what changed, what became clearer, and what the traveller can still access when ordinary life resumes. That is why every Ryravel journey is designed backwards from The Return.</p></div>
    </article>
    <CTA />
  </main>;
}
