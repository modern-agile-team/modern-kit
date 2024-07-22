import { usePreservedCallback } from '../usePreservedCallback';
import { useCallback, useEffect, useRef } from 'react';
import { isNumber } from '@modern-kit/utils';

type SetTimeoutParameters = Parameters<typeof setTimeout>;

interface TimeoutOptions {
  delay: number;
  enabled?: boolean;
}

interface UseTimeoutReturnType {
  set: () => void;
  reset: () => void;
  clear: () => void;
}

/**
 * @description 지정된 지연 시간 후에 콜백 함수를 호출하는 커스텀 훅입니다.
 *
 * @param callback - 타임아웃 후에 실행될 함수입니다.
 * @param options - 밀리초 단위의 지연 시간 또는 옵션 객체입니다.
 * @return set, reset, clear 함수를 포함하는 객체를 반환합니다.
 *   @property set - 타임아웃을 설정하는 함수입니다.
 *   @property reset - 타임아웃을 재설정하는 함수입니다.
 *   @property clear - 타임아웃을 초기화하는 함수입니다.
 *
 * @example
 * // 마운트 후 0.3초 후 callback 실행
 * useTimeout(() => console.log('timeout 실행'), 300);
 *
 * // 마운트 후 0.3초 후 callback 실행
 * useTimeout(() => console.log('timeout 실행'), { delay: 300 });
 *
 * // enabled가 true가 되면, 0.3초 후 callback 실행
 * useTimeout(() => console.log('timeout 실행'), { delay: 300, enabled: condition });
 *
 * // 직접 타임아웃 핸들링 할 수 있는 함수 제공
 * const { set, reset, clear } = useTimeout(() => console.log('timeout 실행'), { delay: 300, enabled: condition });
 */
export function useTimeout(
  callback: SetTimeoutParameters[0],
  options: number
): UseTimeoutReturnType;

export function useTimeout(
  callback: SetTimeoutParameters[0],
  options: TimeoutOptions
): UseTimeoutReturnType;

export function useTimeout(
  callback: SetTimeoutParameters[0],
  options: number | TimeoutOptions
) {
  const timeoutRef = useRef<NodeJS.Timeout | number>();

  const callbackAction = usePreservedCallback(callback);
  const isNumberOptions = isNumber(options);

  const delay = isNumberOptions ? options : options.delay;
  const enabled = isNumberOptions ? true : options?.enabled ?? true;

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(callbackAction, delay);
  }, [callbackAction, delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  useEffect(() => {
    if (delay < 0 || !enabled) {
      return;
    }

    set();
    return () => clear();
  }, [set, clear, delay, enabled]);

  return { set, reset, clear };
}
