import { parseDate } from '../parseDate';

interface IsBeforeDateParams {
  targetDate: string | number | Date;
  compareDate?: string | number | Date;
  inclusive?: boolean;
}

/**
 * @description 목표 날짜가 비교 날짜보다 이전인지 확인합니다.
 *
 * @param {IsBeforeDateParams} params - 파라미터 객체
 * @param {string | number | Date} params.targetDate - 비교할 대상 날짜
 * @param {string | number | Date} [params.compareDate=new Date()] - 기준이 되는 날짜 (기본값: 현재 날짜)
 * @param {boolean} [params.inclusive=false] - true인 경우 같은 날짜도 포함 (기본값: false)
 * @returns {boolean} 목표 날짜가 비교 날짜보다 이전이면 true, 아니면 false를 반환
 *
 *  @example
 * // 현재 날짜가 2025년 1월 1일 00:00:00 일 때
 * // 비교 날짜(compareDate)가 없을 때 현재 날짜를 기준으로 목표 날짜가 현재 날짜보다 이전인 경우 true를 반환합니다.
 * isBeforeDate({ targetDate: '2024-12-31' }); // true
 *
 * @example
 * isBeforeDate({ targetDate: '2024-12-31', compareDate: '2025-01-01' }); // true
 * isBeforeDate({ targetDate: '2025-01-01', compareDate: '2024-12-31' }); // false
 *
 * @example
 * isBeforeDate({ targetDate: '2024-01-01', compareDate: '2024-01-01', inclusive: true }); // true
 */
export function isBeforeDate({
  targetDate,
  compareDate = new Date(),
  inclusive = false,
}: IsBeforeDateParams): boolean {
  const targetDateTime = parseDate(targetDate).getTime();
  const compareDateTime = parseDate(compareDate).getTime();

  const timezoneOffset = new Date().getTimezoneOffset();
  const timezoneMilliseconds = timezoneOffset * 60 * 1000;

  const targetDateTime = targetDateToUse.getTime() + timezoneMilliseconds;
  const compareDateTime = compareDateToUse.getTime() + timezoneMilliseconds;

  return inclusive
    ? targetDateTime <= compareDateTime
    : targetDateTime < compareDateTime;
}
