import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { parseDate } from '.';

beforeEach(() => {
  vi.setSystemTime(new Date('2025-01-01 12:00:00'));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('parseDate', () => {
  it('날짜 문자열을 Date 객체로 변환해야 합니다.', () => {
    const date1 = parseDate('2025-01-01');
    expect(date1).toBeInstanceOf(Date);
    expect(date1.getFullYear()).toBe(2025);
    expect(date1.getMonth()).toBe(0);
    expect(date1.getDate()).toBe(1);
    expect(date1.getHours()).toBe(0);
    expect(date1.getMinutes()).toBe(0);

    const date2 = parseDate('2025/01/01 09:00:00');
    expect(date2).toBeInstanceOf(Date);
    expect(date2.getFullYear()).toBe(2025);
    expect(date2.getMonth()).toBe(0);
    expect(date2.getDate()).toBe(1);
    expect(date2.getHours()).toBe(9);
    expect(date2.getMinutes()).toBe(0);

    const date3 = parseDate('2025.01.01 18:00:00');
    expect(date3).toBeInstanceOf(Date);
    expect(date3.getFullYear()).toBe(2025);
    expect(date3.getMonth()).toBe(0);
    expect(date3.getDate()).toBe(1);
    expect(date3.getHours()).toBe(18);
    expect(date3.getMinutes()).toBe(0);

    const date4 = parseDate('2025-01-01T00:00:00');
    expect(date4).toBeInstanceOf(Date);
    expect(date4.getFullYear()).toBe(2025);
    expect(date4.getMonth()).toBe(0);
    expect(date4.getDate()).toBe(1);
    expect(date4.getHours()).toBe(0);

    const date5 = parseDate('01/01/2025');
    expect(date5).toBeInstanceOf(Date);
    expect(date5.getFullYear()).toBe(2025);
    expect(date5.getMonth()).toBe(0);
    expect(date5.getDate()).toBe(1);
  });

  it('Date 객체를 동일한 Date 객체로 반환해야 합니다.', () => {
    const date = new Date();
    const parsedDate = parseDate(date);

    expect(parsedDate).toEqual(date);
  });

  it('유효하지 않은 날짜 문자열을 파싱할 때 오류가 발생해야 합니다.', () => {
    const invalidDateString1 = 'invalid-date';
    expect(() => parseDate(invalidDateString1)).toThrow(
      '유효하지 않은 날짜 형식입니다.'
    );

    const invalidDateString2 = '25-01-01';
    expect(() => parseDate(invalidDateString2)).toThrow(
      '유효하지 않은 날짜 형식입니다.'
    );

    const invalidDateString3 = '2025a01a02';

    expect(() => parseDate(invalidDateString3)).toThrow(
      '유효하지 않은 날짜 형식입니다.'
    );
  });
});
