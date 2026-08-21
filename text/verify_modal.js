// index-preview.html 모달 렌더 로직 검증
const fs = require('fs');
let src = fs.readFileSync('js/categories.js', 'utf8');
src = src.replace('const CATEGORIES', 'var CATEGORIES');
eval(src);

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

let totalTools = 0;
CATEGORIES.forEach(function(cat){
  const tools = cat.tools || [];
  // 모달 본문 생성 로직 시뮬레이션
  let bh = '';
  tools.forEach(function(t){
    totalTools++;
    let badge = t.badge==='hot' ? 'HOT' : (t.badge==='new' ? 'NEW' : '');
    bh += '<a href="'+esc(t.url)+'" class="tool-card">';
    bh += '<span class="tool-emoji">'+(t.toolEmoji||'🔧')+'</span>';
    bh += '<span class="tool-name">'+(t.displayName||t.name)+badge+'</span>';
    bh += '</a>';
  });
});

console.log('카테고리 수:', CATEGORIES.length);
console.log('모달 내 도구 tool-card 수:', totalTools, '(40이어야 함)');

// index-preview.html 에서 모달 구조 검증
const html = fs.readFileSync('index-preview.html', 'utf8');
const hasModal = html.includes('id="pvModal"') && html.includes('id="pvModalBody"') && html.includes('id="pvModalClose"') && html.includes('id="pvModalTitle"') && html.includes('id="pvModalCount"');
const hasEsc = html.includes("e.key==='Escape'");
const hasBackdrop = html.includes("e.target===modal");
const hasFade = html.includes('transition:opacity .2s') || html.includes('transform .2s');
const hasModalClass = html.includes('.pv-modal{') && html.includes('.pv-modal.open{');
console.log('모달 요소(id 5개):', hasModal ? '✅' : '❌');
console.log('ESC 닫기:', hasEsc ? '✅' : '❌');
console.log('배경클릭 닫기:', hasBackdrop ? '✅' : '❌');
console.log('0.2s 페이드/확대 애니메이션:', hasFade ? '✅' : '❌');
console.log('모달 CSS 클래스:', hasModalClass ? '✅' : '❌');
console.log('아코디언 잔재(pv-detail):', html.includes('pv-detail') ? '❌ 남아있음' : '✅ 제거됨');
console.log('alert("연결 예정") 잔재:', html.includes('연결 예정') ? '❌ 남아있음' : '✅ 제거됨');
