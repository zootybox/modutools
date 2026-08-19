const fs = require('fs');
const path = require('path');
const DIR = 'c:\\Users\\user\\Documents\\GitHub\\modutools';

const files = [];
function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory() && f !== 'node_modules' && f !== 'scripts') {
            walk(p);
        } else if (f.endsWith('.html') && f !== '404.html') {
            files.push(p);
        }
    });
}
walk(DIR);

const today = '2026-08-19';
const prefix = DIR + '\\';

function getPriority(f) {
    if (f === 'index.html') return 1.0;
    if (f.startsWith('calc/') || f.startsWith('text/') || f.startsWith('image/') || f.startsWith('convert/')) return 0.8;
    if (f.startsWith('generate/') || f.startsWith('life/') || f.startsWith('sports/')) return 0.7;
    if (f === 'about.html') return 0.4;
    if (f === 'privacy.html' || f === 'terms.html') return 0.2;
    return 0.5;
}

function getFreq(f) {
    if (f === 'index.html') return 'weekly';
    if (f === 'about.html' || f === 'privacy.html' || f === 'terms.html') return 'yearly';
    return 'monthly';
}

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

files.sort().forEach(p => {
    const rel = p.substring(prefix.length).replace(/\\/g, '/');
    const loc = 'https://modutools.com/' + (rel === 'index.html' ? '' : rel);
    xml += '  <url>\n';
    xml += '    <loc>' + loc + '</loc>\n';
    xml += '    <lastmod>' + today + '</lastmod>\n';
    xml += '    <changefreq>' + getFreq(rel) + '</changefreq>\n';
    xml += '    <priority>' + getPriority(rel).toFixed(1) + '</priority>\n';
    xml += '  </url>\n';
});

xml += '</urlset>\n';

fs.writeFileSync(path.join(DIR, 'sitemap.xml'), xml, 'utf8');
console.log('sitemap.xml generated with ' + files.length + ' pages!');
