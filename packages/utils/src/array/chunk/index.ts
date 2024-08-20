/**
 * @description 주어진 배열을 지정된 크기로 나눈 새로운 배열의 배열을 반환합니다.
 *
 * @template T - 배열 요소의 유형입니다.
 * @param {T[] | readonly T[]} arr - 요소들을 chunk 별로 나눌 배열입니다.
 * @param {number} size - chunk의 크기입니다.
 * @returns {T[][]} 주어진 배열을 지정된 size로 나눈 2차원 배열
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2)
 * // [[1, 2], [3, 4], [5]]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // [['a', 'b', 'c'], ['d']]
 */
export function chunk<T>(arr: T[] | readonly T[], size: number): T[][] {
  if (!Number.isInteger(size) || size < 1) {
    throw new Error('Invalid size Value');
  }

  const chunkLength = Math.ceil(arr.length / size);
  const result: T[][] = new Array(chunkLength);

  for (let i = 0; i < chunkLength; i++) {
    const start = i * size;
    const end = start + size;

    result[i] = arr.slice(start, end);
  }

  return result;
}
