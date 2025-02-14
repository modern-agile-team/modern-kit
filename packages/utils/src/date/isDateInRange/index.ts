import { isNil } from '../../validator/isNil';
import { isAfterDate } from '../isAfterDate';
import { isBeforeDate } from '../isBeforeDate';

interface IsDateInRangeParams {
  targetDate?: Date | string | number;
  fromDate?: Date | string | number;
  toDate?: Date | string | number;
  inclusive?: 'both' | 'from' | 'to' | 'none';
}

/**
 * @description 날짜 문자열을 Date 객체로 변환합니다.
 * Safari에서 호환되도록 "-", "."을 "/"로 변경합니다. (ex. 2025-01-01 -> 2025/01/01)
 *
 * @param {Date | string | number} date - 변환할 날짜 문자열 또는 숫자
 * @returns {Date} 변환된 Date 객체
 */
const parseDate = (date: Date | string | number): Date => {
  if (date instanceof Date) return date;
  if (typeof date === 'number') return new Date(date);

  const safeDateString = date.replace(/[-\\.]/g, '/');
  return new Date(safeDateString);
};

/**
 * @description 타겟 날짜가 주어진 날짜 범위 내에 있는지 확인합니다. 타겟 날짜(targetDate)가 없을 경우 `현재 날짜`를 사용합니다.
 *
 * 1. 시작 날짜만 주어 질 경우 타겟 날짜(or 현재 날짜)가 시작 날짜 이후인지 확인합니다.
 * 2. 종료 날짜만 주어 질 경우 타겟 날짜(or 현재 날짜)가 종료 날짜 이전인지 확인합니다.
 * 3. 시작 날짜와 종료 날짜가 모두 주어 질 경우 타겟 날짜(or 현재 날짜)가 시작 날짜와 종료 날짜 사이에 있는지 확인합니다.
 *
 * @param {IsDateInRangeParams} params - 날짜 범위를 지정하는 파라미터 객체
 * @param {Date | string | number} [params.targetDate=new Date()] - 타겟 날짜, 없을 경우 현재 날짜를 사용합니다.
 * @param {Date | string | number} [params.fromDate] - 범위의 시작 날짜
 * @param {Date | string | number} [params.toDate] - 범위의 종료 날짜
 * @param {'both' | 'from' | 'to' | 'none'} [params.inclusive='from'] - 시작 날짜와 종료 날짜의 경계를 포함 할 지 여부를 결정합니다.
 * - 'both': 시작 날짜와 종료 날짜 모두 포함합니다.
 * - 'from': 시작 날짜만 포함합니다. (기본 값)
 * - 'to': 종료 날짜만 포함합니다.
 * - 'none': 시작 날짜와 종료 날짜 모두 포함하지 않습니다.
 * @returns {boolean} 타겟 날짜가 범위 내에 있으면 true, 그렇지 않으면 false를 반환
 * @throws {Error} 유효하지 않은 날짜 형식이 입력된 경우
 *
 * @example
 * // 현재 날짜가 2025년 01월 01일 기준
 * // 타겟 날짜가 있다면 타겟 날짜가 범위 내에 있는지 확인하며, 타겟 날짜가 없다면 현재 날짜가 범위 내에 있는지 확인합니다.
 * isDateInRange({ fromDate: new Date('2024-01-01'), toDate: new Date('2024-12-31') }); // false
 * isDateInRange({ fromDate: '2025-01-01', toDate: '2025-12-31' }); // true
 * isDateInRange({ targetDate: '2025-01-02', fromDate: '2025-01-01', toDate: '2025-01-03' }); // true
 *
 * @example
 * // 현재 날짜가 2025년 01월 01일 기준
 * // 시작 날짜만 지정하여 타겟 날짜(or 현재 날짜)가 시작 날짜 이후인지 확인합니다.
 * isDateInRange({ fromDate: new Date('2025-01-02') }); // true
 * isDateInRange({ fromDate: '2024-12-31' }); // false
 * isDateInRange({ targetDate: '2025-01-02', fromDate: '2025-01-01' }); // true
 *
 * @example
 * // 현재 날짜가 2025년 01월 01일 기준
 * // 종료 날짜만 지정하여 타겟 날짜(or 현재 날짜)가 종료 날짜 이전인지 확인합니다.
 * isDateInRange({ toDate: new Date('2025-01-02') }); // true
 * isDateInRange({ toDate: '2024-12-31' }); // false
 * isDateInRange({ targetDate: '2024-12-31', toDate: '2025-01-01' }); // true
 *
 * @example
 * // 현재 날짜가 2025년 01월 01일 기준
 * // inclusive 옵션에 따른 경계값 포함 여부를 확인합니다.
 * isDateInRange({ fromDate: '2025-01-01', toDate: '2025-01-01', inclusive: 'both' }); // true
 * isDateInRange({ targetDate: '2025-01-01', fromDate: '2025-01-01', toDate: '2025-01-01', inclusive: 'both' }); // true
 *
 * isDateInRange({ fromDate: '2025-01-01', toDate: '2025-01-02', inclusive: 'from' }); // true
 * isDateInRange({ targetDate: '2025-01-01', fromDate: '2025-01-01', toDate: '2025-01-02', inclusive: 'from' }); // true
 *
 * isDateInRange({ fromDate: '2024-12-31', toDate: '2025-01-01', inclusive: 'to' }); // true
 * isDateInRange({ targetDate: '2025-01-01', fromDate: '2024-12-31', toDate: '2025-01-01', inclusive: 'to' }); // true
 *
 * isDateInRange({ fromDate: '2024-12-31', toDate: '2025-01-02', inclusive: 'none' }); // true
 * isDateInRange({ targetDate: '2025-01-01', fromDate: '2024-12-31', toDate: '2025-01-02', inclusive: 'none' }); // true
 */
export function isDateInRange({
  targetDate = new Date(),
  fromDate,
  toDate,
  inclusive = 'from',
}: IsDateInRangeParams): boolean {
  const fromDateToUse = fromDate ? parseDate(fromDate) : null;
  const toDateToUse = toDate ? parseDate(toDate) : null;
  const targetDateToUse = parseDate(targetDate);

  // 에러 케이스 대응
  if (isNaN(targetDateToUse.getTime())) {
    throw new Error('targetDate가 유효하지 않은 날짜 형식입니다.');
  }
  if (!isNil(fromDateToUse) && isNaN(fromDateToUse.getTime())) {
    throw new Error('fromDate가 유효하지 않은 날짜 형식입니다.');
  }
  if (!isNil(toDateToUse) && isNaN(toDateToUse.getTime())) {
    throw new Error('toDate가 유효하지 않은 날짜 형식입니다.');
  }

  // 날짜 비교 내부 함수
  const compareDate = (date: Date, type: 'from' | 'to'): boolean => {
    const isFrom = type === 'from';
    const inclusiveToUse =
      inclusive === 'both' ||
      (isFrom ? inclusive === 'from' : inclusive === 'to');

    // inclusive 옵션에 따라 날짜 범위 비교
    if (isFrom) {
      return isAfterDate({
        targetDate: targetDateToUse,
        compareDate: date, // fromDate
        inclusive: inclusiveToUse,
      });
    }
    return isBeforeDate({
      targetDate: targetDateToUse,
      compareDate: date, // toDate
      inclusive: inclusiveToUse,
    });
  };

  // 1. 시작 날짜만 주어 질 경우 타겟 날짜(or 현재 날짜)가 시작 날짜 이후인지 확인
  if (fromDateToUse && !toDateToUse) {
    return compareDate(fromDateToUse, 'from');
  }

  // 2. 종료 날짜만 주어 질 경우 타겟 날짜(or 현재 날짜)가 종료 날짜 이전인지 확인
  if (!fromDateToUse && toDateToUse) {
    return compareDate(toDateToUse, 'to');
  }

  // 3. 시작 날짜와 종료 날짜가 모두 주어 질 경우 타겟 날짜(or 현재 날짜)가 시작 날짜와 종료 날짜 사이에 있는지 확인
  if (fromDateToUse && toDateToUse) {
    if (isAfterDate({ targetDate: fromDateToUse, compareDate: toDateToUse })) {
      throw new Error('fromDate가 toDate보다 늦을 수 없습니다.');
    }

    return compareDate(fromDateToUse, 'from') && compareDate(toDateToUse, 'to');
  }

  throw new Error('fromDate 혹은 toDate 중 하나는 필요합니다.');
}
