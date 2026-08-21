const fs = require('fs');
const s = fs.readFileSync('js/ui-common.js', 'utf8');
const up = s.match(/\\U[0-9A-Fa-f]{8}/g) || [];
console.log('대문자 \\U[hex]{8} 잔존:', up.length);
console.log('남은 값:', up);
console.log('소문자 \\u2600\\ufe0f 유지:', s.includes('\\u2600\\ufe0f'));
console.log('🌙 개수:', (s.match(/🌙/g) || []).length, '/ 🏠 개수:', (s.match(/🏠/g) || []).length);