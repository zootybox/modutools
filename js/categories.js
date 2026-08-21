/* ============================================================
 * modutools 카테고리/도구 단일 데이터 소스
 * ------------------------------------------------------------
 * - id/emoji/label   : 사이드바·상단 네비게이션용 (ui-common.js `cats` 반영)
 * - title/color      : 홈 페이지 카테고리 섹션 헤더(제목/아이콘 배경색)
 * - tools[].name        : 카드 data-name (검색용) = 기존 index.html data-name
 * - tools[].displayName : 카드에 표시되는 도구명 (생략 시 name 사용)
 * - tools[].toolEmoji   : 카드 이모지
 * - tools[].badge       : 'hot' | 'new' (없으면 배지 없음)
 * - tools[].desc        : 카드 설명 (기존 tool-desc 그대로)
 *
 * ⚠️ 모든 값은 기존 index.html 하드코딩 카드와 1:1 동일하게 유지
 * ============================================================ */

const CATEGORIES = [
  {
    id: 'calc',
    emoji: '💰',
    label: '월급·세금 계산기',
    title: '금융 계산기',
    color: '#DBEAFE',
    tools: [
      { name: '연봉 실수령액 계산기', url: '/calc/salary.html', toolEmoji: '💵', badge: 'hot', desc: '2026년 4대보험·소득세 반영, 연봉/월급별 실수령액 즉시 계산' },
      { name: '대출이자 계산기', url: '/calc/loan.html', toolEmoji: '🏦', badge: 'new', desc: '원리금균등·원금균등·만기일시 상환 방식별 이자 계산' },
      { name: '전월세 전환율 계산기', url: '/calc/rent.html', toolEmoji: '🏠', badge: 'new', desc: '전세↔월세 전환 시 적정 보증금과 월세 계산' },
      { name: '퇴직금 계산기', url: '/calc/severance.html', toolEmoji: '📦', badge: 'new', desc: '근속연수·평균임금 기준 퇴직금 자동 계산' },
      { name: '적금 이자 계산기', url: '/calc/savings.html', toolEmoji: '🐷', badge: 'new', desc: '단리·복리, 세전·세후 이자 비교 계산' },
      { name: '종합소득세 계산기', url: '/calc/income-tax.html', toolEmoji: '🧾', badge: 'new', desc: '과세표준 구간별 소득세·지방소득세 계산' },
      { name: '4대보험 계산기', url: '/calc/insurance.html', toolEmoji: '🛡️', badge: 'new', desc: '국민연금·건강보험·고용보험·산재보험 공제액 계산' },
      { name: '최저시급 월급 계산기', url: '/calc/minimum-wage.html', toolEmoji: '⏰', badge: 'new', desc: '2026년 최저시급 기준 주휴수당 포함 월급 계산' },
      { name: '상속세 증여세 계산기', displayName: '상속세·증여세 계산기', url: '/calc/tax-inherit.html', toolEmoji: '🏛️', badge: 'new', desc: '2026년 세율 기준, 공제 항목별 예상 세액 자동 계산' }
    ]
  },
  {
    id: 'image',
    emoji: '🖼️',
    label: '사진·이미지 편집',
    title: '이미지 도구',
    color: '#FCE7F3',
    tools: [
      { name: '이미지 압축기', url: '/image/compress.html', toolEmoji: '🗜️', badge: 'new', desc: 'JPG·PNG·WEBP 이미지 용량을 화질 유지하며 줄이기' },
      { name: '이미지 리사이즈', url: '/image/resize.html', toolEmoji: '📐', badge: 'new', desc: '원하는 크기로 이미지 가로·세로 변경' },
      { name: '이미지 포맷 변환', url: '/image/format.html', toolEmoji: '🔄', badge: 'new', desc: 'PNG↔JPG↔WEBP↔GIF 포맷 자유 변환' },
      { name: '이미지 자르기', url: '/image/crop.html', toolEmoji: '✂️', badge: 'new', desc: '원하는 영역만 선택해서 자르기' },
      { name: '증명사진 규격', displayName: '증명사진 규격 맞추기', url: '/image/id-photo.html', toolEmoji: '🪪', badge: 'new', desc: '여권·이력서·주민등록증 사진 규격에 맞게 편집' },
      { name: '워터마크 넣기', url: '/image/watermark.html', toolEmoji: '💧', badge: 'new', desc: '이미지에 텍스트·로고 워터마크 추가' },
      { name: 'EXIF 메타데이터 제거', url: '/image/exif-remove.html', toolEmoji: '🔒', badge: 'new', desc: '사진의 GPS 위치·촬영정보 등 개인정보 완전 삭제' }
    ]
  },
  {
    id: 'text',
    emoji: '📝',
    label: '글자수·텍스트 도구',
    title: '텍스트 도구',
    color: '#D1FAE5',
    tools: [
      { name: '글자수 세기', url: '/text/count.html', toolEmoji: '🔢', badge: 'new', desc: '공백포함·제외·바이트수 실시간 카운트' },
      { name: '중복 줄 제거', url: '/text/dedupe.html', toolEmoji: '🧹', badge: 'new', desc: '텍스트에서 중복된 줄을 자동으로 제거' },
      { name: '대소문자 변환', url: '/text/case.html', toolEmoji: '🔤', badge: 'new', desc: '영문 대문자↔소문자 일괄 변환' },
      { name: '공백 정리기', url: '/text/space.html', toolEmoji: '✨', badge: 'new', desc: '불필요한 공백·줄바꿈을 깔끔하게 정리' },
      { name: '이미지 텍스트 추출 OCR', displayName: '이미지 텍스트 추출 (OCR)', url: '/text/ocr.html', toolEmoji: '🔍', badge: 'hot', desc: '이미지 속 글자를 텍스트로 변환' }
    ]
  },
  {
    id: 'convert',
    emoji: '🔄',
    label: '파일·단위 변환',
    title: '변환기',
    color: '#FEF3C7',
    tools: [
      { name: '이미지 PDF 변환', url: '/convert/image-to-pdf.html', toolEmoji: '📄', badge: 'hot', desc: '여러 장 이미지를 하나의 PDF로 변환' },
      { name: 'PDF 합치기 분할', displayName: 'PDF 합치기 / 분할', url: '/convert/pdf-merge.html', toolEmoji: '📑', badge: 'hot', desc: '여러 PDF 합치기, 페이지별 분할' },
      { name: '단위 변환기', url: '/convert/unit.html', toolEmoji: '📏', badge: 'new', desc: '길이·무게·면적·부피 단위 변환' },
      { name: '날짜 계산기', url: '/convert/date.html', toolEmoji: '📅', badge: 'new', desc: 'D-Day 계산, 두 날짜 사이 일수 계산' },
      { name: '나이 계산기', url: '/convert/age.html', toolEmoji: '🎂', badge: 'new', desc: '만나이·한국나이·띠 한번에 확인' },
      { name: '색상 코드 변환', url: '/convert/color.html', toolEmoji: '🎨', badge: 'new', desc: 'HEX↔RGB↔HSL 색상 코드 상호 변환' },
      { name: '시간대 변환기', url: '/convert/timezone.html', toolEmoji: '🌍', badge: 'new', desc: '전 세계 시간대 실시간 변환' },
      { name: 'TTS 음성 변환', url: '/convert/tts.html', toolEmoji: '🔊', badge: 'new', desc: '텍스트를 한국어·영어 음성으로 변환' },
      { name: '자막 텍스트 추출기', url: '/convert/subtitle-extractor.html', toolEmoji: '📜', badge: 'new', desc: 'SRT·VTT·ASS 자막에서 대본 텍스트 추출' },
      { name: '오디오 편집기', url: '/convert/audio-editor.html', toolEmoji: '🎚️', badge: 'new', desc: '여러 음성 파일 합치기·순서 변경·WAV 저장' }
    ]
  },
  {
    id: 'generate',
    emoji: '⚡',
    label: 'QR·워터마크 생성',
    title: '생성기',
    color: '#EDE9FE',
    tools: [
      { name: 'QR코드 생성기', url: '/generate/qr.html', toolEmoji: '📱', badge: 'new', desc: 'URL·텍스트·연락처용 QR코드 즉시 생성' },
      { name: '비밀번호 생성기', url: '/generate/password.html', toolEmoji: '🔐', badge: 'new', desc: '안전한 랜덤 비밀번호 생성' },
      { name: '닉네임 생성기', url: '/generate/nickname.html', toolEmoji: '🏷️', badge: 'new', desc: '게임·SNS용 랜덤 닉네임 추천' },
      { name: '랜덤 숫자 생성기', url: '/generate/random.html', toolEmoji: '🎲', badge: 'new', desc: '범위 지정 랜덤 숫자·추첨번호 생성' }
    ]
  },
  {
    id: 'life',
    emoji: '🏠',
    label: '생활 정보 도구',
    title: '생활 도구',
    color: '#FFEDD5',
    tools: [
      { name: 'BMI 계산기', url: '/life/bmi.html', toolEmoji: '⚖️', badge: 'new', desc: '키·체중으로 체질량지수(BMI) 확인' },
      { name: '전기요금 계산기', url: '/life/electric.html', toolEmoji: '💡', badge: 'new', desc: '사용량 기준 예상 전기요금 계산' },
      { name: '학점 계산기', url: '/life/gpa.html', toolEmoji: '🎓', badge: 'new', desc: '4.3/4.5 만점 기준 평균 학점 계산' },
      { name: '연차 계산기', url: '/life/annual-leave.html', toolEmoji: '🗓️', badge: 'new', desc: '입사일 기준 연차 발생일수 자동 계산' }
    ]
  },
  {
    id: 'sports',
    emoji: '🏋️',
    label: '운동 계산기',
    title: '운동 도구',
    color: '#FEE2E2',
    tools: [
      { name: '인터벌 타이머', url: '/sports/interval-timer.html', toolEmoji: '⏱️', badge: 'hot', desc: '타바타·HIIT 운동용 타이머, 음성 안내 지원' }
    ]
  }
];