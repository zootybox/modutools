const fs = require('fs');
const DIR = 'c:/Users/user/Documents/GitHub/modutools';
const guides = JSON.parse(fs.readFileSync(DIR + '/scripts/guides.json', 'utf8'));
let count = 0;
Object.keys(guides).forEach(function(f) {
    const p = DIR + '/' + f;
    let c = fs.readFileSync(p, 'utf8');
    if (c.indexOf('class="guide-section"') > 0) { return; }
    c = c.replace('</main>', guides[f] + '\n</main>');
    fs.writeFileSync(p, c, 'utf8');
    count++;
});
console.log('Merged ' + count + ' guides');
