interface ForEachAsyncOptions {
  parallel?: boolean;
}

/**
 * @description 주어진 배열의 각 요소에 대해 제공된 `콜백 함수`를 호출하되, 콜백이 반환한 Promise 의 완료를 기다립니다
 *
 * 기본값은 순차 실행입니다. 병렬 실행을 원하면 `options.parallel`를 `true`로 설정하세요.
 * 단, 병렬 실행 시 각 요소의 완료 순서는 보장되지 않습니다.
 *
 * @template T - 배열 요소의 타입.
 * @param {T[] | readonly T[]} arr - 순회할 배열.
 * @param {(currentValue: T, index: number, arr: T[] | readonly T[]) => unknown} callback - 배열의 각 요소에 대해 호출할 함수. Promise 를 반환하면 완료될 때까지 기다립니다.
 * @param {ForEachAsyncOptions} [options={}] - 실행 옵션 객체.
 * @param {boolean} [options.parallel=false] - 병렬 실행 여부.
 * @returns {Promise<void>} 모든 요소의 콜백이 완료되면 resolve 되는 Promise.
 *
 * @example
 * const ids = [1, 2, 3];
 *
 * await forEachAsync(ids, async (id, index) => {
 *   await deleteProduct(id);
 *   console.log(index, '번째 삭제 완료');
 *   // 0 번째 삭제 완료
 *   // 1 번째 삭제 완료
 *   // 2 번째 삭제 완료
 * });
 *
 * console.log('모두 삭제되었습니다.');
 */
export async function forEachAsync<T>(
  arr: T[] | readonly T[],
  callback: (
    currentValue: T,
    index: number,
    arr: T[] | readonly T[]
  ) => void | Promise<void>,
  options?: ForEachAsyncOptions
): Promise<void> {
  if (options?.parallel) {
    await Promise.all(arr.map(callback));
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    await callback(arr[i], i, arr);
  }
}
