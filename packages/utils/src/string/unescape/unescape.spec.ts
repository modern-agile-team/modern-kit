import { describe, expect, it } from 'vitest';
import { escape } from '../escape';
import { unescape } from '.';

describe('unescape', () => {
  const escaped = '&amp;&lt;&gt;&quot;&#39;';
  const unescaped = '&<>"\'';

  it('escape 가 만드는 다섯 엔티티를 원래 문자로 되돌려야 합니다.', () => {
    expect(unescape(escaped)).toBe(unescaped);
  });

  it('엔티티를 하나씩 넘겨도 각각 되돌려야 합니다.', () => {
    expect(unescape('&amp;')).toBe('&');
    expect(unescape('&lt;')).toBe('<');
    expect(unescape('&gt;')).toBe('>');
    expect(unescape('&quot;')).toBe('"');
    expect(unescape('&#39;')).toBe("'");
  });

  it('같은 엔티티가 여러 번 나와도 모두 되돌려야 합니다.', () => {
    expect(unescape(escaped + escaped)).toBe(unescaped + unescaped);
  });

  it('되돌릴 엔티티가 없으면 원본을 그대로 반환해야 합니다.', () => {
    expect(unescape('abc')).toBe('abc');
    expect(unescape('')).toBe('');
  });

  it('숫자 참조 앞에 붙은 0 을 무시해야 합니다.', () => {
    expect(unescape('&#39;')).toBe("'");
    expect(unescape('&#039;')).toBe("'");
    expect(unescape('&#000039;')).toBe("'");
  });

  it('문자열을 왼쪽부터 한 번만 훑어, 되돌린 결과를 다시 훑지 않아야 합니다.', () => {
    expect(unescape('&amp;lt;')).toBe('&lt;');
    expect(unescape('&amp;amp;')).toBe('&amp;');
  });

  it('escape 가 만들지 않는 엔티티는 건드리지 않아야 합니다.', () => {
    for (const entity of ['&#96;', '&#x2F;', '&#x27;', '&#38;']) {
      expect(unescape(entity)).toBe(entity);
    }
  });

  it('이름 참조 중에서도 escape 가 만드는 것만 되돌려야 합니다.', () => {
    expect(unescape('&nbsp;')).toBe('&nbsp;');
    expect(unescape('&copy;')).toBe('&copy;');
    expect(unescape('&AMP;')).toBe('&AMP;');
  });

  it('escape 로 이스케이프한 문자열을 원본으로 되돌려야 합니다.', () => {
    expect(unescape(escape(unescaped))).toBe(unescaped);
    expect(unescape(escape('번개장터 <b>상품</b>'))).toBe(
      '번개장터 <b>상품</b>'
    );
  });
});
