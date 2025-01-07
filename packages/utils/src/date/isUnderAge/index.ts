import { getAge } from '../getAge';

interface IsUnderAgeParams {
  birthDate: string | number | Date;
  targetAge: number;
  inclusive?: boolean;
}

/**
 * @description 주어진 생년월일을 기준으로 특정 나이보다 어린지 확인합니다.
 *
 * `inclusive` 값을 기준으로 기준 나이를 포함할지 여부를 결정합니다.
 *
 * @param {IsUnderAgeParams} params - 확인하고자 하는 생년월일
 * @param {string | number| Date} params.birthDate - 확인하고자 하는 생년월일
 * @param {number} params.targetAge - 비교할 기준 나이
 * @param {boolean} params.inclusive - 기준 나이에 포함 여부
 * @returns {boolean} 대상이 기준 나이보다 어리면 true, 아니면 false
 * @throws {Error} 유효하지 않은 날짜 형식이 입력된 경우
 *
 * @example
 * // 2025년 01월 01일 기준
 * isUnderAge({ birthDate: new Date('2006-01-02'), targetAge: 19 }); // true
 * isUnderAge({ birthDate: new Date('2006-01-01'), targetAge: 19 }); // false, 정확히 만 19세
 * isUnderAge({ birthDate: new Date('2005-12-31'), targetAge: 19 }); // false
 *
 * isUnderAge({ birthDate: '2006-01-02', targetAge: 19 }); // true
 * isUnderAge({ birthDate: '2006-01-01', targetAge: 19 }); // false, 정확히 만 19세
 * isUnderAge({ birthDate: '2005-12-31', targetAge: 19 }); // false
 *
 * @example
 * // 2025년 01월 01일 기준
 * // inclusive 값을 기준으로 기준 나이를 포함할지 여부를 결정합니다.
 * isUnderAge({
 *   birthDate: '2006-01-01',
 *   targetAge: 19,
 *   inclusive: true
 * }); // true
 */
export function isUnderAge({
  birthDate,
  targetAge,
  inclusive = false,
}: IsUnderAgeParams): boolean {
  const age = getAge(birthDate);

  return inclusive ? age <= targetAge : age < targetAge;
}
