const PATH_PREFIX_MAP = {
  array: 'array',
  clipboard: 'clipboard',
  common: 'common',
  date: 'date',
  device: 'device',
  file: 'file',
  formatter: 'formatter',
  math: 'math',
  object: 'object',
  regex: 'regex',
  storage: 'storage',
  string: 'string',
  style: 'style',
  validator: 'validator',
};

const getEntryFileNames = (name, format, path) => {
  const cleanName = name.replace(`${path}-`, '');
  return `${path}/${cleanName}/index.${format}`;
};

export const getFormatEntryFileNames = (chunkInfo, format) => {
  const { name } = chunkInfo;

  for (const [key, value] of Object.entries(PATH_PREFIX_MAP)) {
    // 각 모듈의 index
    if (name === `${key}-index`) {
      return `${key}/index.${format}`;
    }

    // 기본 모듈
    if (name.startsWith(value)) {
      return getEntryFileNames(name, format, key);
    }
  }
  // root index
  return `[name].${format}`;
};

export const getSubEntryMap = (keys, path) => {
  return keys.reduce((acc, entry) => {
    const entryPath = entry === 'index' ? 'index.ts' : `${entry}/index.ts`;

    acc[`${path}-${entry}`] = `./src/${path}/${entryPath}`;
    return acc;
  }, {});
};
