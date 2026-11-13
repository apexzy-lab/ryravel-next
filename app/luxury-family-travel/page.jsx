import EditorialServicePage from "../components/EditorialServicePage";
import { commercialServices } from "../commercialServices";
import { buildMetadata } from "../seo";

const service = commercialServices["luxury-family-travel"];
const content = {
  serviceName: "Luxury family travel", interest: "Luxury Family Travel",
  description: "Luxury family journeys designed around the actual people travelling. Ryravel handles the rhythm, rooms, transfers, meals and experiences so no one has to manage everyone's holiday.",
  eyebrow: "For families, together", heading: ["Luxury family travel that asks less of the family", "organiser."],
  intro: "A family journey should not move like an adult itinerary with children added later. Ryravel designs the rhythm, rooms, transfers, meals and experiences around the actual people travelling, so one person is not left managing everyone else's holiday.",
  heroCta: "Plan a family journey", situationsEyebrow: "The real brief", situationsTitle: ["The situations families come to us", "with."],
  situationsLead: "Not a generic list of family activities. The practical and emotional needs that determine whether everyone can travel well together.",
  situations: [
    ["A big family with different opinions", "Parents, children and grandparents may need different pace, mobility support, rooming and meals. We plan for those differences, with shared moments and space apart."],
    ["Teenagers who are hard to impress", "We look for hands-on, locally grounded experiences that suit their interests and age, from conservation encounters to time on the water where appropriate."],
    ["One parent does all the planning", "Private logistics and clear daily direction remove the invisible work that often follows one person on holiday. The plan includes unstructured time, too."],
    ["Togetherness and time apart", "Shared experiences can coexist with protected adult time, different activities for different ages and room for the day to change."],
    ["Restless children and long transfers", "We consider transfer lengths, breaks, age-appropriate equipment and backup plans before a route is finalised."],
    ["A holiday with room to breathe", "Slow mornings and open afternoons are part of the design. Not every memorable moment needs a booking or a schedule."],
  ],
  pillarsEyebrow: "Our approach", pillarsTitle: ["The place follows the purpose. The planning follows", "you."],
  pillarsLead: "Three principles guide every family journey we design.",
  pillars: [
    ["Every age considered", "Energy, attention, mobility, sleep and food shape the route before a destination is finalised. A toddler, a ten-year-old and a grandparent need a different design from a family of teenagers."],
    ["Fewer family decisions", "Meals, transfers, timing and likely changes are thought through in advance. You know the plan without having to operate it."],
    ["Space to be together", "We protect unstructured time instead of filling every hour. A slow breakfast or unplanned walk may become the part everyone remembers."],
  ],
  arrangements: [
    ["Connected rooms, suites and private villas", "Properties chosen for how they room families, not only how they photograph."],
    ["Private transfers with age-appropriate logistics", "Car seats where needed, considered timing, breaks and routes suited to the group."],
    ["Guides suited to the family dynamic", "People who can engage children and teenagers while still giving adults a meaningful experience."],
    ["Flexible meals and dietary planning", "Allergies, dietary requirements, early dinners and differing preferences considered in advance."],
    ["Milestones and multigenerational celebrations", "Birthdays, anniversaries and reunions designed around the people at their centre."],
    ["24/7 support while travelling", "A dedicated Ryravel support contact for the length of your journey."],
  ],
  processTitle: ["From first conversation to", "departure."], process: [
    ["The brief", "Tell us who is travelling, their ages, what worked before and what this journey needs to hold."],
    ["The design", "We propose properties, pacing, experiences and meals for your actual family. You review and approve before booking."],
    ["The booking", "We confirm availability and coordinate the agreed elements in one clear itinerary. Flights can be quoted separately where requested."],
    ["The travel", "We prepare you before departure, support you during the journey and check in after your return."],
  ],
  faq: [
    ["Can Ryravel plan for several generations?", "Yes. We account for different mobility, rooming, dietary and attention needs, with separate experiences where helpful and shared time where it matters."],
    ["Can children's activities and adult time coexist?", "Yes. We design a rhythm with shared experiences, protected adult time and flexibility for the day to change."],
    ["Do you arrange private transfers and guides?", "Yes, where they serve the journey. Exact arrangements depend on the destination, group size, dates and availability, and are confirmed in your proposal."],
    ["How far ahead should a family enquire?", "Earlier is best for school holidays, milestone trips and larger families. Share approximate dates and we will advise what is realistic."],
    ["What about dietary restrictions or medical needs?", "Tell us during the brief. We coordinate dietary requirements with partners and discuss practical access needs; travellers should confirm medical advice and appropriate insurance with qualified providers."],
    ["What destinations do you cover?", "Our published journeys focus on Africa. We also consider other destinations by request where we can support the brief responsibly."],
  ],
  ctaCopy: "Begin with your dates, who is travelling and one honest answer about what you need from the journey. Our team will confirm the next step after reviewing your brief.",
  ctaLabel: "Start the conversation", secondaryHref: "tel:+17605140361", secondaryLabel: "Call +1 760 514 0361",
};
export const metadata = buildMetadata({ title: "Luxury Family Travel Designed Around Your Family", description: content.description, path: `/${service.slug}`, keywords: service.keywords });
export default function Page() { return <EditorialServicePage content={content} service={service} />; }
