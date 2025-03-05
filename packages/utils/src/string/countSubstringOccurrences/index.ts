import {
  countAllowOverlap,
  countExceptOverlap,
  escapeRegExp,
} from './internal';

interface CountSubstringOccurrencesOptions {
  overlap: boolean;
}

/**
 * @description 문자열에서 특정 하위 문자열이 얼마나 반복 등장했는지 횟수를 반환하는 함수입니다.
 *
 * @param {string} source - 검색할 대상이 되는 문자열
 * @param {string} target - 찾고자 하는 부분 문자열
 * @param {CountSubstringOccurrencesOptions} options - 설정 옵션
 * @param {boolean} options.overlap - 중첩 계산 여부
 * @returns {number} 부분 문자열이 발견된 횟수
 *
 * @example
 * countSubstringOccurrences("hello hello", "hello") // 결과: 2
 *
 * @example
 * countSubstringOccurrences("aaaa", "aa", { overlap: true }) // 결과: 3
 * countSubstringOccurrences("aaaa", "aa", { overlap: false }) // 결과: 2
 */
export function countSubstringOccurrences(
  source: string,
  target: string,
  options: CountSubstringOccurrencesOptions = { overlap: false }
): number {
  if (target === '') return 0;

  return options.overlap
    ? countAllowOverlap(source, target)
    : countExceptOverlap(source, target);
}
