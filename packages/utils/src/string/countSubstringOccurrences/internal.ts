export const escapeRegExp = (str: string): RegExp => {
  const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(escaped, 'g');
};

export const countAllowOverlap = (source: string, target: string) => {
  const regex = escapeRegExp(target);
  let count = 0;
  let match = regex.exec(source);

  while (match !== null) {
    count++;
    regex.lastIndex = match.index + 1;

    match = regex.exec(source);
  }

  return count;
};

export const countExceptOverlap = (source: string, target: string) => {
  const regex = escapeRegExp(target);

  const matches = source.match(regex);
  return matches ? matches.length : 0;
};
