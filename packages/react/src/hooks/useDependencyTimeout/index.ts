import { useEffect, DependencyList } from 'react';
import { useTimeout } from '../useTimeout';
import {
  TimeoutOptions,
  getTimeoutOptions,
} from './useDependencyTimeout.utils';

/**
 * @description `useTimeout`을 사용해 인자로 전달하는 의존성 배열의 값이 변경되면 `Timeout`을 재설정하는 커스텀 훅입니다.
 * @see https://modern-agile-team.github.io/modern-kit/docs/react/hooks/useTimeout
 *
 * @param {() => void} callback - delay 후에 실행될 함수입니다.
 * @param {number} delay - 밀리초(ms) 단위의 지연 시간
 * @param {DependencyList} deps - 의존성 배열
 *
 * @example
 * useDependencyTimeout(callback, 300, [condition]);
 */
export function useDependencyTimeout(
  callback: () => void,
  delay: number,
  deps: DependencyList
): ReturnType<typeof useTimeout>;

/**
 * @description `useTimeout`을 사용해 인자로 전달하는 의존성 배열의 값이 변경되면 `Timeout`을 재설정하는 커스텀 훅입니다.
 * @see https://modern-agile-team.github.io/modern-kit/docs/react/hooks/useTimeout
 *
 * @param {() => void} callback - delay 후에 실행될 함수입니다.
 * @param {TimeoutOptions} options - timeout 옵션입니다. enabled, delay를 포함 합니다.
 * @param {DependencyList} deps - 의존성 배열
 *
 * @example
 * useDependencyTimeout(callback, { delay: 300, enabled }, [condition]);
 */
export function useDependencyTimeout(
  callback: () => void,
  options: TimeoutOptions,
  deps: DependencyList
): ReturnType<typeof useTimeout>;

/**
 * @description `useTimeout`을 사용해 인자로 전달하는 의존성 배열의 값이 변경되면 `Timeout`을 재설정하는 커스텀 훅입니다.
 * @see https://modern-agile-team.github.io/modern-kit/docs/react/hooks/useTimeout
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
export function useDependencyTimeout(
  callback: () => void,
  options: number | TimeoutOptions,
  deps: DependencyList
): ReturnType<typeof useTimeout> {
  const { delay, enabled } = getTimeoutOptions(options);

  const { set, reset, clear } = useTimeout(callback, { delay, enabled: false });

  useEffect(() => {
    if (delay < 0 || !enabled) return;
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, enabled, reset, ...deps]);

  return { set, reset, clear };
}
