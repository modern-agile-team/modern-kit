import { DependencyList, useEffect, useRef } from 'react';

/**
 * @description 최초 마운트 시에는 실행되지 않고, 의존성 배열(`deps`)의 값이 업데이트되었을 때만 effect를 실행시키는 커스텀 훅입니다.
 *
 * @param {() => void} effect - 실행할 함수입니다.
 * @param {DependencyList} deps - effect를 다시 실행 할 의존성 배열입니다.
 *
 * @returns {void} void
 *
 * @example
 * useDidUpdate(() => {
 *  console.log('deps가 변경되었습니다.');
 * }, deps);
 */
export function useDidUpdate(effect: () => void, deps: DependencyList): void {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
