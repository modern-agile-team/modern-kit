import { describe, it, expect } from 'vitest';
import { wrapInArray } from '.';

describe('wrapInArray', () => {
  it('배열이 아닌 값을 배열로 감싸야 합니다.', () => {
    const strValue = 'ModernAgile';
    const wrappedInArray = wrapInArray('ModernAgile');

    expect(wrappedInArray).toEqual([strValue]);
  });

  it('배열인 값은 배열로 감싸지 않고 그대로 반환해야 합니다.', () => {
    const arrayValue = [1, 2, 3];
    const wrappedInArray = wrapInArray(arrayValue);

    expect(wrappedInArray).toBe(arrayValue);
  });
});
