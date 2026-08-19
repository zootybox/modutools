const fs = require('fs');
const path = require('path');
const DIR = 'c:/Users/user/Documents/GitHub/modutools';

function w(rel, content) {
    const p = path.join(DIR, rel);
    fs.writeFileSync(p, content, 'utf8');
    console.log(`  [OK] ${rel} (${content.length} bytes)`);
}

const H = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>%T%</title>
<meta name="description" content="%D%">
<meta property="og:title" content="%T%">
<meta property="og:description" content="%D%">
<meta property="og:type" content="website">
<meta property="og:url" content="%U%">
<link rel="canonical" href="%U%">
<link rel="stylesheet" href="/css/common.css">
<style>
.page{max-width:680px;margin:0 auto;padding:24px 20px 60px}
.page-title{font-size:26px;font-weight:800;letter-spacing:-.5px;margin-bottom:2px}
.page-sub{font-size:14px;color:var(--g500);margin-bottom:20px}
.card{background:#fff;border:1px solid var(--g200);border-radius:var(--radius);padding:24px;margin-bottom:16px}
.card-title{font-size:15px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px}
.security-badge{display:inline-flex;align-items:center;gap:6px;background:#ECFDF5;color:#059669;font-size:12px;font-weight:700;padding:6px 14px;border-radius:20px;margin-bottom:20px;border:1px solid #A7F3D0}
.security-badge span{font-size:14px}
.text-area{width:100%;min-height:180px;border:1.5px solid var(--g200);border-radius:10px;padding:14px;font-size:14px;font-family:inherit;line-height:1.7;resize:vertical;outline:none;transition:.2s;background:#fff;color:var(--g900)}
.text-area:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(37,99,235,.1)}
.ad-slot,.ad-slot-middle{margin:20px 0;text-align:center}
.ad-slot-inner{background:var(--g100);border:1px dashed var(--g300);border-radius:var(--radius);padding:14px;color:var(--g400);font-size:12px;min-height:60px;display:flex;align-items:center;justify-content:center}
.mt-ad,.ad-slot,.ad-slot-middle{display:none}
.guide-section{margin-top:24px}
.guide-card{background:#fff;border:1px solid var(--g200);border-radius:var(--radius);padding:24px;margin-bottom:12px}
.guide-card h2{font-size:16px;font-weight:700;margin-bottom:12px;color:var(--g900)}
.guide-card p{font-size:13px;line-height:1.8;color:var(--g600);margin-bottom:10px}
.guide-card table{width:100%;border-collapse:collapse;font-size:13px;margin:10px 0}
.guide-card th,.guide-card td{padding:8px 10px;text-align:left;border-bottom:1px solid var(--g200)}
.guide-card th{background:var(--g100);font-weight:600;color:var(--g700)}
.faq-item{border:1px solid var(--g200);border-radius:10px;margin-bottom:8px;overflow:hidden;background:#fff}
.faq-q{padding:14px 16px;font-size:13px;font-weight:600;cursor:pointer;display:flex;justify-content:space-between;align-items:center;color:var(--g900);user-select:none}
.faq-q::after{content:'\\25bc';font-size:10px;color:var(--g400);transition:transform .25s}
.faq-item.open .faq-q::after{transform:rotate(180deg)}
.faq-a{padding:0 16px;max-height:0;overflow:hidden;transition:max-height .3s,padding .3s;font-size:13px;color:var(--g600);line-height:1.8}
.faq-item.open .faq-a{max-height:600px;padding:0 16px 14px}
.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(100px);background:var(--g900);color:#fff;padding:12px 24px;border-radius:12px;font-size:13px;font-weight:600;opacity:0;transition:.35s;z-index:999;pointer-events:none}
.toast.show{transform:translateX(-50%) translateY(0);opacity:1}
@media(max-width:480px){.page-title{font-size:22px}.text-area{min-height:140px;font-size:13px}}
</style>
%J%
</head>
<body>
<header class="mt-header"><div class="mt-header-inner"><a href="/" class="mt-logo">modu<span>tools</span></a><nav class="mt-nav"><a href="/">← 도구 목록</a></nav></div></header>
<div class="mt-ad"><div class="mt-ad-box">광고 영역 (AD)</div></div>
<main class="page">
`;
const F = `</main>
<div class="mt-ad"><div class="mt-ad-box">광고 영역 (AD)</div></div>
<footer class="mt-footer"><p><a href="/">← modutools 전체 도구 보기</a><br>&copy; 2026 modutools.com — 모두를 위한 무료 온라인 도구</p></footer>
<div class="toast" id="toast"></div>
<script>
(function(){document.querySelectorAll(".faq-q").forEach(function(q){q.addEventListener("click",function(){this.parentElement.classList.toggle("open");});});var tt=document.getElementById("toast"),tmr=null;function st(m){tt.textContent=m;tt.classList.add("show");clearTimeout(tmr);tmr=setTimeout(function(){tt.classList.remove("show");},2500);}
%S%
})();
</script>
</body>
</html>`;

function make(T, D, U, J, B, S) {
    return H.replace(/%T%/g,T).replace(/%D%/g,D).replace(/%U%/g,U).replace(/%J%/g,J) + B + F.replace(/%S%/g,S);
}

console.log('Templates loaded');
