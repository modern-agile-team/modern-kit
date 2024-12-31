import { describe, expect, it } from 'vitest';
import { isDate } from '.';

describe('isDate', () => {
  it('값이 Date 타입이라면 true를 반환해야 합니다.', () => {
    expect(isDate(new Date())).toBeTruthy();
  });

  it('값이 Date 타입이 아닌 경우 false를 반환해야 합니다.', () => {
    expect(isDate('2024-01-01')).toBeFalsy();
    expect(isDate(2024)).toBeFalsy();
    expect(isDate({ year: 2024, month: 1, day: 1 })).toBeFalsy();
    expect(isDate([2024, 1, 1])).toBeFalsy();
    expect(isDate(new Error())).toBeFalsy();
    expect(isDate(Symbol('2024'))).toBeFalsy();
    expect(isDate(null)).toBeFalsy();
    expect(isDate(undefined)).toBeFalsy();
  });
});
