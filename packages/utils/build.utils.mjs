const getEntryFileNames = (name, format, path) => {
  const cleanName = name.replace(`${path}-`, '');
  return `${path}/${cleanName}/index.${format}`;
};

export const getFormatEntryFileNames = (chunkInfo, format) => {
  const prefixMap = {
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

  for (const [key, value] of Object.entries(prefixMap)) {
    if (chunkInfo.name === `${key}-index`) {
      return `${key}/index.${format}`;
    }

    if (chunkInfo.name.startsWith(value)) {
      return getEntryFileNames(chunkInfo.name, format, key);
    }
  }

  return `[name].${format}`; // 기본 파일 이름
};

export const getSubEntryMap = (keys, path) => {
  return keys.reduce((acc, entry) => {
    acc[`${path}-${entry}`] = `./src/${path}/${entry}`;
    return acc;
  }, {});
};
