# TOOL_INPUT_OUTPUT_TYPE — 도구 페이지 입출력 형태 분류

> **작성일:** 2026-08-21
> **대상:** `calc/ image/ text/ convert/ generate/ life/ sports/` 폴더의 모든 `.html` (총 41개)
> **기준:** 입력 요소(숫자/슬라이더/파일/텍스트/옵션)와 출력 요소(결과박스/다운로드/미리보기/파일생성)의 조합
> **성격:** 조사 리포트 (코드 수정 없음)

---

## 분류 기준

| 타입 | 정의 | 특징적 입출력 |
|:-----|:-----|:--------------|
| **TYPE1** 즉시계산형 | 숫자/슬라이더/날짜 입력 → 버튼 없이 또는 클릭 시 텍스트·숫자 결과 | input(number/range/date/text) → 결과박스 |
| **TYPE2** 파일업로드형 | 이미지/PDF/파일 업로드 → 처리된 파일·이미지 출력 | dropzone/file → 다운로드 + 미리보기/캔버스 |
| **TYPE3** 텍스트변환형 | 텍스트 입력(붙여넣기/타이핑) → 변환된 텍스트 출력 | textarea → 결과박스 |
| **TYPE4** 생성기형 | 옵션 선택 → QR/이미지/파일 생성 | 옵션 input → 생성물(다운로드/캔버스) |
| **TYPE5** 2단 workspace | 자체 좌우 분할 구조 | workspace-panel/preview |
| **TYPE6** 기타/애매 | 위에 안 맞음 | — |

---

## 페이지별 상세 분류

### TYPE1 — 즉시계산형 (14개)
숫자·날짜·슬라이더 입력 → 숫자/텍스트 결과가 바로 나오는 도구. 파일 업로드 없음.

| 파일 | 입력 요소 | 출력 요소 |
|:-----|:----------|:----------|
| calc/salary.html | input(range, text), onclick-btn | 결과박스(result-box) |
| calc/income-tax.html | input(text), button | 결과박스 |
| calc/insurance.html | input(text), button | 결과박스 |
| calc/loan.html | input(text), button | 결과박스 + 통계 |
| calc/minimum-wage.html | input(number, text), button | 결과박스 + 통계 |
| calc/rent.html | input(number, text), button | 결과박스 |
| calc/savings.html | input(number, text), button | 결과박스 + 비교 |
| calc/severance.html | input(date, text), button | 결과박스 |
| calc/tax-inherit.html | input(text), button | 결과박스 |
| convert/age.html | input(date), button | 결과박스 |
| convert/date.html | input(date, number), button | 결과박스 |
| convert/timezone.html | input(datetime-local), button | 결과박스 |
| convert/unit.html | input(number), button | 결과박스 |
| convert/color.html | input(color, range, text), button | 색상 미리보기 |

### TYPE2 — 파일업로드형 (10개)
파일을 업로드 → 처리된 파일/이미지/텍스트가 결과로 나오는 도구.

| 파일 | 입력 요소 | 출력 요소 |
|:-----|:----------|:----------|
| image/compress.html | file-input, dropzone, input(range) | 미리보기 + 다운로드(blob) |
| image/crop.html | file-input, dropzone, input(number) | 미리보기 + 다운로드(blob) |
| image/format.html | file-input, dropzone, input(range) | 미리보기 + 다운로드(blob) |
| image/id-photo.html | file-input, dropzone, input(range) | 미리보기 + 다운로드(blob) |
| image/watermark.html | file-input, dropzone, input(color,range,text) | 미리보기 + 다운로드(blob) |
| image/exif-remove.html | file-input, dropzone | 결과요약 + 다운로드(blob) |
| convert/image-to-pdf.html | file-input, dropzone | 미리보기 + 다운로드(blob) |
| convert/pdf-merge.html | file-input, dropzone | 미리보기 + 다운로드(blob) |
| convert/audio-editor.html | file-input, dropzone, input(range) | 웨이브 + 다운로드(blob) |
| text/ocr.html | file-input, dropzone, textarea | 추출 텍스트 + 다운로드 |

### TYPE3 — 텍스트변환형 (4개)
텍스트를 입력 → 변환/가공된 텍스트 결과가 나오는 도구.

| 파일 | 입력 요소 | 출력 요소 |
|:-----|:----------|:----------|
| text/case.html | textarea, button | 변환 텍스트 |
| text/dedupe.html | textarea, checkbox, button | 중복 제거 텍스트 |
| text/space.html | textarea, button | 공백 정리 텍스트 |
| text/count.html | textarea, button | 글자수 통계(결과) |

### TYPE4 — 생성기형 (5개)
옵션 선택 → QR코드/비밀번호/닉네임/숫자/음성이 생성되는 도구.

| 파일 | 입력 요소 | 출력 요소 |
|:-----|:----------|:----------|
| generate/qr.html | input(color, text, url), textarea, button | QR코드(캔버스) + 다운로드 |
| generate/password.html | input(checkbox, range), button | 생성 비밀번호 |
| generate/nickname.html | button | 생성 닉네임 |
| generate/random.html | input(checkbox, number), button | 랜덤 숫자 |
| generate/tts.html | textarea, input(range), button | 음성(blob) + 다운로드 |

### TYPE5 — 2단 workspace (1개)
자체적으로 좌우 분할된 구조를 가진 도구.

| 파일 | 입력 요소 | 출력 요소 |
|:-----|:----------|:----------|
| image/resize.html | workspace-panel(좌): dropzone, input(color,file,number) | workspace-preview(우): 미리보기 + 다운로드(blob) |

### TYPE6 — 기타/애매 (1개)
위 어디에도 딱 안 맞는 도구.

| 파일 | 입력 요소 | 출력 요소 |
|:-----|:----------|:----------|
| sports/interval-timer.html | button(프리셋/시작) | 타이머 숫자 표시(동적) |

> 참고: interval-timer는 "입력→계산 결과"가 아니라 **실행 타이머**(실시간 경과 표시)라 TYPE1로 보기 어렵고, 생성형도 아님 → TYPE6로 분류.

---

## 타입별 개수 및 파일 목록 요약 (정확 · 41개 전부 매핑)

### 실파일 수 확인
실제 `find` 결과 **41개** (calc 9 · image 7 · text 5 · convert 10 · generate 5 · life 4 · sports 1)
이 41개를 아래 6개 타입에 **중복/누락 없이 전부** 배정 → 합계 = 41.

| 타입 | 개수 | 파일 목록 |
|:-----|:----:|:----------|
| **TYPE1** 즉시계산형 | **18** | calc/{income-tax, insurance, loan, minimum-wage, rent, salary, savings, severance, tax-inherit}.html, convert/{age, date, timezone, unit, color}.html, life/{annual-leave, bmi, electric, gpa}.html |
| **TYPE2** 파일업로드형 | **11** | image/{compress, crop, exif-remove, format, id-photo, watermark}.html, convert/{image-to-pdf, pdf-merge, audio-editor, subtitle-extractor}.html, text/ocr.html |
| **TYPE3** 텍스트변환형 | **4** | text/{case, count, dedupe, space}.html |
| **TYPE4** 생성기형 | **6** | generate/{nickname, password, qr, random, tts}.html, convert/tts.html |
| **TYPE5** 2단 workspace | **1** | image/resize.html |
| **TYPE6** 기타/애매 | **1** | sports/interval-timer.html |
| **합계** | **41** | 18 + 11 + 4 + 6 + 1 + 1 = 41 ✅ |

### 검산 (하나씩 대조, 누락/중복 없음)
- **TYPE1 = 18**: calc 9(income-tax·insurance·loan·minimum-wage·rent·salary·savings·severance·tax-inherit) + convert 5(age·date·timezone·unit·color) + life 4(annual-leave·bmi·electric·gpa) = 18 ✓
- **TYPE2 = 11**: image 6(compress·crop·exif-remove·format·id-photo·watermark) + convert 4(image-to-pdf·pdf-merge·audio-editor·subtitle-extractor) + text/ocr 1 = 11 ✓
- **TYPE3 = 4**: text case·count·dedupe·space = 4 ✓
- **TYPE4 = 6**: generate 5(nickname·password·qr·random·tts) + convert/tts 1 = 6 ✓
- **TYPE5 = 1**: image/resize = 1 ✓
- **TYPE6 = 1**: sports/interval-timer = 1 ✓
- **총 = 18 + 11 + 4 + 6 + 1 + 1 = 41** ✓ (실제 파일 41개와 정확히 일치)

### ⚠️ 이전 판 대비 수정된 부분
- **TYPE1**: 14 → **18** (life 계산 4개 추가)
- **TYPE2**: 10 → **11** (`convert/subtitle-extractor.html` 추가 — 파일 업로드·자막 추출형)
- **TYPE4**: 5 → **6** (`convert/tts.html` 추가 — 텍스트→음성 생성형)
- **누락**: 없음 (image/resize는 TYPE5, crop·format·id-photo·watermark·exif-remove는 TYPE2로 정상 배정)

> **존재 확인**: `convert/subtitle-extractor.html` **존재함**(True). `convert/tts.html`과 `generate/tts.html`은 **둘 다 실제 존재하는 별개 파일**(27935 vs 12307 bytes, 해시 상이) — 착오 아님.

---
*본 보고서는 2026-08-21 로컬 정적 분석 결과입니다. 코드 수정 없음.*