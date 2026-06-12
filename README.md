# Cherry Kiosk — Custom Interactive Studio

Cherry 기계식 키보드 매장용 **인터랙티브 터치 키오스크**입니다. 사용자가 브랜드 히스토리·기술을 둘러보고, 자신에게 맞는 키보드를 골라 → 스위치를 분석하고 → 키보드에 스위치를 구역별로 칠하는 커스텀 맵핑까지 한 뒤, 견적서(QR)를 받습니다. 1080×1920 세로형 터치스크린 기준입니다.

🔗 온라인 배포: https://cherry-kiosk.vercel.app/

---

## 1. 실행 방법

> 3D 모델(.glb)·타건음(.mp3)은 **로컬 웹서버**에서 열어야 정상 동작합니다(브라우저 보안정책). 아래 A~C 중 하나를 쓰세요.

### 방법 A — VSCode Live Server (가장 쉬움, 권장)
1. VSCode 확장 탭(`Ctrl+Shift+X`)에서 **"Live Server"** (제작자: Ritwick Dey) 설치
2. 이 프로젝트 폴더를 VSCode로 열기 (`File › Open Folder`)
3. `Cherry Kiosk react.html` 파일을 연 뒤, 편집창에서 **우클릭 → "Open with Live Server"**
   (또는 VSCode 오른쪽 아래 상태바의 **"Go Live"** 버튼 클릭)
4. 브라우저가 자동으로 `http://127.0.0.1:5500/Cherry%20Kiosk%20react.html` 을 엽니다 ✅

### 방법 B — 터미널 로컬 서버
프로젝트 폴더에서 아래 중 하나를 실행한 뒤 브라우저로 접속:
```
python -m http.server 8000
# 또는
npx serve
```
→ http://localhost:8000/Cherry%20Kiosk%20react.html

### 방법 C — 온라인 (설치 없이 확인)
https://cherry-kiosk.vercel.app/

### ⚠️ 참고 — 더블클릭으로 직접 열면
`Cherry Kiosk react.html` 을 더블클릭해도 화면은 뜨지만, **3D 모델과 타건음은 나오지 않습니다.** 브라우저가 `file://` 경로의 로컬 파일 접근을 막기 때문입니다. 반드시 위 A~C 중 하나로 실행하세요.

---

## 2. 두 개의 HTML 파일 — 왜 나뉘어 있나

비슷한 이름의 HTML이 둘 있습니다. 역할이 다릅니다.

| 파일 | 역할 | 설명 |
|---|---|---|
| **`Cherry Kiosk react.src.html`** | 📝 **소스 (원본)** | 사람이 쓰고 읽는 파일. **JSX**(HTML처럼 생긴 React 문법) + 한글 주석. **코드 리뷰는 이 파일을 보세요.** |
| `Cherry Kiosk react.html` | 📦 **빌드 산출물** | 위 소스를 기계가 번역한 결과. 브라우저가 바로 실행하는 용도. `React.createElement(...)` 형태라 **사람이 읽기엔 부적합**합니다. |

### 같은 코드가 이렇게 달라집니다
`src.html` — **JSX** (사람이 작성):
```jsx
<div className="screen active" onClick={onStart}>
```
`react.html` — **컴파일된 JS** (기계가 변환):
```js
React.createElement("div", { className: "screen active", onClick: onStart })
```

### 왜 빌드 산출물이 따로 필요한가?
- 브라우저는 **JSX를 직접 읽지 못합니다.** 그래서 자바스크립트로의 "번역"이 필요합니다.
- 원래는 `src.html` 안에 들어있는 Babel(번역기, 약 2.8MB)이 **페이지를 열 때마다 실시간으로** JSX를 번역합니다 — 매번 다운로드 + 번역이 일어나 **느립니다.**
- 그래서 번역을 **미리 한 번** 끝내두고 Babel을 들어낸 것이 `react.html` 입니다. 브라우저는 실행만 하면 되니 **빠릅니다.**

> **참고:** 일반적인 React 프로젝트(Vite·Next.js 등)도 `소스 → 빌드 산출물(dist)` 로 나뉘는 것이 표준입니다. 다만 그쪽은 빌드를 안 하면 **아예 실행이 안 되는** 반면(브라우저가 JSX·모듈을 직접 못 읽음), 이 프로젝트는 번들러 없이 **단일 HTML 파일**로 동작하도록 만들었기 때문에 빌드는 *필수가 아니라 "속도를 위한 선택"* 입니다. 원본이 단일 HTML 키오스크라, 그 단순한 구조(파일 하나 = 실행)를 유지하려는 의도입니다.

### 빌드 방법 (소스를 수정했을 때)
**항상 `src.html` 을 고친 뒤** 다시 빌드하세요. `react.html` 을 직접 수정하면 ❌ 다음 빌드 때 덮어써집니다.
```
npm i --no-save @babel/standalone@7
node build-react.mjs
```
`build-react.mjs` 가 `src.html` 의 JSX를 컴파일하고 Babel 로더를 제거해, 외부 도구 없이 독립 실행되는 `react.html` 을 생성합니다.

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

### React 버전 (핵심)
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

### 백업 (git 보관용)
```
Cherry Kiosk v2.html           React 전환 직전 바닐라 JS 버전
Cherry Kiosk.html              최초 버전
data/cherry_keyboards.xlsx     모델 스펙 원본 데이터 시트
```
