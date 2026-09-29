// 사용법: yarn vitest run --logHeapUsage --reporter=verbose 2>&1 | node heap-summary.mjs
import { createInterface } from 'node:readline';

// lerna / vitest 출력의 ANSI 색상 코드를 제거합니다.
const stripAnsi = (text) => text.replace(/\x1b\[[0-9;]*m/g, '');
const formatMb = (mb) => `${String(mb).padStart(4)}MB`;

// 파일 경로 → 테스트 목록 (Map 은 삽입 순서를 유지하므로 파일이 처음 등장한 순서대로 출력됩니다)
const files = new Map();

for await (const rawLine of createInterface({ input: process.stdin })) {
  const line = stripAnsi(rawLine);
  const heap = line.match(/(\d+) MB heap used/);
  if (!heap) continue;

  const mb = Number(heap[1]);
  const file = line.match(/\s(src\/\S+\.(?:spec|test)\.\w+)/)?.[1] ?? 'unknown';
  // "파일 > describe > 테스트 이름 10ms 63 MB heap used" 에서 "describe > 테스트 이름" 만 추출합니다.
  const path = line
    .slice(line.indexOf(file) + file.length)
    .replace(/\s+\d+ms\s+\d+ MB heap used.*$/, '')
    .replace(/^\s*>\s*/, '')
    .split(' > ')
    .filter(Boolean);

  if (!files.has(file)) files.set(file, []);
  files.get(file).push({ mb, path: path.length > 0 ? path : ['(suite)'] });
}

if (files.size === 0) {
  console.log('heap 로그가 없습니다. --logHeapUsage --reporter=verbose 를 확인하세요.');
  process.exit(1);
}

// 1. 파일 > describe > 테스트 트리
console.log('── 테스트별 heap 사용량 (파일별 그룹) ──');
for (const [file, tests] of files) {
  const max = Math.max(...tests.map(({ mb }) => mb));
  console.log(`\n📄 ${file}  (${tests.length} tests, max ${max}MB)`);

  // 직전 테스트와 겹치는 describe 는 다시 출력하지 않습니다.
  let prevDescribes = [];
  for (const { mb, path } of tests) {
    const describes = path.slice(0, -1);
    const name = path.at(-1);

    describes.forEach((describe, depth) => {
      if (prevDescribes[depth] === describe) return;
      console.log(`${'  '.repeat(depth + 1)}▸ ${describe}`);
      prevDescribes = prevDescribes.slice(0, depth);
      prevDescribes[depth] = describe;
    });
    prevDescribes = prevDescribes.slice(0, describes.length);

    console.log(`${'  '.repeat(describes.length + 1)}${formatMb(mb)}  ${name}`);
  }
}

// 2. 요약
const values = [...files.values()]
  .flat()
  .map(({ mb }) => mb)
  .sort((a, b) => a - b);
const pick = (p) => values[Math.min(values.length - 1, Math.floor(values.length * p))];

console.log('\n── Summary ──');
console.log(`테스트 케이스: ${values.length}, 테스트 파일: ${files.size}`);
console.log(
  `min=${values[0]}MB  median=${pick(0.5)}MB  p95=${pick(0.95)}MB  max=${values.at(-1)}MB`
);
console.log('heap 최대 상위 5개 파일 (워커 누적분 포함):');
[...files]
  .map(([file, tests]) => [file, Math.max(...tests.map(({ mb }) => mb))])
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .forEach(([file, mb]) => console.log(`  ${formatMb(mb)}  ${file}`));
