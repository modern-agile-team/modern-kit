import { parseDate } from '../parseDate';
import { objectKeys } from '../../object/objectKeys';

type CalculatedTimeResult = Record<keyof typeof TIME_UNITS, number>;

const TIME_UNITS = {
  days: 1000 * 60 * 60 * 24,
  hours: 1000 * 60 * 60,
  minutes: 1000 * 60,
  seconds: 1000,
} as const;

const TIME_UNITS_KEYS = objectKeys(TIME_UNITS);

/**
 * @description 주어진 날짜와 현재 날짜 사이의 `D-day`를 `일/시/분/초` 단위로 계산합니다.
 * 목표 날짜가 현재 날짜보다 기간이 남은 경우 `음수`를 반환합니다. 목표 날짜보다 기간이 지난 경우 `양수`를 반환합니다.
 *
 * @param {string | number | Date} date - 목표 날짜
 * @returns {CalculatedTimeResult} - 남은 시간을 `일/시/분/초` 단위에 맞게 계산한 값을 갖는 객체
 * @throws {Error} 유효하지 않은 날짜 형식이 입력된 경우
 *
 * @example
 * // 현재 날짜가 2025년 1월 1일 00:00:00 일 때
 * getDDay(new Date('2024-12-25 00:00:00'));
 * // { days: -7, hours: 0, minutes: 0, seconds: 0 }
 *
 * getDDay(new Date('2025-01-01 02:30:45'));
 * // { days: 0, hours: 2, minutes: 30, seconds: 45 }
 *
 * @example
 * // 문자열 포맷도 허용합니다.
 * getDDay('2024-12-31 18:15:30');
 * // { days: 0, hours: -5, minutes: -44, seconds: -30 }
 */
export function getDDay(date: string | number | Date): CalculatedTimeResult {
  const targetDate = parseDate(date);

  const today = new Date();
  const timeDiff = targetDate.getTime() - today.getTime();

  const isNegative = timeDiff < 0;
  const absoluteDiff = Math.abs(timeDiff);

  let remainingTime = absoluteDiff;

  const calculateTime = () => {
    return TIME_UNITS_KEYS.reduce((acc, key) => {
      const value = Math.floor(remainingTime / TIME_UNITS[key]);
      remainingTime %= TIME_UNITS[key];

      acc[key] = value && isNegative ? -value : value;
      return acc;
    }, {} as CalculatedTimeResult);
  };

  return calculateTime();
}
