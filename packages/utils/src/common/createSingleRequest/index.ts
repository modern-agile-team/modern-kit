const set = new Set<string>();
let count = 0;

/**
 * @description 단일 비동기 실행만 허용하는 함수 래퍼를 생성하는 팩토리 함수입니다.
 * 진행 중인 호출이 있을 때 중복 실행을 방지하며, 완료 후에는 다시 호출이 가능합니다.
 * 
 * `debounce/throttle`는 함수의 중복 호출을 방지하는 데 대부분의 경우에 효과적입니다. 
 * 하지만, `debounce/throttle`는 비동기 작업의 완료를 보장하지 않기 때문에 다음과 같은 한계가 있습니다:
 * 
 * 1. `debounce/throttle` 시간이 API 응답 시간보다 짧을 경우: 비동기 작업이 완료되지 않은 상태에서 `다시 호출`될 수 있습니다.
 * 2. `debounce/throttle` 시간이 API 응답 시간보다 길 경우: 비동기 작업이 완료되었지만 `버튼`과 같은 요소가 여전히 `비활성화`되어 있을 수 있습니다.
 * 3. `즉각적인 반응`을 원하는 경우: `debounce/throttle`는 호출을 지연시키기 때문에 사용자에게 `즉각적인 반응`을 보여주기에 제한적입니다.
 * 4. `debounce/throttle`은 `시간`을 기반으로 동작하기 때문에 `얼마나 자주 실행`되는지가 중요하지 `중복 호출 여부`를 파악하기 어렵습니다.
 * 
 * 위와 같은 한계점을 대응하고자 한다면 `createSingleRequest`를 사용할 수 있습니다.
 *
 * @template T - 반환 타입
 * @template A - 인자 타입
 * @param {string} key - 고유한 식별자 (선택 사항) 해당 식별자를 전달하면 해당 식별자를 사용하여 비동기 실행을 공유합니다.
 * @returns 콜백을 받아 단일 실행이 보장된 래핑 함수를 반환하는 함수
 *
 * @example
 * const singleAsyncCall = createSingleRequest('test');
 * const wrappedFetch = singleRequest(fetchData);
 *
 * wrappedFetch(); // 실행됨
 * wrappedFetch(); // 진행 중이므로 무시됨 (undefined 반환)
 * wrappedFetch(); // 진행 중이므로 무시됨 (undefined 반환)
 */
export function createSingleRequest(key?: string) {
  const keyToUse = key ?? `rq_${count++}`;

  return <T, A extends unknown[]>(
    callback: (...args: A) => Promise<T>,
  ): (...args: A) => Promise<T | undefined> => {
    return async (...args: A): Promise<T | undefined> => {
      if (set.has(keyToUse)) return;
      set.add(keyToUse);
      try {
        const result = await callback(...args);
        return result;
      } finally {
        set.delete(keyToUse);
      }
    };
  };
}
