const c = require('fs').readFileSync('calc/salary.html', 'utf8');
const ci = c.indexOf('function calculate');
console.log('--- calculate 함수 전체 ---');
console.log(c.slice(ci, ci + 1900));
// id="result" 3개 문맥
console.log('\n--- id="result... 문맥 ---');
let i = 0, idx = -1;
while (i < 3) {
  idx = c.indexOf('id="result', idx + 1);
  if (idx < 0) break;
  console.log(JSON.stringify(c.slice(idx - 40, idx + 40)));
  i++;
}