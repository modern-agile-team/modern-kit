import { useEffect, useRef } from 'react';
import { useTimeout } from 'hooks/useTimeout';

/**
 * @description useTimeout를 dependency 배열로 제어하는 훅입니다.
 *
 * @param callback: 실행 할 콜백
 * @param delay: timeout delay
 * @param deps: 의존성 배열
 * @param callOnMount: 최초 마운트 시에 callback 호출 할 것인지 결정 *
 *
 * @return {ReturnType<typeof useTimeout>}
 *
 * @example
 * const { set, reset, clear } = useDependencyTimeout(() => console.log(something), 500, deps);
 */
export default function useDependencyTimeout(
  callback: () => void,
  delay: number,
  deps: unknown[],
  { callOnMount }: { callOnMount: boolean }
) {
  const isFirstMount = useRef(true);
  const { set, reset, clear } = useTimeout(callback, delay);

  useEffect(() => {
    if (isFirstMount.current) {
      if (callOnMount) {
        callback();
      }
      isFirstMount.current = false;
    }
    reset();
  }, [callOnMount, callback, ...deps]);

  return { set, reset, clear };
}
