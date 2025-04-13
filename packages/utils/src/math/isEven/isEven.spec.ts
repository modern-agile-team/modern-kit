import { describe, expect, it } from 'vitest';
import { isEven } from '.';

describe('isEven', () => {
  it('짝수인 경우 true를 반환해야 한다', () => {
    expect(isEven(2)).toBeTruthy();
    expect(isEven(0)).toBeTruthy();
    expect(isEven(100)).toBeTruthy();
    expect(isEven(-2)).toBeTruthy();
    expect(isEven(-44)).toBeTruthy();
  });

  it('홀수인 경우 false를 반환해야 한다', () => {
    expect(isEven(1)).toBeFalsy();
    expect(isEven(3)).toBeFalsy();
    expect(isEven(99)).toBeFalsy();
    expect(isEven(-1)).toBeFalsy();
    expect(isEven(-33)).toBeFalsy();
  });
});
