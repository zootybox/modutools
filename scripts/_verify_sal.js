const { execFileSync } = require('child_process');
const fs = require('fs');
const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const DIR = 'c:/Users/user/Documents/GitHub/modutools';
const tmp = 'c:/Users/user/Documents/GitHub/modutools/.vtest';
const base = 'http://127.0.0.1:8000';
fs.mkdirSync(tmp, { recursive: true });

const probe = `
<script>
window.__errors = [];
window.onerror = function(m, s, l, c) { window.__errors.push(String(m) + '@' + l); };
(function(){
  var r = { hasFnCalculate: typeof calculate === 'function', hasFnOnInput: typeof onInput === 'function', resultExists: !!document.getElementById('resultArea') };
  try { if (typeof calculate === 'function') calculate(); } catch(e){ r.runErr = String(e); }
  var mr = document.getElementById('mainResult');
  if (mr) r.mainResultText = mr.textContent;
  var mrl = null;
  var lbl = document.querySelector('.tool-result-label');
  if (lbl) r.resultLabel = lbl.textContent;
  r.errors = window.__errors;
  document.title = 'RESULT:' + JSON.stringify(r);
})();
</script>`;

function run() {
  let src = fs.readFileSync(DIR + '/calc/salary.html', 'utf8');
  src = src.replace(/<link rel="stylesheet" href="[^"]*common\.css">/, '<link rel="stylesheet" href="' + base + '/css/common.css">');
  src = src.replace(/<script src="[^"]*\/js\/ui-common\.js"><\/script>/g, '');
  src = src.replace('</body>', probe + '</body>');
  fs.writeFileSync(tmp + '/salary.html', src, 'utf8');
  const dom = execFileSync(chrome, ['--headless=new', '--disable-gpu', '--dump-dom', '--virtual-time-budget=2500', base + '/.vtest/salary.html'], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  const mm = dom.match(/<title>(RESULT:.*?)<\/title>/);
  return mm ? mm[1] : 'NO-RESULT';
}

console.log(run());