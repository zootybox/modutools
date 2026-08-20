const fs = require('fs');
const path = require('path');
const DIR = 'c:/Users/user/Documents/GitHub/modutools';

const files = [
    'calc/salary.html','calc/income-tax.html','calc/loan.html','calc/insurance.html',
    'calc/rent.html','calc/savings.html','calc/severance.html','calc/minimum-wage.html','calc/tax-inherit.html',
    'image/compress.html','image/resize.html','image/crop.html','image/format.html',
    'image/watermark.html','image/exif-remove.html','image/id-photo.html',
    'convert/age.html','convert/audio-editor.html','convert/color.html','convert/date.html',
    'convert/image-to-pdf.html','convert/pdf-merge.html','convert/subtitle-extractor.html',
    'convert/timezone.html','convert/tts.html','convert/unit.html',
    'generate/nickname.html','generate/password.html','generate/qr.html','generate/random.html','generate/tts.html',
    'life/annual-leave.html','life/bmi.html','life/electric.html','life/gpa.html',
    'sports/interval-timer.html','text/case.html','text/space.html','text/dedupe.html'
];

var fixed = 0;
files.forEach(function(f) {
    var p = path.join(DIR, f);
    var c = fs.readFileSync(p, 'utf8');
    var orig = c;

    // 1. Remove duplicate security badge
    c = c.replace(/<div class="security-badge">.*?<\/div>\s*\n\s*<div class="security-badge">.*?<\/div>/, function(m) {
        return m.split('\n')[0];
    });

    // 2. Move guide section to before </main>
    var gs = c.indexOf('<div class="guide-section"');
    if (gs > 0) {
        var ge = c.indexOf('</div>', c.indexOf('</div>', c.indexOf('</div>', gs) + 7) + 7) + 6;
        if (ge > gs) {
            var guide = c.substring(gs, ge);
            c = c.replace(guide, '');
            c = c.replace('</main>', guide + '\n</main>');
        }
    }

    // 3. Fix nested IIFE wrappers
    c = c.replace(/\(function\(\)\{\(function\(\)\{/g, '(function(){');
    c = c.replace(/\}\)\(\);\s*\(function\(\)\{/g, '}\n(function(){');

    if (c !== orig) {
        fs.writeFileSync(p, c, 'utf8');
        fixed++;
        console.log('  [FIXED] ' + f);
    }
});
console.log('Fixed ' + fixed + ' files');
