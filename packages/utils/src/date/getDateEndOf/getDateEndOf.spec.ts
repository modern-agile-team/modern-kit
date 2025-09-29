import { describe, it, expect } from 'vitest';
import { getDateEndOf } from '.';

describe('getDateEndOf', () => {
  const testDate = '2025-03-15T14:30:45.123Z';
  // 2025-03-15 23:30:45 (KST 기준 토요일)
  // 2025-03-15 14:30:45 (UTC 기준 토요일)

  const expectDateTime = (
    result: Date,
    expectedISO: string,
    expectedYear: number,
    expectedMonth: number,
    expectedDate: number,
    expectedDay: number,
    isUTC: boolean = false
  ) => {
    const iso = isUTC ? result.toISOString() : result.toISOString();
    const year = isUTC ? result.getUTCFullYear() : result.getFullYear();
    const month = isUTC ? result.getUTCMonth() : result.getMonth();
    const date = isUTC ? result.getUTCDate() : result.getDate();
    const day = isUTC ? result.getUTCDay() : result.getDay();
    const hours = isUTC ? result.getUTCHours() : result.getHours();
    const minutes = isUTC ? result.getUTCMinutes() : result.getMinutes();
    const seconds = isUTC ? result.getUTCSeconds() : result.getSeconds();
    const milliseconds = isUTC
      ? result.getUTCMilliseconds()
      : result.getMilliseconds();

    expect(iso).toBe(expectedISO);
    expect(year).toBe(expectedYear);
    expect(month).toBe(expectedMonth);
    expect(date).toBe(expectedDate);
    expect(day).toBe(expectedDay);
    expect(hours).toBe(23);
    expect(minutes).toBe(59);
    expect(seconds).toBe(59);
    expect(milliseconds).toBe(999);
  };

  describe('로컬 시간 기준', () => {
    it('year - 해당 연도의 12월 31일 23시 59분 59초를 반환한다', () => {
      const result = getDateEndOf(testDate, 'year'); // 2025-12-31 23:59:59.999 (수요일)
      expectDateTime(result, '2025-12-31T14:59:59.999Z', 2025, 11, 31, 3);
    });

    it('month - 해당 월의 마지막 날 23시 59분 59초를 반환한다', () => {
      const result = getDateEndOf(testDate, 'month'); // 2025-03-31 23:59:59.999 (월요일)
      expectDateTime(result, '2025-03-31T14:59:59.999Z', 2025, 2, 31, 1);
    });

    it('week - 해당 주의 마지막 날(토요일) 23시 59분 59초를 반환한다', () => {
      // 2025-03-15는 토요일이므로, 해당 주 토요일은 2025-03-15 자기 자신
      const result = getDateEndOf(testDate, 'week'); // 2025-03-15 23:59:59.999 (토요일)
      expectDateTime(result, '2025-03-15T14:59:59.999Z', 2025, 2, 15, 6);
    });

    it('date - 해당 날짜의 23시 59분 59초를 반환한다', () => {
      const result = getDateEndOf(testDate, 'date'); // 2025-03-15 23:59:59.999 (토요일)
      expectDateTime(result, '2025-03-15T14:59:59.999Z', 2025, 2, 15, 6);
    });
  });

  describe('UTC 기준', () => {
    it('utcYear - UTC 기준 해당 연도의 12월 31일 23시 59분 59초를 반환한다', () => {
      const result = getDateEndOf(testDate, 'utcYear'); // 2025-12-31 23:59:59.999 (수요일)
      expectDateTime(result, '2025-12-31T23:59:59.999Z', 2025, 11, 31, 3, true);
    });

    it('utcMonth - UTC 기준 해당 월의 마지막 날 23시 59분 59초를 반환한다', () => {
      const result = getDateEndOf(testDate, 'utcMonth'); // 2025-03-31 23:59:59.999 (월요일)
      expectDateTime(result, '2025-03-31T23:59:59.999Z', 2025, 2, 31, 1, true);
    });

    it('utcWeek - UTC 기준 해당 주의 마지막 날(토요일) 23시 59분 59초를 반환한다', () => {
      const result = getDateEndOf(testDate, 'utcWeek'); // 2025-03-15 23:59:59.999 (토요일)
      expectDateTime(result, '2025-03-15T23:59:59.999Z', 2025, 2, 15, 6, true);
    });

    it('utcDate - UTC 기준 해당 날짜의 23시 59분 59초를 반환한다', () => {
      const result = getDateEndOf(testDate, 'utcDate'); // 2025-03-15 23:59:59.999 (토요일)
      expectDateTime(result, '2025-03-15T23:59:59.999Z', 2025, 2, 15, 6, true);
    });
  });

  describe('주의 끝점 계산', () => {
    it('일요일인 경우 해당 주 토요일이 주의 끝점이다', () => {
      const sunday = '2025-03-09T14:30:45.123Z'; // 2025-03-09 14:30:45 (일요일)
      const result = getDateEndOf(sunday, 'week'); // 2025-03-15 23:59:59.999 (토요일)
      expectDateTime(result, '2025-03-15T14:59:59.999Z', 2025, 2, 15, 6);
    });

    it('월요일인 경우 해당 주 토요일이 주의 끝점이다', () => {
      const monday = '2025-03-10T14:30:45.123Z'; // 2025-03-10 14:30:45 (월요일)
      const result = getDateEndOf(monday, 'week'); // 2025-03-15 23:59:59.999 (토요일)
      expectDateTime(result, '2025-03-15T14:59:59.999Z', 2025, 2, 15, 6);
    });

    it('토요일인 경우 자기 자신이 주의 끝점이다', () => {
      const saturday = '2025-03-15T14:30:45.123Z'; // 2025-03-15 14:30:45 (토요일)
      const result = getDateEndOf(saturday, 'week'); // 2025-03-15 23:59:59.999 (토요일)
      expectDateTime(result, '2025-03-15T14:59:59.999Z', 2025, 2, 15, 6);
    });
  });

  describe('월 경계 처리', () => {
    it('월의 마지막 날에서 주의 끝점을 구할 때 다음 월로 넘어갈 수 있다', () => {
      const lastDay = '2025-03-30T14:30:45.123Z'; // 2025-03-30 14:30:45 (일요일)
      const result = getDateEndOf(lastDay, 'week'); // 다음 월 토요일 (2025-04-05)
      expectDateTime(result, '2025-04-05T14:59:59.999Z', 2025, 3, 5, 6);
    });

    it('연의 마지막 날에서 주의 끝점을 구할 때 다음 년으로 넘어갈 수 있다', () => {
      const lastDay = '2024-12-29T14:30:45.123Z'; // 2024-12-29 14:30:45 (일요일)
      const result = getDateEndOf(lastDay, 'week'); // 다음 년 토요일 (2025-01-04)
      expectDateTime(result, '2025-01-04T14:59:59.999Z', 2025, 0, 4, 6);
    });
  });

  describe('윤년 처리', () => {
    it('윤년의 2월 마지막 날을 올바르게 처리한다', () => {
      const leapYear = '2024-02-15T14:30:45.123Z'; // 2024년은 윤년
      const result = getDateEndOf(leapYear, 'month'); // 2024-02-29 23:59:59.999
      expectDateTime(result, '2024-02-29T14:59:59.999Z', 2024, 1, 29, 4);
    });

    it('평년의 2월 마지막 날을 올바르게 처리한다', () => {
      const normalYear = '2025-02-15T14:30:45.123Z'; // 2025년은 평년
      const result = getDateEndOf(normalYear, 'month'); // 2025-02-28 23:59:59.999
      expectDateTime(result, '2025-02-28T14:59:59.999Z', 2025, 1, 28, 5);
    });
  });

  describe('에러 처리', () => {
    it('지원하지 않는 단위에 대해 에러를 발생시킨다', () => {
      expect(() => {
        getDateEndOf(testDate, 'hour' as any);
      }).toThrow('지원하지 않는 단위입니다');
    });

    it('유효하지 않은 날짜에 대해 parseDate에서 에러를 발생시킨다', () => {
      expect(() => {
        getDateEndOf('invalid-date', 'date');
      }).toThrow('유효하지 않은 날짜 형식입니다.');
    });
  });
});
