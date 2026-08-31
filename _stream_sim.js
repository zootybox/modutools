// 누적형/증분형 두 API 계약 각각에 대해 새 로직 시뮬레이션
function process(chunks){
  var fullText='';
  for (var i=0;i<chunks.length;i++){
    var chunk=chunks[i];
    if(chunk.length>=fullText.length && chunk.indexOf(fullText)===0){
      fullText=chunk;
    }else{
      fullText+=chunk;
    }
  }
  return fullText;
}
// 누적형: 각 청크가 지금까지 전체 텍스트 포함
var acc = ['안녕하세요.', '안녕하세요. 당신의', '안녕하세요. 당신의 BMI는', '안녕하세요. 당신의 BMI는 24.2입니다.'];
// 증분형: 각 청크가 새 조각만
var delta = ['안녕하세요.', ' 당신의', ' BMI는', ' 24.2입니다.'];

console.log('누적형 결과  : "'+process(acc)+'"');
console.log('증분형 결과  : "'+process(delta)+'"');
var ok = process(acc)==='안녕하세요. 당신의 BMI는 24.2입니다.' && process(delta)==='안녕하세요. 당신의 BMI는 24.2입니다.';
console.log(ok ? '=> 두 계약 모두 완전한 문장으로 정상 조립' : '=> 실패');