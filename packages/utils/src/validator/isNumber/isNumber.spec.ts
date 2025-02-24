import { describe, it, expect } from 'vitest';
import { isNumber } from '.';

describe('isNumber', () => {
  it('숫자인 경우 true를, 그렇지 않은 경우 false를 반환해야 합니다.', () => {
    expect(isNumber(123)).toBeTruthy();

    expect(isNumber(() => {})).toBeFalsy();
    expect(isNumber('123')).toBeFalsy();
    expect(isNumber(true)).toBeFalsy();
    expect(isNumber({})).toBeFalsy();
    expect(isNumber([])).toBeFalsy();
  });
});
