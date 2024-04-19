export const countSubstringOccurrences = (source: string, target: string) => {
  const regex = new RegExp(target, 'g');
  const matches = source.match(regex);

  return matches ? matches.length : 0;
};
