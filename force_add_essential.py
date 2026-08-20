import glob, os

CSS = '''
.security-badge{display:inline-flex;align-items:center;gap:6px;background:#ECFDF5;color:#059669;font-size:12px;font-weight:700;padding:6px 14px;border-radius:20px;margin-bottom:20px;border:1px solid #A7F3D0}
.security-badge span{font-size:14px}
.guide-section{margin-top:24px}
.guide-card{background:#fff;border:1px solid var(--g200);border-radius:var(--radius);padding:24px;margin-bottom:12px}
.guide-card h2{font-size:16px;font-weight:700;margin-bottom:12px;color:var(--g900)}
.guide-card p{font-size:13px;line-height:1.8;color:var(--g600);margin-bottom:10px}
.faq-item{border:1px solid var(--g200);border-radius:10px;margin-bottom:8px;overflow:hidden;background:#fff}
.faq-q{padding:14px 16px;font-size:13px;font-weight:600;cursor:pointer;display:flex;justify-content:space-between;align-items:center;color:var(--g900);user-select:none}
.faq-q::after{content:"\\25bc";font-size:10px;color:var(--g400);transition:transform .25s}
.faq-item.open .faq-q::after{transform:rotate(180deg)}
.faq-a{padding:0 16px;max-height:0;overflow:hidden;transition:max-height .3s;font-size:13px;color:var(--g600);line-height:1.8}
.faq-item.open .faq-a{max-height:600px;padding:0 16px 14px}
.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(100px);background:var(--g900);color:#fff;padding:12px 24px;border-radius:12px;font-size:13px;font-weight:600;opacity:0;transition:.35s;z-index:999;pointer-events:none}
.toast.show{transform:translateX(-50%) translateY(0);opacity:1}
'''

GUIDE = '\n<div class="guide-section"><div class="guide-card"><h2>클라이언트 브라우저 로컬 처리 안내</h2>\n<p>본 도구는 100% 클라이언트 사이드(브라우저)에서만 동작합니다. 입력한 데이터는 외부 서버로 전혀 전송되지 않으며, 사용자의 브라우저 메모리에서만 일시적으로 처리됩니다. 모든 JavaScript 코드와 CSS 스타일은 브라우저 내에서 로컬 실행되므로, 개인정보, 금융 정보, 문서 등 민감한 데이터도 안심하고 사용할 수 있습니다.</p>\n</div>\n<div class="faq-item"><div class="faq-q">이 도구는 어떻게 작동하나요?</div><div class="faq-a">모든 처리는 사용자의 브라우저에서만 이루어집니다. 서버로 데이터를 전송하지 않기 때문에 업로드 속도가 빠르고, 개인정보가 외부로 유출될 위험이 없습니다. 회원가입이나 로그인도 필요하지 않습니다.</div></div>\n<div class="faq-item"><div class="faq-q">입력한 데이터는 안전한가요?</div><div class="faq-a">네, 입력한 모든 데이터는 사용자의 브라우저 메모리에서만 처리됩니다. 서버로 전송되거나 저장되지 않으며, 브라우저 탭을 닫으면 완전히 삭제됩니다. 금융 정보, 개인 문서, 민감한 파일도 안심하고 사용할 수 있습니다.</div></div>\n<div class="faq-item"><div class="faq-q">이용 횟수나 용량 제한이 있나요?</div><div class="faq-a">서버 기반 도구가 아니므로 횟수나 용량에 제한이 없습니다. 사용자의 브라우저 메모리가 허용하는 범위 내에서 무제한으로 사용할 수 있습니다. 회원가입이나 결제가 필요하지 않은 완전 무료 도구입니다.</div></div>\n<div class="faq-item"><div class="faq-q">모바일에서도 사용할 수 있나요?</div><div class="faq-a">네, 모든 도구는 반응형으로 설계되어 스마트폰, 태블릿, PC 등 모든 기기에서 사용할 수 있습니다. 모바일 브라우저에서도 동일한 기능을 제약 없이 사용할 수 있습니다.</div></div>\n</div>\n'

BADGE = '<div class="security-badge"><span>🔒</span> 100% 브라우저 로컬 처리 · 서버 전송 없음 · 개인정보 보호</div>\n\n'

JLTPL = '<script type="application/ld+json">\n{"@context":"https://schema.org","@type":"WebApplication","name":"%N%","url":"https://modutools.com/%P%","description":"%D%","applicationCategory":"UtilityApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"KRW"}}\n</script>\n'

JS = '\ndocument.querySelectorAll(".faq-q").forEach(function(q){q.addEventListener("click",function(){this.parentElement.classList.toggle("open");});});\nvar tt=document.getElementById("toast"),tmr=null;function st(m){if(!tt)return;tt.textContent=m;tt.classList.add("show");clearTimeout(tmr);tmr=setTimeout(function(){tt.classList.remove("show");},2500);}\n'

def force_add(fp):
    with open(fp, 'r', encoding='utf-8') as f:
        h = f.read()
    o = h

    # CSS
    if 'security-badge{' not in h:
        h = h.replace('</style>', CSS + '\n</style>')
    # JSON-LD
    if 'application/ld+json' not in h:
        n = os.path.splitext(os.path.basename(fp))[0]
        jl = JLTPL.replace('%N%', n).replace('%P%', fp.replace('\\', '/')).replace('%D%', n + ' - 무료 온라인 도구')
        h = h.replace('</head>', jl + '\n</head>')
    # Badge
    if '<div class="security-badge"' not in h:
        e = h.find('</h1>')
        if e > 0: h = h[:e+5] + '\n' + BADGE + h[e+5:]
    # Guide
    if '<div class="guide-section"' not in h:
        if '</main>' in h:
            h = h.replace('</main>', GUIDE + '\n</main>')
        else:
            h = h.replace('</body>', GUIDE + '\n</body>')
    # Toast
    if 'id="toast"' not in h:
        h = h.replace('</body>', '<div class="toast" id="toast"></div>\n</body>')
    # JS
    if 'faq-q' in h and 'faq-q.addEventListener' not in h:
        h = h.replace('</script>', JS + '\n</script>')

    if h != o:
        open(fp, 'w', encoding='utf-8').write(h)
        return True
    return False

# Force add to all files
for cat in ['calc','image','text','convert','generate','life','sports']:
    for fp in glob.glob(cat+'/*.html'):
        if force_add(fp):
            print('  [OK]', fp)

print('Done')