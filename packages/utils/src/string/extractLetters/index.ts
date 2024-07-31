interface Options {
  letters?: boolean;
  numbers?: boolean;
  specialCharacters?: boolean;
  whiteSpace?: boolean;
}

const regexps = {
  letters: '\\p{L}',
  numbers: '\\p{N}',
  specialCharacters: '\\p{S}\\p{P}',
  whiteSpace: '\\s',
} as const;

const createRegex = (options: Options) => {
  let pattern = '';

  for (const key in options) {
    if (options[key as keyof Options]) {
      pattern += regexps[key as keyof Options];
    }
  }

  return new RegExp(`[^${pattern}]`, 'gu');
};

export function extractLetters(
  value: string,
  options: Options = { letters: true }
) {
  const regex = createRegex(options);
  return value.replace(regex, '');
}
