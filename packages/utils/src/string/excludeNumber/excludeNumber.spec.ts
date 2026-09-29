import { describe, expect, it } from 'vitest';
import { excludeNumber } from '.';

describe('excludeNumber', () => {
  it('숫자를 제거해야 합니다', () => {
    expect(excludeNumber('Hello123 World456')).toBe('Hello World');
    expect(excludeNumber('123ABC456')).toBe('ABC');
    expect(excludeNumber('1234567890')).toBe('');
  });

  it('숫자가 없는 문자열은 그대로 반환해야 합니다', () => {
    expect(excludeNumber('Hello World')).toBe('Hello World');
    expect(excludeNumber('')).toBe('');
  });

  it('결합 문자와 이모지 시퀀스를 보존해야 합니다', () => {
    const nfd = 'José'.normalize('NFD');
    const family = '\u{1F468}‍\u{1F469}‍\u{1F467}'; // 👨‍👩‍👧

    expect(excludeNumber(`${nfd}1${family}2`)).toBe(`${nfd}${family}`);
  });
});
