import assert from "node:assert/strict";
import { candidateSlots, slotOverlapsBusy, validTimeZone } from "../app/lib/talk-slots.js";

const now = Date.parse("2026-10-21T12:00:00Z");
const lagos = candidateSlots("2026-10-27", "Africa/Lagos", "Africa/Lagos", now);
assert.equal(lagos.length, 14, "Weekday should show half-hour slots from 10:00 through 16:30 host time");
assert.equal(lagos[0].start, "2026-10-27T09:00:00.000Z");
assert.equal(lagos.at(-1).start, "2026-10-27T15:30:00.000Z");
assert.equal(candidateSlots("2026-10-25", "Africa/Lagos", "Africa/Lagos", now).length, 0, "No Sunday calls");
assert.equal(candidateSlots("2026-11-02", "America/New_York", "Africa/Lagos", now)[0].start, "2026-11-02T09:00:00.000Z", "US DST should not change host slots");
assert.equal(candidateSlots("2026-10-27", "Invalid/Zone", "Africa/Lagos", now).length, 0);
assert.equal(candidateSlots("2026-02-30", "Africa/Lagos", "Africa/Lagos", now).length, 0);
assert.equal(candidateSlots("2026-10-27", "Africa/Lagos", "Africa/Lagos", Date.parse("2026-10-27T08:30:00Z")).length, 0, "Require 24 hours' notice");
assert.equal(validTimeZone("America/Los_Angeles"), true);
assert.equal(validTimeZone("not-a-zone"), false);
assert.equal(slotOverlapsBusy(lagos[0], [{ start: "2026-10-27T09:30:00.000Z", end: "2026-10-27T10:00:00.000Z" }]), true, "Ten-minute buffer blocks adjacent calls");
assert.equal(slotOverlapsBusy(lagos[0], [{ start: "2026-10-27T10:00:00.000Z", end: "2026-10-27T10:30:00.000Z" }]), false);
console.log("Talk slot and time-zone tests passed.");
