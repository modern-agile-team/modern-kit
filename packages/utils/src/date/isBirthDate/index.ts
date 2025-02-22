/**
 * @description 입력된 생년월일 문자열이 6자리 또는 8자리의 올바른 형식인지,
 * 그리고 해당 날짜가 실제로 존재하는 날짜인지(월, 일 범위 및 윤년 고려) 검사합니다.
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
  let cleanedBirthDate = '';

  if (/[-./]/.test(birthDate)) {
    const pattern8 = /^(\d{4})([-./])(\d{2})\2(\d{2})$/;
    const pattern6 = /^(\d{2})([-./])(\d{2})\2(\d{2})$/;
    const match8 = birthDate.match(pattern8);
    const match6 = birthDate.match(pattern6);

    if (match8) {
      cleanedBirthDate = match8[1] + match8[3] + match8[4];
    } else if (match6) {
      cleanedBirthDate = match6[1] + match6[3] + match6[4];
    } else {
      console.error(
        '구분자가 올바른 위치에 있지 않습니다. 올바른 형식은 YYYY-MM-DD, YY-MM-DD, YYYY.MM.DD, YY.MM.DD, YYYY/MM/DD, YY/MM/DD 입니다.'
      );
      return false;
    }
  } else {
    if (!/^\d{6}$|^\d{8}$/.test(birthDate)) {
      console.error(
        '유효한 생년월일이 아닙니다. 6자리(YYMMDD) 또는 8자리(YYYYMMDD)만 허용됩니다.'
      );
      return false;
    }
    cleanedBirthDate = birthDate;
  }

  let year: number, month: number, day: number;

  if (cleanedBirthDate.length === 6) {
    const yy = parseInt(cleanedBirthDate.substring(0, 2), 10);
    const candidateYear = 2000 + yy;
    const currentYear = new Date().getFullYear();
    year = candidateYear > currentYear ? 1900 + yy : candidateYear;
    month = parseInt(cleanedBirthDate.substring(2, 4), 10);
    day = parseInt(cleanedBirthDate.substring(4, 6), 10);
  } else {
    year = parseInt(cleanedBirthDate.substring(0, 4), 10);
    month = parseInt(cleanedBirthDate.substring(4, 6), 10);
    day = parseInt(cleanedBirthDate.substring(6, 8), 10);
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    console.error('정확한 날짜를 입력해주세요.');
    return false;
  }

  const daysInMonth: Record<number, number> = {
    1: 31,
    2: isLeapYear(year) ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  if (day > daysInMonth[month]) {
    console.error('정확한 날짜를 입력해주세요.');
    return false;
  }

  return true;
}

/**
 * @description 주어진 연도가 윤년인지 판별하는 함수입니다.
 * 윤년 조건 : 연도가 4의 배수이면서 10의 배수가 아니거나, 400의 배수인 경우
 * @param {number} year 검사할 연도
 * @returns {boolean} 윤년이면 true , 아니면 false
 *
 * @example
 * isLeapYear(2020); // true (2020년은 윤년)
 * isLeapYear(2019); // false (2019년은 윤년이 아님)
 */
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
