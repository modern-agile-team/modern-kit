import { DependencyList, useEffect } from 'react';

/**
 * @description 비동기 함수를 `useEffect`와 함께 사용하기 위한 커스텀 훅입니다.
 *
 * @param {() => Promise<void>} effectCallback - 실행할 비동기 함수입니다.
 * @param {DependencyList} deps - effect를 다시 실행 할 의존성 배열입니다.
 *
 * @returns {void}
 *
 * @example
 * useAsyncEffect(async () => {
 *   const data = await fetchData();
 *   setData(data);
 * }, deps);
 */
export function useAsyncEffect(
  effectCallback: () => Promise<void>,
  deps?: DependencyList
): void {
  useEffect(() => {
    const execute = async () => {
      await effectCallback();
    };

    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
