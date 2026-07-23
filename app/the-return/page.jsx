import { CTA, PageHero } from "../components/Blocks";

export const metadata = { title: "The Return" };

const stories = [
  ["Running on empty. Could not remember the last time I felt present.", "I slept. Really slept. For the first time in two years.", "Sarah K. · Yakushima Forest"],
  ["Successful, but somehow further from each other than when we started.", "We talked on that trip. Really talked.", "Marcus & Diane L. · Amalfi Slow Journey"],
  ["Itching for something I could not name.", "I found the edge of what I thought I could do.", "Olu F. · Patagonia Edge"],
];

export default function ReturnPage() {
  return <main>
    <PageHero kicker="The Return" title="The journey ends." emphasis="The change does not." copy="We start with the end, then design everything else." tone="red" />
    <section className="editorial paper-section"><span className="kicker">Our defining idea</span><h2>You cannot photograph it.<br /><em>You cannot rate it.</em></h2><p className="lead">The Return is our name for what happens when a journey is designed with enough intention that it changes the life you come back to—not just the days you were away.</p></section>
    <section className="return-stories paper-section">{stories.map(([arrived, returned, person]) => <article key={person}><span>They arrived</span><h3>{arrived}</h3><span>They returned</span><h3>{returned}</h3><small>{person}</small></article>)}</section>
    <section className="dark-editorial"><span className="kicker">Designed backwards</span><h2>The final day is not checkout.<br /><em>It is the beginning of The Return.</em></h2><p>A sealed letter, a locally made object, an image delivered after you arrive home: each becomes an anchor to the person the journey revealed.</p></section>
    <CTA />
  </main>;
}
