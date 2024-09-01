import { useEffect, useRef } from 'react';

/**
 * @description 이전 렌더링에서 인수의 값을 반환하는 커스텀 훅입니다.
 *
 * 이 훅은 현재 값이 변경될 때마다 이전 값을 저장하고, 컴포넌트가 다시 렌더링될 때 그 이전 값을 반환합니다.
 *
 * @template T - 추적하려는 값의 타입입니다.
 * @param {T} value - 현재 값으로, 추적하려는 값입니다.
 * @returns {T} 이전 렌더링 시점의 값입니다.
 *
 * @example
 * const prevCount = usePrevious(count);
 */
export function usePrevious<T>(value: T): T {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
