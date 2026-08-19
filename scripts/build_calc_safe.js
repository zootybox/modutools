const fs = require('fs');
const path = require('path');
const DIR = 'c:/Users/user/Documents/GitHub/modutools';

function w(rel, content) {
    const p = path.join(DIR, rel);
    fs.writeFileSync(p, content, 'utf8');
    console.log('  [OK] ' + rel + ' (' + content.length + ' bytes)');
}

// Read existing file to extract JS logic
function readJS(rel) {
    try {
        const c = fs.readFileSync(path.join(DIR, rel), 'utf8');
        // Extract script content between <script> and </script>
        const m = c.match(/<script>([\s\S]*?)<\/script>/);
        return m ? m[1].trim() : '// No script found';
    } catch(e) {
        return '// No script found';
    }
}

const H = '<!DOCTYPE html>\n<html lang="ko">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width,initial-scale=1.0">\n<title>%T%</title>\n<meta name="description" content="%D%">\n<meta property="og:title" content="%T%">\n<meta property="og:description" content="%D%">\n<meta property="og:type" content="website">\n<meta property="og:url" content="%U%">\n<link rel="canonical" href="%U%">\n<link rel="stylesheet" href="/css/common.css">\n<style>\n.page{max-width:680px;margin:0 auto;padding:24px 20px 60px}\n.page-title{font-size:26px;font-weight:800;letter-spacing:-.5px;margin-bottom:2px}\n.page-sub{font-size:14px;color:var(--g500);margin-bottom:20px}\n.card{background:#fff;border:1px solid var(--g200);border-radius:var(--radius);padding:24px;margin-bottom:16px}\n.card-title{font-size:15px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px}\n.security-badge{display:inline-flex;align-items:center;gap:6px;background:#ECFDF5;color:#059669;font-size:12px;font-weight:700;padding:6px 14px;border-radius:20px;margin-bottom:20px;border:1px solid #A7F3D0}\n.security-badge span{font-size:14px}\n.ad-slot,.ad-slot-middle{margin:20px 0;text-align:center}\n.ad-slot-inner{background:var(--g100);border:1px dashed var(--g300);border-radius:var(--radius);padding:14px;color:var(--g400);font-size:12px;min-height:60px;display:flex;align-items:center;justify-content:center}\n.mt-ad,.ad-slot,.ad-slot-middle{display:none}\n.guide-section{margin-top:24px}\n.guide-card{background:#fff;border:1px solid var(--g200);border-radius:var(--radius);padding:24px;margin-bottom:12px}\n.guide-card h2{font-size:16px;font-weight:700;margin-bottom:12px;color:var(--g900)}\n.guide-card p{font-size:13px;line-height:1.8;color:var(--g600);margin-bottom:10px}\n.guide-card table{width:100%;border-collapse:collapse;font-size:13px;margin:10px 0}\n.guide-card th,.guide-card td{padding:8px 10px;text-align:left;border-bottom:1px solid var(--g200)}\n.guide-card th{background:var(--g100);font-weight:600;color:var(--g700)}\n.faq-item{border:1px solid var(--g200);border-radius:10px;margin-bottom:8px;overflow:hidden;background:#fff}\n.faq-q{padding:14px 16px;font-size:13px;font-weight:600;cursor:pointer;display:flex;justify-content:space-between;align-items:center;color:var(--g900);user-select:none}\n.faq-q::after{content:\'\\25bc\';font-size:10px;color:var(--g400);transition:transform .25s}\n.faq-item.open .faq-q::after{transform:rotate(180deg)}\n.faq-a{padding:0 16px;max-height:0;overflow:hidden;transition:max-height .3s,padding .3s;font-size:13px;color:var(--g600);line-height:1.8}\n.faq-item.open .faq-a{max-height:600px;padding:0 16px 14px}\n.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(100px);background:var(--g900);color:#fff;padding:12px 24px;border-radius:12px;font-size:13px;font-weight:600;opacity:0;transition:.35s;z-index:999;pointer-events:none}\n.toast.show{transform:translateX(-50%) translateY(0);opacity:1}\n@media(max-width:480px){.page-title{font-size:22px}}\n</style>\n%J%\n</head>\n<body>\n<header class="mt-header"><div class="mt-header-inner"><a href="/" class="mt-logo">modu<span>tools</span></a><nav class="mt-nav"><a href="/">← 도구 목록</a></nav></div></header>\n<div class="mt-ad"><div class="mt-ad-box">광고 영역 (AD)</div></div>\n<main class="page">\n';
// ===== Calc file data =====
// Each entry: [file, title, desc, url, jsonLD, guideHTML, existingJS]
var files = [];

// Helper to build JSON-LD
function jld(name, desc, faqs) {
    var j = '<script type="application/ld+json">\n{"@context":"https://schema.org","@type":"WebApplication","name":"' + name + '","url":"https://modutools.com/calc/","description":"' + desc + '","applicationCategory":"FinanceApplication","operatingSystem":"All","offers":{"@type":"Offer","price":"0","priceCurrency":"KRW"}}\n</script>\n';
    if (faqs) {
        j += '<script type="application/ld+json">\n{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[\n';
        for (var i = 0; i < faqs.length; i++) {
            j += '{"@type":"Question","name":"' + faqs[i][0] + '","acceptedAnswer":{"@type":"Answer","text":"' + faqs[i][1] + '"}}';
            if (i < faqs.length - 1) j += ',\n';
        }
        j += '\n]}\n</script>';
    }
    return j;
}

// Build guide HTML
function guide(title, paras, table, faqs) {
    var g = '<div class="guide-section"><div class="guide-card"><h2>📖 ' + title + '</h2>\n';
    for (var i = 0; i < paras.length; i++) {
        g += '<p>' + paras[i] + '</p>\n';
    }
    if (table) g += table + '\n';
    // Close the guide-card div
    g += '</div>\n';
    // Add FAQ items
    for (var i = 0; i < faqs.length; i++) {
        g += '<div class="faq-item"><div class="faq-q">' + faqs[i][0] + '</div><div class="faq-a">' + faqs[i][1] + '</div></div>\n';
    }
    g += '</div>';
    return g;
}

console.log('Helpers ready');

// 1. salary.html
files.push({
    f: 'calc/salary.html',
    T: '연봉 실수령액 계산기 - 2026년 4대보험·소득세 | modutools',
    D: '2026년 연봉 실수령액 계산기. 4대보험(국민연금 4.5%, 건강보험 7.09%, 장기요양 12.95%, 고용보험 0.9%) 및 소득세 반영, 비과세 식대 월 20만 원 적용.',
    U: 'https://modutools.com/calc/salary.html',
    J: jld('연봉 실수령액 계산기', '2026년 4대보험 및 소득세를 반영한 연봉 실수령액 계산 도구', [
        ['4대보험 요율은 어떻게 되나요?', '2026년 기준 국민연금은 4.5%(근로자 부담), 건강보험은 7.09%, 장기요양보험은 건강보험료의 12.95%, 고용보험은 0.9%입니다. 사업주도 동일한 비율을 부담하며, 건강보험은 2026년 인상률이 반영되었습니다.'],
        ['비과세 식대는 어떻게 반영되나요?', '2026년 기준 월 20만 원까지의 식대는 비과세 소득으로 처리됩니다. 이는 근로소득세 및 4대보험 부과 대상에서 제외되므로, 실제 수령액에 긍정적인 영향을 미칩니다.'],
        ['근로소득 간이세액표는 어떻게 적용되나요?', '간이세액표는 월 급여와 부양가족 수에 따라 원천징수할 근로소득세를 정해놓은 표입니다. 본 계산기는 이를 기반으로 실제 원천징수액을 계산하여 실수령액을 정확히 산출합니다.'],
        ['입력한 금액이 서버에 저장되나요?', '아닙니다. 모든 계산은 브라우저에서만 이루어지며, 입력한 금액이 서버로 전송되지 않습니다. 개인 금융 정보가 포함된 데이터도 안심하고 사용할 수 있습니다.']
    ]),
    G: guide('연봉 실수령액 계산 가이드', [
        '연봉 실수령액 계산기는 2026년 최신 4대보험 요율과 근로소득세율을 반영하여 실제로 통장에 입금되는 월급을 계산합니다. 연봉 계약 시 제시된 금액에서 각종 공제를 차감한 실수령액을 미리 확인할 수 있어, 이직·취업 시 연봉 협상에 유용합니다.',
        '4대보험은 근로자와 사업주가 각각 절반씩 부담합니다. 국민연금은 월 소득의 4.5%, 건강보험은 7.09%, 장기요양보험은 건강보험료의 12.95%, 고용보험은 0.9%입니다. 공제 전 월 소득(비과세 제외)을 기준으로 산정됩니다.',
        '소득세는 연간 과세표준(연봉에서 각종 공제를 차감한 금액)에 따라 누진세율이 적용됩니다. 1,400만 원 이하 6%, 5,000만 원 이하 15%, 8,800만 원 이하 24%, 1.5억 원 이하 35% 등으로 구간별 세율이 적용됩니다.'
    ], '<table><tr><th>공제 항목</th><th>근로자 부담률</th><th>부과 상한</th></tr><tr><td>국민연금</td><td>4.5%</td><td>월 637만 원</td></tr><tr><td>건강보험</td><td>7.09%</td><td>상한액 없음</td></tr><tr><td>장기요양</td><td>건강보험료×12.95%</td><td>상한액 없음</td></tr><tr><td>고용보험</td><td>0.9%</td><td>상한액 없음</td></tr></table>', [
        ['4대보험 요율은 어떻게 되나요?', '2026년 기준 국민연금은 4.5%(근로자 부담), 건강보험은 7.09%, 장기요양보험은 건강보험료의 12.95%, 고용보험은 0.9%입니다. 사업주도 동일 비율을 부담합니다.'],
        ['비과세 식대는 어떻게 반영되나요?', '2026년 기준 월 20만 원까지의 식대는 비과세 소득으로 처리됩니다. 이는 근로소득세 및 4대보험 부과 대상에서 제외되므로, 실제 수령액에 긍정적인 영향을 미칩니다.'],
        ['근로소득 간이세액표는 어떻게 적용되나요?', '간이세액표는 월 급여와 부양가족 수에 따라 원천징수할 근로소득세를 정해놓은 표입니다. 본 계산기는 이를 기반으로 실제 원천징수액을 계산합니다.'],
        ['입력한 금액이 서버에 저장되나요?', '아닙니다. 모든 계산은 브라우저에서만 이루어지며, 입력한 금액이 서버로 전송되지 않습니다.']
    ])
});
console.log('salary data ready');
// 2. income-tax.html
files.push({
    f: 'calc/income-tax.html', T: '종합소득세 계산기 - 2026년 과세표준 구간별 세금 | modutools',
    D: '2026년 종합소득세 계산기. 과세표준 구간별 누진세율(6%~45%) 반영, 필요경비 및 소득공제 안내.',
    U: 'https://modutools.com/calc/income-tax.html',
    J: jld('종합소득세 계산기', '2026년 과세표준 구간별 소득세를 계산하는 도구', [
        ['종합소득세 과세표준 구간은 어떻게 되나요?', '2026년 기준 1,400만 원 이하 6%, 5,000만 원 이하 15%, 8,800만 원 이하 24%, 1.5억 원 이하 35%, 3억 원 이하 38%, 5억 원 이하 40%, 10억 원 이하 42%, 10억 원 초과 45%입니다.'],
        ['필요경비는 어떻게 인정되나요?', '프리랜서나 사업자의 경우 매출에서 필요경비를 차감한 금액이 과세 대상입니다. 단순경비율(업종별로 60~90%) 또는 기준경비율을 선택하여 적용할 수 있습니다.'],
        ['근로소득세액공제는 어떻게 계산하나요?', '근로소득이 있는 경우 산출세액에서 근로소득세액공제가 적용됩니다. 130만 원 이하 세액은 55%, 초과분은 30% 공제되며, 최대 74만 원까지 공제 가능합니다.'],
        ['입력한 금액이 서버에 저장되나요?', '아닙니다. 모든 계산은 브라우저에서만 이루어지며, 입력한 금액이 서버로 전송되지 않습니다.']
    ]),
    G: guide('종합소득세 계산 가이드', [
        '종합소득세는 근로소득, 사업소득, 이자소득, 배당소득, 연금소득 등 모든 소득을 합산하여 과세하는 세금입니다. 2026년 기준 과세표준(총소득에서 각종 공제를 차감한 금액)에 따라 6%에서 45%까지의 누진세율이 적용됩니다.',
        '과세표준이 1,400만 원 이하이면 6%, 1,400만 원 초과~5,000만 원 이하이면 84만 원 + 초과분의 15%, 5,000만 원 초과~8,800만 원 이하이면 624만 원 + 초과분의 24%가 적용됩니다. 고소득 구간일수록 높은 세율이 적용됩니다.',
        '프리랜서나 사업자의 경우 필요경비를 인정받아 과세표준을 낮출 수 있습니다. 단순경비율은 업종별로 매출의 일정 비율을 경비로 인정해주는 제도이며, 기준경비율은 실제 지출한 경비를 증빙하여 공제받는 방식입니다.'
    ], '<table><tr><th>과세표준</th><th>세율</th><th>누진공제</th></tr><tr><td>1,400만 원 이하</td><td>6%</td><td>0원</td></tr><tr><td>1,400만~5,000만 원</td><td>15%</td><td>126만 원</td></tr><tr><td>5,000만~8,800만 원</td><td>24%</td><td>576만 원</td></tr><tr><td>8,800만~1.5억 원</td><td>35%</td><td>1,544만 원</td></tr><tr><td>1.5억~3억 원</td><td>38%</td><td>1,994만 원</td></tr><tr><td>3억~5억 원</td><td>40%</td><td>2,594만 원</td></tr><tr><td>5억~10억 원</td><td>42%</td><td>3,594만 원</td></tr><tr><td>10억 원 초과</td><td>45%</td><td>6,594만 원</td></tr></table>', [
        ['종합소득세 과세표준 구간은 어떻게 되나요?', '2026년 기준 1,400만 원 이하 6%, 5,000만 원 이하 15%, 8,800만 원 이하 24%, 1.5억 원 이하 35%, 3억 원 이하 38%, 5억 원 이하 40%, 10억 원 이하 42%, 10억 원 초과 45%입니다.'],
        ['필요경비는 어떻게 인정되나요?', '프리랜서나 사업자의 경우 매출에서 필요경비를 차감한 금액이 과세 대상입니다. 단순경비율 또는 기준경비율을 선택하여 적용할 수 있습니다.'],
        ['근로소득세액공제는 어떻게 계산하나요?', '근로소득이 있는 경우 산출세액에서 근로소득세액공제가 적용됩니다. 130만 원 이하 세액은 55%, 초과분은 30% 공제되며, 최대 74만 원까지 공제 가능합니다.'],
        ['입력한 금액이 서버에 저장되나요?', '아닙니다. 모든 계산은 브라우저에서만 이루어지며, 입력한 금액이 서버로 전송되지 않습니다.']
    ])
});
console.log('income-tax ready');

function make(T, D, U, J, B, S) {
    var r = H.replace(/%T%/g, T).replace(/%D%/g, D).replace(/%U%/g, U).replace(/%J%/g, J);
    r += B + F.replace(/%S%/g, S);
    return r;
}

// 3. loan.html
files.push({
    f: 'calc/loan.html', T: '대출이자 계산기 - 원리금균등 원금균등 만기일시 | modutools',
    D: '대출 상환 방식별 월 납입금과 총 이자를 비교. 원리금균등, 원금균등, 만기일시 상환 방식 지원.',
    U: 'https://modutools.com/calc/loan.html',
    J: jld('대출이자 계산기', '대출 원금, 금리, 기간별 상환 방식 비교 도구', [
        ['원리금균등과 원금균등의 차이는 무엇인가요?', '원리금균등은 매월 같은 금액을 납입하며 초기엔 이자 비중이 높고 후기엔 원금 비중이 높아집니다. 원금균등은 매월 같은 원금을 납입하여 총 이자가 적지만 초기 부담이 큽니다.'],
        ['중도상환수수료는 얼마인가요?', '일반적으로 중도상환액의 1.2~1.4%이며, 은행별로 상이합니다. 3년 경과 후에는 면제되는 경우가 많습니다.'],
        ['금리 변동 위험은 어떻게 대비해야 하나요?', '변동금리 대출은 금리 상승 시 이자 부담이 증가할 수 있습니다. 안정성을 원한다면 고정금리나 혼합형(고정→변동)을 선택하는 것이 좋습니다.'],
        ['입력한 금액이 서버에 저장되나요?', '아닙니다. 모든 계산은 브라우저에서만 이루어지며, 입력한 금액이 서버로 전송되지 않습니다.']
    ]),
    G: guide('대출이자 계산 가이드', [
        '대출이자 계산기는 원금, 금리, 상환 기간을 입력하면 원리금균등·원금균등·만기일시 세 가지 상환 방식별로 월 납입금과 총 이자를 비교해줍니다. 주택담보대출, 신용대출, 자동차 할부 등 다양한 대출 상품의 조건을 비교할 때 유용합니다.',
        '원리금균등 상환은 매월 동일한 금액을 납입하므로 자금 계획이 쉬우나 총 이자 부담이 원금균등보다 높습니다. 원금균등 상환은 매월 납입하는 원금이 일정하여 총 이자가 가장 적지만, 초기 월 납입액이 높은 단점이 있습니다.',
        '만기일시 상환은 매월 이자만 납입하고 만기에 원금 전액을 상환하는 방식으로, 초기 부담이 가장 적습니다. 그러나 만기에 큰 금액이 필요하므로 목돈 마련 계획이 필요합니다.'
    ], '<table><tr><th>상환 방식</th><th>월 납입액</th><th>총 이자</th><th>초기 부담</th></tr><tr><td>원리금균등</td><td>일정</td><td>중간</td><td>낮음</td></tr><tr><td>원금균등</td><td>감소</td><td>가장 적음</td><td>높음</td></tr><tr><td>만기일시</td><td>이자만</td><td>가장 높음</td><td>가장 낮음</td></tr></table>', [
        ['원리금균등과 원금균등의 차이는 무엇인가요?', '원리금균등은 매월 같은 금액을 납입하며 초기엔 이자 비중이 높고 후기엔 원금 비중이 높아집니다. 원금균등은 매월 같은 원금을 납입하여 총 이자가 적지만 초기 부담이 큽니다.'],
        ['중도상환수수료는 얼마인가요?', '일반적으로 중도상환액의 1.2~1.4%이며, 은행별로 상이합니다. 3년 경과 후에는 면제되는 경우가 많습니다.'],
        ['금리 변동 위험은 어떻게 대비해야 하나요?', '변동금리 대출은 금리 상승 시 이자 부담이 증가할 수 있습니다. 안정성을 원한다면 고정금리나 혼합형을 선택하는 것이 좋습니다.'],
        ['입력한 금액이 서버에 저장되나요?', '아닙니다. 모든 계산은 브라우저에서만 이루어지며, 입력한 금액이 서버로 전송되지 않습니다.']
    ])
});
console.log('loan ready');
// Generate all calc files
var F = '</main>\n<div class="mt-ad"><div class="mt-ad-box">광고 영역 (AD)</div></div>\n<footer class="mt-footer"><p><a href="/">← modutools 전체 도구 보기</a><br>&copy; 2026 modutools.com — 모두를 위한 무료 온라인 도구</p></footer>\n<div class="toast" id="toast"></div>\n<script>\n(function(){document.querySelectorAll(".faq-q").forEach(function(q){q.addEventListener("click",function(){this.parentElement.classList.toggle("open");});});var tt=document.getElementById("toast"),tmr=null;function st(m){tt.textContent=m;tt.classList.add("show");clearTimeout(tmr);tmr=setTimeout(function(){tt.classList.remove("show");},2500);}\n%S%\n})();\n</script>\n</body>\n</html>';
// 4. insurance.html
files.push({
    f: 'calc/insurance.html', T: '4대보험 계산기 - 국민연금 건강보험 고용보험 | modutools',
    D: '2026년 4대보험 공제액 계산. 국민연금 4.5%, 건강보험 7.09%, 장기요양 12.95%, 고용보험 0.9% 반영.',
    U: 'https://modutools.com/calc/insurance.html',
    J: jld('4대보험 계산기', '월 급여별 4대보험 공제액 계산 도구', [
        ['4대보험 근로자와 사업주 부담 비율은 어떻게 되나요?', '국민연금은 근로자 4.5%와 사업주 4.5%로 총 9%, 건강보험은 각 3.545%로 총 7.09%, 고용보험은 근로자 0.9%와 사업주 0.9%~1.3%입니다. 장기요양보험은 건강보험료의 12.95%를 근로자와 사업주가 각각 부담합니다.'],
        ['부과 상한액이 있나요?', '국민연금에는 월 소득 상한액(2026년 기준 약 637만 원)이 있어 초과분에 대해서는 보험료가 부과되지 않습니다. 건강보험과 고용보험에는 상한액이 없습니다.'],
        ['4대보험은 어떤 혜택을 제공하나요?', '국민연금은 노후 연금, 건강보험은 의료비 지원, 고용보험은 실업급여와 육아휴직 급여, 장기요양보험은 노인 장기요양 서비스를 제공합니다.'],
        ['입력한 금액이 서버에 저장되나요?', '아닙니다. 모든 계산은 브라우저에서만 이루어지며, 입력한 금액이 서버로 전송되지 않습니다.']
    ]),
    G: guide('4대보험 계산 가이드', [
        '4대보험 계산기는 월 급여를 입력하면 국민연금, 건강보험, 장기요양보험, 고용보험의 근로자 부담분을 개별 계산하여 총 공제액을 알려줍니다. 2026년 최신 요율을 반영하고 있습니다.',
        '국민연금은 1988년 도입된 공적 연금제도로, 가입 기간과 평균 소득에 따라 노후에 연금을 지급받습니다. 2026년 기준 근로자 부담률은 4.5%이며, 사업주도 동일한 금액을 부담합니다.',
        '건강보험은 2026년 기준 7.09%(근로자 3.545% + 사업주 3.545%)이며, 장기요양보험은 건강보험료의 12.95%가 추가됩니다. 고용보험은 0.9%로 실업급여와 육아휴직 급여의 재원이 됩니다.'
    ], '<table><tr><th>보험 종목</th><th>근로자 부담</th><th>사업주 부담</th><th>계</th></tr><tr><td>국민연금</td><td>4.50%</td><td>4.50%</td><td>9.00%</td></tr><tr><td>건강보험</td><td>3.545%</td><td>3.545%</td><td>7.09%</td></tr><tr><td>장기요양</td><td>건보료×12.95%</td><td>동일</td><td>-</td></tr><tr><td>고용보험</td><td>0.90%</td><td>0.90%~1.30%</td><td>1.80%~2.20%</td></tr></table>', [
        ['4대보험 근로자와 사업주 부담 비율은 어떻게 되나요?', '국민연금은 근로자 4.5%와 사업주 4.5%로 총 9%, 건강보험은 각 3.545%로 총 7.09%, 고용보험은 근로자 0.9%와 사업주 0.9%~1.3%입니다.'],
        ['부과 상한액이 있나요?', '국민연금에는 월 소득 상한액(2026년 기준 약 637만 원)이 있어 초과분에 대해서는 보험료가 부과되지 않습니다.'],
        ['4대보험은 어떤 혜택을 제공하나요?', '국민연금은 노후 연금, 건강보험은 의료비 지원, 고용보험은 실업급여와 육아휴직 급여, 장기요양보험은 노인 장기요양 서비스를 제공합니다.'],
        ['입력한 금액이 서버에 저장되나요?', '아닙니다. 모든 계산은 브라우저에서만 이루어지며, 입력한 금액이 서버로 전송되지 않습니다.']
    ])
});
console.log('insurance ready');

// Generate all calc files
// 5. rent.html
files.push({f:'calc/rent.html',T:'전월세 전환율 계산기 - 전세 월세 변환 | modutools',D:'전세를 월세로, 월세를 전세로 전환할 때 적정 보증금과 월세를 계산. 법정 전환율 기준.',U:'https://modutools.com/calc/rent.html',J:jld('전월세 전환율 계산기','전월세 전환율 계산 도구',[['전월세 전환율 법정 상한은 얼마인가요?','법정 전환율은 연 4%이나, 2026년 기준 시장 전환율은 5~7% 수준입니다. 계약 체결 시 법정 전환율을 초과하지 않도록 주의해야 합니다.'],['전세보증금 반환보증보험은 무엇인가요?','전세보증금 반환보증보험은 집주인이 보증금을 돌려주지 못할 때 보험사가 대신 지급하는 상품입니다. 보증료는 보증금의 0.1~0.2% 수준입니다.'],['묵시적 갱신 시 주의사항은?','계약 만료 전 1~2개월 내에 이의를 제기하지 않으면 동일 조건으로 자동 갱신됩니다. 이때 전환율이 변경될 수 있으므로 갱신 전 확인이 필요합니다.'],['입력한 금액이 서버에 저장되나요?','아닙니다. 모든 계산은 브라우저에서만 이루어지며, 입력한 금액이 서버로 전송되지 않습니다.']]),G:guide('전월세 전환율 계산 가이드',['전월세 전환율 계산기는 전세 보증금을 월세로 전환하거나, 반대로 월세를 전세로 전환할 때 적정 금액을 계산합니다. 법정 전환율(연 4%)과 시장 전환율을 기준으로 선택할 수 있습니다.','전세에서 월세로 전환할 때는 보증금과 월세의 적정 비율이 중요합니다. 보증금을 많이 낼수록 월세가 낮아지며, 반대로 보증금을 적게 내면 월세가 높아집니다.','묵시적 갱신 시 계약 조건이 변경될 수 있으므로, 갱신 전에 반드시 새로운 조건을 확인하는 것이 좋습니다. 특히 전환율이 법정 상한을 초과하지 않는지 확인해야 합니다.'],'<table><tr><th>구분</th><th>법정 전환율</th><th>시장 전환율</th></tr><tr><td>주택</td><td>연 4%</td><td>연 5~7%</td></tr><tr><td>상가</td><td>연 4%</td><td>연 6~9%</td></tr></table>',[['전월세 전환율 법정 상한은 얼마인가요?','법정 전환율은 연 4%이나, 2026년 기준 시장 전환율은 5~7% 수준입니다.'],['전세보증금 반환보증보험은 무엇인가요?','전세보증금 반환보증보험은 집주인이 보증금을 돌려주지 못할 때 보험사가 대신 지급하는 상품입니다.'],['묵시적 갱신 시 주의사항은?','계약 만료 전 1~2개월 내에 이의를 제기하지 않으면 동일 조건으로 자동 갱신됩니다.'],['입력한 금액이 서버에 저장되나요?','아닙니다. 모든 계산은 브라우저에서만 이루어집니다.']])});
console.log('rent ready');

// 6. savings.html
files.push({f:'calc/savings.html',T:'적금 이자 계산기 - 단리 복리 세전 세후 | modutools',D:'월 적립액, 금리, 기간별 단리·복리 이자 비교. 15.4% 이자소득세 및 비과세종합저축 안내.',U:'https://modutools.com/calc/savings.html',J:jld('적금 이자 계산기','단리·복리 적금 이자 계산 도구',[['단리와 복리의 차이는 무엇인가요?','단리는 원금에 대해서만 이자가 붙는 방식이며, 복리는 원금+이자에 다시 이자가 붙는 방식입니다. 동일 금리와 기간이라면 복리 수익률이 더 높습니다.'],['이자소득세는 얼마인가요?','이자소득세는 15.4%(소득세 14%+지방소득세 1.4%)입니다. 비과세종합저축(가입 요건 충족 시)에 가입하면 이자소득세가 면제됩니다.'],['비과세종합저축 가입 조건은 어떻게 되나요?','만 65세 이상, 장애인, 독립유공자 등이 가입 가능하며, 연 5,000만 원 한도 내에서 이자소득이 비과세됩니다.'],['입력한 금액이 서버에 저장되나요?','아닙니다. 모든 계산은 브라우저에서만 이루어집니다.']]),G:guide('적금 이자 계산 가이드',['적금 이자 계산기는 월 적립액, 금리, 가입 기간을 입력하면 단리와 복리 각각의 만기 금액과 세후 수령액을 계산합니다. 재테크 계획 수립에 필수적인 도구입니다.','단리는 원금에만 이자가 붙어 계산이 단순하지만 장기 저축에는 불리합니다. 복리는 이자에 이자가 붙어 장기일수록 수익률이 기하급수적으로 증가하므로, 장기 저축 상품은 복리 상품을 선택하는 것이 유리합니다.','이자소득세 15.4%를 고려한 세후 수익률을 확인하는 것이 중요합니다. 비과세종합저축 가입이 가능하다면 세금 부담 없이 더 높은 실질 수익을 얻을 수 있습니다.'],'<table><tr><th>구분</th><th>단리</th><th>복리</th></tr><tr><td>계산식</td><td>원금×금리×기간</td><td>원금×(1+금리)^기간</td></tr><tr><td>수익률</td><td>선형 증가</td><td>기하급수 증가</td></tr><tr><td>장기 적합성</td><td>단기(1년 이내)</td><td>장기(1년 이상)</td></tr></table>',[['단리와 복리의 차이는 무엇인가요?','단리는 원금에 대해서만 이자가 붙고, 복리는 원금+이자에 다시 이자가 붙습니다. 장기일수록 복리 수익률이 더 높습니다.'],['이자소득세는 얼마인가요?','이자소득세는 15.4%(소득세 14%+지방소득세 1.4%)입니다. 비과세종합저축 가입 시 면제됩니다.'],['비과세종합저축 가입 조건은 어떻게 되나요?','만 65세 이상, 장애인, 독립유공자 등이 가입 가능하며, 연 5,000만 원 한도 내에서 이자소득이 비과세됩니다.'],['입력한 금액이 서버에 저장되나요?','아닙니다. 모든 계산은 브라우저에서만 이루어집니다.']])});
console.log('savings ready');

//F moved
// 7. severance.html
files.push({f:'calc/severance.html',T:'퇴직금 계산기 - 근로기준법 기준 퇴직금 | modutools',D:'근로기준법상 법정 퇴직금 계산. 1일 평균임금, 근속연수 기준 퇴직금 산정.',U:'https://modutools.com/calc/severance.html',J:jld('퇴직금 계산기','법정 퇴직금 계산 도구',[['퇴직금 계산 공식은 어떻게 되나요?','퇴직금 = 1일 평균임금 × 30일 × (근속연수 ÷ 365)입니다. 1일 평균임금은 퇴직일 이전 3개월 총 임금을 총 일수로 나눈 금액입니다.'],['평균임금에 포함되는 항목은 무엇인가요?','기본급, 각종 수당, 상여금(월할 계산), 연차수당, 주휴수당 등이 포함됩니다. 경조사 휴가 수당 등 일시적 지급액은 제외될 수 있습니다.'],['퇴직금은 언제 지급받을 수 있나요?','퇴직일로부터 14일 이내에 지급되어야 합니다. 지연 시 연 20%의 지연 이자가 발생할 수 있습니다.'],['입력한 금액이 서버에 저장되나요?','아닙니다. 모든 계산은 브라우저에서만 이루어집니다.']]),G:guide('퇴직금 계산 가이드',['퇴직금 계산기는 근로기준법에 따라 1년 이상 근속한 근로자의 법정 퇴직금을 계산합니다. 퇴직금 = 1일 평균임금 × 30일 × (근속연수 ÷ 365)로 산정됩니다.','1일 평균임금은 퇴직일 이전 3개월 동안의 총 임금을 총 일수로 나누어 계산합니다. 포함되는 임금에는 기본급, 각종 수당, 상여금(월할 환산), 연차수당 등이 포함됩니다.','2026년 기준 퇴직금은 근로자 퇴직급여 보장법에 따라 지급되며, 퇴직일로부터 14일 이내에 지급되어야 합니다. 지연 시 연 20%의 지연 이자가 발생할 수 있습니다.'],'<table><tr><th>항목</th><th>산정 기준</th></tr><tr><td>1일 평균임금</td><td>퇴직 전 3개월 임금 ÷ 3개월 총 일수</td></tr><tr><td>퇴직금</td><td>1일 평균임금 × 30일 × 근속연수 ÷ 365</td></tr><tr><td>지급 기한</td><td>퇴직일로부터 14일 이내</td></tr></table>',[['퇴직금 계산 공식은 어떻게 되나요?','퇴직금 = 1일 평균임금 × 30일 × (근속연수 ÷ 365)입니다.'],['평균임금에 포함되는 항목은 무엇인가요?','기본급, 각종 수당, 상여금, 연차수당, 주휴수당 등이 포함됩니다.'],['퇴직금은 언제 지급받을 수 있나요?','퇴직일로부터 14일 이내에 지급되어야 합니다. 지연 시 연 20%의 지연 이자가 발생합니다.'],['입력한 금액이 서버에 저장되나요?','아닙니다. 모든 계산은 브라우저에서만 이루어집니다.']])});
console.log('severance ready');

// 8. minimum-wage.html
files.push({f:'calc/minimum-wage.html',T:'최저시급 월급 계산기 - 2026년 최저임금 | modutools',D:'2026년 최저시급 기준 일급, 월급, 연봉, 주휴수당 포함 금액 계산.',U:'https://modutools.com/calc/minimum-wage.html',J:jld('최저시급 월급 계산기','2026년 최저시급 기준 월급 계산 도구',[['2026년 최저시급은 얼마인가요?','2026년 최저시급은 시간당 10,030원입니다. 주 40시간 기준 월급은 약 209만 원(주휴수당 포함)입니다.'],['주휴수당은 어떻게 계산되나요?','주 15시간 이상 근무하는 근로자에게 1주일에 1회 이상의 유급 주휴일이 주어집니다. 주휴수당은 1일 소정근로시간 × 시급으로 계산됩니다.'],['5인 미만 사업장도 최저시급이 적용되나요?','네, 5인 미만 사업장도 최저시급이 동일하게 적용됩니다. 다만 연장근로 가산수당(1.5배)은 5인 이상 사업장에만 적용됩니다.'],['입력한 금액이 서버에 저장되나요?','아닙니다. 모든 계산은 브라우저에서만 이루어집니다.']]),G:guide('최저시급 월급 계산 가이드',['2026년 최저시급 기준 월급 계산기는 시간당 임금을 기준으로 일급, 주급, 월급, 연봉을 환산합니다. 주휴수당 포함 여부와 근무 시간을 설정할 수 있습니다.','주휴수당은 1주일에 15시간 이상 근무하는 근로자에게 1일분의 유급 휴일을 보장하는 제도입니다. 주 40시간 근무 기준 월 209시간으로 계산됩니다.','5인 미만 사업장에도 최저시급은 동일하게 적용되며, 위반 시 3년 이하의 징역 또는 2천만 원 이하의 벌금이 부과될 수 있습니다.'],'<table><tr><th>구분</th><th>금액</th></tr><tr><td>2026년 최저시급</td><td>10,030원</td></tr><tr><td>일급(8시간)</td><td>80,240원</td></tr><tr><td>월급(40시간, 주휴 포함)</td><td>약 2,096,270원</td></tr></table>',[['2026년 최저시급은 얼마인가요?','2026년 최저시급은 시간당 10,030원입니다. 주 40시간 기준 월급은 약 209만 원입니다.'],['주휴수당은 어떻게 계산되나요?','주 15시간 이상 근무하는 근로자에게 1주일에 1회 이상의 유급 주휴일이 주어집니다.'],['5인 미만 사업장도 최저시급이 적용되나요?','네, 5인 미만 사업장도 최저시급이 동일하게 적용됩니다.'],['입력한 금액이 서버에 저장되나요?','아닙니다. 모든 계산은 브라우저에서만 이루어집니다.']])});
console.log('minimum-wage ready');

// 9. tax-inherit.html
files.push({f:'calc/tax-inherit.html',T:'상속세 증여세 계산기 - 2026년 세율 | modutools',D:'2026년 상속세·증여세 세율표 및 누진공제액 계산. 기초공제, 배우자상속공제 안내.',U:'https://modutools.com/calc/tax-inherit.html',J:jld('상속세 증여세 계산기','상속세·증여세 계산 도구',[['상속세와 증여세의 차이는 무엇인가요?','상속세는 사망으로 재산이 이전될 때, 증여세는 생존 중 무상으로 재산을 이전할 때 부과됩니다. 세율은 동일하지만 공제 항목과 한도가 다릅니다.'],['기초공제와 배우자상속공제는 어떻게 적용되나요?','기초공제 2억 원, 배우자상속공제 최소 5억 원이 적용됩니다. 일괄공제 5억 원을 선택할 수도 있습니다.'],['증여세 면제한도는 어떻게 되나요?','배우자 6억 원, 성인 자녀 5천만 원, 미성년 자녀 2천만 원입니다. 10년간 합산하여 적용됩니다.'],['입력한 금액이 서버에 저장되나요?','아닙니다. 모든 계산은 브라우저에서만 이루어집니다.']]),G:guide('상속세 증여세 계산 가이드',['상속세와 증여세는 동일한 세율 구조를 가지지만, 적용되는 공제 항목이 다릅니다. 상속세는 기초공제 2억 원, 배우자상속공제(최소 5억 원) 등 다양한 공제가 가능합니다.','증여세는 수증자와 증여자의 관계에 따라 면제한도가 다릅니다. 배우자 간 6억 원, 직계존속이 성인 자녀에게 5천만 원까지 면제됩니다. 10년간 합산하여 적용됩니다.','세율은 1억 원 이하 10%에서 30억 원 초과 50%까지 6단계 누진 구조입니다. 누진공제액을 적용하여 실제 부담 세액을 계산합니다.'],'<table><tr><th>과세표준</th><th>세율</th><th>누진공제</th></tr><tr><td>1억 원 이하</td><td>10%</td><td>0원</td></tr><tr><td>1억~5억 원</td><td>20%</td><td>1,000만 원</td></tr><tr><td>5억~10억 원</td><td>30%</td><td>6,000만 원</td></tr><tr><td>10억~30억 원</td><td>40%</td><td>1억 6,000만 원</td></tr><tr><td>30억 원 초과</td><td>50%</td><td>4억 6,000만 원</td></tr></table>',[['상속세와 증여세의 차이는 무엇인가요?','상속세는 사망 시, 증여세는 생존 중 재산 이전 시 부과됩니다. 세율은 동일하지만 공제 항목이 다릅니다.'],['기초공제와 배우자상속공제는 어떻게 적용되나요?','기초공제 2억 원, 배우자상속공제 최소 5억 원이 적용됩니다. 일괄공제 5억 원을 선택할 수도 있습니다.'],['증여세 면제한도는 어떻게 되나요?','배우자 6억 원, 성인 자녀 5천만 원, 미성년 자녀 2천만 원입니다. 10년간 합산 적용됩니다.'],['입력한 금액이 서버에 저장되나요?','아닙니다. 모든 계산은 브라우저에서만 이루어집니다.']])});
console.log('tax-inherit ready');
for (var i = 0; i < files.length; i++) {
    var f = files[i];
    var B = '<h1 class="page-title">%BT%</h1>\n<p class="page-sub">%BD%</p>\n<div class="security-badge"><span>🔒</span> 입력 데이터 서버 전송 없음 · 100% 브라우저 로컬 연산</div>\n'.replace('%BT%', f.T.split(' - ')[0]).replace('%BD%', f.D.substring(0, 80));
    // Read existing JS from original file
    var origJS = '(function(){' + readJS(f.f) + '})();';
    var content = make(f.T, f.D, f.U, f.J, B + f.G, origJS);
    w(f.f, content);
    console.log('  -> ' + f.f + ' generated');
}
console.log('=== ALL CALC FILES GENERATED ===');