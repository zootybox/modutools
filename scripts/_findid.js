const c = require('fs').readFileSync('calc/salary.html', 'utf8');
['resultArea', 'mainResult', '실수령액', '월 실수령액', 'monthlyPay', 'id="result', 'getElementById'].forEach(k => {
  const re = new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  console.log('[' + k + '] ' + ((c.match(re) || []).length) + '회');
});
// calculate 함수 내용 발췌
const ci = c.indexOf('function calculate');
console.log('\n--- calculate 함수 ---');
console.log(c.slice(ci, ci + 600));