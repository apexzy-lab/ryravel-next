import { CTA, PageHero } from "../components/Blocks";

export const metadata = { title: "Traveller reviews" };

const reviews = [
  ["They asked how I had been. That changed everything about the journey.", "Amara O.", "Kyoto & Yakushima"],
  ["I came back lighter. I do not know how else to describe it.", "James R.", "Patagonia Edge"],
  ["Precisely right for who we were at that exact moment.", "Ngozi & Emeka A.", "Amalfi & Puglia"],
  ["The silence was not empty. It was the first thing that had listened to me in years.", "Sarah K.", "Zanzibar"],
  ["We came home different people, to the same life.", "Marcus & Diane L.", "Romantic Zanzibar"],
  ["It was a revision of who I thought I was.", "Olu F.", "Kilimanjaro & Serengeti"],
];

export default function ReviewsPage() {
  return <main><PageHero kicker="In their own words" title="Journeys that stay" emphasis="with you" copy="The measure of a journey is what remains after the photographs stop." /><section className="reviews-page paper-section">{reviews.map(([quote, person, trip]) => <article key={person}><span>★★★★★</span><blockquote>“{quote}”</blockquote><b>{person}</b><small>{trip}</small></article>)}</section><CTA /></main>;
}
