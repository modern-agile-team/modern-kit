import { describe, expect, it } from 'vitest';
import { trimStart } from '.';

describe('trimStart', () => {
  it('제거할 문자를 지정하지 않으면, 앞쪽 공백만 제거해야 합니다', () => {
    expect(trimStart('  abc  ')).toBe('abc  ');
  });

  it('제거할 문자를 지정하면, 앞쪽의 해당 문자들만 제거해야 합니다', () => {
    expect(trimStart('--abc  ', '-')).toBe('abc  ');
    expect(trimStart('abcabcabc', 'ab')).toBe('cabcabc');
  });

  it('제거할 문자들을 배열로 지정하면, 문자열로 변환 후 앞쪽에서 해당 문자들을 모두 제거해야 합니다', () => {
    expect(trimStart('-_-abc-_-', ['_', '-'])).toBe('abc-_-');
  });

  it('제거할 문자들을 배열로 지정했을 때, 각 문자열 요소는 개별 문자로 나누고 제거해야 합니다', () => {
    expect(trimStart('+-*abc-_-', ['+*', '-'])).toBe('abc-_-');
  });

  it('제거할 문자가 문자열에 없으면, 원본 문자열을 그대로 반환해야 합니다', () => {
    expect(trimStart('--abc  ', '+')).toBe('--abc  ');
  });
});
