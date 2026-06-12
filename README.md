# Cherry Kiosk — Custom Interactive Studio

Cherry 기계식 키보드 매장용 **인터랙티브 터치 키오스크**입니다. 사용자가 브랜드 히스토리·기술을 둘러보고, 자신에게 맞는 키보드를 골라 → 스위치를 분석하고 → 키보드에 스위치를 구역별로 칠하는 커스텀 맵핑까지 한 뒤, 견적서(QR)를 받습니다. 1080×1920 세로형 터치스크린 기준입니다.

🔗 온라인 배포: https://cherry-kiosk.vercel.app/

---

## 1. 실행 방법

### 가장 간단 — 브라우저로 열기
`Cherry Kiosk react.html` 을 더블클릭하면 바로 실행됩니다.

> ⚠️ 단, **3D 모델(.glb)·타건음(.mp3)** 은 브라우저 보안정책(`file://`) 때문에 로컬 서버로 열어야 정상 동작합니다. 아래 "로컬 서버" 방법을 권장합니다.

### 권장 — 로컬 서버
프로젝트 폴더에서 아래 중 하나를 실행한 뒤, 브라우저로 접속합니다.
```
python -m http.server 8000
# 또는
npx serve
```
→ http://localhost:8000/Cherry%20Kiosk%20react.html

### 온라인 — 설치 없이 확인
https://cherry-kiosk.vercel.app/

---

## 2. 코드 보기 (중요)

| 파일 | 용도 | 비고 |
|---|---|---|
| **`Cherry Kiosk react.src.html`** | **소스 — 코드 리뷰용** | JSX 원본 + 상세 한글 주석. **코드는 이 파일을 보세요.** |
| `Cherry Kiosk react.html` | 실행본 | 위 소스를 Babel로 컴파일한 산출물. 브라우저에서 바로 실행되도록 `React.createElement(...)` 형태로 변환돼 있어 **읽기에는 부적합**합니다. |

### 빌드 (소스 → 실행본)
```
npm i --no-save @babel/standalone@7
node build-react.mjs
```
`build-react.mjs` 가 `react.src.html` 의 JSX(`<script type="text/babel">`)를 컴파일하고 Babel CDN 스크립트를 제거해, 외부 빌드 도구 없이 독립 실행되는 `react.html` 을 생성합니다.

---

## 3. 기술 스택 / 아키텍처
- **React 18** (UMD CDN) + JSX — 런타임 Babel 없이 **빌드타임 프리컴파일**(첫 로딩 속도 개선)
- **`<model-viewer>`** 웹 컴포넌트 — 색상별 3D GLB 렌더, 손가락 핀치 줌
- **Web Audio API** (AnalyserNode / FFT) — 스위치별 타건음을 주파수 막대로 시각화
- **번들러·프레임워크 설치 불필요** — 소스도 산출물도 단일 HTML 파일
- 선언적 UI는 JSX로, 측정·프레임 단위 작업(키보드 구역 분할 · FFT 그래프 · GLB 머티리얼 교체)은 `useEffect` 안의 명령형 함수로 처리하는 **하이브리드 렌더** 구조
- 1080×1920 고정 캔버스를 `transform: scale()` 로 어떤 뷰포트에도 비율 유지하며 맞춤

> 코드 구조 · 화면 흐름 · 디자인 토큰 · 빌드 방식의 상세 설명은 **`Cherry Kiosk react.src.html` 최상단 주석 블록**에 정리돼 있습니다.

---

## 4. 화면 흐름
1. **Landing** — CHERRY 로고 + "터치하여 시작"
2. **Home** — 히스토리 / 기술 / 키보드 만들기 3개 허브
3. **History** — 1953~2022 타임라인
4. **Technology** — Gold Crosspoint · MX Switch · TMR · RGB 4개 기술 소개
5. **Builder ① 라인업** — 9개 모델 중 선택 + 색상 스왑 + 3D 미리보기 + 스펙
6. **Builder ② 스위치 분석** — MX 스위치 7종(Red/Brown/Blue/Black/Clear/Grey/Silent Red) 포스커브 · 타건음 분석
7. **Builder ③ 커스텀 맵핑** — 키보드 레이아웃에 스위치를 구역별로 칠하기
8. **견적서** — 완성된 키보드 3D + QR 코드 (20초 후 자동으로 처음 화면 복귀)

---

## 5. 파일 구성

### 제출 포함 (React 버전)
```
Cherry Kiosk react.html        실행본 (빌드 산출물)
Cherry Kiosk react.src.html    소스 (JSX + 주석, 코드 리뷰용)
build-react.mjs                빌드 스크립트
vercel.json                    배포 설정
README.md                      이 문서
images/                        이미지 자산 (라인업·히스토리·기술·스위치·하우징 색상)
models/model_color/            색상별 3D 모델 (.glb · 19개)
data/sound_of_switchs/         스위치 타건음 (.mp3 · 7개)
```

### 백업 (제출 제외 · git 보관용)
```
Cherry Kiosk v2.html           React 전환 직전 바닐라 JS 버전
Cherry Kiosk.html              최초 버전
data/cherry_keyboards.xlsx     모델 스펙 원본 데이터 시트
```

---

## 6. 제출용 압축파일(zip) 만들기
백업·원본 데이터·git 메타 파일은 `.gitattributes` 의 `export-ignore` 로 자동 제외됩니다. 프로젝트 폴더에서:
```
git archive --format=zip -o submission.zip HEAD
```
생성된 `submission.zip` 이 곧 제출본입니다 — 위 **"제출 포함"** 목록만 들어갑니다.
