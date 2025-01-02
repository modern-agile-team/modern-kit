import { describe, it, expect } from 'vitest';
import { isAfterDate } from '.';

describe('isAfterDate', () => {
  it('compareDate가 없을 때 현재 날짜를 기준으로 미래 날짜가 주어졌을 때 true를 반환해야 합니다.', () => {
    const future = new Date();
    future.setDate(future.getDate() + 1); // 내일

    expect(isAfterDate({ targetDate: future })).toBeTruthy();
  });

  it('compareDate가 없을 때 현재 날짜를 기준으로 과거 날짜가 주어졌을 때 false를 반환해야 합니다.', () => {
    const past = new Date();
    past.setDate(past.getDate() - 1); // 어제

    expect(isAfterDate({ targetDate: past })).toBeFalsy();
  });

  it('문자열 형식의 날짜를 올바르게 비교해야 합니다.', () => {
    expect(
      isAfterDate({
        targetDate: '2025-01-01',
        compareDate: '2024-12-31',
      })
    ).toBeTruthy();

    expect(
      isAfterDate({
        targetDate: '2025-01-01',
        compareDate: '2025-01-02',
      })
    ).toBeFalsy();
  });

  it('inclusive 옵션이 true일 때 같은 날짜를 포함해야 합니다.', () => {
    const date = new Date('2025-01-01');

    expect(
      isAfterDate({
        targetDate: date,
        compareDate: date,
        inclusive: true,
      })
    ).toBeTruthy();

    expect(
      isAfterDate({
        targetDate: date,
        compareDate: date,
        inclusive: false,
      })
    ).toBeFalsy();
  });
});
