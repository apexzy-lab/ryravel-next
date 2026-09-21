import { CTA, PageHero } from "../components/Blocks";
import { absoluteUrl, buildMetadata } from "../seo";

export const metadata = buildMetadata({ title: "Private & Bespoke Travel Worldwide", description: "A completely private luxury journey anywhere in the world, shaped around your dates, pace, interests and emotional intent.", path: "/private-bespoke" });

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${absoluteUrl("/private-bespoke")}#service`,
  name: "Ryravel private and bespoke luxury travel planning",
  serviceType: "Bespoke luxury journey design",
  description: metadata.description,
  url: absoluteUrl("/private-bespoke"),
  provider: { "@id": "https://ryravel.com/#organization" },
  areaServed: { "@type": "Place", name: "Worldwide" },
  audience: { "@type": "Audience", audienceType: "International luxury travellers, couples, families and private groups" },
};

export default function PrivatePage() {
  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    <PageHero kicker="Private & bespoke · worldwide" title="There is no package." emphasis="There is only yours." copy="A completely private journey anywhere in the world, built from the first conversation around who you are and what this moment requires." />
    <section className="editorial paper-section"><span className="kicker">The world, considered</span><h2>Privacy is not isolation.<br /><em>It is freedom from friction.</em></h2><p className="lead">From remote wilderness and private islands to cultural capitals and quiet countryside, we choose the place only after we understand the purpose. Private stays, expert hosts, discreet transfers and access are arranged before you know you need them.</p><div className="property-grid">{["Private islands", "Remote wilderness", "Cultural capitals", "Mountain retreats", "Coastal hideaways", "Country estates"].map((name, index) => <article key={name}><span>0{index + 1}</span><h3>{name}</h3><p>Selected worldwide for privacy, human service and a strong sense of place.</p></article>)}</div></section>
    <section className="dark-editorial"><span className="kicker">Built once</span><h2>No templates. No catalogue.<br /><em>No one else’s journey.</em></h2><p>Your curator holds the entire thread: dates, pace, access, dietary needs, celebrations, silence and the life waiting when you return.</p></section>
    <CTA title="Tell us what this journey needs to hold." />
  </main>;
}
