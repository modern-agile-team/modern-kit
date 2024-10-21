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
 * @description `css` 스타일 값으로 사용할 수 있도록 `<value>[suffix]` 형태로 변환해주는 유틸 합수입니다.
 *
 * `suffix`옵션을 통해서 해당 값에 접미사를 붙여 반환할 수 있습니다. 해당 옵션이 없다면 `default`로 `px`을 접미사로 사용합니다.
 * @param {number} value 점미사를 붙일 값
 * @param {SuffixUnit} suffix `css` 스타일 값의 단위
 * @returns {string} `css` 스타일 값으로 사용할 수 있는 값
 * @example
 * ```typescript
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
