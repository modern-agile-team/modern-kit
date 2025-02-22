const isValidDateFormat = (dateString: string): boolean => {
  const regex =
    /^\d{4}[-](?:\d{2})[-](?:\d{2})$|^\d{4}[.](?:\d{2})[.](?:\d{2})$|^\d{4}[\/](?:\d{2})[\/](?:\d{2})$/;
  return regex.test(dateString);
};

/**
 * @description 날짜 문자열을 파싱하여 구분자를 슬래시(/)로 정규화합니다.
 *
 * Safari에서 호환되지 않는 날짜 형식("-" 또는 "."을 포함한 형식)을 호환시키기 위해 사용합니다.
 *
 * YYYY-MM-DD, YYYY.MM.DD 형식의 날짜 문자열을 처리하며, 그 외 형식은 그대로 반환합니다.
 *
 * @param {string} date - 파싱할 날짜 문자열.
 * @returns {string} 슬래시(/)로 구분된 정규화된 날짜 문자열.
 *
 * @example
 * parseDateString("2025-01-01")           // "2025/01/01" 반환
 * parseDateString("2025-01-01 13:45:00")  // "2025/01/01 13:45:00" 반환
 *
 * parseDateString("2025.01.01")  // "2025/01/01" 반환
 * parseDateString("2025.01.01 13:45:00")  // "2025/01/01 13:45:00" 반환
 *
 * @example
 * parseDateString('2025/01/01'); // 2025/01/01 그대로 반환
 * parseDateString('01/01/2025'); // 01/01/2025 그대로 반환
 */
export function parseDateString(date: string): string {
  const dateParts = date.split(/[\sT]/);
  let safeDateString = date;

  const yearMonthDay = dateParts[0];
  const time = dateParts[1];

  if (isValidDateFormat(yearMonthDay)) {
    const formattedDate = yearMonthDay.replace(/[-\\.]/g, '/');
    safeDateString = time ? `${formattedDate} ${time}` : formattedDate;
  }

  return safeDateString;
}
