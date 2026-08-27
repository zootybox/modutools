# modutools 카테고리 데이터 조사 보고서

> 조사일: 2026-08-27
> 대상: `js/categories.js`, 도구 페이지 HTML, `js/ui-common.js`
> 성격: **읽기 전용 조사** (파일 생성: `report.md` 본 건만 신규, 그 외 어떤 파일도 수정/생성/삭제하지 않음)

---

## 1. js/categories.js 전체 내용 (그대로 출력)

```js
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
```

---

## 2. 카테고리 개수·id/label·포함 도구 요약

**총 카테고리: 7개 / 총 도구: 40개**

| # | id | label (categories.js) | title (홈 헤더) | color | 도구 수 |
|:--:|:---|:----------------------|:-----------------|:------|:---:|
| 1 | calc | 월급·세금 계산기 | 금융 계산기 | #DBEAFE | 9 |
| 2 | image | 사진·이미지 편집 | 이미지 도구 | #FCE7F3 | 7 |
| 3 | text | 글자수·텍스트 도구 | 텍스트 도구 | #D1FAE5 | 5 |
| 4 | convert | 파일·단위 변환 | 변환기 | #FEF3C7 | 10 |
| 5 | generate | QR·워터마크 생성 | 생성기 | #EDE9FE | 4 |
| 6 | life | 생활 정보 도구 | 생활 도구 | #FFEDD5 | 4 |
| 7 | sports | 운동 계산기 | 운동 도구 | #FEE2E2 | 1 |

### 카테고리별 도구 목록 (도구명 + href)

**calc (9)**
1. 연봉 실수령액 계산기 → `/calc/salary.html`
2. 대출이자 계산기 → `/calc/loan.html`
3. 전월세 전환율 계산기 → `/calc/rent.html`
4. 퇴직금 계산기 → `/calc/severance.html`
5. 적금 이자 계산기 → `/calc/savings.html`
6. 종합소득세 계산기 → `/calc/income-tax.html`
7. 4대보험 계산기 → `/calc/insurance.html`
8. 최저시급 월급 계산기 → `/calc/minimum-wage.html`
9. 상속세·증여세 계산기 → `/calc/tax-inherit.html`  (displayName)

**image (7)**
- 이미지 압축기 → `/image/compress.html` / 리사이즈 → `/image/resize.html` / 포맷 변환 → `/image/format.html`
- 자르기 → `/image/crop.html` / 증명사진 규격 맞추기 → `/image/id-photo.html` / 워터마크 → `/image/watermark.html` / EXIF 제거 → `/image/exif-remove.html`

**text (5)**
- 글자수 세기 → `/text/count.html` / 중복 줄 제거 → `/text/dedupe.html` / 대소문자 변환 → `/text/case.html` / 공백 정리기 → `/text/space.html` / 이미지 텍스트 추출(OCR) → `/text/ocr.html`

**convert (10)**
- 이미지 PDF 변환 → `/convert/image-to-pdf.html` / PDF 합치기 분할 → `/convert/pdf-merge.html` / 단위 변환기 → `/convert/unit.html`
- 날짜 계산기 → `/convert/date.html` / 나이 계산기 → `/convert/age.html` / 색상 코드 변환 → `/convert/color.html`
- 시간대 변환기 → `/convert/timezone.html` / TTS 음성 변환 → `/convert/tts.html` / 자막 텍스트 추출기 → `/convert/subtitle-extractor.html` / 오디오 편집기 → `/convert/audio-editor.html`

**generate (4)** — QR코드 생성기 `/generate/qr.html` · 비밀번호 `/generate/password.html` · 닉네임 `/generate/nickname.html` · 랜덤 숫자 `/generate/random.html`

**life (4)** — BMI `/life/bmi.html` · 전기요금 `/life/electric.html` · 학점 `/life/gpa.html` · 연차 `/life/annual-leave.html`

**sports (1)** — 인터벌 타이머 `/sports/interval-timer.html`

---

## 3. categories.js 참조 파일·breadcrumb 표시 방식

### 3.1 categories.js 를 직접 참조하는 HTML
| 파일 | 참조 | 용도 |
|:-----|:----:|:-----|
| `index-preview.html` | ✅ | 홈 프리뷰 카드/모달/인기태그/검색 동적 렌더링 (CATEGORIES 사용) |
| `index_backup.html` | ✅ | (백업) 홈 사이드바·상단네비·카테고리 섹션 동적 렌더링 |
| `index.html` | ✅ | 홈 카테고리 섹션 동적 렌더링 |

> **주의:** 40개 도구 페이지(calc/image/text/convert/generate/life/sports 폴더의 *.html) 중 **categories.js 를 직접 `<script>` 로 참조하는 파일은 0개**. 모두 대신 `ui-common.js` 만 참조한다.

### 3.2 breadcrumb(카테고리명) 표시 방식 — categories.js 미참조, ui-common.js 자체 하드코딩
- 도구 페이지들은 `categories.js` 를 로드하지 않고 **`ui-common.js`**(`<script src="/js/ui-common.js">`)만 로드한다.
- `ui-common.js` 가 breadcrumb(홈 › 카테고리 › 도구명)를 **DOM 주입**으로 생성하며, 카테고리 목록을 **자체 배열 하드코딩**(`var cats=[...]`)으로 가진다:
  ```js
  var cats=[
    {id:'calc',emoji:'💰',label:'계산기'},
    {id:'image',emoji:'🖼️',label:'이미지'},
    {id:'text',emoji:'📝',label:'텍스트'},
    {id:'convert',emoji:'🔄',label:'변환기'},
    {id:'generate',emoji:'⚡',label:'생성기'},
    {id:'life',emoji:'🏠',label:'생활'},
    {id:'sports',emoji:'🏋️',label:'운동'}
  ];
  ```
  - URL 경로(`/calc/`, `/image/` …)로 현재 카테고리를 판별하고 `cat.label` 을 breadcrumb 링크 텍스트로 사용.

### 3.3 핵심 시사점 (카테고리명 불일치)
- **categories.js 의 `label`** 과 **ui-common.js 의 `cats[].label`(breadcrumb 채택 label)** 이 **다르다**:
  - calc : `월급·세금 계산기` vs breadcrumb `계산기`
  - image : `사진·이미지 편집` vs `이미지`
  - text : `글자수·텍스트 도구` vs `텍스트`
  - convert : `파일·단위 변환` vs `변환기`
  - generate : `QR·워터마크 생성` vs `생성기`
  - life : `생활 정보 도구` vs `생활`
  - sports : `운동 계산기` vs `운동`
- 카드 표시명 중 일부는 `displayName` 사용 (상속세·증여세 계산기, 증명사진 규격 맞추기, PDF 합치기 / 분할, 이미지 텍스트 추출 (OCR)).

---

## 4. 요약
- categories.js = 홈(index 계열) 전용 단일 소싱, 7 카테고리·40 도구.
- 도구 페이지 breadcrumb 는 **categories.js 를 쓰지 않고 ui-common.js 하드코딩 cats 배열** 로 렌더링.
- 카테고리명을 일치시키려면 categories.js 와 ui-common.js(cats) 를 한쪽으로 통합하거나, ui-common.js 주입 breadcrumb 와 categories.js 를 단일 소스로 묶는 리팩토링 필요 (본 보고서는 조사만, 코드 변경 없음).

---
*본 보고서는 읽기 전용 조사 결과이며 어떤 소스 파일도 수정되지 않았다. (신규 생성: report.md 외 없음)*