import EditorialServicePage from "../components/EditorialServicePage";
import { commercialServices } from "../commercialServices";
import { buildMetadata } from "../seo";

const service = commercialServices["luxury-corporate-retreats"];
const content = {
  serviceName: "Team Restoration Retreats", interest: "Corporate and Leadership Retreats",
  description: "Ryravel designs Team Restoration Retreats for leadership teams and small groups who need more than a meeting in a better hotel.",
  eyebrow: "For leadership teams", heading: ["A retreat where the hierarchy does not", "travel."],
  intro: "Ryravel designs Team Restoration Retreats for leadership teams and small groups who need more than a meeting in a better hotel. Shared context, considered pacing and moments without an agenda can change how people see, and work with, one another.",
  heroCta: "Begin a private brief", situationsEyebrow: "The starting point", situationsTitle: ["Organisational situations we design", "for."],
  situations: [
    ["The team has stopped seeing each other", "They share a floor, a channel and a reporting line, but honest conversation has become rare. The retreat makes room to reconnect beyond day-to-day roles."],
    ["Burnout at the leadership level", "The people carrying the most weight may be the least likely to ask for help. Adding another packed offsite will not give them room to pause together."],
    ["Post-merger or post-restructure", "New leaders, new dynamics and old loyalties do not automatically become one team. Shared experience can help people build a more human starting point."],
    ["A strategic inflection point", "The direction may be clear on paper, but the team still needs space to hear one another. We protect time for thoughtful conversation away from the usual meeting room."],
    ["A milestone that nobody felt", "An acquisition, launch or hard-won year deserves more than a dinner before the next deadline. We create space to recognise what the team has carried."],
    ["The founder needs the team back", "Growth brings process, and sometimes distance. A shared journey can reconnect the team with the purpose that first brought them together."],
  ],
  comparison: [
    { label: "A conventional offsite may", title: "Fill the calendar. Leave the pattern.", points: ["Pack the itinerary until reflection becomes another task", "Rely on exercises that feel performed rather than shared", "Move the same meetings to a nicer room", "Measure success by how much was covered", "Leave little thought for the return to work", "Add planning to an internal organiser's existing workload"] },
    { label: "A Ryravel retreat is designed to", title: "Make space. Carry it home.", points: ["Let the team's purpose shape the pace and programme", "Create space for genuine interaction without forced rituals", "Choose a place that supports the brief", "Make room for rest and useful conversations", "Consider The Return before and after travel", "Give the team one curator team to coordinate the journey"] },
  ],
  pillarsEyebrow: "What we handle", pillarsTitle: ["You bring the team. We bring", "everything else."],
  pillars: [
    ["Purpose clarification", "Before choosing a destination, we clarify whether the team needs to reward, reconnect, reset or open a strategic conversation."],
    ["The emotional architecture", "Experiences are sequenced around the team's needs. Time without an agenda is an intentional part of the design."],
    ["All logistics, one thread", "Rooming, transfers, privacy, dietary needs and changes are coordinated through one curator team."],
    ["Private-use stays and spaces", "Where the brief and availability allow, we source exclusive-use properties, private dining and room for both togetherness and solitude."],
    ["Shared experiences without theatre", "Cultural encounters and time in nature can create shared memory without relying on forced interaction."],
    ["The Return integration", "We plan for what happens after the team lands home, including a check-in around day 30, so the experience does not end at departure."],
  ],
  responsibilities: [
    { label: "For leadership", title: "Give the team permission to be present.", points: ["Tell us what the team actually needs, beyond the board-deck version", "Take part as a person, not only as a facilitator", "Protect the retreat from becoming a working session with better scenery", "Agree how urgent work will be covered so people can step away"] },
    { label: "For the internal organiser", title: "Bring context. We will carry the planning.", points: ["Share group size, dates, budget direction and relevant constraints", "Connect us with a decision-maker and the people who approve travel", "Tell us what worked, or did not work, last time", "Help carry the useful parts of the retreat back into everyday work"] },
  ],
  processTitle: ["From first conversation to", "The Return."], process: [
    ["Begin the conversation", "A coach, peer or direct enquiry brings you here. Tell us what you recognise in your team."],
    ["Share the brief", "Send your dates, group size, budget direction and one honest sentence about what the team needs."],
    ["Private conversation", "A curator listens and clarifies the purpose before recommending a place or programme."],
    ["Bespoke recommendation", "We propose a journey shaped by the team's circumstances, not a standard package."],
    ["Proposal and booking", "You receive the itinerary, investment and inclusions for approval. We then coordinate the journey and its return."],
  ],
  faq: service.faq, ctaCopy: "Share your dates, group size, budget direction and one honest sentence about what your team needs. We will confirm the next step after reviewing your brief.", ctaLabel: "Request a diagnostic", secondaryHref: "/journeys", secondaryLabel: "Explore our journeys",
};
export const metadata = buildMetadata({ title: "Corporate and Leadership Retreats | Team Restoration", description: content.description, path: `/${service.slug}`, keywords: service.keywords });
export default function Page() { return <EditorialServicePage content={content} service={service} />; }
