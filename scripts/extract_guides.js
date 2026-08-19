const fs = require('fs');
const DIR = 'c:/Users/user/Documents/GitHub/modutools';
const src = fs.readFileSync(DIR + '/scripts/restore_and_enhance.js', 'utf8');
const m = src.match(/const files = \[([\s\S]+?)\]/);
const raw = m[1].replace(/\n/g, '').replace(/\s{2,}/g, '');
const files = raw.split(',').map(function(f) { return f.trim().replace(/'/g, ''); });

const guides = {};
files.forEach(function(f) {
    try {
        const c = fs.readFileSync(DIR + '/' + f, 'utf8');
        const s = c.indexOf('<div class="guide-section"');
        if (s < 0) { console.log('  No guide in: ' + f); return; }
        const e = c.indexOf('</div>', c.indexOf('</div>', c.indexOf('</div>', s) + 7) + 7) + 6;
        if (e > s) guides[f] = c.substring(s, e);
        console.log('  Extracted: ' + f);
    } catch(e) { console.log('  Error: ' + f); }
});
fs.writeFileSync(DIR + '/scripts/guides.json', JSON.stringify(guides, null, 2));
console.log('Done! Extracted ' + Object.keys(guides).length + ' guides');
