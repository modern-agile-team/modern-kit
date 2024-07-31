import { describe, it, expect } from 'vitest';
import { containsConsecutiveCharacters } from '.';

const MAX_REPEAT_COUNT = 3;

describe('containsConsecutiveCharacters', () => {
  it('should return true for a string with consecutive characters exceeding maxRepeatCount', () => {
    expect(
      containsConsecutiveCharacters('aaabb', MAX_REPEAT_COUNT)
    ).toBeTruthy();
    expect(
      containsConsecutiveCharacters('123!!!123', MAX_REPEAT_COUNT)
    ).toBeTruthy();
  });

  it('should return false for a string without consecutive characters exceeding maxRepeatCount', () => {
    expect(containsConsecutiveCharacters('aab', MAX_REPEAT_COUNT)).toBeFalsy();
    expect(
      containsConsecutiveCharacters('123aa123', MAX_REPEAT_COUNT)
    ).toBeFalsy();
  });

  it('should throw an error for invalid maxRepeatCount', () => {
    expect(() => containsConsecutiveCharacters('aabb', NaN)).toThrow(
      'Invalid maxRepeatCount value'
    );
    expect(() => containsConsecutiveCharacters('aabb', Infinity)).toThrow(
      'Invalid maxRepeatCount value'
    );
    expect(() => containsConsecutiveCharacters('aabb', 1.1)).toThrow(
      'Invalid maxRepeatCount value'
    );
    expect(() => containsConsecutiveCharacters('aabb', -1)).toThrow(
      'Invalid maxRepeatCount value'
    );
  });
});
