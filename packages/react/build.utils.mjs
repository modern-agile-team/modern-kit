const PATH_PREFIX_MAP = {
  _internal: '_internal',
  utils: 'utils',
  components: 'components',
  hooks: 'hooks',
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
  const getEntryExtension = path === 'components' ? 'tsx' : 'ts';

  return keys.reduce((acc, entry) => {
    const entryPath =
      entry === 'index' ? 'index.ts' : `${entry}/index.${getEntryExtension}`;

    acc[`${path}-${entry}`] = `./src/${path}/${entryPath}`;
    return acc;
  }, {});
};
