import worker from "../legacy-policies/worker.js";

for (const [path, expected] of [
  ["/", "https://ryravel.com/policies"],
  ["/docs/po/", "https://ryravel.com/policies"],
  ["/docs/po/par/trp/", "https://ryravel.com/cancellations"],
]) {
  const response = await worker.fetch(new Request(`https://policies.ryravel.com${path}`));
  if (response.status !== 301 || response.headers.get("location") !== expected) throw new Error(`Incorrect redirect: ${path}`);
}

const retired = await worker.fetch(new Request("https://policies.ryravel.com/docs/sample-user-guide/sample-guide/language-translations/"));
if (retired.status !== 410 || retired.headers.get("x-robots-tag") !== "noindex") throw new Error("Unrelated retired content must be removed from search");

const post = await worker.fetch(new Request("https://policies.ryravel.com/docs/po/", { method: "POST" }));
if (post.status !== 405) throw new Error("Retired hostname must not accept form submissions");

console.log("PASS retired policy URLs redirect to current terms; unrelated content returns 410");
