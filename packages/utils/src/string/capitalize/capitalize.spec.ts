import { describe, it, expect } from 'vitest';
import { capitalize } from '.';

describe('capitalize', () => {
  it('문자열의 첫 글자를 대문자로 변환해야 합니다.', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('world')).toBe('World');
  });

  it('빈 문자열이 입력되면 빈 문자열을 반환해야 합니다.', () => {
    expect(capitalize('')).toBe('');
  });

  it('숫자로 시작하는 문자열이 입력되면 원본 문자열을 반환해야 합니다.', () => {
    expect(capitalize('123')).toBe('123');
  });

  it('공백으로 시작하는 문자열이 입력되면 원본 문자열을 반환해야 합니다.', () => {
    expect(capitalize(' abc')).toBe(' abc');
  });
});
