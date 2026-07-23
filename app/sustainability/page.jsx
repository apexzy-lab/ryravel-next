import { CTA, PageHero } from "../components/Blocks";

export const metadata = { title: "Sustainability" };

export default function SustainabilityPage() {
  return <main>
    <PageHero kicker="Our responsibility" title="Travel that gives" emphasis="more than it takes" copy="Luxury and responsibility are not opposing ideas. Done well, each makes the other more meaningful." />
    <section className="editorial paper-section"><div className="principle-grid">{[
      ["Local guides on every journey", "Destination knowledge, economic value and authorship remain with the people who live there."],
      ["Signature gifts by local craftspeople", "Objects carry provenance, skill and a direct relationship to place."],
      ["Depth over volume", "Longer stays and fewer transitions create richer encounters with a lighter operational footprint."],
      ["Partners held to account", "We favour properties with credible conservation, employment and community commitments."],
    ].map(([title, copy], index) => <article key={title}><span>— 0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="dark-editorial"><span className="kicker">Specific, not symbolic</span><h2>We do not sell virtue.<br /><em>We make better choices.</em></h2><p>We review routes, suppliers and the distribution of spend journey by journey. Where a better local option exists, that is where the work belongs.</p></section>
    <CTA />
  </main>;
}
