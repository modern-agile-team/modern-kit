import { debounce } from '@modern-kit/utils';
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
 * @template T - 콜백 함수의 타입입니다.
 * @param {T} callback - 디바운스 처리할 콜백 함수입니다.
 * @param {DebounceParameters[1]} wait - 디바운스가 적용될 시간(ms)입니다. 이 시간이 지나면 콜백이 실행됩니다.
 * @param {DebounceParameters[2]} [options] - 디바운스 동작에 영향을 주는 추가 옵션입니다.
 * - `signal` 옵션을 통해 디바운스 된 함수를 중단할 수 있습니다.
 * - `leading` 옵션을 통해 초기 호출을 실행할지 여부를 설정할 수 있습니다.
 * - `trailing` 옵션을 통해 마지막 호출을 실행할지 여부를 설정할 수 있습니다.
 * - `maxWait` 옵션을 통해 최대 대기 시간을 설정할 수 있습니다.
 *
 * @returns {DebounceReturnType<T>} 디바운스 처리된 콜백 함수를 반환합니다.
 *
 * @example
 * const debouncedFunction = useDebounce(callback, 300);
 * debouncedFunction(); // 디바운스 된 콜백이 실행됩니다.
 *
 * @example
 * // AbortSignal 사용 예시
 * const controller = new AbortController();
 * controller.abort(); // 디바운스된 함수 호출을 취소합니다.
 *
 * const debounced = useDebounce(callback, 300, { signal: controller.signal });
 * debounced(); // 호출되지 않습니다.
 */
export function useDebounce<T extends DebounceParameters[0]>(
  callback: T,
  wait: DebounceParameters[1],
  options: DebounceParameters[2] = {}
): DebounceReturnType<T> {
  const callbackAction = usePreservedCallback(callback);
  const { signal, leading = false, trailing = true, maxWait } = options ?? {};

  const debounced = useMemo(() => {
    return debounce(callbackAction, wait, {
      signal,
      leading,
      trailing,
      maxWait,
    });
  }, [callbackAction, wait, signal, leading, trailing, maxWait]);

  // 언마운트 시 디바운스 된 함수의 보류 중인 호출을 모두 버립니다.
  useUnmount(() => debounced.cancel());

  return debounced;
}
