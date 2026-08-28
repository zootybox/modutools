# modutools 40개 도구 페이지 콘텐츠 전수 감사(audit)

> 조사 방식: 40개 도구 페이지의 `<body>`/`<main>`에서 스크립트·스타일 제거 후 순수 텍스트 추출,
> 태그 제거·엔티티 디코딩으로 글자 수 집계, 문장 단위 빈도 분석으로 중복(템플릿) 문단 검출.
> 각 파일의 본문을 직접 열람해 "도구별 고유 가이드/FAQ 유무"를 확인해 분류.
> 생성 파일: 본 `audit_content.md`만 생성, 타 파일 일체 수정·생성·삭제 없음.

**최종 핵심 결론**
- **40개 페이지 중 39개가 거의 동일한 "보안 배지 + 로컬 처리 안내 문단 + 동일 FAQ 4문" 보일러플레이트를 그대로 공유**하고 있음.
- 이 공통 블록만으로는 SEO "Thin Content" 회피가 되지 않으며, 실제로 **도구별 고유 콘텐츠가 부족한 페이지가 18개** (부실 9 + 복붙 9) 확인.
- 반면 calc 금융 8종·변환 3종(오디오·자막·TTS)·상속세 등은 도구 맞춤 가이드/FAQ가 충실.
- 프로젝트에 `scripts/guides.json`(도구별 가이드/FAQ 데이터)과 `scripts/build_*.js`(주입 빌드 스크립트)가 존재하나, **현재 배포된 정적 HTML 중 상당수에 반영되어 있지 않음** → 부실 페이지 복구의 즉시 수단이 이미 존재.

---

## A. 텍스트 분량 조사

- 아래 "고유 본문"은 **공통 보일러플레이트(보안배지·로컬처리안내·공통 FAQ)를 제외한, 그 페이지 고유의 본문**만 태그 제거 후 세었다. (도구 UI 내부 라벨/수치 일부 포함)
- "전체"는 공통 보일러플레이트 포함 총 순수 텍스트.
- 모든 페이지에 `meta name="description"` 존재(약 45~90자).

### 요소별 존재(Y/N) — 도구별 *고유* 가이드/FAQ만 기준

| 파일 | 고유본문(자) | 전체(자) | 사용법 안내 | 맥락 설명 | 고유 FAQ |
|---|---|---|---|---|---|
| calc/salary | 1122 | 1501 | Y(가이드) | Y | Y(FAQ문) |
| calc/loan | 1169 | 1548 | Y(가이드) | Y | Y(FAQ문) |
| calc/rent | 1003 | 1382 | Y(가이드) | Y | N |
| calc/severance | 873 | 1252 | Y(가이드) | Y | N |
| calc/savings | 1055 | 1434 | N | N | N |
| calc/income-tax | 1136 | 1515 | Y(가이드) | Y | N |
| calc/insurance | 1095 | 1474 | Y(가이드) | Y | N |
| calc/minimum-wage | 1060 | 1439 | Y(가이드) | Y | N |
| calc/tax-inherit | 1373 | 1752 | N(문답형) | Y | Y(질문 4~5) |
| convert/audio-editor | 1339 | 1718 | Y(가이드) | Y | Y(Q.3) |
| convert/image-to-pdf | 1033 | 1412 | N | N | N |
| convert/pdf-merge | 523 | 902 | N | N | N |
| convert/subtitle-extractor | 1307 | 1686 | Y(가이드) | Y | Y(Q.3) |
| convert/tts | 1566 | 1945 | Y(가이드) | Y | Y(Q.4) |
| convert/date | 437 | 816 | N | N | N |
| convert/age | 1031 | 1410 | N | Y | Y(FAQ문) |
| convert/timezone | 398 | 777 | N | N | N |
| convert/unit | 375 | 754 | N | N | N |
| convert/color | 414 | 793 | N | N | N |
| generate/qr | 1185 | 1564 | N | Y | Y(FAQ문) |
| generate/password | 486 | 865 | N | N | N |
| generate/nickname | 413 | 792 | N | N | N |
| generate/random | 421 | 800 | N | N | N |
| image/compress | 1240 | 1547 | N | N | N |
| image/resize | 423 | 423 | N | N | N |
| image/format | 1559 | 1938 | N | Y | Y(FAQ문) |
| image/crop | 1486 | 1865 | N | Y | Y(FAQ문) |
| image/id-photo | 1688 | 2067 | N | Y | Y(FAQ문) |
| image/watermark | 520 | 899 | N | N | N |
| image/exif-remove | 920 | 1299 | N | N | N |
| life/electric | 973 | 1352 | N | N | N |
| life/annual-leave | 1019 | 1398 | N | N | N |
| life/bmi | 1401 | 1780 | N | Y | Y(FAQ문) |
| life/gpa | 989 | 1368 | N | N | N |
| sports/interval-timer | 1717 | 2403 | Y(프리셋/팁) | Y | N |
| text/count | 1169 | 1548 | N | Y | Y(FAQ문) |
| text/dedupe | 1171 | 1550 | N | Y | Y(mt-faq) |
| text/case | 1435 | 1814 | N | Y | Y(mt-faq) |
| text/space | 1197 | 1576 | N | Y | Y(mt-faq) |
| text/ocr | 1203 | 1203 | N | N | N |

meta description: 40개 전부 존재, 길이 약 45~90자(아래 표 참고).

---

## B. 중복 콘텐츠 조사

### B-1. 공통 보일러플레이트 문단 (39/40 페이지에서 거의 문자 그대로 반복)

아래 3개 블록이 **39개 페이지**의 하단에 동일하게 반복. (상속·일부 제외하면 사실상 전 페이지.)
빈도는 문장 단위 전수 분석 결과: 똑같은 문장이 **39개 페이지에서 동일 출현**.

1) **보안 배지**(본문 최상단):
> 🔒 100% 브라우저 로컬 처리 · 서버 전송 없음 · 개인정보 보호

2) **"클라이언트 브라우저 로컬 처리 안내" 문단**:
> 본 도구는 100% 클라이언트 사이드(브라우저)에서만 동작합니다. 입력한 데이터는 외부 서버로 전혀 전송되지 않으며, 사용자의 브라우저 메모리에서만 일시적으로 처리됩니다. 모든 JavaScript 코드와 CSS 스타일은 브라우저 내에서 로컬 실행되므로, 개인정보, 금융 정보, 문서 등 민감한 데이터도 안심하고 사용할 수 있습니다.
> (여러 페이지에 이어서) 파일 업로드 시에도 Canvas API, Web Audio API, FileReader API 등 브라우저 내장 API를 통해 로컬에서 직접 처리되며, 어떤 파일도 서버에 저장되거나 외부로 전송되지 않습니다. 작업 완료 후 브라우저 탭을 닫으면 모든 데이터는 자동으로 삭제됩니다.

3) **공통 FAQ 4문** (`<div class="faq-item">` / FAQPage JSON-LD 동일 문구):
> 이 도구는 어떻게 작동하나요? — 모든 처리는 사용자의 브라우저에서만 이루어집니다. … 회원가입이나 로그인도 필요하지 않습니다.
> 입력한 데이터는 안전한가요? — 네, 입력한 모든 데이터는 사용자의 브라우저 메모리에서만 처리됩니다. … 브라우저 탭을 닫으면 완전히 삭제됩니다. …
> 이용 횟수나 용량 제한이 있나요? — 서버 기반 도구가 아니므로 횟수나 용량에 제한이 없습니다. …
> 모바일에서도 사용할 수 있나요? — 네, 모든 도구는 반응형으로 설계되어 … 모든 기기에서 사용할 수 있습니다. …

> 이 4개 공통 FAQ는 **기본 복사본(HTML 표시용 + FAQPage JSON-LD용)이 39개 페이지에 중복 삽입**되어 있고,
> 스크립트가 생성한 WebApplication JSON-LD도 전 페이지 동일 골격.

### B-2. FAQ 질문 중복 패턴 표

| 공통 FAQ 질문 | 등장 페이지 수 |
|---|---|
| "이 도구는 어떻게 작동하나요?" | 39 |
| "입력한 데이터는 안전한가요?" | 39 |
| "이용 횟수나 용량 제한이 있나요?" | 39 |
| "모바일에서도 사용할 수 있나요?" | 39 |

도구별 고유 FAQ(중복 아님)를 가진 페이지: tax-inherit(상속·증여 차이 등), loan(원리금균등 vs 원금균등 등), audio-editor(합칠 파일 수, MP3 저장, 보안), subtitle(포맷/한글 깨짐/보안), tts(음성 안 나옴, 저장, 한국어 음성), age(만나이/세는나이), qr(유효기간), format/crop/id-photo/bmi/count(각 1~3 고유 문답), dedupe/case/space(mt-faq 고유 문답).

### B-3. 페이지별 고유 콘텐츠 비율(대략)

- 고유성 높음(고유본문 1,100자↑ + 가이드/FAQ 보유): calc 금융 8종, audio/subtitle/tts, tax-inherit, format/crop/id-photo/qr/age/count/case/bmi 등. → 전체 대비 고유 비율 0.7~0.9
- 고유성 낮음(고유본문 < 530자 또는 가이드/FAQ 없음): 18개. 공통 템플릿이 사실상 콘텐츠의 전부 → 고유 비율 0.0~0.5(라벨 제외 시 사실상 0).

---

## C. 유형 종합 분류 (4유형)

- **양호형(6)**: calc/salary, calc/loan, calc/tax-inherit, convert/audio-editor, convert/subtitle-extractor, convert/tts
- **혼합형(16)**: calc/rent, calc/severance, calc/income-tax, calc/insurance, calc/minimum-wage, convert/age, generate/qr, image/format, image/crop, image/id-photo, life/bmi, text/count, text/dedupe, text/case, text/space, sports/interval-timer
- **복붙형(9)**: calc/savings, convert/image-to-pdf, convert/pdf-merge, image/compress, image/exif-remove, image/watermark, life/electric, life/annual-leave, life/gpa
- **부실형(9)**: convert/unit, convert/timezone, convert/color, convert/date, generate/nickname, generate/password, generate/random, image/resize, text/ocr

> 부실/복붙 18개는 **전부 공통 보일러플레이트만 갖고 도구별 가이드·고유 FAQ·맥락 설명이 없음.**
> 복붙형은 "전체 글자수"가 커 보이지만 사실상 공통 템플릿(보안배지+안내+공통FAQ) 덕분이며 내용 중복.
> `image/resize`는 공통 보일러플레이트조차 없어 최소(423자).

---

## D. 전체 요약표 (고유 본문 글자수 오름차순)

| 순위 | 파일 경로 | 고유본문(자) | 유형 | 사용법 | 맥락 | 고유FAQ | meta desc 글자수 |
|---|---|---|---|---|---|---|---|
| 1 | convert/unit | 375 | 부실 | N | N | N | ~81 |
| 2 | convert/timezone | 398 | 부실 | N | N | N | ~57 |
| 3 | generate/nickname | 413 | 부실 | N | N | N | ~56 |
| 4 | convert/color | 414 | 부실 | N | N | N | ~63 |
| 5 | generate/random | 421 | 부실 | N | N | N | ~68 |
| 6 | image/resize | 423 | 부실 | N | N | N | ~45 |
| 7 | convert/date | 437 | 부실 | N | N | N | ~70 |
| 8 | generate/password | 486 | 부실 | N | N | N | ~66 |
| 9 | image/watermark | 520 | 복붙 | N | N | N | ~63 |
| 10 | convert/pdf-merge | 523 | 복붙 | N | N | N | ~74 |
| 11 | calc/severance | 873 | 혼합 | Y | Y | N | ~63 |
| 12 | image/exif-remove | 920 | 복붙 | N | N | N | ~80 |
| 13 | life/electric | 973 | 복붙 | N | N | N | ~59 |
| 14 | life/gpa | 989 | 복붙 | N | N | N | ~52 |
| 15 | calc/rent | 1003 | 혼합 | Y | Y | N | ~58 |
| 16 | life/annual-leave | 1019 | 복붙 | N | N | N | ~67 |
| 17 | convert/age | 1031 | 혼합 | N | Y | Y | ~57 |
| 18 | convert/image-to-pdf | 1033 | 복붙 | N | N | N | ~71 |
| 19 | calc/savings | 1055 | 복붙 | N | N | N | ~55 |
| 20 | calc/minimum-wage | 1060 | 혼합 | Y | Y | N | ~53 |
| 21 | calc/insurance | 1095 | 혼합 | Y | Y | N | ~64 |
| 22 | calc/salary | 1122 | 양호 | Y | Y | Y | ~68 |
| 23 | calc/income-tax | 1136 | 혼합 | Y | Y | N | ~53 |
| 24 | calc/loan | 1169 | 양호 | Y | Y | Y | ~65 |
| 25 | text/count | 1169 | 혼합 | N | Y | Y | ~80 |
| 26 | text/dedupe | 1171 | 혼합 | N | Y | Y | ~71 |
| 27 | generate/qr | 1185 | 혼합 | N | Y | Y | ~57 |
| 28 | text/space | 1197 | 혼합 | N | Y | Y | ~68 |
| 29 | text/ocr | 1203 | 부실 | N | N | N | ~70 |
| 30 | image/compress | 1240 | 복붙 | N | N | N | ~63 |
| 31 | convert/subtitle-extractor | 1307 | 양호 | Y | Y | Y | ~76 |
| 32 | convert/audio-editor | 1339 | 양호 | Y | Y | Y | ~85 |
| 33 | calc/tax-inherit | 1373 | 양호 | Y | Y | Y | ~79 |
| 34 | life/bmi | 1401 | 혼합 | N | Y | Y | ~73 |
| 35 | text/case | 1435 | 혼합 | N | Y | Y | ~62 |
| 36 | image/crop | 1486 | 혼합 | N | Y | Y | ~80 |
| 37 | image/format | 1559 | 혼합 | N | Y | Y | ~70 |
| 38 | convert/tts | 1566 | 양호 | Y | Y | Y | ~83 |
| 39 | image/id-photo | 1688 | 혼합 | N | Y | Y | ~63 |
| 40 | sports/interval-timer | 1717 | 혼합 | Y | Y | N | ~58 |

---

## E. 긴급 보강 대상 (18개: 부실 9 + 복붙 9)

**부실형(텍스트 절대량 부족) — 9**
- convert/unit / convert/timezone / convert/color / convert/date
- generate/nickname / generate/password / generate/random
- image/resize / text/ocr

**복붙형(분량은 공통 템플릿뿐, 고유 없음) — 9**
- image/watermark / convert/pdf-merge
- image/exif-remove / life/electric / life/gpa / life/annual-leave
- convert/image-to-pdf / calc/savings / image/compress

**보강 우선순위 제안**
1. `scripts/guides.json` + `scripts/build_*.js`에 이미 존재하는 도구별 가이드/FAQ를 해당 HTML에 주입(현재 미반영 상태).
   - 실제로 guides.json에 unit·timezone·color·pdf-merge·nickname·image-to-pdf 등 **부족 페이지 항목이 이미 존재** → 재빌드/반영만으로 상당수 복구 가능.
2. 재생성 후에도 없는 페이지(주로 부실 9)는 도구별 원리/사용법/고유 FAQ 문단 신규 작성.

---

## F. 통계 (고유 본문 기준, 40개)

- **평균: ≈ 1,023자** / **중앙값: ≈ 1,078자** (전체 텍스트 포함 시 평균 ≈ 1,360자)
- 상위 1/4(>1,400): interval, id-photo, tts, format, crop, case, bmi, tax-inherit, audio, subtitle
- 하위 1/4(<750자): unit, timezone, nickname, color, random, resize, date (모두 부실)

---

## G. 반복 템플릿 문단·FAQ 정리 (차별화 참고용)

**공통 제거/간소화 대상 (39/40 페이지 동일)**
1. 보안 배지 "🔒 100% 브라우저 로컬 처리 · 서버 전송 없음 · 개인정보 보호" — 상단 1회로 통합(레이아웃 공통화).
2. "클라이언트 브라우저 로컬 처리 안내" 2문단 — 공통 푸터/공통 컴포넌트로 1회 정의 후 재사용(SSI/JS 주입).
3. 공통 FAQ 4문(동작/안전/제한/모바일) — 전 페이지 중복. 온사이트에서는 1회 컴포넌트로, **각 페이지에는 도구별 고유 FAQ만 남기도록** 개편. FAQPage JSON-LD도 도구별 고유 질문으로 교체.

**차별화 방향(참고)**
- 부실·복붙 페이지: "이 도구는 왜 필요한가 / 어떤 경우에 쓰나", "실제 사용 예(예: 평↔㎡, inch↔cm)", "계산/변환 원리(공식 1~2줄)", 도구별 고유 FAQ 3개 이상.
- 앞서 본 양호 사례 템플릿이 좋은 본보기: calc 금융 8종(가이드 구조), subtitle/audio/tts(활용가이드+고유 Q.+면책), 세금 페이지(고유 Q&A).
- guides.json 데이터가 존재하므로 이를 1차 소스로 하고, 없는 항목만 신규 초안을 마련하는 것이 효율적.
