import { CTA, PageHero } from "../components/Blocks";

export const metadata = { title: "Private & bespoke" };

export default function PrivatePage() {
  return <main>
    <PageHero kicker="Private & bespoke" title="There is no package." emphasis="There is only yours." copy="A completely private journey, built from the first conversation around who you are and what this moment requires." />
    <section className="editorial paper-section"><span className="kicker">The private collection</span><h2>Privacy is not isolation.<br /><em>It is freedom from friction.</em></h2><p className="lead">Private villas, expert hosts, discreet transfers and access arranged before you know you need it. The itinerary is yours alone, but the deeper luxury is a journey that never asks you to manage it.</p><div className="property-grid">{["Zuri Zanzibar", "Tulia Zanzibar", "Meliá Zanzibar", "Singita Serengeti", "Amanjena Marrakech", "Six Senses Zil Pasyon"].map((name, index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><p>Selected for privacy, human service and a strong sense of place.</p></article>)}</div></section>
    <section className="dark-editorial"><span className="kicker">Built once</span><h2>No templates. No catalogue.<br /><em>No one else’s journey.</em></h2><p>Your curator holds the entire thread: dates, pace, access, dietary needs, celebrations, silence and the life waiting when you return.</p></section>
    <CTA title="Tell us what this journey needs to hold." />
  </main>;
}
