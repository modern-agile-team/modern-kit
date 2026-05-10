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
