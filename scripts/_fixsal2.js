const fs = require('fs');
const p = 'calc/salary.html';
let c = fs.readFileSync(p, 'utf8');
const before = Buffer.byteLength(c, 'utf8');
const oldS = '<script><script>\nlet mode';
const newS = '<script>\nlet mode';
const cnt = (c.match(new RegExp(oldS.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
console.log('매칭 수: ' + cnt);
if (cnt === 1) {
  c = c.replace(oldS, newS);
  fs.writeFileSync(p, c, 'utf8');
  console.log('수정 완료. bytes ' + before + ' -> ' + Buffer.byteLength(c, 'utf8'));
  console.log('이중 script 잔존: ' + c.includes('<script><script>'));
  console.log('<script> 열린 수: ' + ((c.match(/<script>/g) || []).length));
} else {
  console.log('매칭 실패, 수정 안함');
}