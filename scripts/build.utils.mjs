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
 *
 * @param {string[]} externalDeps - External 처리할 패키지 목록
 * @param {string} id - 패키지 이름
 * @returns {boolean} - External 처리 여부
 */
export const externalMatcher =
  (externalDeps = []) =>
  (id) => {
    return externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`));
  };
