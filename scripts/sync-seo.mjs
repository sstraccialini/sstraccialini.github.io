/** Run after editing projects-data.js: node scripts/sync-seo.mjs [--check]
 * Keeps crawlable project summaries and metadata in the shipped HTML.
 * Preserves sitemap dates when a page's generated content is unchanged.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import vm from 'node:vm';
const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => readFileSync(resolve(root, file), 'utf8');
const check = process.argv.includes('--check');
const origin = 'https://sstraccialini.github.io';
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' }).format(new Date());
const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const context = vm.createContext({});
vm.runInContext(read('js/projects-data.js') + '\nthis.projects = PROJECTS_DATA;', context);
const changed = new Set();
function save(file, html) {
  if (html === read(file)) return;
  changed.add(file);
  if (!check) writeFileSync(resolve(root, file), html);
}
function fill(html, tag, className, content) {
  const pattern = new RegExp(`(<${tag} class="${className}"[^>]*>)[\\s\\S]*?(</${tag}>)`);
  if (!pattern.test(html)) throw new Error(`Missing ${className}`);
  return html.replace(pattern, (_, open, close) => open + content + close);
}
function meta(html, key, value, property = false) {
  const tag = `<meta ${property ? 'property' : 'name'}="${key}" content="${escape(value)}">`;
  const pattern = new RegExp(`<meta (?:name|property)="${key}"[^>]*>`);
  return pattern.test(html) ? html.replace(pattern, () => tag) : html.replace('</head>', `  ${tag}\n</head>`);
}
const files = ['index.html', 'about.html', 'projects.html', 'contact.html'];
for (const project of context.projects) {
  const file = project.links.page;
  files.push(file);
  let html = read(file);
  html = fill(html, 'h1', 'project-header__title', escape(project.title));
  html = fill(html, 'p', 'project-header__description', escape(project.description));
  html = fill(html, 'div', 'project-header__tags', project.tags.map(tag => `<span class="tag">${escape(tag)}</span>`).join(' '));
  const actions = Object.entries({code:'View Code', report:'Read Report', link:'Visit Link'}).flatMap(([key,label]) => {
    const link = project.links[key];
    if (!link) return [];
    const url = typeof link === 'string' ? link : link.url;
    return [`<a href="${escape(url)}" target="_blank" rel="noopener noreferrer" class="btn btn--${key === 'code' ? 'primary' : 'secondary'}">${escape(typeof link === 'string' ? label : link.label || label)}</a>`];
  });
  html = fill(html, 'div', 'project-header__actions', actions.join('\n            '));
  html = fill(html, 'dl', 'project-meta', [['Completion Date',project.date],['Category',project.categoryDisplay],['Status',project.status],['Organization',project.organization]].filter(([,value])=>value).map(([label,value])=>`<dt>${label}</dt><dd>${escape(value)}</dd>`).join('\n'));
  html = fill(html, 'div', 'tech-list', (project.technologies || []).map(tag=>`<span class="tag">${escape(tag)}</span>`).join(' '));
  html = meta(html, 'description', project.description);
  html = meta(html, 'og:description', project.description, true);
  save(file, html);
}
for (const file of files) {
  // In check mode, project output is already reported; social metadata is checked separately.
  let html = read(file);
  const title = html.match(/<title>([\s\S]*?)<\/title>/)[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/)[1];
  const decode = text => text.replace(/&(amp|quot|#39|lt|gt);/g, (_,name)=>({amp:'&',quot:'"','#39':"'",lt:'<',gt:'>'}[name]));
  for (const [key,value,property] of [
    ['og:image',`${origin}/assets/images/avatar.jpg`,true],
    ['og:image:width','1823',true],['og:image:height','1823',true],
    ['og:image:alt','Portrait of Samuele Nicolò Straccialini',true],
    ['twitter:card','summary',false],['twitter:title',decode(title),false],
    ['twitter:description',decode(description),false],
    ['twitter:image',`${origin}/assets/images/avatar.jpg`,false],
    ['twitter:image:alt','Portrait of Samuele Nicolò Straccialini',false]
  ]) html = meta(html,key,value,property);
  save(file,html);
}
const previous = new Map([...read('sitemap.xml').matchAll(/<url>\s*<loc>(.*?)<\/loc>\s*<lastmod>(.*?)<\/lastmod>[\s\S]*?<\/url>/g)].map(m=>[m[1],m[2]]));
const entries = files.map(file => {
  const url = `${origin}/${file === 'index.html' ? '' : file}`;
  const date = changed.has(file) ? today : previous.get(url) || today;
  return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${date}</lastmod>\n  </url>`;
});
save('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`);
console.log(`${check ? 'Out of sync' : 'Updated'}: ${[...changed].join(', ') || 'none'}`);
if (check && changed.size) process.exitCode = 1;
