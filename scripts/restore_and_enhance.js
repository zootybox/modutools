const fs = require('fs');
const path = require('path');
const DIR = 'c:/Users/user/Documents/GitHub/modutools';

// Files to process (all tool pages except about/privacy/terms/index)
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
    'sports/interval-timer.html',
    'text/case.html','text/space.html','text/dedupe.html'
];

function processFile(rel) {
    const p = path.join(DIR, rel);
    let c = fs.readFileSync(p, 'utf8');

    // 1. Add security badge after page-sub
    const badge = '<div class="security-badge"><span>🔒</span> 서버 전송 없음 · 100% 브라우저 로컬 처리</div>\n';
    c = c.replace(/<p class="page-sub">[^<]+<\/p>\n/, function(m) {
        return m + badge;
    });

    // 2. Add JSON-LD before </head>
    const name = rel.split('/').pop().replace('.html','');
    const jsonld = '<script type="application/ld+json">\n{"@context":"https://schema.org","@type":"WebApplication","name":"modutools","url":"https://modutools.com/' + rel + '","description":"무료 온라인 도구","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"KRW"}}\n</script>\n';
    c = c.replace('</head>', jsonld + '</head>');

    // 3. Add ad-slot-middle before </main>
    const adSlot = '<div class="ad-slot-middle"><div class="ad-label">광고</div><div class="ad-slot-inner">광고 영역 (AD)</div></div>\n';
    c = c.replace('</main>', adSlot + '</main>');

    // 4. Add toast element before </body>
    const toast = '<div class="toast" id="toast"></div>\n';
    c = c.replace('</body>', toast + '</body>');

    // 5. Wrap existing JS in IIFE (if not already)
    c = c.replace(/<script>([\s\S]*?)<\/script>/, function(match, content) {
        if (content.includes('(function(){')) return match; // already IIFE
        // Add FAQ toggle and toast support
        const wrapper = '<script>\n(function(){\n' + content + '\n' +
            'document.querySelectorAll(".faq-q").forEach(function(q){q.addEventListener("click",function(){this.parentElement.classList.toggle("open");});});\n' +
            'var tt=document.getElementById("toast"),tmr=null;function st(m){if(!tt)return;tt.textContent=m;tt.classList.add("show");clearTimeout(tmr);tmr=setTimeout(function(){tt.classList.remove("show");},2500);}\n' +
            '})();\n</script>';
        return wrapper;
    });

    // 6. Add mt-ad{display:none} to CSS
    if (!c.includes('.mt-ad{display:none}')) {
        c = c.replace('</style>', '\n.mt-ad{display:none}\n</style>');
    }

    // 7. Add ad-slot CSS
    if (!c.includes('.ad-slot-middle')) {
        c = c.replace('</style>', '\n.ad-slot,.ad-slot-middle{margin:20px 0;text-align:center}\n.ad-slot-inner{background:var(--g100);border:1px dashed var(--g300);border-radius:var(--radius);padding:14px;color:var(--g400);font-size:12px;min-height:60px;display:flex;align-items:center;justify-content:center}\n.mt-ad,.ad-slot,.ad-slot-middle{display:none}\n</style>');
    }

    // 8. Add security-badge CSS
    if (!c.includes('.security-badge')) {
        c = c.replace('</style>', '\n.security-badge{display:inline-flex;align-items:center;gap:6px;background:#ECFDF5;color:#059669;font-size:12px;font-weight:700;padding:6px 14px;border-radius:20px;margin-bottom:20px;border:1px solid #A7F3D0}\n.security-badge span{font-size:14px}\n</style>');
    }

    // 9. Add toast CSS
    if (!c.includes('.toast{position:fixed')) {
        c = c.replace('</style>', '\n.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(100px);background:var(--g900);color:#fff;padding:12px 24px;border-radius:12px;font-size:13px;font-weight:600;opacity:0;transition:.35s;z-index:999;pointer-events:none}\n.toast.show{transform:translateX(-50%) translateY(0);opacity:1}\n</style>');
    }

    fs.writeFileSync(p, c, 'utf8');
    console.log('  [OK] ' + rel + ' (' + c.length + ' bytes)');
}

console.log('Processing ' + files.length + ' files...');
files.forEach(processFile);
console.log('=== ALL FILES ENHANCED ===');
