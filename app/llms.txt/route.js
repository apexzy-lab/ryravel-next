import { passageArticles } from "../passage/articles";
import { absoluteUrl } from "../seo";

export function GET() {
  const lines = [
    "# Ryravel",
    "",
    "Ryravel designs private, feeling-led journeys with a current focus on published journeys across Africa. Passage is its public essay collection.",
    "",
    "## Official pages",
    `- [Ryravel](${absoluteUrl("/")})`,
    `- [About Ryravel and Maryangel Ajuzieogu](${absoluteUrl("/about")})`,
    `- [Passage publication](${absoluteUrl("/passage")})`,
    `- [Journeys](${absoluteUrl("/journeys")})`,
    `- [Contact and journey requests](${absoluteUrl("/request")})`,
    "",
    "## Passage articles",
    ...passageArticles.map((article) => `- [${article.title}](${absoluteUrl(article.path)})`),
    "",
    "These essays are travel and workplace commentary, not medical diagnosis or treatment advice. Consult qualified professionals for personal health concerns.",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
