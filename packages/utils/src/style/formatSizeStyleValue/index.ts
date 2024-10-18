const SUFFIX_UNITS = [
  'cm',
  'mm',
  'Q',
  'in',
  'pc',
  'pt',
  'px',
  'em',
  'ex',
  'ch',
  'rem',
  'vw',
  'vh',
  'vmin',
  'vmax',
  '%',
] as const;

type SuffixUnit = (typeof SUFFIX_UNITS)[number];

export function formatSizeStyleValue(value: string): string;
export function formatSizeStyleValue(value: number): string;
export function formatSizeStyleValue(value: number, suffix: SuffixUnit): string;

/**
 * @description css 스타일 값으로 사용할 수 있는 값을 반환합니다.
 * @param {string | number} value css 스타일 값으로 사용할 수 있는 값
 * @param {SuffixUnit} suffix css 스타일 값의 단위
 * @returns {string} css 스타일 값으로 사용할 수 있는 값
 * @example
 * ```ts
 * formatSizeStyleValue('10px');    // '10px'
 * formatSizeStyleValue(10);        // '10px'
 * formatSizeStyleValue(10, '%');   // '10%'
 * ```
 */
export function formatSizeStyleValue(
  value: string | number,
  suffix?: SuffixUnit
): string {
  if (typeof value === 'string') {
    return value;
  }

  return `${value}${suffix ?? 'px'}`;
}
