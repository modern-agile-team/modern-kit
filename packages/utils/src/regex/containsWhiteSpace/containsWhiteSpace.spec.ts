import { describe, it, expect } from 'vitest';
import { containsWhiteSpace } from '.';

describe('containsWhiteSpace', () => {
  it('공백 문자가 포함된 문자열이면 true를 반환해야 합니다', () => {
    expect(containsWhiteSpace('hello world')).toBe(true);
    expect(containsWhiteSpace(' leading')).toBe(true);
    expect(containsWhiteSpace('trailing ')).toBe(true);
    expect(containsWhiteSpace('multiple spaces')).toBe(true);
    expect(containsWhiteSpace('\t')).toBe(true); // Tab character
    expect(containsWhiteSpace('\n')).toBe(true); // Newline character
  });

  it('공백 문자가 포함되지 않은 문자열이면 false를 반환해야 합니다', () => {
    expect(containsWhiteSpace('')).toBe(false);
    expect(containsWhiteSpace('helloworld')).toBe(false);
    expect(containsWhiteSpace('12345')).toBe(false);
    expect(containsWhiteSpace('!@#$%')).toBe(false);
  });
});
