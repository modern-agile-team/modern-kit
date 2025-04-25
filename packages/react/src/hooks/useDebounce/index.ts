import debounce from 'lodash-es/debounce';
import { useMemo } from 'react';
import { useUnmount } from '../useUnmount';
import { usePreservedCallback } from '../../hooks/usePreservedCallback';

export type DebounceParameters = Parameters<typeof debounce>;
export type DebounceReturnType<T extends DebounceParameters[0]> = ReturnType<
  typeof debounce<T>
>;

/**
 * @description 주어진 콜백 함수를 `디바운스(지연)` 처리하여 특정 시간 동안 반복 호출을 방지하는 훅입니다.
 * 디바운스는 마지막 함수 호출 후 일정 시간이 지나면 콜백이 실행되도록 합니다.
 *
 * @param {DebounceParameters[0]} callback - 디바운스 처리할 콜백 함수입니다.
 * @param {DebounceParameters[1]} wait - 디바운스가 적용될 시간(ms)입니다. 이 시간이 지나면 콜백이 실행됩니다.
 * @param {DebounceParameters[2]} [options] - 디바운스 동작에 영향을 주는 추가 옵션입니다. `leading(default: false)`, `trailing(default: true)`, `maxWait` 옵션을 받을 수 있습니다.
 *
 * @returns {DebounceReturnType<T>} 디바운스 처리된 콜백 함수를 반환합니다.
 *
 * @example
 * const debouncedFunction = useDebounce(callback, 300);
 *
 * debouncedFunction(); // 디바운스 된 콜백이 실행됩니다.
 */
export function useDebounce<T extends DebounceParameters[0]>(
  callback: T,
  wait: DebounceParameters[1],
  options: DebounceParameters[2] = {}
): DebounceReturnType<T> {
  const callbackAction = usePreservedCallback(callback);
  const { leading = false, trailing = true, maxWait } = options ?? {};

  const debounced = useMemo(() => {
    return debounce(callbackAction, wait, {
      leading,
      trailing,
      ...(typeof maxWait === 'number' && { maxWait }),
    });
  }, [callbackAction, wait, leading, trailing, maxWait]);

  // 언마운트 시 디바운스 된 함수의 보류 중인 호출을 모두 버립니다.
  useUnmount(() => debounced.cancel());

  return debounced;
}
