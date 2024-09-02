/**
 * @description 주어진 콜백 함수를 한 번만 실행하게 하는 함수입니다.첫 번째 호출 이후에는 이전에 실행된 결과를 반환합니다.
 *
 * @template T - 콜백 함수의 타입을 지정합니다.
 * @param {T} callback - 한 번만 실행될 콜백 함수입니다.
 * @returns {T} - 원래의 콜백 함수와 동일한 시그니처를 가지는 함수입니다.
 *
 * @example
 * const initialize = once(() => {
 *   console.log('초기화 완료');
 *   return true;
 * });
 *
 * initialize(); // '초기화 완료'가 출력되며, true를 반환합니다.
 * initialize(); // 아무 것도 출력되지 않으며, 이전 결과인 true를 반환합니다.
 */
export function once<T extends (...args: any[]) => any>(callback: T): T {
  let isCalled = false;
  let cachedResult: ReturnType<T>;

  const executeOnce = (...args: any[]) => {
    if (isCalled) {
      return cachedResult;
    }

    const result = callback(...args);

    isCalled = true;
    cachedResult = result;

    return result;
  };

  return executeOnce as T;
}
