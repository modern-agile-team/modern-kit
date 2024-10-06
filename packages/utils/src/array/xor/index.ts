/**
 * @description 두 배열 간의 대칭 차이(XOR)를 계산하는 함수입니다.
 * 결과는 두 배열 중 하나에만 존재하는 요소들로 구성됩니다.
 *
 * @template T - 배열 요소의 유형입니다.
 * @param {T[] | readonly T[]} array1 - 첫 번째 입력 배열입니다.
 * @param {T[] | readonly T[]} array2 - 두 번째 입력 배열입니다.
 * @param {(item: T) => string | number} [iteratee] - 선택적 반복자 함수입니다.
 * 제공된 경우, 각 요소에 대해 이 함수를 호출하여 비교 키를 생성합니다.
 * @returns {T[]} 두 배열의 대칭 차집합을 포함하는 새 배열을 반환합니다.
 */
export function xor<T>(
  array1: T[] | readonly T[],
  array2: T[] | readonly T[],
  iteratee?: (item: T) => string | number
): T[] {
  const set = new Set<string | number>();
  const result: T[] = [];

  function processArray(array: T[] | readonly T[]) {
    for (const item of array) {
      const key = iteratee ? iteratee(item) : (item as string | number);

      if (set.has(key)) {
        set.delete(key);
        const index = result.findIndex(
          (r) => (iteratee ? iteratee(r) : (r as string | number)) === key
        );
        if (index !== -1) {
          result.splice(index, 1);
        }
      } else {
        set.add(key);
        result.push(item);
      }
    }
  }

  processArray(array1);
  processArray(array2);

  return result;
}
