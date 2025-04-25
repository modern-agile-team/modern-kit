type TruncationUnit =
  | 1
  | 10
  | 100
  | 1_000
  | 10_000
  | 100_000
  | 1_000_000
  | 10_000_000
  | 100_000_000
  | 1_000_000_000
  | 10_000_000_000
  | 100_000_000_000
  | 1_000_000_000_000;

/**
 * @description 주어진 `숫자`를 주어진 `절삭 단위(1을 포함한 10의 제곱수(10/100/1000/...))`로 절삭하여 반환하는 함수입니다.
 * 소수점이 있을 경우 소수점 자리수는 자동으로 절삭됩니다.
 *
 * @param {number} value - 나눌 숫자
 * @param {TruncationUnit} truncationUnit - 10의 제곱수 단위로 절삭할 숫자
 * @returns {number} 주어진 단위로 절삭된 숫자
 *
 * @example
 * formatNumberTruncate(1234567, 1000);
 * formatNumberTruncate(1234567.1234, 1000);
 * // 1234000
 *
 * @example
 * formatNumberTruncate(-1234567, 1000);
 * formatNumberTruncate(-1234567.1234, 1000);
 * // -1234000
 */
export function formatNumberTruncate(
  value: number,
  truncationUnit: TruncationUnit
): number {
  const isInvalidTruncationUnit =
    truncationUnit !== 1 &&
    (!Number.isInteger(truncationUnit) || truncationUnit % 10 !== 0);

  if (isInvalidTruncationUnit) {
    throw new Error('truncationUnit은 1을 포함한 10의 제곱수만 허용됩니다.');
  }

  if (value < 0) {
    return Math.ceil(value / truncationUnit) * truncationUnit;
  }
  return Math.floor(value / truncationUnit) * truncationUnit;
}
