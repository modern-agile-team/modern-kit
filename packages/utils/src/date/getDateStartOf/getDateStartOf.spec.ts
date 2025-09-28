import { describe, it, expect } from 'vitest';
import { getDateStartOf } from '.';

describe('getDateStartOf', () => {
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
    expect(hours).toBe(0);
    expect(minutes).toBe(0);
    expect(seconds).toBe(0);
    expect(milliseconds).toBe(0);
  };

  describe('로컬 시간 기준', () => {
    it('year - 해당 연도의 1월 1일 00시 00분 00초를 반환한다', () => {
      const result = getDateStartOf(testDate, 'year'); // 2025-01-01 00:00:00 (수요일)
      expectDateTime(result, '2024-12-31T15:00:00.000Z', 2025, 0, 1, 3);
    });

    it('month - 해당 월의 1일 00시 00분 00초를 반환한다', () => {
      const result = getDateStartOf(testDate, 'month'); // 2025-03-01 00:00:00 (토요일)
      expectDateTime(result, '2025-02-28T15:00:00.000Z', 2025, 2, 1, 6);
    });

    it('week - 해당 주의 첫날(일요일) 00시 00분 00초를 반환한다', () => {
      // 2025-03-15는 토요일이므로, 해당 주 일요일은 2025-03-09
      const result = getDateStartOf(testDate, 'week'); // 2025-03-09 00:00:00 (일요일)
      expectDateTime(result, '2025-03-08T15:00:00.000Z', 2025, 2, 9, 0);
    });

    it('date - 해당 날짜의 00시 00분 00초를 반환한다', () => {
      const result = getDateStartOf(testDate, 'date'); // 2025-03-15 00:00:00 (토요일)
      expectDateTime(result, '2025-03-14T15:00:00.000Z', 2025, 2, 15, 6);
    });
  });

  describe('UTC 기준', () => {
    it('utcYear - UTC 기준 해당 연도의 1월 1일 00시 00분 00초를 반환한다', () => {
      const result = getDateStartOf(testDate, 'utcYear'); // 2025-01-01 00:00:00 (수요일)
      expectDateTime(result, '2025-01-01T00:00:00.000Z', 2025, 0, 1, 3, true);
    });

    it('utcMonth - UTC 기준 해당 월의 1일 00시 00분 00초를 반환한다', () => {
      const result = getDateStartOf(testDate, 'utcMonth'); // 2025-03-01 00:00:00 (토요일)
      expectDateTime(result, '2025-03-01T00:00:00.000Z', 2025, 2, 1, 6, true);
    });

    it('utcWeek - UTC 기준 해당 주의 첫날(일요일) 00시 00분 00초를 반환한다', () => {
      const result = getDateStartOf(testDate, 'utcWeek'); // 2025-03-09 00:00:00 (일요일)
      expectDateTime(result, '2025-03-09T00:00:00.000Z', 2025, 2, 9, 0, true);
    });

    it('utcDate - UTC 기준 해당 날짜의 00시 00분 00초를 반환한다', () => {
      const result = getDateStartOf(testDate, 'utcDate'); // 2025-03-15 00:00:00 (토요일)
      expectDateTime(result, '2025-03-15T00:00:00.000Z', 2025, 2, 15, 6, true);
    });
  });

  describe('주의 시작점 계산', () => {
    it('일요일인 경우 자기 자신이 주의 시작점이다', () => {
      const sunday = '2025-03-09T14:30:45.123Z'; // 2025-03-09 14:30:45 (일요일)
      const result = getDateStartOf(sunday, 'week');
      expectDateTime(result, '2025-03-08T15:00:00.000Z', 2025, 2, 9, 0);
    });

    it('월요일인 경우 전날 일요일이 주의 시작점이다', () => {
      const monday = '2025-03-10T14:30:45.123Z'; // 2025-03-10 14:30:45 (월요일)
      const result = getDateStartOf(monday, 'week');
      expectDateTime(result, '2025-03-08T15:00:00.000Z', 2025, 2, 9, 0);
    });

    it('토요일인 경우 해당 주 일요일이 주의 시작점이다', () => {
      const saturday = '2025-03-15T14:30:45.123Z'; // 2025-03-15 14:30:45 (토요일)
      const result = getDateStartOf(saturday, 'week');
      expectDateTime(result, '2025-03-08T15:00:00.000Z', 2025, 2, 9, 0);
    });
  });

  describe('월 경계 처리', () => {
    it('월의 첫날에서 주의 시작점을 구할 때 이전 월로 넘어갈 수 있다', () => {
      const firstDay = '2025-04-01T14:30:45.123Z'; // 2025-04-01 14:30:45 (화요일)
      const result = getDateStartOf(firstDay, 'week');
      expectDateTime(result, '2025-03-29T15:00:00.000Z', 2025, 2, 30, 0); // 이전 월 일요일 (2025-03-30)
    });

    it('연의 첫날에서 주의 시작점을 구할 때 이전 년으로 넘어갈 수 있다', () => {
      const firstDay = '2025-01-01T14:30:45.123Z'; // 2025-01-01 14:30:45 (수요일)
      const result = getDateStartOf(firstDay, 'week');
      expectDateTime(result, '2024-12-28T15:00:00.000Z', 2024, 11, 29, 0); // 이전 년 일요일 (2024-12-29)
    });
  });

  describe('에러 처리', () => {
    it('지원하지 않는 단위에 대해 에러를 발생시킨다', () => {
      expect(() => {
        getDateStartOf(testDate, 'hour' as any);
      }).toThrow('지원하지 않는 단위입니다');
    });

    it('유효하지 않은 날짜에 대해 parseDate에서 에러를 발생시킨다', () => {
      expect(() => {
        getDateStartOf('invalid-date', 'date');
      }).toThrow('유효하지 않은 날짜 형식입니다.');
    });
  });
});
