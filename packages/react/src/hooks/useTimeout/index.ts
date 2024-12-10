import { useCallback, useEffect, useRef } from 'react';
import { getTimeoutOptions } from './useTimeout.utils';
import {
  type UseTimeoutReturnType,
  type TimeoutOptions,
} from './useTimeout.types';
import { usePreservedCallback } from '../usePreservedCallback';

/**
 * @description `useTimeout`훅은 지정된 지연 시간 후에 콜백 함수를 호출하는 커스텀 훅입니다.
 *
 * @param {() => void} callback - delay 후에 실행될 함수입니다.
 * @param {number | TimeoutOptions} options - 밀리초(ms) 단위의 지연 시간 또는 옵션 객체입니다.
 * 숫자일 경우 시간 간격으로 사용되며, 객체일 경우 `delay`와 `enabled` 속성을 설정할 수 있습니다.
 *
 * @return {UseTimeoutReturnType} set, reset, clear 함수를 포함하는 객체를 반환합니다.
 * - set: timeout을 설정하는 함수입니다.
 * - reset: timeout을 재설정하는 함수입니다.
 * - clear: timeout을 초기화하는 함수입니다.
 *
 * @example
 * // 마운트 후 0.3초 후 callback 함수 실행
 * useTimeout(callback, 300);
 *
 * // 마운트 후 0.3초 후 callback 함수 실행
 * useTimeout(callback, { delay: 300 });
 *
 * // enabled가 true라면, 0.3초 후 callback 함수 실행
 * useTimeout(callback, { delay: 300, enabled: condition });
 *
 * @example
 * // 직접 timeout 핸들링 할 수 있는 함수 제공
 * const { set, reset, clear } = useTimeout(callback, { delay: 300, enabled: condition });
 */
export function useTimeout(
  callback: () => void,
  options: number
): UseTimeoutReturnType;

export function useTimeout(
  callback: () => void,
  options: TimeoutOptions
): UseTimeoutReturnType;

export function useTimeout(
  callback: () => void,
  options: number | TimeoutOptions
): UseTimeoutReturnType {
  const timeoutRef = useRef<NodeJS.Timeout | number | null>();

  const callbackAction = usePreservedCallback(callback);

  const { delay, enabled } = getTimeoutOptions(options);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(callbackAction, delay);
  }, [callbackAction, delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
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
  }, [set, clear, delay, enabled]);

  return { set, reset, clear };
}
