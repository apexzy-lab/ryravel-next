const DURATION_MINUTES = 25;
const SLOT_MINUTES = 30;
const BUFFER_MINUTES = 10;
const DAY_MS = 86400000;
const formatterCache = new Map();

function zonedParts(instant, timeZone) {
  let formatter = formatterCache.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
    formatterCache.set(timeZone, formatter);
  }
  return Object.fromEntries(formatter.formatToParts(instant).filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
}

export function validTimeZone(timeZone) {
  if (typeof timeZone !== "string" || timeZone.length > 80) return false;
  try { new Intl.DateTimeFormat("en-US", { timeZone }); return true; } catch { return false; }
}

export function candidateSlots(date, guestTimeZone, hostTimeZone, now = Date.now()) {
  if (!/^20\d{2}-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])$/.test(date) || !validTimeZone(guestTimeZone) || !validTimeZone(hostTimeZone)) return [];
  const anchor = Date.parse(`${date}T00:00:00Z`);
  if (!Number.isFinite(anchor) || new Date(anchor).toISOString().slice(0, 10) !== date) return [];
  const slots = [];
  for (let start = anchor - 18 * 3600000; start < anchor + 42 * 3600000; start += SLOT_MINUTES * 60000) {
    if (start < now + 24 * 3600000 || start > now + 45 * DAY_MS) continue;
    const guest = zonedParts(start, guestTimeZone);
    if (`${guest.year}-${guest.month}-${guest.day}` !== date) continue;
    const host = zonedParts(start, hostTimeZone);
    if (["Sat", "Sun"].includes(host.weekday)) continue;
    const hour = Number(host.hour), minute = Number(host.minute);
    if (hour < 10 || hour > 16 || (hour === 16 && minute > 30) || ![0, 30].includes(minute)) continue;
    slots.push({ start: new Date(start).toISOString(), end: new Date(start + DURATION_MINUTES * 60000).toISOString() });
  }
  return slots;
}

export function slotOverlapsBusy(slot, busy) {
  const from = Date.parse(slot.start) - BUFFER_MINUTES * 60000;
  const to = Date.parse(slot.end) + BUFFER_MINUTES * 60000;
  return busy.some((interval) => Date.parse(interval.start) < to && Date.parse(interval.end) > from);
}

export { BUFFER_MINUTES };
