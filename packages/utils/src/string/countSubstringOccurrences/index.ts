import {
  countAllowOverlap,
  countExceptOverlap,
  escapeRegExp,
} from './internal';

interface Options {
  overlap?: boolean;
}

export function countSubstringOccurrences(
  source: string,
  target: string,
  options: Options = {}
): number {
  if (target === '') return 0;

  const { overlap = false } = options;

  const escapedTarget = escapeRegExp(target);
  const regex = new RegExp(escapedTarget, 'g');

  return overlap
    ? countAllowOverlap(source, regex)
    : countExceptOverlap(source, regex);
}
