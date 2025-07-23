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
    const dateString1 = '2025-01-01';
    const date1 = parseDate(dateString1);
    expect(date1).toBeInstanceOf(Date);
    expect(date1.toLocaleString('ko-KR')).toBe('2025. 1. 1. 오전 12:00:00');

    const dateString2 = '2025/01/01 09:00:00';
    const date2 = parseDate(dateString2);
    expect(date2).toBeInstanceOf(Date);
    expect(date2.toLocaleString('ko-KR')).toBe('2025. 1. 1. 오전 9:00:00');

    const dateString3 = '2025.01.01 18:00:00';
    const date3 = parseDate(dateString3);
    expect(date3).toBeInstanceOf(Date);
    expect(date3.toLocaleString('ko-KR')).toBe('2025. 1. 1. 오후 6:00:00');

    const dateString4 = '2025-01-01T00:00:00';
    const date4 = parseDate(dateString4);
    expect(date4).toBeInstanceOf(Date);
    expect(date4.toLocaleString('ko-KR')).toBe('2025. 1. 1. 오전 12:00:00');

    const dateString5 = '01/01/2025';
    const date5 = parseDate(dateString5);
    expect(date5).toBeInstanceOf(Date);
    expect(date5.toLocaleString('ko-KR')).toBe('2025. 1. 1. 오전 12:00:00');
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
