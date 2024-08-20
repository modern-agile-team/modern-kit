const swap = <T>(arr: T[], i: number, j: number) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

/**
 * @description 배열의 요소들의 순서를 무작위로 섞습니다.
 *
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
 * Fisher–Yates shuffle의 현대 알고리즘을 기반으로 구현됐습니다.
 *
 * @param arr - 셔플할 배열입니다.
 * @returns {T[]} 순서가 무작위로 섞인 새로운 배열입니다.
 *
 * @example
 * const array = [1, 2, 3, 4, 5];
 * shuffle(array);
 * // 순서가 무작위로 섞인 배열 ex. [3, 1, 4, 5, 2]
 */
export function shuffle<T>(arr: T[] | readonly T[]): T[] {
  const result = arr.slice();

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    swap(result, i, j);
  }

  return result;
}
