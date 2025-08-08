import { describe, it, expect } from 'vitest';
import { hasRepeatingChars } from '.';

const MAX_REPEAT_COUNT = 3;

describe('hasRepeatingChars', () => {
  it('연속된 문자의 개수가 maxCount 초과하면 true를 반환해야 한다', () => {
    expect(hasRepeatingChars('aaabb', MAX_REPEAT_COUNT)).toBeTruthy();
    expect(hasRepeatingChars('123!!!123', MAX_REPEAT_COUNT)).toBeTruthy();
  });

  it('연속된 문자의 개수가 maxCount 초과하지 않으면 false를 반환해야 한다', () => {
    expect(hasRepeatingChars('aab', MAX_REPEAT_COUNT)).toBeFalsy();
    expect(hasRepeatingChars('123aa123', MAX_REPEAT_COUNT)).toBeFalsy();
  });

  it('유효하지 않은 maxRepeatCount 값이 전달되면 에러를 발생시켜야 한다', () => {
    expect(() => hasRepeatingChars('aabb', NaN)).toThrow(
      'maxCount는 양의 정수여야 합니다'
    );
    expect(() => hasRepeatingChars('aabb', Infinity)).toThrow(
      'maxCount는 양의 정수여야 합니다'
    );
    expect(() => hasRepeatingChars('aabb', 1.1)).toThrow(
      'maxCount는 양의 정수여야 합니다'
    );
    expect(() => hasRepeatingChars('aabb', -1)).toThrow(
      'maxCount는 양의 정수여야 합니다'
    );
  });
});
