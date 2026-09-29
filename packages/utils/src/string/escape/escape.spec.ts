import { describe, expect, it } from 'vitest';
import { unescape } from '../unescape';
import { escape } from '.';

describe('escape', () => {
  const unescaped = '&<>"\'';
  const escaped = '&amp;&lt;&gt;&quot;&#39;';

  it('HTML 에서 특별한 뜻을 갖는 다섯 문자를 엔티티로 바꿔야 합니다.', () => {
    expect(escape(unescaped)).toBe(escaped);
  });

  it('문자를 하나씩 넘겨도 각각 엔티티로 바꿔야 합니다.', () => {
    expect(escape('&')).toBe('&amp;');
    expect(escape('<')).toBe('&lt;');
    expect(escape('>')).toBe('&gt;');
    expect(escape('"')).toBe('&quot;');
    expect(escape("'")).toBe('&#39;');
  });

  it('같은 문자가 여러 번 나와도 모두 바꿔야 합니다.', () => {
    expect(escape(unescaped + unescaped)).toBe(escaped + escaped);
  });

  it('바꿀 문자가 없으면 원본을 그대로 반환해야 합니다.', () => {
    expect(escape('abc')).toBe('abc');
    expect(escape('')).toBe('');
  });

  it('한글·공백·이모지는 건드리지 않아야 합니다.', () => {
    expect(escape('상품 12개 😀')).toBe('상품 12개 😀');
    expect(escape('번개장터 <b>상품</b>')).toBe(
      '번개장터 &lt;b&gt;상품&lt;/b&gt;'
    );
  });

  it('HTML 파서에게 평범한 글자인 백틱과 슬래시는 바꾸지 않아야 합니다.', () => {
    for (const char of ['`', '/']) {
      expect(escape(char)).toBe(char);
    }
  });

  it('`&` 도 바꾸므로 두 번 호출하면 엔티티가 다시 이스케이프되어야 합니다.', () => {
    expect(escape(escape('<'))).toBe('&amp;lt;');
  });

  it('태그처럼 보이는 문자열을 마크업이 아닌 텍스트로 만들어야 합니다.', () => {
    expect(escape('<script>alert("1")</script>')).toBe(
      '&lt;script&gt;alert(&quot;1&quot;)&lt;/script&gt;'
    );
  });

  it('unescape 가 되돌리는 문자를 그대로 이스케이프해야 합니다.', () => {
    expect(escape(unescape(escaped))).toBe(escaped);
  });
});
