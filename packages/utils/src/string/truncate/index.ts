import { isString } from '@modern-kit/utils';

interface Options {
  length?: number;
  omission?: string;
  separator?: RegExp | string;
}

export function truncate(string: string, options: Options = {}): string {
  const { length = 30, omission = '...', separator } = options;

  if (string.length <= length) {
    return string;
  }

  const truncatedLength = length - omission.length;

  if (truncatedLength <= 0) {
    return omission;
  }

  let truncatedString = string.slice(0, truncatedLength);

  if (!separator) {
    return truncatedString + omission;
  }
  if (isString(separator)) {
    const matchIndex = truncatedString.lastIndexOf(separator);
    if (matchIndex !== -1) {
      truncatedString = truncatedString.slice(0, matchIndex);
    }
  }

  if (separator instanceof RegExp) {
    const match = truncatedString.match(separator);

    if (match) {
      truncatedString = truncatedString.slice(0, match.index);
    }
  }

  return truncatedString + omission;
}
