// 카운터 로직 시뮬레이션: 초과 시 disabled, 이내 복귀 시 정상화
const MAX_LEN = 3000;
let value = '';
let counterText = '';
let overClass = false;
let btnDisabled = false;
let limitDisplay = 'none';
function updateCounter() {
  const len = value.length;
  counterText = '현재 ' + len.toLocaleString() + '자 / 최대 ' + MAX_LEN.toLocaleString() + '자';
  overClass = len > MAX_LEN;
  btnDisabled = overClass;
  limitDisplay = overClass ? 'block' : 'none';
}
// 3,000자 이내
value = 'a'.repeat(2999); updateCounter();
console.log('이내 2999자: btnDisabled=' + btnDisabled + ' counter="' + counterText + '"');
// 초과
value = 'a'.repeat(3001); updateCounter();
console.log('초과 3001자: btnDisabled=' + btnDisabled + ' limit=' + limitDisplay + ' over=' + overClass);
// 복귀
value = 'a'.repeat(2000); updateCounter();
console.log('복귀 2000자: btnDisabled=' + btnDisabled + ' limit=' + limitDisplay + ' over=' + overClass);