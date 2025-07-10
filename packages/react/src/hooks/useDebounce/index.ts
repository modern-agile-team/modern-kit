import { debounce } from '@modern-kit/utils';
import { useMemo } from 'react';
import { useUnmount } from '../useUnmount';
import { usePreservedCallback } from '../../hooks/usePreservedCallback';

type DebounceParameters = Parameters<typeof debounce>;
type DebounceReturnType<T extends (...args: any) => any> = ReturnType<
  typeof debounce<T>
>;

/**
 * @description 주어진 콜백 함수를 `디바운스(지연)` 처리하여 특정 시간 동안 반복 호출을 방지하는 훅입니다.
 *
 * 콜백 함수는 마지막으로 호출된 시점으로부터 `wait` 밀리초가 경과할 때까지 실행이 지연됩니다.
 * - 연속 호출 시 이전 호출은 취소되고 새로운 타이머가 시작됩니다.
 *
 * @template T - 콜백 함수 타입입니다.
 * @param {DebounceParameters[0]} callback - 디바운스할 콜백 함수입니다.
 * @param {DebounceParameters[1]} wait - 지연시킬 시간(밀리초)입니다.
 * @param {DebounceParameters[2]} options - 디바운스 동작과 관련된 옵션 객체입니다.
 * @param {number} options.maxWait - 최대 대기 시간(밀리초)입니다.
 * debounce는 기본적으로 호출되면 대기 시간이 초기화됩니다. maxWait 옵션은 연속적인 호출이 발생하더라도 첫 호출 기준으로 최대 대기 시간이 지나면 강제로 함수가 실행됩니다.
 * @param {boolean} options.leading - 첫 번째 호출을 실행할지 여부입니다.
 * @param {boolean} options.trailing - 마지막 호출을 실행할지 여부입니다.
 * @param {AbortSignal} options.signal - 디바운스된 함수를 취소하기 위한 선택적 AbortSignal입니다.
 *
 * @returns {DebouncedFunction<F>} `cancel` 메서드가 포함된 새로운 디바운스된 함수를 반환합니다.
 * - `cancel` 메서드는 디바운스된 함수의 대기 중인 실행을 취소합니다.
 * - `flush` 메서드는 대기 중인 실행이 있는 경우 디바운스된 함수를 즉시 실행합니다.
 *
 * @example
 * const debouncedFunction = useDebounce(callback, 1000);
 * debouncedFunction(); // 1초 후에 함수가 실행됩니다
 *
 * @example
 * // AbortSignal 사용 예시
 * const controller = new AbortController();
 * const signal = controller.signal;
 * const debouncedWithSignal = useDebounce(callback, 1000, { signal });
 *
 * debouncedWithSignal();
 *
 * // 디바운스된 함수 호출을 즉시 실행합니다
 * controller.abort();
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
      ...(typeof maxWait === 'number' && { maxWait }),
    });
  }, [callbackAction, wait, signal, leading, trailing, maxWait]);

  // 언마운트 시 디바운스 된 함수의 보류 중인 호출을 모두 버립니다.
  useUnmount(() => debounced.cancel());

  return debounced;
}
