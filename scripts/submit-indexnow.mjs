const host = "ryravel.com";
const key = "626d871d-6631-466f-ae78-7efafa06cb1e";
const keyLocation = `https://${host}/${key}.txt`;
const sitemapResponse = await fetch(`https://${host}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Could not load sitemap: ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const urlList = [...sitemap.matchAll(/<loc>(https:\/\/ryravel\.com[^<]+)<\/loc>/g)].map((match) => match[1]);
if (!urlList.length) throw new Error("The sitemap did not contain any Ryravel URLs.");

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (!response.ok && response.status !== 202) throw new Error(`IndexNow rejected the submission: ${response.status}`);
console.log(`IndexNow accepted ${urlList.length} Ryravel URLs (${response.status}).`);
