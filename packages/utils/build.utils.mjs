import fs from 'fs';
import path from 'path';

const PATH_KEYS = [
  'array',
  'clipboard',
  'common',
  'date',
  'device',
  'file',
  'formatter',
  'math',
  'object',
  'regex',
  'storage',
  'string',
  'style',
  'validator',
];

const getEntryFileNames = (name, format, path) => {
  const cleanName = name.replace(`${path}-`, '');
  return `${path}/${cleanName}/index.${format}`;
};

// 청크 이름에 따라 엔트리 파일 이름 생성 함수
export const getFormatEntryFileNames = (chunkInfo, format) => {
  const { name } = chunkInfo;

  for (const key of PATH_KEYS) {
    // 각 모듈의 index
    if (name === `${key}-index`) {
      return `${key}/index.${format}`;
    }

    // 기본 모듈
    if (name.startsWith(key)) {
      return getEntryFileNames(name, format, key);
    }
  }
  // root index
  return `[name].${format}`;
};

/**
 * 디렉토리 스캔하여 모듈 키 생성 함수
 * @see https://github.com/modern-agile-team/modern-kit/pull/734
 */
const scanDirectory = (pathKey) => {
  const dirPath = path.join('./src', pathKey);
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const keys = ['index'];

  entries.forEach((entry) => {
    if (entry.isDirectory()) {
      keys.push(entry.name);
    }
  });

  return keys;
};

/**
 * 모든 엔트리 생성 함수
 * @see https://github.com/modern-agile-team/modern-kit/pull/734
 */
export const getAllEntries = () => {
  return PATH_KEYS.reduce((acc, cur) => {
    const entries = scanDirectory(cur);
    entries.forEach((entry) => {
      const entryPath = entry === 'index' ? 'index.ts' : `${entry}/index.ts`;

      acc[`${cur}-${entry}`] = `./src/${cur}/${entryPath}`;
    });
    return acc;
  }, {});
};
