// @changesets/cli v3는 changelog 플러그인을 import-meta-resolve로 탐색하는데,
// Yarn PnP 환경(node_modules 없음)에서는 패키지명으로 찾지 못합니다.
// 상대 경로로 이 파일을 지정하고, 내부 import는 PnP 로더를 통해 해석되도록 우회합니다.
export { default } from '@changesets/changelog-github';
