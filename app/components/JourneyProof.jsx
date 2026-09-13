import Link from "next/link";
import { caseStudyFor } from "../case-studies/caseStudies";

const proofByArc = {
  exhausted: "she-stopped-apologizing-for-needing-to-stop",
  romantic: "family-journey-egypt-morocco",
  adventurous: "restless-founder-doha-qatar",
  social: "team-journey-egypt-morocco",
  stillness: "first-restorative-trip-kenya-egypt",
  disconnected: "family-journey-egypt-morocco",
};

export default function JourneyProof({ arc = "exhausted" }) {
  const study = caseStudyFor(proofByArc[arc] || proofByArc.exhausted);
  if (!study) return null;

  return (
    <section className={`journey-proof cs-tone-${study.theme}`} aria-labelledby={`journey-proof-${arc}`}>
      <div className="journey-proof-label">
        <span>What remained after the journey</span>
        <small>Case study {study.number} · {study.destination}</small>
      </div>
      <div className="journey-proof-story">
        <p className="journey-proof-arc">{study.arc}</p>
        <h2 id={`journey-proof-${arc}`}>{study.headline}</h2>
        <blockquote>“{study.quote}”</blockquote>
        <p>{study.intro}</p>
        <Link href={`/case-studies/${study.slug}`}>Read the full story <span>→</span></Link>
      </div>
    </section>
  );
}
