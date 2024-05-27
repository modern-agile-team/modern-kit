type Options = { overlap: boolean };

const escapeRegExp = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const countAllowOverlap = (source: string, regex: RegExp) => {
  let count = 0;
  let match = regex.exec(source);

  while (match !== null) {
    count++;
    regex.lastIndex = match.index + 1;

    match = regex.exec(source);
  }

  return count;
};

const countExceptOverlap = (source: string, regex: RegExp) => {
  const matches = source.match(regex);
  return matches ? matches.length : 0;
};

export const countSubstringOccurrences = (
  source: string,
  target: string,
  options: Options = { overlap: false }
): number => {
  if (target === '') return 0;

  const escapedTarget = escapeRegExp(target);
  const regex = new RegExp(escapedTarget, 'g');

  return options.overlap
    ? countAllowOverlap(source, regex)
    : countExceptOverlap(source, regex);
};
