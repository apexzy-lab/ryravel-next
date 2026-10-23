import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const dashCharacters = [String.fromCodePoint(0x2014), String.fromCodePoint(0x2015)];
const textExtensions = /\.(?:css|html|js|jsx|json|md|ts|tsx|txt|xml)$/i;
const violations = [];

function inspectDirectory(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) inspectDirectory(path);
    else if (entry.isFile() && textExtensions.test(entry.name)) {
      const copy = readFileSync(path, "utf8");
      if (dashCharacters.some((dash) => copy.includes(dash))) {
        violations.push(relative(root, path));
      }
    }
  }
}

for (const directory of ["app", "public"]) inspectDirectory(join(root, directory));

if (violations.length) {
  console.error(`Em dash punctuation remains in: ${violations.join(", ")}`);
  process.exitCode = 1;
} else {
  console.log("Copy punctuation check passed: no em dashes in site source.");
}
