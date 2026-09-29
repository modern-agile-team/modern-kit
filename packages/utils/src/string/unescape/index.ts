/** HTML 엔티티와, 그에 대응하는 문자입니다. */
const HTML_UNESCAPES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
};

/**
 * @description HTML 엔티티 `&amp;` `&lt;` `&gt;` `&quot;` `&#39;` 를 원래 문자로 되돌리는 함수입니다.
 * `escape` 의 역함수입니다.
 *
 * @param {string} str - 되돌릴 문자열입니다.
 * @returns {string} 엔티티가 원래 문자로 바뀐 문자열입니다.
 *
 * @example
 * unescape('This is a &lt;div&gt; element.'); // 'This is a <div> element.'
 *
 * @example
 * unescape('This is a &quot;quote&quot;'); // 'This is a "quote"'
 * unescape('This is a &#39;quote&#39;'); // "This is a 'quote'"
 * unescape('This is a &amp; symbol'); // 'This is a & symbol'
 */
export function unescape(str: string): string {
  return str.replace(
    /&(?:amp|lt|gt|quot|#(?:0+)?39);/g,
    (match) => HTML_UNESCAPES[match] || "'"
  );
}
