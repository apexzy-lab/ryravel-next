import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const assertions = [];
const check = (condition, message) => assertions.push({ condition, message });

check(!existsSync(join(root, "app", "journal")), "Journal route directory is removed");
check(!existsSync(join(root, "public", "journal")), "Journal asset directory is removed");

for (const file of ["app/components/SiteChrome.jsx", "app/data.js", "app/sitemap.js"]) {
  check(!read(file).includes("/journal"), `${file} contains no Journal route links`);
}

check(existsSync(join(root, "app", "robots.js")), "robots.txt route exists");
check(existsSync(join(root, "app", "sitemap.js")), "sitemap.xml route exists");
check(read("app/robots.js").includes("/curator-desk"), "Curator workspace is excluded from crawling");
check(read("app/layout.jsx").includes("organizationJsonLd"), "Organization structured data is present");
check(read("app/layout.jsx").includes("metadataBase"), "Absolute metadata base is configured");
check(read("app/request/layout.jsx").includes('path: "/request"'), "Request page has canonical metadata");
check(read("app/journeys/[slug]/page.jsx").includes("permanentRedirect"), "Legacy journey aliases use permanent redirects");
check(read("app/tours/stillness/page.jsx").includes("permanentRedirect"), "Legacy Stillness collection URL uses a permanent redirect");
check(!read("app/case-studies/she-stopped-apologizing-for-needing-to-stop/page.jsx").includes("You may not need a better vacation."), "Removed Amara sentence is absent");

const failures = assertions.filter(({ condition }) => !condition);
for (const { condition, message } of assertions) console.log(`${condition ? "PASS" : "FAIL"} ${message}`);
if (failures.length) process.exit(1);
