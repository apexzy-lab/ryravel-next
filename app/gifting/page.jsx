import { CTA, PageHero } from "../components/Blocks";

export const metadata = { title: "Gifting" };

export default function GiftingPage() {
  return <main>
    <PageHero kicker="Ryravel gifting" title="The most generous thing" emphasis="you can give someone" copy="Not another object. A feeling, a story and a version of themselves they have not met yet." tone="red" />
    <section className="editorial paper-section"><div className="gift-grid"><article><span>01</span><h2>A complete bespoke journey</h2><p>Designed for the person you love, with dates and direction shaped privately with their curator.</p></article><article><span>02</span><h2>One signature experience</h2><p>A standalone private dinner, dawn ritual, portrait or cultural encounter placed inside an existing trip.</p></article><article><span>03</span><h2>The Ryravel gift note</h2><p>A hand-finished presentation, written personally and delivered with complete discretion.</p></article></div></section>
    <section className="dark-editorial"><span className="kicker">How it works</span><h2>You tell us about them.<br /><em>We listen for the feeling.</em></h2><p>We can keep the gift entirely secret or invite the recipient into the design after the reveal. Value, pace and presentation remain private.</p></section>
    <CTA title="Give them somewhere worthy of who they are." copy="Speak with a curator about the person, the moment and what you hope the gift will make possible." />
  </main>;
}
