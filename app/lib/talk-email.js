const SENDER = "curator@ryravel.com";

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

function utcCalendarTime(value) {
  return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function base64(value) {
  return btoa(Array.from(new TextEncoder().encode(value), (byte) => String.fromCharCode(byte)).join(""));
}

export function buildTalkConfirmation({ name, email, reference, start, end, timeZone, meetUrl }) {
  if (!/^https:\/\/meet\.google\.com\/[a-z0-9-]+$/.test(meetUrl || "")) throw new Error("A valid Google Meet link is required");
  const when = new Intl.DateTimeFormat("en-US", { timeZone, weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(new Date(start));
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Ryravel//Curator Call//EN", "CALSCALE:GREGORIAN", "METHOD:REQUEST",
    "BEGIN:VEVENT", `UID:${reference}@ryravel.com`, `DTSTAMP:${utcCalendarTime(new Date())}`,
    `DTSTART:${utcCalendarTime(start)}`, `DTEND:${utcCalendarTime(end)}`,
    "SUMMARY:Ryravel private curator conversation", `DESCRIPTION:Join on Google Meet: ${meetUrl}\\nNeed to change your call? Email curator@ryravel.com with your reference ${reference}.`,
    `LOCATION:${meetUrl}`, `URL:${meetUrl}`, `ORGANIZER;CN=Ryravel Curator:mailto:${SENDER}`,
    "STATUS:CONFIRMED", "SEQUENCE:0", "END:VEVENT", "END:VCALENDAR", "",
  ].join("\r\n");
  const text = `Hello ${name},\n\nYour private Ryravel curator conversation is confirmed for ${when} (${timeZone}).\n\nJoin on Google Meet: ${meetUrl}\n\nA calendar file is attached. Add it to your calendar if you would like a reminder.\n\nNeed to change your call? Reply to this email with reference ${reference}.\n\nRyravel Curator\n${SENDER}`;
  const html = `<!doctype html><html><body style="margin:0;background:#f2eee7;font-family:Arial,sans-serif;color:#17140f"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f2eee7"><tr><td style="padding:32px 16px"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:auto;background:#fff"><tr><td style="padding:30px 38px;background:#0b0a08;color:#fff"><div style="color:#f0443e;font-size:12px;letter-spacing:4px;font-weight:700">RYRAVEL</div><h1 style="font-family:Georgia,serif;font-size:34px;font-weight:normal;line-height:1.12;margin:28px 0 0">Your conversation is confirmed.</h1></td></tr><tr><td style="padding:38px"><p style="font-family:Georgia,serif;font-size:23px">Hello ${escapeHtml(name)},</p><p style="line-height:1.7;color:#665e54">We look forward to speaking with you. Your 25-minute private conversation is reserved for:</p><p style="font-size:20px;line-height:1.4"><strong>${escapeHtml(when)}</strong><br><span style="color:#665e54;font-size:14px">${escapeHtml(timeZone)}</span></p><p><a href="${meetUrl}" style="display:inline-block;background:#f0443e;color:#fff;text-decoration:none;padding:15px 22px;font-size:13px;font-weight:700">JOIN YOUR GOOGLE MEET →</a></p><p style="color:#665e54;line-height:1.7">A calendar file is attached if you would like to add the call to your calendar. Need to make a change? Reply to this email with reference <strong>${escapeHtml(reference)}</strong>.</p><p style="margin-top:32px;font-size:13px;color:#887d70">Ryravel Curator · <a href="mailto:${SENDER}" style="color:#f0443e">${SENDER}</a></p></td></tr></table></td></tr></table></body></html>`;
  return { from: `Ryravel Curator <${SENDER}>`, to: [email], reply_to: SENDER, subject: `Your Ryravel conversation is confirmed · ${reference}`, text, html, attachments: [{ filename: "ryravel-curator-call.ics", content: base64(ics) }] };
}
