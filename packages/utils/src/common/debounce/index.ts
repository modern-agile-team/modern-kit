interface DebounceOptions {
  signal?: AbortSignal;
  maxWait?: number;
  leading?: boolean;
  trailing?: boolean;
}

interface DebouncedFunction<F extends (...args: any[]) => void> {
  (...args: Parameters<F>): void;
  cancel: () => void;
  flush: () => void;
}

/**
 * @description 디바운스된 함수를 생성합니다.
 *
 * 디바운스된 함수는 마지막으로 호출된 시점으로부터 `wait` 밀리초가 경과할 때까지 제공된 함수의 실행을 지연시킵니다.
 * - 연속 호출 시 이전 호출은 취소되고 새로운 타이머가 시작됩니다.
 *
 * @template F - 함수의 타입입니다.
 * @param {F} func - 디바운스할 함수입니다.
 * @param {number} wait - 지연시킬 시간(밀리초)입니다.
 * @param {DebounceOptions} options - 옵션 객체입니다.
 * @param {number} options.maxWait - 최대 대기 시간(밀리초)입니다.
 * @param {boolean} options.leading - 첫 번째 호출을 실행할지 여부입니다.
 * @param {boolean} options.trailing - 마지막 호출을 실행할지 여부입니다.
 * @param {AbortSignal} options.signal - 디바운스된 함수를 취소하기 위한 선택적 AbortSignal입니다.
 *
 * @returns {DebouncedFunction<F>} `cancel` 메서드가 포함된 새로운 디바운스된 함수를 반환합니다.
 * - `cancel` 메서드는 디바운스된 함수의 대기 중인 실행을 취소합니다.
 * - `flush` 메서드는 대기 중인 실행이 있는 경우 디바운스된 함수를 즉시 실행합니다.
 *
 * @example
 * const debouncedFunction = debounce(func, 1000);
 * debouncedFunction(); // 1초 후에 함수가 실행됩니다
 *
 * @example
 * // AbortSignal 사용 예시
 * const controller = new AbortController();
 * const signal = controller.signal;
 * const debouncedWithSignal = debounce(func, 1000, { signal });
 *
 * debouncedWithSignal();
 *
 * // 디바운스된 함수 호출을 취소합니다
 * controller.abort();
 */
export function debounce<F extends (...args: any[]) => void>(
  func: F,
  wait: number,
  options: DebounceOptions = {}
): DebouncedFunction<F> {
  let pendingThis: any = undefined;
  let pendingArgs: Parameters<F> | null = null;
  let pendingAt: number | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const { signal, leading = false, trailing = true, maxWait } = options;

  /**
   * @description 대기 중인 함수를 실행합니다.
   *
   * pendingArgs가 존재하는 경우에만 함수를 실행하고(즉, debounced 함수가 호출된 경우), 실행 후에는 관련 상태를 초기화합니다.
   */
  const invoke = () => {
    if (pendingArgs != null) {
      func.apply(pendingThis, pendingArgs);
      pendingThis = undefined;
      pendingArgs = null;
    }
  };

  /**
   * @description 타이머가 종료될 때 호출되는 함수입니다.
   *
   * trailing 옵션이 true인 경우 대기 중인 함수를 실행하고, 모든 상태를 초기화합니다.
   */
  const onTimerEnd = () => {
    if (trailing) {
      invoke();
    }
    cancel();
  };

  /**
   * @description 다음 디바운스 실행까지의 대기 시간을 계산합니다.
   *
   * maxWait 옵션은 함수가 실행되지 않고 대기할 수 있는 최대 시간을 제한합니다.
   * 예를 들어, wait이 100ms이고 maxWait이 300ms인 경우:
   * - 연속적인 호출이 발생하더라도 첫 호출로부터 300ms가 지나면 강제로 함수가 실행됩니다
   * - 이는 함수가 너무 오랫동안 실행되지 않는 것을 방지합니다
   *
   * @returns {number | undefined} 다음 실행까지 대기할 시간(ms) 또는 undefined
   */
  const getWaitTime = (): number | undefined => {
    if (typeof maxWait === 'number' && pendingAt != null) {
      const timeSinceFirstCall = Date.now() - pendingAt;
      const remainingMaxWait = maxWait - timeSinceFirstCall;

      if (remainingMaxWait <= 0) {
        onTimerEnd();
        return;
      }

      return Math.min(wait, remainingMaxWait);
    }

    return wait;
  };

  /**
   * @description 디바운스 타이머를 스케줄링합니다.
   *
   * 기존 타이머가 있다면 취소하고, 새로운 타이머를 설정합니다.
   * getWaitTime()을 통해 계산된 대기 시간 후에 onTimerEnd를 실행합니다.
   */
  const schedule = () => {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }

    const waitTime = getWaitTime();

    timeoutId = setTimeout(() => {
      timeoutId = null;
      onTimerEnd();
    }, waitTime);
  };

  /**
   * @description 현재 실행 중인 타이머를 취소합니다.
   *
   * 타이머가 존재하는 경우 clearTimeout으로 취소하고
   * timeoutId를 null로 초기화합니다.
   */
  const cancelTimer = () => {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  /**
   * @description 디바운스된 함수를 취소합니다.
   */
  const cancel = () => {
    cancelTimer();
    pendingThis = undefined;
    pendingArgs = null;
    pendingAt = null;
  };

  /**
   * @description 디바운스된 함수를 즉시 실행합니다. 이때, 타이머를 취소하고, 대기 중인 함수를 실행합니다.
   */
  const flush = () => {
    cancelTimer();
    invoke();
    pendingAt = null;
  };

  const debounced = function (this: any, ...args: Parameters<F>) {
    if (signal?.aborted) {
      return;
    }

    pendingThis = this;
    pendingArgs = args;

    const isFirstCall = timeoutId == null;

    if (isFirstCall) {
      pendingAt = Date.now();
    }

    schedule();

    if (leading && isFirstCall) {
      invoke();
    }
  };

  debounced.cancel = cancel;
  debounced.flush = flush;

  signal?.addEventListener('abort', cancel, { once: true });

  return debounced;
}
