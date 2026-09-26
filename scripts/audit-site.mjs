const base = process.env.RYRAVEL_BASE_URL || 'https://ryravel.com';
const origin = new URL(base).origin;
const pages = new Map();
const issues = [];
async function get(path) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(30000) });
  return { status: response.status, html: await response.text(), url: response.url };
}
const sitemap = await get('/sitemap.xml');
const paths = [...new Set([...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname).concat(['/request', '/gifting', '/reviews', '/tours/stillness']))];
async function batch(items, fn) { for (let i=0;i<items.length;i+=5) await Promise.all(items.slice(i,i+5).map(fn)); }
await batch(paths, async path => {
  try { const page = await get(path); pages.set(path,page); if(page.status!==200) issues.push({type:'page-status',path,status:page.status}); }
  catch(error) { issues.push({type:'fetch',path,error:error.message}); }
});
const links = new Map(), assets = new Set(), titles = new Map();
for (const [path,page] of pages) {
  const html = page.html.replace(/<script[\s\S]*?<\/script>/gi,'');
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  if(!title) issues.push({type:'missing-title',path});
  else { const prior=titles.get(title); if(prior && prior!==path && path!='/tours/stillness') issues.push({type:'duplicate-title',path,prior}); titles.set(title,path); }
  if(!/<meta[^>]*name="description"/i.test(html)) issues.push({type:'missing-description',path});
  const h1s=(html.match(/<h1[\s>]/g)||[]).length;
  if(h1s!==1) issues.push({type:'h1-count',path,count:h1s});
  for(const m of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const url=new URL(m[1].replaceAll('&amp;','&'),new URL(path,base));
    if(url.origin!==origin || url.pathname.startsWith('/api/') || url.pathname.startsWith('/cdn-cgi/')) continue;
    const key=url.pathname+url.hash; if(!links.has(key)) links.set(key,new Set()); links.get(key).add(path);
  }
  for(const m of html.matchAll(/<(?:img|source)\b[^>]*src="([^"]+)"/g)) if(m[1].startsWith('/')) assets.add(m[1]);
}
await batch([...links],async ([key,sources])=>{
  const url=new URL(key,base);
  let target=pages.get(url.pathname);
  if(!target) { try{ target=await get(url.pathname); pages.set(url.pathname,target); }catch(error){issues.push({type:'link-fetch',key,error:error.message});return;} }
  if(target.status!==200) issues.push({type:'broken-link',key,status:target.status,sources:[...sources]});
  if(url.hash && target.status===200) {
    const id=decodeURIComponent(url.hash.slice(1));
    if(!target.html.includes('id="'+id+'"')) issues.push({type:'missing-anchor',key,sources:[...sources]});
  }
});
await batch([...assets],async path=>{try{ const response=await fetch(new URL(path,base),{signal:AbortSignal.timeout(30000)}); if(!response.ok)issues.push({type:'asset',path,status:response.status}); await response.body?.cancel(); }catch(error){issues.push({type:'asset-fetch',path,error:error.message});}});
console.log(JSON.stringify({base,pages:pages.size,links:links.size,assets:assets.size,issues},null,2));
if(issues.length)process.exitCode=1;
