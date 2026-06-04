/* React 사전 컴파일 빌드 스크립트
 *
 * "Cherry Kiosk react.src.html" (JSX 소스, 편집용)을 읽어
 *  - JSX를 Babel로 미리 컴파일하고
 *  - @babel/standalone CDN 및 type="text/babel" 런타임 컴파일을 제거한
 * "Cherry Kiosk react.html" (배포본)을 생성한다.
 *
 * 실행:  npm i --no-save @babel/standalone@7 && node build-react.mjs
 *
 * 효과: 브라우저가 2.8MB Babel을 받지 않고 런타임 컴파일도 안 하므로
 *       v2(순수 JS)와 거의 동일한 로딩 속도가 된다.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const Babel = require('@babel/standalone');

const SRC = 'Cherry Kiosk react.src.html';
const OUT = 'Cherry Kiosk react.html';

let html = readFileSync(SRC, 'utf8');

// 1) JSX 스크립트 블록 추출
const m = html.match(/<script type="text\/babel"[^>]*>([\s\S]*?)<\/script>/);
if (!m) { console.error('JSX <script type="text/babel"> 블록을 찾지 못했습니다.'); process.exit(1); }

// 2) Babel 컴파일 (react preset)
let compiled;
try {
  compiled = Babel.transform(m[1], { presets: ['react'] }).code;
} catch (e) {
  console.error('Babel 컴파일 실패:', e.message);
  process.exit(1);
}

// 3) @babel/standalone CDN 스크립트 제거
html = html.replace(/[ \t]*<script src="https:\/\/unpkg\.com\/@babel\/standalone\/babel\.min\.js"><\/script>\r?\n?/, '');

// 4) type="text/babel" 런타임 블록을 일반 <script> + 컴파일 결과로 교체
html = html.replace(
  /<script type="text\/babel"[^>]*>[\s\S]*?<\/script>/,
  '<script>\n/* 빌드 산출물 — 편집은 "Cherry Kiosk react.src.html" 에서 후 build-react.mjs 재실행 */\n' + compiled + '\n</script>'
);

writeFileSync(OUT, html, 'utf8');
console.log('✅ 빌드 완료:', OUT, '(' + html.length + ' chars)');
console.log('   babel.min.js 제거됨:', !html.includes('@babel/standalone'));
console.log('   text/babel 제거됨:', !html.includes('text/babel'));
