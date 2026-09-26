import Link from "next/link";
import { buildMetadata } from "../seo";
import styles from "./return.module.css";

export const metadata = buildMetadata({
  title: "The Return: Our Travel Philosophy",
  description: "The journey ends. The change does not. Discover how Ryravel designs bespoke luxury travel around who you become when you return.",
  path: "/the-return",
});

export default function ReturnPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="return-title">
        <img className={styles.heroImage} src="/images/the-return-river.jpg" alt="A river winding through a vast green landscape beneath golden evening light" width="1170" height="1463" fetchPriority="high" />
        <div className={styles.heroShade} />
        <span className={styles.ghost} aria-hidden="true">Return</span>
        <div className={styles.heroInner}>
          <h1 id="return-title">The journey ends.<br /><em>The change does not.</em></h1>
          <div className={styles.heroFoot}>
            <p>The Return is not a feeling you get on the trip.<br /><em>It is who you are when you come back.</em></p>
            <a href="#what-remains" className={styles.scroll}>Scroll</a>
          </div>
        </div>
      </section>

      <section className={styles.opening} id="what-remains">
        <div>
          <p>You know the version of yourself that exists at the end of the second day. Not the first. The second, when something in you begins to slow, when you sit at a table long after the food is gone and there is nowhere you need to be. That self is a person you recognise. <em>You have missed them.</em> The question is why they almost never make it home.</p>
        </div>
      </section>

      <aside className={styles.pull} aria-label="Ryravel design principle">
        <div>
          <span aria-hidden="true">“</span>
          <p>Most trips are designed around what you will see. Ryravel is designed around <em>who you will be</em> when you cannot see anything anymore.</p>
        </div>
      </aside>

      <section className={styles.darkSpread}>
        <div className={styles.darkStatement}>
          <h2>Stillness is not<br />the absence of noise.<br />It is <span>the presence</span><br /><span>of yourself.</span></h2>
        </div>
        <div className={styles.darkCopy}>
          <p>What landscape does, when it is vast enough and old enough and indifferent enough to your presence, is remove the exit. There is nowhere else to be. And in the being there, something falls away. The performance. The urgency. <em>The noise that only becomes audible once the louder noise stops.</em></p>
          <p>We design for this condition. Not the view, though the views are extraordinary. The condition itself. The quality of presence a person carries home still holding.</p>
          <p>And then we stay. Through the week after, when the inbox resumes and the version of you that arrived on the second day is asked to survive a Tuesday morning. <em>That is the moment most trips lose what they gave.</em> We design against it.</p>
        </div>
      </section>

      <section className={styles.witnessed} aria-label="What travellers carried home">
        <div>
          <p>The person who came back and slept. Really slept, for the first time in two years. They did not know how much they had needed it until the absence of it was finally over. <em>They said they had forgotten what their own body felt like at rest.</em></p>
          <p>The person who had been circling a decision for eight months. They did not arrive at it by thinking. They arrived at it by stopping thinking long enough for what they already knew to become audible. They came home and made the call within three days. They did not call it clarity. <em>They called it quiet.</em></p>
          <p>The couple who came back having chosen each other again. Not out of routine. Out of the specific certainty that comes from having been two people, in a place that had nothing to do with their ordinary life, who looked at each other <em>and stayed.</em></p>
          <p>The person who came back smaller, and was not diminished by it. Quieter and more accurate. They said they felt less like a version of themselves and more like <em>the thing the version had been standing in front of.</em></p>
        </div>
      </section>

      <section className={styles.close}>
        <div className={styles.closeStatement}>
          <h2>You will come<br />back <em>different.</em></h2>
          <p>That is the only promise we make.</p>
        </div>
        <div className={styles.closeActions}>
          <Link className="button button-red" href="/request">Begin your return</Link>
          <Link className={styles.secondaryButton} href="/journeys">Explore journeys</Link>
          <p>Every journey is designed directly by the founder. One conversation before anything is arranged.</p>
        </div>
      </section>
    </main>
  );
}
