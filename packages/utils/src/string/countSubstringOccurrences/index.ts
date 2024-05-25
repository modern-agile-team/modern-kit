export const countSubstringOccurrences = (
  source: string,
  target: string
): number => {
  if (target === '') return 0;

  const escapedTarget = escapeRegExp(target);
  const regex = new RegExp(escapedTarget, 'g');
  let count = 0;
  let match;

  while ((match = regex.exec(source)) !== null) {
    count++;
    regex.lastIndex = match.index + 1;
  }

  return count;
};

const escapeRegExp = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
