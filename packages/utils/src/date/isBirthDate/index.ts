import { isNumericString } from '../../validator/isNumericString';

interface ParsedFormatDateReturnType {
  year: number;
  month: number;
  day: number;
}

const YEAR_SHORT_LENGTH = 6;
const YEAR_LONG_LENGTH = 8;
const YEAR_2000 = 2000;
const YEAR_1900 = 1900;

/**
 * @description 6자리 생년월일 문자열을 파싱하여 년, 월, 일을 반환합니다.
 * 주어진 연도가 현재 연도보다 크면 2000년대 연도로 파싱하고, 아니면 1900년대 연도로 파싱합니다.
 *
 * ex: 2025년 기준
 * - 26 ~ 99: 1926 ~ 1999년
 * - 00 ~ 25: 2000 ~ 2025년
 *
 * @param {string} birthDate 6자리 생년월일 문자열
 * @returns {ParsedFormatDateReturnType} 년, 월, 일
 */
const parseShortFormatDate = (
  birthDate: string
): ParsedFormatDateReturnType => {
  const currentYear = new Date().getFullYear(); // 2025
  const remainingYear = currentYear % 100; // ex 25
  const birthYear = Number(birthDate.substring(0, 2)); // 03

  return {
    year:
      remainingYear > birthYear ? YEAR_2000 + birthYear : YEAR_1900 + birthYear,
    month: Number(birthDate.substring(2, 4)),
    day: Number(birthDate.substring(4, 6)),
  };
};

/**
 * @description 8자리 생년월일 문자열을 파싱하여 년, 월, 일을 반환합니다.
 * @param {string} birthDate 8자리 생년월일 문자열
 * @returns {ParsedFormatDateReturnType} 년, 월, 일
 */
const parseLongFormatDate = (birthDate: string): ParsedFormatDateReturnType => {
  return {
    year: Number(birthDate.substring(0, 4)),
    month: Number(birthDate.substring(4, 6)),
    day: Number(birthDate.substring(6, 8)),
  };
};

/**
 * @description 구분자가 있는 생년월일 문자열이 올바른 날짜 형식인지 검사합니다.
 * 'YYYY-MM-DD', 'YY-MM-DD', 'YYYY.MM.DD', 'YY.MM.DD', 'YYYY/MM/DD', 'YY/MM/DD' 형식을 허용합니다.
 *
 * @param {string} dateString 생년월일 문자열
 * @returns {boolean} 올바른 날짜 형식이면 true, 아니면 false
 */
const isValidDateFormat = (dateString: string): boolean => {
  const regex =
    /^(?:\d{4}|\d{2})[-](?:\d{2})[-](?:\d{2})$|^(?:\d{4}|\d{2})[.](?:\d{2})[.](?:\d{2})$|^(?:\d{4}|\d{2})[\/](?:\d{2})[\/](?:\d{2})$/;
  return regex.test(dateString);
};

/**
 * @description 주어진 날짜가 실제로 존재하는 날짜이며 유효한 범위 내에 있는지 검사합니다.
 * @param {number} year 년
 * @param {number} month 월
 * @param {number} day 일
 * @returns {boolean} 올바른 날짜이면 true, 아니면 false
 */
const isValidDateInRange = (
  year: number,
  month: number,
  day: number
): boolean => {
  const date = new Date(year, month - 1, day);
  const currentYear = new Date().getFullYear();
  const isValidYearRange = year >= YEAR_1900 && year <= currentYear;

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    isValidYearRange
  );
};

/**
 * @description 입력된 생년월일 문자열이 6자리 또는 8자리의 올바른 형식인지,
 * 그리고 해당 날짜가 실제로 존재하는 날짜인지(월, 일 범위 및 윤년 고려) 검사합니다.
 *
 * @param {string} birthDate 생년월일 문자열
 * @returns {boolean} 유효한 날짜면 true, 아니면 false
 *
 * @example
 * isBirthDate("950913"); // true
 * isBirthDate("19950913"); // true
 *
 * @example
 * isBirthDate("95-09-13");   // true
 * isBirthDate("1995-09-13");  // true
 *
 * isBirthDate("95.09.13");   // true
 * isBirthDate("1995.09.13");  // true
 *
 * isBirthDate("95/09/13");   // true
 * isBirthDate("1995/09/13");  // true
 *
 * @example
 * isBirthDate("1995&09&13"); // false, '&'구분자는 불가합니다.
 * isBirthDate("199-509-13");  // false, 구분자가 올바른 형식에 위치해야 합니다.
 * isBirthDate("1995-9-13");  // false, 월 또는 일이 2자리여야 합니다.
 */
export function isBirthDate(birthDate: string): boolean {
  let birthDateToUse = birthDate;

  if (isValidDateFormat(birthDateToUse)) {
    birthDateToUse = birthDateToUse.replace(/[-/.]/g, '');
  }

  if (!isNumericString(birthDateToUse)) {
    return false;
  }

  if (
    birthDateToUse.length !== YEAR_SHORT_LENGTH &&
    birthDateToUse.length !== YEAR_LONG_LENGTH
  ) {
    return false;
  }

  const parsedBirthDate =
    birthDateToUse.length === YEAR_SHORT_LENGTH
      ? parseShortFormatDate(birthDateToUse)
      : parseLongFormatDate(birthDateToUse);

  const { year, month, day } = parsedBirthDate;

  return isValidDateInRange(year, month, day);
}
