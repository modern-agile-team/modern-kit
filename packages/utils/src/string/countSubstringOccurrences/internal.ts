export const escapeRegExp = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const countAllowOverlap = (source: string, regex: RegExp) => {
  let count = 0;
  let match = regex.exec(source);

  while (match !== null) {
    count++;
    regex.lastIndex = match.index + 1;

    match = regex.exec(source);
  }

  return count;
};

export const countExceptOverlap = (source: string, regex: RegExp) => {
  const matches = source.match(regex);
  return matches ? matches.length : 0;
};
