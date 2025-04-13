import { describe, expect, it } from 'vitest';
import { isOdd } from '.';

describe('isOdd', () => {
  it('홀수인 경우 true를 반환해야 한다', () => {
    expect(isOdd(1)).toBeTruthy();
    expect(isOdd(3)).toBeTruthy();
    expect(isOdd(99)).toBeTruthy();
    expect(isOdd(-1)).toBeTruthy();
    expect(isOdd(-33)).toBeTruthy();
  });

  it('짝수인 경우 false를 반환해야 한다', () => {
    expect(isOdd(2)).toBeFalsy();
    expect(isOdd(0)).toBeFalsy();
    expect(isOdd(100)).toBeFalsy();
    expect(isOdd(-2)).toBeFalsy();
    expect(isOdd(-44)).toBeFalsy();
  });
});
