/**
 * @description 문자열에 든 정규 표현식 특수문자(`^` `$` `\` `.` `*` `+` `?` `(` `)` `[` `]` `{` `}` `|`) 앞에 백슬래시를 붙여,
 * 패턴이 아닌 문자 그대로 매치되게 만드는 함수입니다.
 *
 * @param {string} str - 이스케이프할 문자열입니다.
 * @returns {string} 특수문자 앞에 백슬래시가 붙은 문자열입니다.
 *
 * @example
 * escapeRegExp('1 + 2 = 3?'); // '1 \\+ 2 = 3\\?'
 *
 * @example
 * // 특수문자가 없으면 원본을 그대로 반환합니다
 * escapeRegExp('상품 12개'); // '상품 12개'
 *
 * @example
 * escapeRegExp('[bunjang](https://m.stg-bunjang.co.kr/)'); // '\[bunjang\]\(https://m\.stg-bunjang\.co\.kr/\)'
 *
 */
export function escapeRegExp(str: string): string {
  return str.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}
