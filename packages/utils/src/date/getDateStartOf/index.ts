import { parseDate } from '../parseDate';

type DateStartOfUnit =
  | 'year'
  | 'month'
  | 'week'
  | 'date'
  | 'utcYear'
  | 'utcMonth'
  | 'utcWeek'
  | 'utcDate';

/**
 * @description 주어진 날짜의 특정 단위 시작점을 반환합니다.
 *
 * 로컬 타임존 기준과 UTC 기준 모두 지원하며, 각 단위별로 해당 시작점의 00시 00분 00초를 반환합니다.
 *
 * - `year`: 로컬 타임존 기준 해당 연도의 1월 1일 00시 00분 00초
 * - `month`: 로컬 타임존 기준 해당 월의 1일 00시 00분 00초
 * - `week`: 로컬 타임존 기준 해당 주의 첫날(일요일) 00시 00분 00초
 * - `date`: 로컬 타임존 기준 해당 날짜의 00시 00분 00초
 * - `utcYear`: UTC 기준 해당 연도의 1월 1일 00시 00분 00초
 * - `utcMonth`: UTC 기준 해당 월의 1일 00시 00분 00초
 * - `utcWeek`: UTC 기준 해당 주의 첫날(일요일) 00시 00분 00초
 * - `utcDate`: UTC 기준 해당 날짜의 00시 00분 00초
 *
 * @param {string | Date | number} date - 기준 날짜
 * @param {DateStartOfUnit} unit - 시작점을 구할 단위
 * @returns {Date} 시작점이 셋팅된 Date 객체
 *
 * @example
 * // 로컬 타임존(KST) 기준
 * const target = '2025-03-15T14:30:45.123Z'
 * // 2025-03-15 23:30:45 (KST 기준 토요일)
 * // 2025-03-15 14:30:45 (UTC 기준 토요일)
 *
 * const date = getDateStartOf(target, 'year'); // 2025-01-01 00:00:00 (수요일)
 *
 * date.toISOString(); // '2024-12-31T15:00:00.000Z', KST 기준
 * date.getFullYear(); // 2025
 * date.getMonth(); // 0
 * date.getDate(); // 1
 * date.getDay(); // 3
 *
 * @example
 * // UTC 타임존 기준
 * const target = '2025-03-15T14:30:45.123Z'
 * // 2025-03-15 23:30:45 (KST 기준 토요일)
 * // 2025-03-15 14:30:45 (UTC 기준 토요일)
 *
 * const utcDate = getDateStartOf(target, 'utcYear'); // 2025-01-01 00:00:00 (수요일)
 *
 * utcDate.toISOString(); // '2025-01-01T00:00:00.000Z', UTC 기준
 * utcDate.getFullYear(); // 2025
 * utcDate.getMonth(); // 0
 * utcDate.getDate(); // 1
 * utcDate.getDay(); // 3
 */
export function getDateStartOf(
  date: string | Date | number,
  unit: DateStartOfUnit
): Date {
  const parsedDate = parseDate(date);

  // UTC 단위인지 확인
  const isUTC = unit.startsWith('utc');
  const baseUnit = isUTC ? unit.slice(3).toLowerCase() : unit;

  const year = isUTC ? parsedDate.getUTCFullYear() : parsedDate.getFullYear();
  const month = isUTC ? parsedDate.getUTCMonth() : parsedDate.getMonth();
  const day = isUTC ? parsedDate.getUTCDate() : parsedDate.getDate();

  switch (baseUnit) {
    case 'year':
      if (isUTC) {
        return new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
      }
      return new Date(year, 0, 1, 0, 0, 0, 0);
    case 'month':
      if (isUTC) {
        return new Date(Date.UTC(year, month, 1, 0, 0, 0, 0));
      }
      return new Date(year, month, 1, 0, 0, 0, 0);
    case 'week': {
      const dayOfWeek = isUTC ? parsedDate.getUTCDay() : parsedDate.getDay();
      const startOfWeek = day - dayOfWeek;

      if (isUTC) {
        return new Date(Date.UTC(year, month, startOfWeek, 0, 0, 0, 0));
      }
      return new Date(year, month, startOfWeek, 0, 0, 0, 0);
    }
    case 'date':
      if (isUTC) {
        return new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
      }
      return new Date(year, month, day, 0, 0, 0, 0);
    default:
      throw new Error(`지원하지 않는 단위입니다`);
  }
}
