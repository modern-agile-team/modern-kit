import { parseDateString } from '../parseDateString';

/**
 * @description 날짜 문자열, Date 객체, 숫자를 Date 객체로 파싱합니다.
 *
 * 날짜 문자열의 경우 Safari에서 호환되지 않는 날짜 형식("-" 또는 "."을 포함한 형식)을 호환시키기 위해 "-" 또는 "."을 "/"로 변환 후 Date 객체로 파싱합니다.
 * - `YYYY-MM-DD`, `YYYY.MM.DD` 형식의 날짜 문자열을 `YYYY/MM/DD` 형식으로 변환합니다.
 * - `YYYY-MM-DD HH:MM:SS`, `YYYY.MM.DD HH:MM:SS` 형식의 날짜 문자열을 `YYYY/MM/DD HH:MM:SS` 형식으로 변환합니다.
 * - 그 외 형식은 그대로 반환합니다.
 *
 * Date 객체 또는 숫자의 경우 그대로 Date 객체로 파싱합니다.
 *
 * @param {string | Date | number} date - 파싱할 날짜 문자열, Date 객체, 숫자
 * @returns {Date} 파싱된 Date 객체입니다.
 *
 * @example
 * parseDate('2025-01-01') // new Date('2025/01/01') 반환
 * parseDate(new Date('2025-01-01')) // new Date('2025-01-01') 반환
 * parseDate(1714233600000) // new Date(1714233600000) 반환
 */
export const parseDate = (date: string | Date | number): Date => {
  let dateToUse: Date | null = null;

  if (typeof date === 'string') {
    dateToUse = new Date(parseDateString(date));
  }

  if (date instanceof Date || typeof date === 'number') {
    dateToUse = new Date(date);
  }

  if (dateToUse && isNaN(dateToUse.getTime())) {
    throw new Error('유효하지 않은 날짜 형식입니다.');
  }

  return dateToUse as Date;
};
