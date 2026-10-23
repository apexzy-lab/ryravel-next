import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { partnerAccessCookie, partnerSlug, partnerToken, readPartnerCookie, tokenHash } from "../app/lib/partners.js";

assert.equal(partnerSlug(" Coach-Jane "), "coach-jane");
for (const invalid of ["", "../admin", "coach?utm=x", "-coach", "coach-", "x".repeat(49)]) assert.equal(partnerSlug(invalid), "");
const first = partnerToken();
const second = partnerToken();
assert.match(first, /^[a-f0-9]{64}$/);
assert.notEqual(first, second);
assert.notEqual(await tokenHash(first), first);
assert.equal((await tokenHash(first)).length, 64);
assert.match(partnerAccessCookie(first, true), /HttpOnly; SameSite=Lax; Max-Age=2592000; Secure/);
assert.equal(readPartnerCookie(new Request("https://ryravel.com/partners/portal", { headers: { cookie: `other=x; ryravel_partner_access=${first}` } })), first);
assert.equal(readPartnerCookie(new Request("https://ryravel.com/partners/portal", { headers: { cookie: "ryravel_partner_access=bad" } })), "");

const migration = readFileSync(new URL("../drizzle/0007_referral_partners.sql", import.meta.url), "utf8");
assert.match(migration, /CREATE TABLE IF NOT EXISTS referral_partners/);
assert.match(migration, /ALTER TABLE journey_enquiries ADD COLUMN partner_slug/);
const enquiry = readFileSync(new URL("../app/api/enquiries/route.js", import.meta.url), "utf8");
assert.match(enquiry, /SELECT slug FROM referral_partners WHERE slug = \? AND active = 1/);
assert.match(enquiry, /partner_slug\s*\n\s*\) VALUES/);
const portal = readFileSync(new URL("../app/api/partners/me/route.js", import.meta.url), "utf8");
assert.doesNotMatch(portal, /SELECT[^;]*\b(email|phone|message|budget)\b/i);
const delivery = readFileSync(new URL("../app/lib/delivery-providers.js", import.meta.url), "utf8");
assert.match(delivery, /partner_slug: partnerSlug \|\| null/);
console.log("Partner link, access, attribution, and report boundaries pass.");
