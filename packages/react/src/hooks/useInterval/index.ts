import { useCallback, useEffect, useRef } from 'react';
import { usePreservedCallback } from '../usePreservedCallback';
import { getIntervalOptions } from './useInterval.utils';
import {
  type UseIntervalReturnType,
  type IntervalOptions,
} from './useInterval.types';

/**
 * @description `useInterval` 훅은 지정된 시간 간격으로 특정 작업을 수행할 수 있게 해주는 훅입니다.
 *
 * @param {() => void} callback - 지정된 시간 간격마다 실행될 콜백 함수입니다.
 * @param {number | IntervalOptions} options - 시간 간격을 나타내는 밀리초 단위의 숫자 또는 설정 객체입니다.
 * 숫자일 경우 시간 간격으로 사용되며, 객체일 경우 `delay`와 `enabled` 속성을 설정할 수 있습니다.
 *
 * @returns {UseIntervalReturnType} `reset`, `set`, `clear`를 포함한 객체를 반환합니다.
 * - `set`: interval을 설정하는 함수입니다.
 * - `reset`: interval을 재설정하는 함수입니다.
 * - `clear`: interval을 초기화하는 함수입니다.
 *
 * @example
 * // 마운트 후 0.3초 간격으로 callback 실행
 * useInterval(callback, 300);
 *
 * // 마운트 후 0.3초 간격으로 callback 실행
 * useInterval(callback, { delay: 300 });
 *
 * // enabled true라면, 0.3초 간격으로 callback 함수 실행
 * useInterval(callback, { delay: 300, enabled: condition });
 *
 * @example
 * // 직접 interval을 핸들링 할 수 있는 함수 제공
 * const { set, reset, clear } = useInterval(callback, { delay: 300, enabled: condition });
 */
export function useInterval(
  callback: () => void,
  options: number
): UseIntervalReturnType;

export function useInterval(
  callback: () => void,
  options: IntervalOptions
): UseIntervalReturnType;

export function useInterval(
  callback: () => void,
  options: number | IntervalOptions
): UseIntervalReturnType {
  const intervalRef = useRef<number | null>();

  const preservedCallback = usePreservedCallback(callback);

  const { delay, enabled } = getIntervalOptions(options);

  const set = useCallback(() => {
    intervalRef.current = window.setInterval(preservedCallback, delay);
  }, [preservedCallback, delay]);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  useEffect(() => {
    if (delay < 0 || !enabled) return;

    set();
    return () => clear();
  }, [clear, set, enabled, delay]);

  return { set, reset, clear };
}
