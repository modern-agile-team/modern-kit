import { describe, it, expect } from 'vitest';
import { isBeforeDate } from '.';

describe('isBeforeDate', () => {
  it('compareDate가 없을 때 현재 날짜를 기준으로 미래 날짜가 주어졌을 때 true를 반환해야 함', () => {
    const future = new Date();
    future.setDate(future.getDate() + 1); // 내일

    expect(isBeforeDate({ targetDate: future })).toBeFalsy();
  });

  it('compareDate가 없을 때 현재 날짜를 기준으로 과거 날짜가 주어졌을 때 false를 반환해야 함', () => {
    const past = new Date();
    past.setDate(past.getDate() - 1); // 어제

    expect(isBeforeDate({ targetDate: past })).toBeTruthy();
  });

  it('문자열 형식의 날짜를 올바르게 비교해야 함', () => {
    expect(
      isBeforeDate({
        targetDate: '2024-01-01',
        compareDate: '2023-12-31',
      })
    ).toBeFalsy();

    expect(
      isBeforeDate({
        targetDate: '2024-01-01',
        compareDate: '2024-01-02',
      })
    ).toBeTruthy();
  });

  it('inclusive 옵션이 true일 때 같은 날짜를 포함해야 함', () => {
    const date = new Date('2024-01-01');

    expect(
      isBeforeDate({
        targetDate: date,
        compareDate: date,
        inclusive: true,
      })
    ).toBeTruthy();

    expect(
      isBeforeDate({
        targetDate: date,
        compareDate: date,
        inclusive: false,
      })
    ).toBeFalsy();
  });

  it('timestamp 형식의 날짜를 올바르게 비교해야 함', () => {
    const now = Date.now();
    const future = now + 86400000; // 24시간 후
    const past = now - 86400000; // 24시간 전

    expect(
      isBeforeDate({
        targetDate: future,
        compareDate: now,
      })
    ).toBeFalsy();

    expect(
      isBeforeDate({
        targetDate: past,
        compareDate: now,
      })
    ).toBeTruthy();
  });
});
