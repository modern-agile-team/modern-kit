import { getDateEndOf } from '../getDateEndOf';
import { getDateStartOf } from '../getDateStartOf';

type DateRangeOfUnit =
  | 'year'
  | 'month'
  | 'week'
  | 'date'
  | 'utcYear'
  | 'utcMonth'
  | 'utcWeek'
  | 'utcDate';

/**
 * @description 주어진 날짜의 시작점과 끝점을 반환합니다.
 *
 * 로컬 타임존 기준과 UTC 기준 모두 지원하며, 각 단위별로 해당 시작점과 끝점을 반환합니다.
 *
 * - `year`: 로컬 타임존 기준 해당 연도의 1월 1일 00시 00분 00초 ~ 12월 31일 23시 59분 59초
 * - `month`: 로컬 타임존 기준 해당 월의 1일 00시 00분 00초 ~ 마지막 날 23시 59분 59초
 * - `week`: 로컬 타임존 기준 해당 주의 첫날(일요일) 00시 00분 00초 ~ 마지막 날(토요일) 23시 59분 59
 * - `date`: 로컬 타임존 기준 해당 날짜의 00시 00분 00초 ~ 23시 59분 59초
 * - `utcYear`: UTC 기준 해당 연도의 1월 1일 00시 00분 00초 ~ 12월 31일 23시 59분 59초
 * - `utcMonth`: UTC 기준 해당 월의 1일 00시 00분 00초 ~ 마지막 날 23시 59분 59초
 * - `utcWeek`: UTC 기준 해당 주의 첫날(일요일) 00시 00분 00초 ~ 마지막 날(토요일) 23시 59분 59초
 * - `utcDate`: UTC 기준 해당 날짜의 00시 00분 00초 ~ 23시 59분 59초
 *
 * @param {string | Date | number} date - 기준 날짜
 * @param {DateRangeOfUnit} unit - 범위를 구할 단위
 * @returns {Date} 범위가 셋팅된 Date 객체
 *
 * @example
 * // 로컬 타임존(KST) 기준
 * const targetDate = '2025-03-15T14:30:45.123Z'
 * // 2025-03-15 23:30:45 (KST 기준 토요일)
 * // 2025-03-15 14:30:45 (UTC 기준 토요일)
 *
 * @example
 * // UTC 타임존 기준
 * const targetDate = '2025-03-15T14:30:45.123Z'
 * // 2025-03-15 23:30:45 (KST 기준 토요일)
 * // 2025-03-15 14:30:45 (UTC 기준 토요일)
 *
 */
export function getDateRange(
  date: string | Date | number,
  unit: DateRangeOfUnit
): { start: Date; end: Date } {
  return {
    start: getDateStartOf(date, unit),
    end: getDateEndOf(date, unit),
  };
}
