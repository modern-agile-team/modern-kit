import { describe, expect, it } from 'vitest';
import { trimEnd } from '.';

describe('trimEnd', () => {
  it('제거할 문자를 지정하지 않으면, 뒤쪽 공백만 제거해야 합니다', () => {
    expect(trimEnd('  abc  ')).toBe('  abc');
  });

  it('제거할 문자를 지정하면, 뒷쪽의 해당 문자들만 제거해야 합니다', () => {
    expect(trimEnd('  abc--', '-')).toBe('  abc');
    expect(trimEnd('abcabcabc', 'bc')).toBe('abcabca');
  });

  it('제거할 문자들을 배열로 지정하면, 문자열로 변환 후 뒷쪽에서 해당 문자들을 모두 제거해야 합니다', () => {
    expect(trimEnd('-_-abc-_-', ['_', '-'])).toBe('-_-abc');
  });

  it('제거할 문자들을 배열로 지정했을 때, 각 문자열 요소는 개별 문자로 나누고 제거해야 합니다', () => {
    expect(trimEnd('-_-abc+-*', ['+*', '-'])).toBe('-_-abc');
  });

  it('제거할 문자가 문자열에 없으면, 원본 문자열을 그대로 반환해야 합니다', () => {
    expect(trimEnd('--abc  ', '+')).toBe('--abc  ');
  });
});
