// index-preview.html 렌더 로직 검증 (categories.js에서 새 label 확인)
const fs = require('fs');
let src = fs.readFileSync('js/categories.js', 'utf8');
src = src.replace('const CATEGORIES', 'var CATEGORIES');
eval(src);

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

const expectLabels = {
  calc: '월급·세금 계산기',
  image: '사진·이미지 편집',
  text: '글자수·텍스트 도구',
  convert: '파일·단위 변환',
  generate: 'QR·워터마크 생성',
  life: '생활 정보 도구',
  sports: '운동 계산기'
};

let ok = true;
CATEGORIES.forEach(function(cat){
  if (!expectLabels[cat.id]) { console.log('예상치 못한 카테고리 id:', cat.id); ok=false; }
  else if (cat.label !== expectLabels[cat.id]) { console.log('label 불일치:', cat.id, '=>', cat.label); ok=false; }
  // 대표 태그 2개 (첫 2개 도구)
  const t1 = cat.tools[0] ? (cat.tools[0].displayName || cat.tools[0].name) : '';
  const t2 = cat.tools[1] ? (cat.tools[1].displayName || cat.tools[1].name) : '';
  if (!t1 || !t2) { console.log('대표태그 부족:', cat.id); ok=false; }
  console.log(cat.id, '|', cat.label, '|', cat.tools.length + '개', '| 대표:', t1 + ', ' + t2, '| iconColor:', cat.color);
});

// url 개수 및 id 중복 여부
const urls = CATEGORIES.map(c=>c.tools).flat().map(t=>t.url);
const ids = CATEGORIES.map(c=>c.id);
console.log('---');
console.log('총 도구 url:', urls.length, '| 중복 url:', urls.length - new Set(urls).size);
console.log('카테고리 id 중복:', ids.length - new Set(ids).size);
console.log(ok ? '✅ 모든 label 일치' : '⚠️ 불일치 존재');
if (!ok) process.exit(1);
