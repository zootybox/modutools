// index-preview.html 아코디언 렌더 로직 검증 (카테고리 카드 + 도구 목록)
const fs = require('fs');
let src = fs.readFileSync('js/categories.js', 'utf8');
src = src.replace('const CATEGORIES', 'var CATEGORIES');
eval(src);

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

let totalDetail = 0, totalToolHtml = 0;
let h = '';
CATEGORIES.forEach(function(cat){
  var tools = cat.tools || [];
  h += '<div class="pv-card" data-cat="'+esc(cat.id)+'">...카드...</div>';
  h += '<div class="pv-detail" data-cat="'+esc(cat.id)+'">';
  h += '<button class="pv-detail-close" data-close="'+esc(cat.id)+'">✕</button>';
  totalDetail++;
  h += '<div class="pv-tool-grid">';
  tools.forEach(function(t){
    totalToolHtml++;
    h += '<a href="'+esc(t.url)+'" class="tool-card">';
    var badge = t.badge==='hot' ? 'HOT' : (t.badge==='new' ? 'NEW' : '');
    h += '<div class="tool-name">'+(t.displayName||t.name)+badge+'</div>';
    h += '</a>';
  });
  h += '</div></div>';
});

console.log('카테고리 카드 수:', CATEGORIES.length);
console.log('pv-detail(아코디언) 수:', totalDetail, '(카테고리와 같아야 함)');
console.log('생성되는 tool-card(도구 링크) 수:', totalToolHtml, '(총 40이어야 함)');
console.log('각 카테고리 배지 샘플:');
CATEGORIES.forEach(function(cat){
  var hot = cat.tools.filter(function(t){return t.badge==='hot';}).length;
  var nw = cat.tools.filter(function(t){return t.badge==='new';}).length;
  console.log('  '+cat.id+': '+cat.tools.length+'개 (HOT '+hot+' / NEW '+nw+')');
});
console.log(totalDetail===CATEGORIES.length && totalToolHtml===40 ? '✅ 아코디언 구조 정상' : '⚠️ 구조 문제');
