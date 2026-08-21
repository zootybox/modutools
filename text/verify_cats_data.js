// categories.js 데이터 + 렌더 로직 검증
const fs = require('fs');
let src = fs.readFileSync('js/categories.js', 'utf8');
src = src.replace('const CATEGORIES', 'var CATEGORIES'); // const는 eval 밖에서 보이지 않음
eval(src);

let total = 0, hot = 0, nw = 0, dualBadge = 0;
const problems = [];
CATEGORIES.forEach(function (cat) {
  if (!cat.title) problems.push('title 누락: ' + cat.id);
  if (!cat.color) problems.push('color 누락: ' + cat.id);
  if (!cat.label) problems.push('label 누락: ' + cat.id);
  if (!cat.emoji) problems.push('emoji 누락: ' + cat.id);
  (cat.tools || []).forEach(function (t) {
    total++;
    if (t.badge === 'hot') hot++; else if (t.badge === 'new') nw++; else dualBadge++;
    if (!t.toolEmoji) problems.push('toolEmoji 누락: ' + t.name);
    if (!t.url) problems.push('url 누락: ' + t.name);
    if (!t.desc) problems.push('desc 누락: ' + t.name);
    if (t.displayName && t.displayName === t.name) problems.push('불필요 displayName: ' + t.name);
  });
});

console.log('총 도구:', total, '/ HOT:', hot, '/ NEW:', nw, '/ 배지없음:', dualBadge);
console.log('카테고리 수:', CATEGORIES.length);
console.log('문제 수:', problems.length);
problems.forEach(p => console.log('  -', p));
if (total !== 40) { console.log('⚠️ 총 개수가 40이 아님!'); process.exit(1); }
if (problems.length) { console.log('⚠️ 데이터 문제 존재'); process.exit(1); }
console.log('✅ categories.js 데이터 검증 통과');
