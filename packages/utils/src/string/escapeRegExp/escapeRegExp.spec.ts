import { describe, expect, it } from 'vitest';
import { escapeRegExp } from '.';

describe('escapeRegExp', () => {
  it('정규 표현식 특수문자 앞에 백슬래시를 붙여야 합니다.', () => {
    expect(escapeRegExp('^$\\.*+?()[]{}|')).toBe(
      '\\^\\$\\\\\\.\\*\\+\\?\\(\\)\\[\\]\\{\\}\\|'
    );
  });

  it('특수문자를 하나씩 넘겨도 각각 이스케이프해야 합니다.', () => {
    const specialChars = [
      '^',
      '$',
      '\\',
      '.',
      '*',
      '+',
      '?',
      '(',
      ')',
      '[',
      ']',
      '{',
      '}',
      '|',
    ];

    for (const char of specialChars) {
      expect(escapeRegExp(char)).toBe(`\\${char}`);
    }
  });

  it('특수문자가 없는 문자열은 그대로 반환해야 합니다.', () => {
    expect(escapeRegExp('abc 123')).toBe('abc 123');
    expect(escapeRegExp('')).toBe('');
  });

  it('특수문자가 섞여 있으면 특수문자만 이스케이프해야 합니다.', () => {
    expect(escapeRegExp('1 + 2 = 3?')).toBe('1 \\+ 2 = 3\\?');
    expect(escapeRegExp('[bunjang](https://m.stg-bunjang.co.kr/)')).toBe(
      '\\[bunjang\\]\\(https://m\\.stg-bunjang\\.co\\.kr/\\)'
    );
  });

  it('한글·공백·이모지는 건드리지 않아야 합니다.', () => {
    expect(escapeRegExp('상품 12개')).toBe('상품 12개');
    expect(escapeRegExp('가족은 👨‍👩‍👧 입니다')).toBe('가족은 👨‍👩‍👧 입니다');
    expect(escapeRegExp('가격: 10,000원 (무료배송)')).toBe(
      '가격: 10,000원 \\(무료배송\\)'
    );
  });

  it('패턴 본문에서 특별한 뜻이 없는 `-` 와 `/` 는 이스케이프하지 않아야 합니다.', () => {
    expect(escapeRegExp('a-b/c')).toBe('a-b/c');
  });

  it('치환 패턴으로 쓰이는 `$&` 가 결과에 섞여 들어가지 않아야 합니다.', () => {
    expect(escapeRegExp('$&')).toBe('\\$&');
    expect(escapeRegExp('$$')).toBe('\\$\\$');
  });
});
