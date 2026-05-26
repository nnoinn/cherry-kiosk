# Handoff: Cherry Kiosk (Cherry 키보드 매장 키오스크)

## Overview
오프라인 매장에서 사용하는 인터랙티브 **터치 키오스크** 디자인입니다. 1080×1920 세로형 디스플레이 기준으로, 사용자가 (1) Cherry 브랜드 히스토리 / 기술 소개를 보거나, (2) 자신의 사용 환경에 맞는 키보드를 선택·체험·커스텀할 수 있도록 합니다.

핵심 흐름:
1. **Landing** — Cherry 로고 + "TOUCH TO START" CTA
2. **Home (Hub)** — 3개의 큰 카드: Brand History / Technology / Build Your Keyboard
3. **History 페이지** — 1953~2022 타임라인 (체리 마스코트가 스크롤에 맞춰 점선 경로를 따라 이동)
4. **Technology 페이지** — Gold Crosspoint 등 핵심 기술 4가지 카드 + Builder 진입 CTA
5. **Builder Step 1** — 9개 모델 그리드 → 모델 선택 → 사이드바(라인업 탐색) + 상세 패널(컬러/스펙)
6. **Builder Step 2** — 스위치 7종(MX Red/Brown/Blue/Black/Clear/Grey/Silent Red) 비교, 포스 커브 SVG, 사운드 파형 미리듣기
7. **Builder Step 3** — 키보드 레이아웃 위에 스위치를 "구역별로 칠하기"(zone-paint). 키보드는 스페이스바 끝 X좌표 기준으로 가운데에서 둘로 갈라져 위/아래로 배치됨

## About the Design Files
이 번들의 HTML 파일은 **디자인 레퍼런스(프로토타입)** 입니다. 의도한 룩앤필과 인터랙션을 보여주는 목업이며, 그대로 프로덕션에 올리는 코드가 아닙니다. 작업 목표는 이 HTML 디자인을 **타겟 코드베이스의 기존 환경(React / Vue / Next.js / Electron 키오스크 앱 등)에 맞게 재구현**하는 것입니다. 코드베이스가 없다면 키오스크 환경(오프라인 작동, 풀스크린 브라우저 모드)에 적합한 프레임워크를 골라 구현하면 됩니다.

## Fidelity
**Hi-fi (고정밀 목업)**. 색상, 타이포그래피, 간격, 인터랙션, 애니메이션이 모두 최종 의도대로 들어가 있습니다. 개발자는 이 파일들을 **픽셀 단위로 재현**하는 것을 목표로 하되, 코드베이스의 기존 컴포넌트 라이브러리·디자인 시스템이 있다면 그것에 맞춰 컴포넌트화하세요.

## 키오스크 화면 사양
- **고정 캔버스**: 1080 × 1920 (세로형, 9:16)
- **스케일링**: `scaleKiosk()` 함수가 `window.innerWidth/1080`과 `window.innerHeight/1920`을 비교해 작은 쪽으로 `transform: scale()` 적용. 뷰포트가 작아도 비율을 유지하며 letterbox.
- **폰트**: `'Pretendard Variable', 'Pretendard', 'Noto Sans KR', sans-serif`. 한글 키오스크라 Pretendard가 1순위.
- **디바이스**: 터치 전용. 호버 상태도 정의되어 있지만 실제로는 active(눌림) 상태가 더 중요.

## Design Tokens

### Colors (CSS 변수)
| 토큰 | 값 | 용도 |
|---|---|---|
| `--cherry` | `#c53045` | 메인 브랜드 레드 |
| `--cherry-dark` | `#a02638` | 호버/active 시 어두워진 레드 |
| `--cherry-light` | `#fdf0f2` | 옅은 핑크 배경 (eyebrow 라벨, active 상태 배경) |
| `--cherry-mid` | `#f5c6cc` | 중간 톤 핑크 (active 아이콘 배경) |
| `--fg` | `#111318` | 본문 텍스트 (거의 검정) |
| `--fg2` | `#52555e` | 보조 텍스트 |
| `--fg3` | `#9097a3` (예상) | 비활성·캡션 텍스트 |
| `--border` | `#e4e6eb` | 카드/버튼 보더 |
| `--surface` | `#ffffff` | 카드 표면 |
| `--bg` | `#f4f5f7` | 페이지 배경 (옅은 회색) |

### Radius
| 토큰 | 값 |
|---|---|
| `--radius` | `24px` |
| `--radius-lg` | `36px` |
| 작은 라운드 (버튼·뱃지) | `14~22px` |
| pill 라운드 | `100px` |

### 타이포 스케일 (1080 캔버스 기준)
- 랜딩 타이틀 "Cherry": **160px / 900** (scaleX 1.2 적용)
- 랜딩 서브 "KEYBOARD": **70px / 700**, letter-spacing 12px
- 페이지 타이틀: **96px / 900**, letter-spacing -3px
- 섹션 타이틀: **56~64px / 700~800**
- 카드 타이틀: **38~44px / 900**
- 본문: **18~22px / 400~700**
- eyebrow / caption: **14~17px / 700~800**, letter-spacing 4~6px

### Shadow
- 카드: `0 4px 16px rgba(0,0,0,.06)`
- 호버: `0 16px 48px rgba(0,0,0,.10)`, `0 20px 50px rgba(0,0,0,.1)`
- CTA: `0 10px 32px rgba(190,18,60,.28)`, `0 32px 72px rgba(197,48,69,.35)`

## Screens / Views

### 1. Landing (`#screen-landing`)
- 풀스크린 단색 배경 + 중앙 "Cherry" 타이틀 (scaleX 1.2)
- 하단에 "TOUCH TO START" pill CTA (`background: var(--cherry)`, `border-radius: 22px`, padding `34px 120px`, `42px / 800`)
- 화면 어디든 탭하면 Home으로 이동

### 2. Home Hub (`#screen-home`)
- 헤더: 좌측 Cherry 로고(원형 빨간 배경 + 흰색 이탤릭 'C', 52×52), 우측 홈 버튼 (다른 화면에서 활성)
- eyebrow 라벨: pill 모양, `cherry-light` 배경 + `cherry` 텍스트
- 3개의 큰 hub-card (수직 스택):
  - 카드는 가로형, 좌측 6px 컬러 액센트(::after), 호버 시 `translateX(8px)` + 좌측 보더 등장
  - 마지막 카드(Build Your Keyboard)는 `hub-card-cherry` 변형: 검정 배경 + 빨간 액센트
- 각 카드 우측에 pill CTA

### 3. History (`#screen-history`)
- Sticky 상단 헤더 (브랜드 + Home 버튼)
- 96px 페이지 타이틀 + eyebrow
- **타임라인**: 좌우 교차(left/right) 배치, 가운데 점선(`background-image: linear-gradient(to bottom, var(--cherry) 50%, transparent 50%); background-size: 3px 12px;`)
- 각 행: 연도(64px / 800) + 이미지 + 설명 텍스트
- **체리 마스코트가 스크롤 따라 점선 위를 이동** (`setupCherryScrollTracking()`): 화면 스크롤 진행률에 비례해 마스코트 top 위치를 보간
- 데이터: 1953, 1963, 1967, 1973, 1979, 1983, 1988, 1994, 1998, 2014, 2018, 2019, 2020, 2021, 2022 (`images/history/{year}.png`)

### 4. Technology (`#screen-tech`)
- 4개 기술 카드 (가로 분할: 좌 이미지 / 우 텍스트):
  1. **Gold Crosspoint** — 금 도금 십자 접점 (`images/tech/01-goldcrosspoint.png`)
  2. **MX Switch** — Cherry MX 스위치 메커니즘 (`02-mx-switch.png`)
  3. **TMR Sensor** — Tunneling Magneto-Resistance (`03-tmr.png`)
  4. **RGB Lighting** (`04-rgb.png`)
- 각 카드: `tech-num` (eyebrow 14px) + `tech-name` (38px / 900) + 설명 + `tech-pill` (cherry 컬러 태그)
- 페이지 하단에 Builder 진입 CTA: `background: var(--fg)` (검정), 호버 시 `background: var(--cherry)` + 셰도우 강화

### 5. Builder — Step 1: 라인업 선택
- **헤더 스테퍼**: 3단계 진행 표시. active = `cherry` 배경, done = 회색 체크
- **상태 1: 모델 미선택** — 9개 모델을 4열 그리드로
  - 각 카드: 16:9 이미지 + 이름. 호버 시 `translateY(-4px)`
- **상태 2: 모델 선택됨** — 좌우 분할 레이아웃
  - **사이드바(좌)**: 9개 모델 작은 썸네일 + 이름, active = `cherry-light` 배경 + `cherry` 보더
  - **상세 패널(우)**: 3D 모델 뷰어 (`<model-viewer>` 사용) + 컬러 스왑 버튼들 + 스펙 리스트
- 모델 데이터: `models[]` 배열 (id, name, series, layout, housing, connect, keycap, polling, img, glb, pros, features, lighting, colors[])

### 6. Builder — Step 2: 스위치 분석
- 좌측: 스위치 사이드바 (7종 — MX Red, Brown, Blue, Black, Clear, Grey, Silent Red)
- 우측 상단: 스위치 정보 카드 (작동력, 초기 힘, 키 압력, 스타일)
- 우측 중단: **포스 커브 SVG** — `viewBox="-50 -10 470 260"`. Y축 0~120 cN(20cN 간격), X축 0~4 mm(1mm 간격). 비활성 스위치는 opacity 0.18로 고스트 처리
- 우측 하단: 사운드 카드 — `<canvas id="waveCanvas">` 위에 사인파 애니메이션, "Play Sound" 버튼

### 7. Builder — Step 3: 커스텀 맵핑
- 좌측: 7종 스위치 중 brush 선택
- 우측: **분할 키보드 레이아웃**
  - 키보드는 풀 키보드(F행~화살표/넘패드)를 데이터로 가지고 있음 (`kbRows` 배열)
  - **각 행을 스페이스바 오른쪽 끝 X좌표 기준으로 분할**해서 위/아래 두 덩어리로 렌더링
    - 위쪽: 스페이스바 끝 X좌표를 넘지 않는 키들
    - 아래쪽: 그 이후 키들 + 좌측에 동일 너비의 보이지 않는 spacer
  - 각 키는 `data-zone="<zone-id>"` 속성. 같은 zone의 키들은 **함께 칠해짐**
  - 키 클릭 = 현재 brush로 그 zone의 모든 키 색칠. 키 우측 하단의 작은 dot이 칠해진 색을 표시
- 하단: "Review my build" 버튼 → buildMode 'review'로 전환 → QR 코드 모달

## 키 너비 시스템 (중요)
키오스크는 자체 너비 클래스를 씀. CSS의 `.key.w1`, `.key.w125` 등.

| 클래스 | 픽셀 (1u=72px 기준) | 용도 |
|---|---|---|
| `w1`   | 72  | 1u (알파벳, 숫자) |
| `w125` | 91  | 1.25u (Tab 마지막, Win, Alt, Ctrl) |
| `w15`  | 111 | 1.5u (Tab) |
| `w175` | 131 | 1.75u (Caps Lock) |
| `w2`   | 150 | 2u (Backspace) |
| `w225` | 170 | 2.25u (Left Shift) |
| `w275` | 210 | 2.75u (Right Shift) |
| `w625` | 480 | 6.25u (Spacebar) |
| `w05`  | 36  | 0.5u 보조 |
| `w03`  | 18  | 0.25u 보조 |
| `wg`   | 24  | gap spacer |

키 사이 간격 = `6px`. 위 폭 + 6px gap을 누적해서 분할 X좌표를 계산함 (`design_handoff_cherry_kiosk/Cherry Kiosk.html` 1700~1760번 라인 참고).

## Interactions & Behavior

### 페이지 전환
- 모든 화면은 `.screen` 컨테이너에 들어 있고, `go(name)` 함수가 `.active` 클래스를 토글
- 트랜지션은 단순 fade/즉시 전환

### 호버/액티브
- 카드: `transform: translateY(-2~4px)` + 셰도우 증가
- pill 버튼: 색상 + 보더만 변화
- active(눌림): `transform: translateY(0)` + 약간 어두워진 배경

### 스크롤 인터랙션 (History 화면)
- `setupCherryScrollTracking()` — `IntersectionObserver` 또는 scroll listener로 타임라인의 진행률을 0~1로 보간 → 체리 마스코트의 `top: %` 업데이트

### 사운드 파형 (Step 2)
- `requestAnimationFrame` 루프, 사인파 + 노이즈 합성
- "Play Sound" 클릭 시 진폭(amplitude)을 잠깐 키워 펄스 효과

### 3D 모델 뷰어
- Google `<model-viewer>` 웹 컴포넌트 사용
- `models/*.glb` 9개 파일을 페이지 로드 시 hidden `<model-viewer>` 9개로 워밍업 → 모델 상세 진입 시 즉시 표시
- camera-orbit, auto-rotate 사용

## State Management
한 개의 글로벌 `state` 객체:
```js
state = {
  step: 1 | 2 | 3,
  model: <models 배열의 한 객체>,
  color: '클래식 블랙' 등,
  activeSwitch: 'red' | 'brown' | ...,
  brush: 'red' | ...,         // Step 3에서 칠하는 색
  buildMode: 'build' | 'review',
  mapping: {                  // zone-id → switch-id
    base: 'red',              // 기본값(전체 칠)
    fn: 'brown',
    arrows: 'red',
    ...
  }
}
```

상태 전환:
- `go(name)` — 화면 이동 (히스토리/홈/빌더)
- `selectModel(id)` — Step 1에서 모델 선택
- `selectColor(c)` — 색상 변경
- `selectSwitch(id)` — Step 2에서 스위치 클릭
- `selectBrush(id)` — Step 3에서 brush 변경
- `paintZone(zone)` — 키 클릭 시 mapping 업데이트
- `handlePrev() / handleNext()` — 스텝 이동
- `showConfirmModal() / showQrModal() / showHelpModal()` — 모달

상태가 바뀌면 해당 화면의 `render*()` 함수가 다시 호출됨. 프레임워크에 옮길 때는 React state / Vue ref 등으로 자연스럽게 매핑.

## Assets
- **로고**: `images/logo.svg`
- **모델 사진**: `images/{모델명}.jpg` 또는 `.webp` (9개 — 위 데이터 표 참고)
- **3D 모델**: `models/{모델명}.glb` (9개)
- **히스토리**: `images/history/{년도}.png` (15개)
- **기술**: `images/tech/01-goldcrosspoint.png`, `02-mx-switch.png`, `03-tmr.png`, `04-rgb.png`
- **스위치 사진**: `images/MX RED.webp`, `MX BLUE.webp`, `MX BROWN.webp`, `MX BLACK.webp`, `MX CLEAR.webp`, `MX GREY.webp`, `MX SILENT RED.webp`
- **데이터(엑셀)**: `data/cherry_keyboards.xlsx` — 모델 스펙 원본

이미지 출처: Cherry 공식 자료. 실제 양산 시에는 라이선스 확인 필요.

## Files
- **`Cherry Kiosk.html`** — 메인 키오스크 (모든 화면 + 빌더 모두 포함)
- **`images/`** — 모든 이미지 자산
- **`models/`** — 3D 모델 (.glb) — 빌드 완성 단계에서 색상별 .glb 적용 예정
- **`data/cherry_keyboards.xlsx`** — 모델 스펙 데이터 시트

## 외부 의존성 (HTML head에 로드됨)
- Pretendard, Noto Sans KR (Google Fonts 또는 자체 호스팅)
- `<model-viewer>` 웹 컴포넌트 — `https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js`

코드베이스에 옮길 때 `model-viewer`는 React에선 `@google/model-viewer` 패키지를 임포트하면 됩니다.

## 우선순위 / 구현 팁
1. **레이아웃 시스템 먼저** — 1080×1920 캔버스 + scale 래퍼. 모든 좌표가 이 위에서 계산됨.
2. **컬러/타이포 토큰 정의** — Tailwind config 또는 CSS variables로 위 표 그대로.
3. **Home → Builder 흐름의 라우팅** — Next.js라면 `/`, `/history`, `/tech`, `/builder/[step]`.
4. **3D 모델 워밍업** — `<model-viewer hidden eager>` 9개를 root layout에 두면 페이지 전환 시 캐시됨.
5. **키보드 분할 로직 (Step 3)** — Cherry Kiosk.html 1665~1770 라인이 거의 그대로 옮겨짐. `kbRows` 데이터 + 너비 맵 + 누적 X 계산.
6. **Force curve SVG** — viewBox와 path 데이터를 그대로 가져오되, 7종 스위치 path를 컴포넌트로 분리.
7. **터치 키오스크 모드** — `cursor: none`, 우클릭 비활성화, F5 비활성화 등 키오스크 환경 가드.
