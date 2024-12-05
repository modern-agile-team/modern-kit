import { useEffect, DependencyList } from 'react';
import { useTimeout } from '../useTimeout';
import { getTimeoutOptions } from '../useTimeout/useTimeout.utils';
import type { TimeoutOptions } from '../useTimeout/useTimeout.types';

export function useDependencyTimeout(
  callback: () => void,
  delay: number,
  deps: DependencyList
): ReturnType<typeof useTimeout>;

export function useDependencyTimeout(
  callback: () => void,
  options: TimeoutOptions,
  deps: DependencyList
): ReturnType<typeof useTimeout>;

/**
 * @description useTimeout를 dependency 배열로 제어하는 훅입니다.
 *
 * @param {() => void} callback - delay 후에 실행될 함수입니다.
 * @param {number | TimeoutOptions} options - 밀리초(ms) 단위의 지연 시간 또는 옵션 객체(delay, enabled)입니다.
 * @param {DependencyList} deps - 의존성 배열
 *
 * @example
 * useDependencyTimeout(callback, 300, [condition]);
 *
 * @example
 * useDependencyTimeout(callback, { delay: 300, enabled }, [condition]);
 */
export default function useDependencyTimeout(
  callback: () => void,
  options: number | TimeoutOptions,
  deps: DependencyList
): ReturnType<typeof useTimeout> {
  const { delay, enabled } = getTimeoutOptions(options);

  const { set, reset, clear } = useTimeout(callback, delay);

  useEffect(() => {
    if (delay < 0 || !enabled) return;
    reset();
  }, [delay, enabled, reset, ...deps]);

  return { set, reset, clear };
}
