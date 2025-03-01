import { describe, expect, it } from 'vitest';
import { trim } from '.';

describe('trim', () => {
  it('제거할 문자를 지정하지 않으면, 앞뒤 공백을 모두 제거해야 합니다', () => {
    expect(trim('  abc  ')).toBe('abc');
  });

  it('제거할 문자를 지정하면, 문자열 시작과 끝에서 해당 문자들을 모두 제거해야 합니다', () => {
    expect(trim('--abc--', '-')).toBe('abc');
    expect(trim('bcabcdbc', 'bc')).toBe('abcd');
  });

  it('제거할 문자들을 배열로 지정하면, 문자열 시작과 끝에서 해당 문자들을 모두 제거해야 합니다', () => {
    expect(trim('-_-abc-_-', ['_', '-'])).toBe('abc');
  });

  it('제거할 문자들을 배열로 지정했을 때, 각 문자열 요소를 개별 문자로 나누고 문자열 시작과 끝에서 제거해야 합니다', () => {
    expect(trim('+-*abc+-*', ['+*', '-'])).toBe('abc');
  });

  it('제거할 문자가 문자열에 없으면, 원본 문자열을 그대로 반환해야 합니다', () => {
    expect(trim('--abc--', '+')).toBe('--abc--');
  });
});
