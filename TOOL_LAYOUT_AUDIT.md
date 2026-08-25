# TOOL_LAYOUT_AUDIT — 도구 페이지 전수조사 (레이아웃 · 폰트 · 다크모드)

> **작성일:** 2026-08-21
> **대상:** `calc/ image/ text/ convert/ generate/ life/ sports/` 폴더의 모든 `.html` (총 41개)
> **성격:** 기존 `AUDIT_REPORT.md`(2026-08-20, SEO/리팩토링 분석)와 별개의 **레이아웃/폰트/다크모드 전수조사** 리포트
> **방법:** 각 파일의 `<style>` 및 본문 DOM 구조를 스크립트로 추출·집계

---

## 1. 레이아웃 구조 파악

### 1.1 전체 페이지 최상위 구조 (공통 프레임)
거의 모든 도구 페이지는 아래 **공통 골격**으로 시작합니다 (다른 패턴 소수):

```
<body>
  └ (ui-common.js 가 상단 헤더 + breadcrumb 주입 — 사이드바 제거 후)
  └ <main class="page">  (일부는 <main> 또는 <div class="workspace">)
      └ <h1 class="page-title">
      └ <div class="security-badge">   (🔒 로컬 처리 배지)
      └ <div class="card">              (입력 폼 카드)
      └ <div class="guide-section">     (가이드/FAQ)
```

### 1.2 구조 패턴 분류 (총 5종 + 변형)
조사 결과 서로 다른 **5가지 구조 패턴**이 존재합니다.

| 패턴 | 특징 | 뼈대 예 | 해당 페이지 수 |
|:-----|:-----|:--------|:----------:|
| **A — 카드 + 가이드/FAQ** | 입력카드 1개 + 하단 가이드/FAQ | `card > card-title > … > guide-section > faq-item` | 10 |
| **B — 카드 + 결과박스** | 입력카드 + 큰 결과 박스(result-big/result-area) | `card > … > result-area > result-big` | 16 |
| **C — 카드 + 결과 + 통계그리드** | 결과 박스 + stat-box 통계 그리드 | `card > … > result-area > stats-grid > stat-box` | 6 |
| **D — mt- 고유 커스텀** | 고유 mt- 클래스 구조 (가이드/FAQ에 mt-guide/mt-faq) | `mt-tabs > mt-card > mt-field > mt-result` | 5 |
| **E — tool-/workspace- 커스텀** | tool- 또는 workspace- 접두사 전용 구조 | `tool-card > tool-clip-list` / `workspace > panel-card` | 4 |

**합계 41개** (A 10 + B 16 + C 6 + D 5 + E 4)

#### 패턴별 상세
- **타입 A (10)**: `calc/salary`, `image/compress`, `image/crop`, `text/count`, `convert/color`, `generate/nickname`, `generate/qr`, `generate/tts`, `sports/interval-timer`, (text/case 등 일부)
- **타입 B (16)**: calc 대부분(income-tax, insurance, rent, savings, severance), image(compress 제외 다수), text/ocr, convert(age, date, image-to-pdf, pdf-merge, timezone, unit), generate/password·random, life/electric
- **타입 C (6)**: calc/loan, calc/minimum-wage, convert/age, life/annual-leave, life/bmi, life/gpa
- **타입 D (5)**: calc/tax-inherit(`mt-tabs/mt-card/mt-result`), image/exif-remove(`mt-upload/mt-progress`), text/case·dedupe·space(`mt-guide/mt-faq`)
- **타입 E (4)**: image/resize(`workspace` 2단), convert/audio-editor·subtitle-extractor·tts(`tool-card` 계열)

### 1.3 CSS 소스 구성
- **41개 전부 "인라인 `<style>` + 공통 `common.css`" 혼합** 사용.
- 개별 페이지가 자기만의 `<style>`(폼/카드 스타일)을 갖고 있고, 공통(배지/가이드/FAQ/다크모드 변수/최신 헤더)은 `common.css`에 의존.
- `<style>`만 쓰는 페이지·common만 쓰는 페이지는 **없음** (전부 혼합형).
- (참고) 일부 페이지(calc/tax-inherit 등)는 이전 빌드 산출물로 CSS 구조가 다소 이질적.

---

## 2. 폰트 일관성

### 2.1 font-size 종류 집계
- **단위 분류**: 대부분 `px`, 일부 페이지는 `rem` 단위를 씀.
  - **rem 사용 페이지**: `calc/tax-inherit`, `image/exif-remove`, `image/convert/image-to-pdf`, `image/convert/pdf-merge`, `life/gpa` 등 (px과 rem이 섞임)
- **px 기반 페이지의 흔한 폰트 크기**: `10px~48px` 범위, 공통 사용 빈도 높은 값: `11px, 12px, 13px, 13.5px, 14px, 15px, 16px, 17px, 18px, 20px, 22px, 24px, 26px, 28px, 32px, 34px, 36px, 40px, 42px, 48px`
- **페이지별 font-size 종류 수** (대략): 평균 8~13종. 상세는 §4 표 참조.

### 2.2 zoom / transform:scale (전체 축소) 여부
- **`zoom:` 사용 페이지: 없음** (전 페이지에서 0건).
- **`transform:scale`**: 일부 페이지에 **버튼/요소의 미세 애니메이션**(`:active{transform:scale(.95)}` 등)만 존재 → **전체 화면 축소 아님** (정상).
- 즉, html/body/래퍼에 전체 축소(zoom/scale) 속성은 **없음**.

### 2.3 유독 다르게 보이는 페이지 (image/compress.html 포함)
| 페이지 | 차이점 | 원인 CSS |
|:-------|:-------|:---------|
| **image/compress.html** | 큰 폰트(48px) + dropzone 중심 UI, 본문이 `.page`(max-width 없음) 형태 | `.card{background:#fff}`, `.dropzone{…}`, `font-size:48px` (드롭존 아이콘/숫자) |
| **calc/tax-inherit.html** | mt- 탭/카드 구조, **rem 단위 폰트**, 고유 mt-field | `body{background:#f5f7fa;color:#1a1a2e}` 하드코딩, `mt-*` 클래스 전용 |
| **image/exif-remove.html** | mt- 업로드/프로그레스 구조, rem 폰트 | `body{background:#f5f7fa}`, `mt-upload/mt-progress` |
| **image/resize.html** | **2단 워크스페이스**(좌 패널+우 프리뷰) | `.workspace{display:flex}`, `workspace-panel/workspace-preview` |
| **sports/interval-timer.html** | 타이머 숫자 폰트가 매우 큼(90px/120px), `body.prep` 배경 전환 | `font-size:90px/120px`, `body.prep{background:linear-gradient(...)}` |
| **convert/audio-editor, subtitle-extractor, tts** | `tool-card` 계열 전용 구조 | `tool-card/tool-clip-list/tool-btn-area` 등 고유 클래스 |

> **공통 요인**: font-size를 **px로 각자 하드코딩**(통일 변수 부재) + 일부 페이지 rem 혼용 + 고유 커스텀 구조 → 페이지마다 폰트 스케일이 제각각으로 보임. 특히 compress의 48px, interval-timer의 90/120px, tax-inherit/exif-remove의 rem 혼용이 눈에 띕니다.

---

## 3. 다크모드 대비 문제

### 3.1 처리 방식 확인
**41개 페이지 모두 자체 다크모드 CSS 미보유.** 각 페이지의 `<style>`에 `[data-theme="dark"]`, `prefers-color-scheme`, `.dark` 규칙이 **1건도 없습니다.**

→ 다크모드는 **전부 공통 `css/common.css` 의 전역 `[data-theme="dark"]` 변수**에만 의존합니다 (ui-common.js가 `data-theme` 속성 토글, common.css가 `--bg`/`--card-bg`/`--text` 등을 전환).

### 3.2 텍스트/배경 색상이 변수인지 고정값인지
- **공통 프레임**(배지/가이드/FAQ/카드): common.css의 CSS 변수(`var(--card-bg)`, `var(--text)` 등) 사용 → 다크모드 전환 시 자동 대응.
- **각 페이지 인라인 `<style>`**: 대부분 **라이트 모드용 고정값 하드코딩** (`background:#fff`, `color:#…`) → **다크모드 미대응**.

### 3.3 하드코딩 색상으로 대비가 깨질 조합
전수검색 결과, 각 페이지 `<style>`에 **`background:#fff`(흰 배경 고정)** 가 페이지당 1~7회, **`color:#000/#111`(검은 글씨)** 는 0회(직접 선언 거의 없음) 확인.

| 위험 유형 | 내용 | 심각도 |
|:----------|:-----|:------:|
| **흰 배경 카드 고정** | `.card{background:#fff;...}` 가 거의 전 페이지 인라인에 존재 → 다크모드에서도 하얀 카드 + 밝은 배경 대비 부족 | 🔴 상 |
| **result/슬라이더 고정** | 결과 박스·입력 필드 등 흰 배경 하드코딩 → 테두리/글자 색이 밝게 유지돼 대비 약화 | 🟡 중 |
| **`color:#000` 직접 선언** | 전 페이지에서 0회 — 검은 글씨로 인한 "흰배경+흰글씨/검은배경+검은글씨" 직접 사례는 **거의 없음** | 🟢 하 |
| **최신 페이지(mt-/tool- 계열)** | tax-inherit, exif-remove 등 `body{background:#f5f7fa;color:#1a1a2e}` 고정 → 다크 토글이 무용 | 🔴 상 |

**대표 위험 페이지 (흰 배경 고정 다수):**
- `sports/interval-timer.html` — 하드코딩 흰 배경/밝은 요소 최다 (다크 대비 최악)
- `convert/unit.html`, `generate/*`, `image/compress/crop` — `.card`·`stat-box` 흰 배경 고정

### 3.4 페이지별 다크모드 처리 통일성
- **통일돼 있지 않음(제각각).** 공통 프레임만 `common.css` 변수로 동작하고, 각 페이지 몸체(카드/결과/드롭존)는 **라이트 고정값**이라 다크모드에서 대비가 페이지마다 다르게 깨집니다.
- 즉, **공통 CSS만 다크 대응하고, 페이지별 인라인 바디 스타일은 다크 미지원** 상태입니다.

---

## 4. 종합 결과표

### 범례
- **레이아웃**: A(카드+가이드/FAQ) / B(카드+결과박스) / C(카드+결과+통계) / D(mt-커스텀) / E(tool·workspace 커스텀)
- **CSS**: 전부 `인라인+common` 혼합 (I+C)
- **다크모드**: ⚠️ = 흰 배경 하드코딩으로 대비 위험 / ✅ = 공통 변수 대응 위주 / 🔴 = 최신 게시판 고정배경
- **원인**: 해당 페이지에서 대비/폰트 문제를 일으키는 CSS
- **우선순위**: 상(즉시) / 중(단기) / 하(참고)

| 파일 경로 | 레이아웃 | font-size(종) | 다크모드 | 원인 CSS | 우선순위 |
|:----------|:--------:|:--------------|:--------:|:---------|:--------:|
| calc/salary.html | A | 10종(px) | ⚠️ | `.card{background:#fff}` | 중 |
| calc/income-tax.html | B | 9종(px) | ⚠️ | `.card` 흰배경 | 중 |
| calc/insurance.html | B | 8종(px) | ⚠️ | `.card` 흰배경 | 중 |
| calc/loan.html | C | 8종(px) | ⚠️ | `.card`·`stat-box` 흰배경 | 중 |
| calc/minimum-wage.html | C | 8종(px) | ⚠️ | `.card`·`stat-box` 흰배경 | 중 |
| calc/rent.html | B | 8종(px) | ⚠️ | `.card` 흰배경 | 중 |
| calc/savings.html | B | 9종(px) | ⚠️ | `.card` 흰배경 | 중 |
| calc/severance.html | B | 8종(px) | ⚠️ | `.card` 흰배경 | 중 |
| calc/tax-inherit.html | D | rem 혼용 | 🔴 | `body{background:#f5f7fa;color:#1a1a2e}` 고정, `mt-*` | 상 |
| image/compress.html | B | 8종(px, 48px) | ⚠️ | `.dropzone`, 48px 폰트 | 중 |
| image/crop.html | B | 8종(px) | ⚠️ | `.card`·크롭 UI 흰배경 | 중 |
| image/exif-remove.html | D | rem 혼용 | 🔴 | `body{background:#f5f7fa}` 고정, `mt-*` | 상 |
| image/format.html | B | 8종(px) | ⚠️ | `.card` 흰배경 | 중 |
| image/id-photo.html | B | 8종(px) | ⚠️ | `.card` 흰배경 | 중 |
| image/resize.html | E | 5종(px) | ⚠️ | `workspace` 2단, `.panel-card` | 중 |
| image/watermark.html | B | 8종(px) | ⚠️ | `.card` 흰배경 | 중 |
| text/count.html | A | 10종(px) | ⚠️ | `.card` 흰배경 | 중 |
| text/case.html | D | 8종(px) | 🔴 | `mt-guide/mt-faq` 고정 | 중 |
| text/dedupe.html | D | 9종(px) | 🔴 | `mt-guide/mt-faq` 고정 | 중 |
| text/space.html | D | 8종(px) | 🔴 | `mt-guide/mt-faq` 고정 | 중 |
| text/ocr.html | B | 12종(px) | ⚠️ | `.card`·업로드 흰배경 | 중 |
| convert/age.html | C | 10종(px) | ⚠️ | `.card` 흰배경 | 중 |
| convert/audio-editor.html | E | 8종(px) | ⚠️ | `tool-card` 계열 | 중 |
| convert/color.html | A | 8종(px) | ⚠️ | `.card` 흰배경 | 중 |
| convert/date.html | B | 13종(px) | ⚠️ | `.card` 흰배경 | 중 |
| convert/image-to-pdf.html | B | 11종(px/rem) | ⚠️ | `.card`, PDF 미리보기 | 중 |
| convert/pdf-merge.html | B | 13종(px/rem) | ⚠️ | `.card`, PDF 미리보기 | 중 |
| convert/subtitle-extractor.html | E | 8종(px) | ⚠️ | `tool-card` 계열 | 중 |
| convert/timezone.html | B | 12종(px) | ⚠️ | `.card` 흰배경 | 중 |
| convert/tts.html | E | 7종(px) | ⚠️ | `tool-card` 계열 | 중 |
| convert/unit.html | B | 11종(px) | ⚠️ | `.card`·결과 고정 | 중 |
| generate/nickname.html | A | 9종(px) | ⚠️ | `.card` 흰배경 | 중 |
| generate/password.html | B | 10종(px) | ⚠️ | `.card`·버튼 흰배경 | 중 |
| generate/qr.html | A | 6종(px) | ⚠️ | `.card` 흰배경 | 중 |
| generate/random.html | B | 10종(px) | ⚠️ | `.card`·볼 흰배경 | 중 |
| generate/tts.html | A | 8종(px) | ⚠️ | `.card` 흰배경 | 중 |
| life/annual-leave.html | C | 9종(px) | ⚠️ | `.card` 흰배경 | 중 |
| life/bmi.html | C | 10종(px, 48px) | ⚠️ | `.card`·BMI 바 | 중 |
| life/electric.html | B | 9종(px) | ⚠️ | `.card` 흰배경 | 중 |
| life/gpa.html | C | 9종(px/rem) | ⚠️ | `.card`·과목표 | 중 |
| sports/interval-timer.html | A | 13종(px, 90/120px) | 🔴 | `body.prep` 배경, 90/120px 타이머 | 상 |

---

## 5. 요약 및 우선 조치 권장

| 우선순위 | 내용 |
|:--------|:-----|
| 🔴 **상** | ① `calc/tax-inherit`, `image/exif-remove` 등 최신 mt- 페이지의 `body{background:#f5f7fa;color:#1a1a2e}` 고정 배경 → common 변수로 전환 ② `sports/interval-timer` 다크 대비 최악 → 일괄 수정 |
| 🟡 **중** | 41개 페이지 인라인 `.card{background:#fff}` 등 라이트 고정값 → `var(--card-bg)`로 교체 (다크모드 대비 확보) |
| 🟢 **참고** | font-size가 px/rem 혼용·페이지별 제각각 → 공통 타이포 변수 통일 권장 |

---
*본 보고서는 2026-08-21 로컬 파일 정적 분석 결과입니다. 수정 전 조사용이며, 코드는 변경하지 않았습니다.*