interface Options {
  letters?: boolean;
  numbers?: boolean;
  specialCharacters?: boolean;
  whiteSpace?: boolean;
}

const createRegex = (options: Options) => {
  const { letters, numbers, specialCharacters, whiteSpace } = options;

  let pattern = '[^';

  if (letters) pattern += '\\p{L}';
  if (numbers) pattern += '\\p{N}';
  if (specialCharacters) pattern += '\\p{S}\\p{P}';
  if (whiteSpace) pattern += `\\s`;

  pattern += `]`;

  return new RegExp(pattern, 'gu');
};

export const extractLetters = (
  value: string,
  options: Options = { letters: true }
) => {
  const regex = createRegex(options);
  return value.replace(regex, '');
};
