const fs = require('fs');
const c = fs.readFileSync('calc/salary.html', 'utf8');
const idx = c.indexOf('<script><script>');
console.log('이중 script 위치: ' + idx);
console.log('그 주변 정확한 문자열 (JSON):');
console.log(JSON.stringify(c.slice(idx - 30, idx + 60)));
console.log('\n줄바꿈 확인 (charCode):');
for (let i = idx; i < idx + 20; i++) console.log(i + ':' + JSON.stringify(c[i]));