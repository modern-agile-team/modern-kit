export const createInput = (categories) => {
  const input = {
    index: './src/index.ts',
  };

  for (const category of categories) {
    input[`${category}/index`] = `./src/${category}/index.ts`;
  }
  return input;
};

export const formatEntry = (ext) => (chunkInfo) => {
  if (chunkInfo.name.endsWith('.d')) {
    return `${chunkInfo.name.slice(0, -2)}.d.ts`;
  }
  return `[name].${ext}`;
};

/**
 * @description react와 같이 딱 떨어지는 케이스가 아닌 react/jsx-runtime 처럼 중간 경로가 있는 경우도 External 처리
 * 함수로 전달하면 모듈마다 Rust → JS 호출이 발생하므로, rolldown 이 네이티브로 매칭할 수 있는 정규식 배열로 반환합니다.
 *
 * @param {string[]} externalDeps - External 처리할 패키지 목록
 * @returns {RegExp[]} - `dep` 와 `dep/*` 를 매칭하는 정규식 목록
 */
export const externalMatcher = (externalDeps = []) =>
  externalDeps.map(
    (dep) =>
      new RegExp(`^${dep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:/.*)?$`)
  );
