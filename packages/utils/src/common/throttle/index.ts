import { debounce } from '../debounce';

interface ThrottleOptions {
  signal?: AbortSignal;
  leading?: boolean;
  trailing?: boolean;
}

interface ThrottledFunction<F extends (...args: any[]) => void> {
  (...args: Parameters<F>): void;
  cancel: () => void;
  flush: () => void;
}

/**
 * @description 스로틀링된 함수를 생성합니다.
 *
 * 스로틀링된 함수는 첫 번째 호출은 즉시 실행 되고, 이후 지연 시간(`wait` 밀리초) 간격으로만 실행됩니다.
 * 지정된 시간 간격마다 최대 한 번만 실행하여 호출 빈도를 제한합니다.
 *
 * @param {F} func - 스로틀링할 함수입니다.
 * @param {number} wait - 스로틀링 간격(밀리초)입니다.
 * @param {ThrottleOptions} options - 스로틀링 옵션입니다.
 * @param {AbortSignal} options.signal - 스로틀링 취소를 위한 AbortSignal입니다.
 * @param {boolean} options.leading - 첫 번째 호출을 실행할지 여부입니다.
 * @param {boolean} options.trailing - 마지막 호출을 실행할지 여부입니다.
 *
 * @returns {ThrottledFunction<F>} `cancel` 메서드가 포함된 새로운 스로틀링된 함수를 반환합니다.
 * - `cancel` 메서드는 스로틀링된 함수의 대기 중인 실행을 취소합니다.
 * - `flush` 메서드는 대기 중인 실행이 있는 경우 스로틀링된 함수를 즉시 실행합니다.
 *
 * @example
 * const throttled = throttle(func, 1000);
 * throttled(); // 즉시 실행
 * throttled(); // 이후 호출은 지연 시간 간격으로 실행됩니다.
 *
 * @example
 * // AbortSignal 사용 예시
 * const controller = new AbortController();
 * controller.abort(); // 스로틀링된 함수 호출을 취소합니다.
 *
 * const throttled = throttle(func, 1000, { signal: controller.signal });
 * throttled(); // 호출되지 않습니다.
 */
export function throttle<F extends (...args: any[]) => void>(
  func: (...args: any[]) => void,
  wait: number,
  options: ThrottleOptions = {}
): ThrottledFunction<F> {
  const { signal, leading = true, trailing = true } = options;
  const debounced = debounce(func, wait, { signal, leading, trailing });

  let pendingAt: number | null = null;

  const throttled = function (...args: Parameters<F>) {
    const now = Date.now();

    if (pendingAt == null) {
      pendingAt = now;
    } else {
      if (now - pendingAt >= wait) {
        pendingAt = now;
        debounced.cancel();
      }
    }
    debounced(...args);
  };

  throttled.cancel = debounced.cancel;
  throttled.flush = debounced.flush;

  return throttled;
}
