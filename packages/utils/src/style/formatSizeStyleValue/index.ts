/**
 * @description css 스타일 값으로 사용할 수 있는 단위
 * @see https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#lengths
 */
type SuffixUnit =
  | 'cm'
  | 'mm'
  | 'Q'
  | 'in'
  | 'pc'
  | 'pt'
  | 'px'
  | 'em'
  | 'ex'
  | 'ch'
  | 'rem'
  | 'vw'
  | 'vh'
  | 'vmin'
  | 'vmax'
  | 'lh'
  | 'rlh'
  | '%';

export function formatSizeStyleValue(value: number): string;
export function formatSizeStyleValue(value: number, suffix: SuffixUnit): string;

/**
 * @description css 스타일 값으로 사용할 수 있는 값을 반환합니다.
 * @param {number} value css 스타일 값으로 사용할 수 있는 값
 * @param {SuffixUnit} suffix css 스타일 값의 단위
 * @returns {string} css 스타일 값으로 사용할 수 있는 값
 * @example
 * ```ts
 * formatSizeStyleValue(10);        // '10px'
 * formatSizeStyleValue(10, '%');   // '10%'
 * ```
 */
export function formatSizeStyleValue(
  value: number,
  suffix?: SuffixUnit
): string {
  return `${value}${suffix ?? 'px'}`;
}
