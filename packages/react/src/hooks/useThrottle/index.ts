import { useMemo } from 'react';
import { throttle } from '@modern-kit/utils';
import { useUnmount } from '../useUnmount';
import { usePreservedCallback } from '../usePreservedCallback';

export type ThrottleParameters = Parameters<typeof throttle>;
export type ThrottleReturnType<T extends ThrottleParameters[0]> = ReturnType<
  typeof throttle<T>
>;

throttle;
/**
 * @description 주어진 콜백 함수를 지정된 시간 동안 쓰로틀링 처리하여 특정 시간 동안 반복 호출을 방지하는 훅입니다.
 *
 * @param {ThrottleParameters[0]} callback - 쓰로틀링할 콜백 함수입니다.
 * @param {ThrottleParameters[1]} wait - 쓰로틀이 적용될 시간(ms)입니다.
 * @param {ThrottleParameters[2]} [options={}] - 쓰로틀 동작에 영향을 주는 추가 옵션입니다.
 * - `signal` 옵션을 통해 쓰로틀링 된 함수를 중단할 수 있습니다.
 * - `leading` 옵션을 통해 초기 호출을 실행할지 여부를 설정할 수 있습니다.
 * - `trailing` 옵션을 통해 마지막 호출을 실행할지 여부를 설정할 수 있습니다.
 *
 * @returns {ThrottleReturnType<T>} 쓰로틀링 된 함수가 반환됩니다.
 *
 * @example
 * const throttledFunction = useThrottle(callback, 300);
 * throttledFunction(); // 쓰로틀링 된 콜백이 실행됩니다.
 *
 * @example
 * // AbortSignal 사용 예시
 * const controller = new AbortController();
 * controller.abort(); // 쓰로틀링된 함수 호출을 취소합니다.
 *
 * const throttled = useThrottle(callback, 300, { signal: controller.signal });
 * throttled(); // 호출되지 않습니다.
 */
export function useThrottle<T extends ThrottleParameters[0]>(
  callback: T,
  wait: ThrottleParameters[1],
  options: ThrottleParameters[2] = {}
): ThrottleReturnType<T> {
  const callbackAction = usePreservedCallback(callback);
  const { signal, leading = true, trailing = true } = options ?? {};

  const throttled = useMemo(() => {
    return throttle(callbackAction, wait, { signal, leading, trailing });
  }, [callbackAction, wait, signal, leading, trailing]);

  // 언마운트 시 쓰로틀 된 함수의 보류 중인 호출을 모두 버립니다.
  useUnmount(() => throttled.cancel());

  return throttled;
}
