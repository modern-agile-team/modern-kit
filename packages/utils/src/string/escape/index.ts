/** HTML 에서 특별한 뜻을 갖는 문자와, 그에 대응하는 엔티티입니다. */
const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * @description 문자열에 든 `&` `<` `>` `"` `'` 를 대응하는 HTML 엔티티로 바꾸는 함수입니다.
 * 예를 들어 `'<'` 는 `'&lt;'` 가 됩니다.
 *
 * 내용을 미리 알 수 없는 문자열을 HTML 마크업에 끼워 넣을 때, 그 문자열이 태그나 속성 경계로 해석되지 않게 막아 줍니다. (`'<b>'` → `'&lt;b&gt;'`)
 *
 * @param {string} str - 이스케이프할 문자열입니다.
 * @returns {string} 특수문자가 HTML 엔티티로 바뀐 문자열입니다.
 *
 * @example
 * escape('This is a <div> element.'); // 'This is a &lt;div&gt; element.'
 *
 * @example
 * escape('번개장터 <b>상품</b>'); // '번개장터 &lt;b&gt;상품&lt;/b&gt;'
 *
 * @example
 * escape('This is a "quote"'); // 'This is a &quot;quote&quot;'
 * escape("This is a 'quote'"); // 'This is a &#39;quote&#39;'
 * escape('This is a & symbol'); // 'This is a &amp; symbol'
 *
 * @example
 * // 바꿀 문자가 없으면 원본을 그대로 반환합니다
 * escape('상품 12개'); // '상품 12개'
 */
export function escape(str: string): string {
  return str.replace(/[&<>"']/g, (match) => HTML_ESCAPES[match]);
}
