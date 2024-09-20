import { noop } from '@modern-kit/utils';
import { useCallback, useRef } from 'react';

/**
 * @description 주어진 콜백 함수의 `참조를 유지`하고, 컴포넌트 렌더링 사이에 재사용할 수 있도록 도와주는 커스텀 훅입니다.
 *
 * 이 훅은 특히 콜백 함수가 렌더링 중에 변경될 때 유용합니다. 불필요한 함수 생성을 방지하고 최적화하며, 최신 버전의 콜백 함수를 사용 할 수 있습니다.
 *
 * @template T - 콜백 함수의 타입.
 * @param {T | undefined} [callback=noop] - 유지하고자 하는 콜백 함수.
 * @returns {T} 최신 콜백 함수 참조를 사용하는 메모이제이션된 콜백 함수.
 *
 * @example
 * const preservedCallback = usePreservedCallback(callback);
 *
 * preservedCallback();
 */
export function usePreservedCallback<T extends (...args: any[]) => any>(
  callback: T = noop as T
): T {
  const callbackRef = useRef<T>(callback);

  callbackRef.current = callback;

  return useCallback((...args: any[]) => {
    return callbackRef.current(...args);
  }, []) as T;
}
