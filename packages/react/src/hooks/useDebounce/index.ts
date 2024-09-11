import { useMemo } from 'react';
import { debounce } from 'lodash-es';
import { useUnmount } from '../useUnmount';
import { usePreservedCallback } from '../../hooks/usePreservedCallback';
import { usePreservedState } from '../../hooks/usePreservedState';

export type DebounceParameters = Parameters<typeof debounce>;

/**
 * @description 주어진 콜백 함수를 `디바운스(지연)` 처리하여 특정 시간 동안 반복 호출을 방지하는 훅입니다.
 * 디바운스는 마지막 함수 호출 후 일정 시간이 지나면 콜백이 실행되도록 합니다.
 *
 * @param {DebounceParameters[0]} callback - 디바운스 처리할 콜백 함수입니다.
 * @param {DebounceParameters[1]} wait - 디바운스가 적용될 시간(ms)입니다. 이 시간이 지나면 콜백이 실행됩니다.
 * @param {DebounceParameters[2]} [options] - 디바운스 동작에 영향을 주는 추가 옵션입니다. `leading(default: false)`, `trailing(default: true)`, `maxWait` 옵션을 받을 수 있습니다.
 *
 * @returns {ReturnType<typeof debounce>} 디바운스 처리된 콜백 함수를 반환합니다.
 *
 * @example
 * const debouncedFunction = useDebounce(callback, 300);
 *
 * debouncedFunction(); // 디바운스 된 콜백이 실행됩니다.
 */
export function useDebounce(
  callback: DebounceParameters[0],
  wait: DebounceParameters[1],
  options: DebounceParameters[2] = {}
): ReturnType<typeof debounce> {
  const callbackAction = usePreservedCallback(callback);
  const preservedOptions = usePreservedState(options);

  const debounced = useMemo(() => {
    return debounce(callbackAction, wait, preservedOptions);
  }, [callbackAction, wait, preservedOptions]);

  useUnmount(() => debounced.cancel());

  return debounced;
}
