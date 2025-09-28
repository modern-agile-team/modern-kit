import { describe, it, expect } from 'vitest';
import { getDateRange } from '.';

describe('getDateRange', () => {
  const testDate = '2025-03-15T14:30:45.123Z';
  // 2025-03-15 23:30:45 (KST 기준 토요일)
  // 2025-03-15 14:30:45 (UTC 기준 토요일)

  const getDateUnit = (result: Date, isUTC: boolean = false) => {
    return {
      iso: isUTC ? result.toISOString() : result.toISOString(),
      year: isUTC ? result.getUTCFullYear() : result.getFullYear(),
      month: isUTC ? result.getUTCMonth() : result.getMonth(),
      date: isUTC ? result.getUTCDate() : result.getDate(),
      day: isUTC ? result.getUTCDay() : result.getDay(),
      hours: isUTC ? result.getUTCHours() : result.getHours(),
      minutes: isUTC ? result.getUTCMinutes() : result.getMinutes(),
      seconds: isUTC ? result.getUTCSeconds() : result.getSeconds(),
      milliseconds: isUTC
        ? result.getUTCMilliseconds()
        : result.getMilliseconds(),
    };
  };

  const expectDateEndTime = (
    result: Date,
    expectedISO: string,
    expectedYear: number,
    expectedMonth: number,
    expectedDate: number,
    expectedDay: number,
    isUTC: boolean = false
  ) => {
    const dateUnit = getDateUnit(result, isUTC);

    expect(dateUnit.iso).toBe(expectedISO);
    expect(dateUnit.year).toBe(expectedYear);
    expect(dateUnit.month).toBe(expectedMonth);
    expect(dateUnit.date).toBe(expectedDate);
    expect(dateUnit.day).toBe(expectedDay);
    expect(dateUnit.hours).toBe(23);
    expect(dateUnit.minutes).toBe(59);
    expect(dateUnit.seconds).toBe(59);
    expect(dateUnit.milliseconds).toBe(999);
  };

  const expectDateStartTime = (
    result: Date,
    expectedISO: string,
    expectedYear: number,
    expectedMonth: number,
    expectedDate: number,
    expectedDay: number,
    isUTC: boolean = false
  ) => {
    const dateUnit = getDateUnit(result, isUTC);

    expect(dateUnit.iso).toBe(expectedISO);
    expect(dateUnit.year).toBe(expectedYear);
    expect(dateUnit.month).toBe(expectedMonth);
    expect(dateUnit.date).toBe(expectedDate);
    expect(dateUnit.day).toBe(expectedDay);
    expect(dateUnit.hours).toBe(0);
    expect(dateUnit.minutes).toBe(0);
    expect(dateUnit.seconds).toBe(0);
    expect(dateUnit.milliseconds).toBe(0);
  };

  describe('로컬 시간 기준', () => {
    it('year - 해당 연도의 1월 1일 00:00:00 ~ 12월 31일 23:59:59 범위를 반환한다', () => {
      const result = getDateRange(testDate, 'year');
      const { start, end } = result;

      expectDateStartTime(start, '2024-12-31T15:00:00.000Z', 2025, 0, 1, 3);
      expectDateEndTime(end, '2025-12-31T14:59:59.999Z', 2025, 11, 31, 3);
    });

    it('month - 해당 월의 1일 00:00:00 ~ 마지막 날 23:59:59 범위를 반환한다', () => {
      const result = getDateRange(testDate, 'month');
      const { start, end } = result;

      expectDateStartTime(start, '2025-02-28T15:00:00.000Z', 2025, 2, 1, 6);
      expectDateEndTime(end, '2025-03-31T14:59:59.999Z', 2025, 2, 31, 1);
    });

    it('week - 해당 주의 일요일 00:00:00 ~ 토요일 23:59:59 범위를 반환한다', () => {
      // 2025-03-15는 토요일이므로, 해당 주는 2025-03-09(일) ~ 2025-03-15(토)
      const result = getDateRange(testDate, 'week');
      const { start, end } = result;

      expectDateStartTime(start, '2025-03-08T15:00:00.000Z', 2025, 2, 9, 0);
      expectDateEndTime(end, '2025-03-15T14:59:59.999Z', 2025, 2, 15, 6);
    });

    it('date - 해당 날짜의 00:00:00 ~ 23:59:59 범위를 반환한다', () => {
      const result = getDateRange(testDate, 'date');
      const { start, end } = result;

      expectDateStartTime(start, '2025-03-14T15:00:00.000Z', 2025, 2, 15, 6);
      expectDateEndTime(end, '2025-03-15T14:59:59.999Z', 2025, 2, 15, 6);
    });
  });

  describe('UTC 기준', () => {
    it('utcYear - UTC 기준 해당 연도의 1월 1일 00:00:00 ~ 12월 31일 23:59:59 범위를 반환한다', () => {
      const result = getDateRange(testDate, 'utcYear');
      const { start, end } = result;

      expectDateStartTime(
        start,
        '2025-01-01T00:00:00.000Z',
        2025,
        0,
        1,
        3,
        true
      );
      expectDateEndTime(end, '2025-12-31T23:59:59.999Z', 2025, 11, 31, 3, true);
    });

    it('utcMonth - UTC 기준 해당 월의 1일 00:00:00 ~ 마지막 날 23:59:59 범위를 반환한다', () => {
      const result = getDateRange(testDate, 'utcMonth');
      const { start, end } = result;

      expectDateStartTime(
        start,
        '2025-03-01T00:00:00.000Z',
        2025,
        2,
        1,
        6,
        true
      );
      expectDateEndTime(end, '2025-03-31T23:59:59.999Z', 2025, 2, 31, 1, true);
    });

    it('utcWeek - UTC 기준 해당 주의 일요일 00:00:00 ~ 토요일 23:59:59 범위를 반환한다', () => {
      const result = getDateRange(testDate, 'utcWeek');
      const { start, end } = result;

      expectDateStartTime(
        start,
        '2025-03-09T00:00:00.000Z',
        2025,
        2,
        9,
        0,
        true
      );
      expectDateEndTime(end, '2025-03-15T23:59:59.999Z', 2025, 2, 15, 6, true);
    });

    it('utcDate - UTC 기준 해당 날짜의 00:00:00 ~ 23:59:59 범위를 반환한다', () => {
      const result = getDateRange(testDate, 'utcDate');
      const { start, end } = result;

      expectDateStartTime(
        start,
        '2025-03-15T00:00:00.000Z',
        2025,
        2,
        15,
        6,
        true
      );
      expectDateEndTime(end, '2025-03-15T23:59:59.999Z', 2025, 2, 15, 6, true);
    });
  });

  describe('주의 범위 계산', () => {
    it('일요일인 경우 자기 자신부터 토요일까지의 범위를 반환한다', () => {
      const sunday = '2025-03-09T14:30:45.123Z'; // 2025-03-09 (일요일)
      const result = getDateRange(sunday, 'week');

      expect(result.start.toISOString()).toBe('2025-03-08T15:00:00.000Z'); // 2025-03-09 00:00:00 KST
      expect(result.start.getDate()).toBe(9);
      expect(result.start.getDay()).toBe(0); // 일요일

      expect(result.end.toISOString()).toBe('2025-03-15T14:59:59.999Z'); // 2025-03-15 23:59:59 KST
      expect(result.end.getDate()).toBe(15);
      expect(result.end.getDay()).toBe(6); // 토요일
    });

    it('월요일인 경우 이전 일요일부터 토요일까지의 범위를 반환한다', () => {
      const monday = '2025-03-10T14:30:45.123Z'; // 2025-03-10 (월요일)
      const result = getDateRange(monday, 'week');

      expect(result.start.toISOString()).toBe('2025-03-08T15:00:00.000Z'); // 2025-03-09 00:00:00 KST
      expect(result.start.getDate()).toBe(9);
      expect(result.start.getDay()).toBe(0); // 일요일

      expect(result.end.toISOString()).toBe('2025-03-15T14:59:59.999Z'); // 2025-03-15 23:59:59 KST
      expect(result.end.getDate()).toBe(15);
      expect(result.end.getDay()).toBe(6); // 토요일
    });

    it('토요일인 경우 해당 주 일요일부터 자기 자신까지의 범위를 반환한다', () => {
      const saturday = '2025-03-15T14:30:45.123Z'; // 2025-03-15 (토요일)
      const result = getDateRange(saturday, 'week');

      expect(result.start.toISOString()).toBe('2025-03-08T15:00:00.000Z'); // 2025-03-09 00:00:00 KST
      expect(result.start.getDate()).toBe(9);
      expect(result.start.getDay()).toBe(0); // 일요일

      expect(result.end.toISOString()).toBe('2025-03-15T14:59:59.999Z'); // 2025-03-15 23:59:59 KST
      expect(result.end.getDate()).toBe(15);
      expect(result.end.getDay()).toBe(6); // 토요일
    });
  });

  describe('월/연 경계 처리', () => {
    it('월의 첫날에서 주 범위를 구할 때 이전 월로 넘어갈 수 있다', () => {
      const firstDay = '2025-04-01T14:30:45.123Z'; // 2025-04-01 (화요일)
      const result = getDateRange(firstDay, 'week');

      // 시작점은 이전 월 일요일 (2025-03-30)
      expect(result.start.getMonth()).toBe(2); // 3월
      expect(result.start.getDate()).toBe(30);
      expect(result.start.getDay()).toBe(0); // 일요일

      // 끝점은 현재 월 토요일 (2025-04-05)
      expect(result.end.getMonth()).toBe(3); // 4월
      expect(result.end.getDate()).toBe(5);
      expect(result.end.getDay()).toBe(6); // 토요일
    });

    it('연의 첫날에서 주 범위를 구할 때 이전 년으로 넘어갈 수 있다', () => {
      const firstDay = '2025-01-01T14:30:45.123Z'; // 2025-01-01 (수요일)
      const result = getDateRange(firstDay, 'week');

      // 시작점은 이전 년 일요일 (2024-12-29)
      expect(result.start.getFullYear()).toBe(2024);
      expect(result.start.getMonth()).toBe(11); // 12월
      expect(result.start.getDate()).toBe(29);
      expect(result.start.getDay()).toBe(0); // 일요일

      // 끝점은 현재 년 토요일 (2025-01-04)
      expect(result.end.getFullYear()).toBe(2025);
      expect(result.end.getMonth()).toBe(0); // 1월
      expect(result.end.getDate()).toBe(4);
      expect(result.end.getDay()).toBe(6); // 토요일
    });
  });

  describe('윤년 처리', () => {
    it('윤년의 2월 월 범위를 올바르게 처리한다', () => {
      const leapYear = '2024-02-15T14:30:45.123Z'; // 2024년은 윤년
      const result = getDateRange(leapYear, 'month');

      expect(result.start.getDate()).toBe(1); // 2024-02-01
      expect(result.end.getDate()).toBe(29); // 2024-02-29 (윤년)
    });

    it('평년의 2월 월 범위를 올바르게 처리한다', () => {
      const normalYear = '2025-02-15T14:30:45.123Z'; // 2025년은 평년
      const result = getDateRange(normalYear, 'month');

      expect(result.start.getDate()).toBe(1); // 2025-02-01
      expect(result.end.getDate()).toBe(28); // 2025-02-28 (평년)
    });
  });

  describe('반환 객체 구조', () => {
    it('start는 항상 end보다 이전 시간이다', () => {
      const units = ['year', 'month', 'week', 'date'] as const;

      units.forEach((unit) => {
        const result = getDateRange(testDate, unit);
        expect(result.start.getTime()).toBeLessThan(result.end.getTime());
      });
    });
  });

  describe('에러 처리', () => {
    it('지원하지 않는 단위에 대해 에러를 발생시킨다', () => {
      expect(() => {
        getDateRange(testDate, 'hour' as any);
      }).toThrow('지원하지 않는 단위입니다');
    });

    it('유효하지 않은 날짜에 대해 parseDate에서 에러를 발생시킨다', () => {
      expect(() => {
        getDateRange('invalid-date', 'date');
      }).toThrow('유효하지 않은 날짜 형식입니다.');
    });
  });
});
