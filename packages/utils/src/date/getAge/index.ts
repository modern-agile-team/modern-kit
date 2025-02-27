import { parseDate } from '../parseDate';

/**
 * @description 주어진 생년월일을 기준으로 현재 나이를 계산합니다.
 *
 * @param {string | number | Date} birthDate - 확인하고자 하는 생년월일
 * @returns {number} 현재 나이 (만 나이)
 *
 * @example
 * // 현재 날짜 2025년 01월 01일 기준
 * getAge(new Date('2006-01-01')); // 19
 *
 * @example
 * // 2025년 01월 01일 기준
 * getAge('2006-01-01'); // 19
 *
 */
export function getAge(birthDate: string | number | Date): number {
  const birthDateTime = parseDate(birthDate);
  const today = new Date();

  const age = today.getFullYear() - birthDateTime.getFullYear();
  const monthDiff = today.getMonth() - birthDateTime.getMonth();
  const dayDiff = today.getDate() - birthDateTime.getDate();

  // 만약, 생일이 지나지 않았다면 나이에서 1을 뺀다.
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    return age - 1;
  }

  return age;
}
