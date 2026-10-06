import { useCallback, useEffect, useState } from 'react';

import { usePreservedCallback } from '../usePreservedCallback';
import { useDidUpdateEffect } from '../useDidUpdateEffect';
import { useVisibilityChange } from '../useVisibilityChange';
import {
  type TimerState,
  getInitialRemainingMs,
  isDocumentHidden,
  pauseTimer,
  resumeTimer,
  toSafeMs,
  toTimestamp,
  toIntervalMs,
} from './useTimer.utils';

interface UseTimerBaseOptions {
  /** 남은 시간을 갱신하는 간격(ms). 화면 갱신 주기만 결정하며 정확도와는 무관합니다. 기본값 `1000` */
  intervalMs?: number;
  onTick?: (remainingMs: number) => void;
  onComplete?: () => void;
}

interface UseTimerWithDurationMsOptions extends UseTimerBaseOptions {
  /** 타이머 시간(ms) */
  durationMs: number;
  /** durationMs 을 사용하면 endAt을 사용할 수 없습니다. */
  endAt?: never;
  autoStart?: boolean;
  pauseOnHidden?: boolean;
}

interface UseTimerWithEndAtOptions extends UseTimerBaseOptions {
  /** 종료 시각 (timestamp 또는 Date). 값이 바뀌면 새 종료 시각으로 다시 맞춥니다. `null` / `undefined` 이면 대기합니다. */
  endAt: number | Date | null | undefined;
  /** endAt 을 사용하면 durationMs 를 사용할 수 없습니다. */
  durationMs?: never;
  /** 마운트 시 항상 바로 시작하므로 사용할 수 없습니다. */
  autoStart?: never;
  /** 절대 시각인 `endAt` 은 멈출 수 없으므로 사용할 수 없습니다. */
  pauseOnHidden?: never;
}

interface UseTimerReturnType {
  remainingMs: number;
  hours: number;
  minutes: number;
  seconds: number;
  isRunning: boolean;
  isComplete: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  addTime: (ms: number) => void;
}

type UseTimerEndAtReturnType = Pick<
  UseTimerReturnType,
  'remainingMs' | 'hours' | 'minutes' | 'seconds' | 'isComplete'
>;

/**
 * @description 지정한 시간(ms)만큼 동작하는 타이머 훅입니다.
 *
 * tick 수를 세는 `useCountdown` 과 달리 종료 시각과 현재 시각의 차이로 남은 시간을 계산합니다.
 *
 * 기본적으로 백그라운드에 있던 시간도 흐른 것으로 계산합니다. (50분 남은 상태로 10분 뒤 돌아오면 40분)
 * 화면을 보고 있을 때만 시간이 흘러야 한다면 `pauseOnHidden` 을 사용합니다.
 *
 * SSR 에서는 서버와 클라이언트의 현재 시각이 달라 hydration 경고가 날 수 있으므로, `useIsClient` 로 클라이언트에서만 렌더링하는 것을 권장합니다.
 *
 * @param {UseTimerWithDurationMsOptions} options - 타이머 설정
 * @param {number} options.durationMs - 타이머 시간(ms). 소수는 정수부만 사용합니다.
 * @param {boolean} [options.autoStart=false] - 마운트 시 바로 시작할지 여부
 * @param {boolean} [options.pauseOnHidden=false] - 실행 중에 화면이 숨겨지면 멈추고, 다시 보이면 남은 시간부터 이어서 진행합니다.
 * @param {number} [options.intervalMs=1000] - 남은 시간을 갱신하는 간격(ms)
 * @param {Function} [options.onTick] - 남은 시간이 갱신될 때마다 남은 시간(ms)을 인자로 호출됩니다.
 * @param {Function} [options.onComplete] - 실행 중에 남은 시간이 0이 되면 호출됩니다.
 *
 * @returns {UseTimerReturnType} 남은 시간과 상태, 제어 함수들을 담은 객체
 * - `remainingMs`: 남은 시간(ms)
 * - `hours`: 남은 시간의 시 단위. 24 이상이 될 수 있습니다.
 * - `minutes`: 남은 시간의 분 단위 (0~59)
 * - `seconds`: 남은 시간의 초 단위 (0~59). 1초 미만이 남으면 1로 올림합니다.
 * - `isRunning`: 타이머가 실행 중인지 여부
 * - `isComplete`: 남은 시간이 0인지 여부
 * - `start`: 타이머를 시작합니다. 일시정지 상태였다면 남은 시간부터 이어서 진행합니다.
 * - `pause`: 타이머를 일시정지합니다. 남은 시간은 유지됩니다.
 * - `reset`: 타이머를 멈추고 남은 시간을 `durationMs` 로 되돌립니다.
 * - `addTime`: 남은 시간에 `ms`만큼 누적합니다. 0 아래로는 내려가지 않으며, 소수는 정수부만 사용하고 `NaN` / `Infinity` 는 무시합니다.
 *
 * @example
 * // 1시간 타이머
 * const { hours, minutes, seconds, start, pause, addTime } = useTimer({
 *   durationMs: 60 * 60 * 1000,
 *   onComplete: () => alert('끝'),
 * });
 *
 * start();
 * addTime(10 * 60 * 1000); // +10분
 *
 * @example
 * // 백그라운드에서는 멈추고, 돌아오면 남은 시간부터 이어서 진행
 * const { minutes, seconds } = useTimer({
 *   durationMs: 10 * 60 * 1000,
 *   autoStart: true,
 *   pauseOnHidden: true,
 * });
 */
export function useTimer(
  options: UseTimerWithDurationMsOptions
): UseTimerReturnType;

/**
 * @description 종료 시각(`endAt`)까지 남은 시간을 계산하는 타이머 훅입니다.
 *
 * 마운트 시 바로 시작하며, 종료 시각과 현재 시각의 차이로 남은 시간을 계산하므로 백그라운드 탭에서 돌아와도 실제 남은 시간이 표시됩니다.
 * 마감 시각은 서버가 정하는 값이므로 시작(`start`)·일시정지(`pause`) 등의 제어 함수는 제공하지 않으며, 마감이 바뀌면 새 `endAt` 을 전달합니다.
 *
 * SSR 에서는 서버와 클라이언트의 현재 시각이 달라 hydration 경고가 날 수 있으므로, `useIsClient` 로 클라이언트에서만 렌더링하는 것을 권장합니다.
 *
 * @param {UseTimerWithEndAtOptions} options - 타이머 설정
 * @param {number | Date | null | undefined} options.endAt - 종료 시각. 값이 바뀌면 새 종료 시각으로 다시 맞춥니다. 데이터를 불러오는 중처럼 `null` / `undefined` 이거나 유효하지 않은 값이면 멈춘 채 대기합니다.
 * @param {number} [options.intervalMs=1000] - 남은 시간을 갱신하는 간격(ms)
 * @param {Function} [options.onTick] - 남은 시간이 갱신될 때마다 남은 시간(ms)을 인자로 호출됩니다.
 * @param {Function} [options.onComplete] - 남은 시간이 0이 되면 호출됩니다. 마운트 시 이미 지난 `endAt` 이거나 대기 상태(`null` / `undefined`)로 바뀐 경우에는 호출되지 않습니다.
 *
 * @returns {UseTimerEndAtReturnType} 남은 시간을 담은 객체
 * - `remainingMs`: 남은 시간(ms)
 * - `hours`: 남은 시간의 시 단위. 24 이상이 될 수 있습니다.
 * - `minutes`: 남은 시간의 분 단위 (0~59)
 * - `seconds`: 남은 시간의 초 단위 (0~59). 1초 미만이 남으면 1로 올림합니다.
 * - `isComplete`: 종료 시각에 도달했는지 여부. 대기 상태에서는 `false` 입니다.
 *
 * @example
 * // 서버에서 내려준 마감시각까지 남은 시간
 * const { hours, minutes, seconds, isComplete } = useTimer({
 *   endAt: new Date(serverEndAt),
 *   onComplete: () => refetch(),
 * });
 *
 * @example
 * // 데이터를 불러오는 동안은 대기하고, endAt 이 들어오면 바로 시작
 * const { data: auction } = useAuctionQuery(id);
 * const { minutes, seconds } = useTimer({ endAt: auction?.endAt });
 */
export function useTimer(
  options: UseTimerWithEndAtOptions
): UseTimerEndAtReturnType;

export function useTimer(
  options: UseTimerWithDurationMsOptions | UseTimerWithEndAtOptions
): UseTimerReturnType {
  const { onTick: onTickProp, onComplete: onCompleteProp } = options;
  const intervalMs = toIntervalMs(options.intervalMs);
  // endAt 이 null 이어도 endAt 모드(대기 상태)이므로, 모드는 durationMs 유무로 구분합니다.
  const durationMs =
    options.durationMs == null ? undefined : toSafeMs(options.durationMs);
  const isEndAtMode = durationMs === undefined;
  const endAt = options.endAt != null ? toTimestamp(options.endAt) : null;
  const isPending = isEndAtMode && endAt === null;

  const autoStart = isEndAtMode || (options.autoStart ?? false);
  const pauseOnHidden = !isEndAtMode && (options.pauseOnHidden ?? false);

  const onTick = usePreservedCallback(onTickProp);
  const onComplete = usePreservedCallback(onCompleteProp);

  const createInitialState = (current: number): TimerState => {
    const remainingMs = getInitialRemainingMs(durationMs, endAt, current);
    const shouldRun = autoStart && remainingMs > 0;

    // 백그라운드 탭에서 마운트되면 처음 보일 때 시작합니다.
    if (shouldRun && pauseOnHidden && isDocumentHidden()) {
      return { endAt: null, remainingMs, pausedByHidden: true };
    }

    return {
      endAt: shouldRun ? current + remainingMs : null,
      remainingMs,
      pausedByHidden: false,
    };
  };

  const [now, setNow] = useState(() => Date.now());
  const [timer, setTimer] = useState(() => createInitialState(now));

  const isRunning = timer.endAt !== null;
  const remainingMs =
    timer.endAt !== null ? Math.max(0, timer.endAt - now) : timer.remainingMs;

  // endAt 이 바뀌면 새 종료 시각으로 다시 맞춥니다.
  useDidUpdateEffect(() => {
    const current = Date.now();
    const nextTimer = createInitialState(current);

    setNow(current);
    setTimer(nextTimer);

    // 실행 중에 새 endAt 이 이미 지났다면 완료로 처리합니다. (대기 상태로 바뀐 경우는 제외)
    if (endAt !== null && timer.endAt !== null && nextTimer.remainingMs <= 0) {
      onComplete();
    }
  }, [endAt]);

  // 실행 중에 남은 시간이 0이 되면 멈추고 완료 콜백을 호출합니다.
  useEffect(() => {
    if (isRunning && remainingMs <= 0) {
      setTimer({ endAt: null, remainingMs: 0, pausedByHidden: false });
      onComplete();
    }
  }, [isRunning, remainingMs, onComplete]);

  /** 현재 시각을 읽어 `now` 와 `timer` 를 함께 갱신합니다. */
  const updateTimer = useCallback(
    (updater: (prev: TimerState, current: number) => TimerState) => {
      const current = Date.now();
      setNow(current);
      setTimer((prev) => updater(prev, current));
    },
    []
  );

  const start = useCallback(() => {
    updateTimer((prev, current) => {
      if (prev.endAt !== null || prev.remainingMs <= 0) {
        return prev;
      }

      // 숨겨진 상태에서 시작하면 hide 이벤트가 다시 오지 않으므로, 처음 보일 때 시작하도록 대기합니다.
      if (pauseOnHidden && isDocumentHidden()) {
        return { ...prev, pausedByHidden: true };
      }

      return resumeTimer(prev, current);
    });
  }, [updateTimer, pauseOnHidden]);

  const pause = useCallback(() => {
    updateTimer((prev, current) => {
      if (prev.endAt !== null) {
        return pauseTimer(prev.endAt, current, false);
      }

      // 숨겨져서 멈춘 상태에서 호출하면, 다시 보여도 이어서 실행하지 않도록 플래그를 해제합니다.
      return prev.pausedByHidden ? { ...prev, pausedByHidden: false } : prev;
    });
  }, [updateTimer]);

  const reset = useCallback(() => {
    updateTimer((_, current) => ({
      endAt: null,
      remainingMs: getInitialRemainingMs(durationMs, endAt, current),
      pausedByHidden: false,
    }));
  }, [updateTimer, durationMs, endAt]);

  const addTime = useCallback(
    (ms: number) => {
      if (!Number.isFinite(ms)) return;

      const amount = Math.trunc(ms);

      updateTimer((prev, current) =>
        prev.endAt !== null
          ? { ...prev, endAt: Math.max(current, prev.endAt + amount) }
          : { ...prev, remainingMs: Math.max(0, prev.remainingMs + amount) }
      );
    },
    [updateTimer]
  );

  useEffect(() => {
    const timerEndAt = timer.endAt;

    if (timerEndAt === null) return;

    let timeoutId: number;

    const scheduleTick = () => {
      const remaining = Math.max(0, timerEndAt - Date.now());
      const delay = remaining === 0 ? 0 : remaining % intervalMs || intervalMs;

      timeoutId = window.setTimeout(() => {
        const current = Date.now();
        const nextRemaining = Math.max(0, timerEndAt - current);

        setNow(current);
        onTick(nextRemaining);

        if (nextRemaining > 0) {
          scheduleTick();
        }
      }, delay);
    };

    scheduleTick();

    return () => window.clearTimeout(timeoutId);
  }, [timer.endAt, intervalMs, onTick]);

  useVisibilityChange({
    onHide: () => {
      if (!pauseOnHidden) return;

      updateTimer((prev, current) =>
        prev.endAt !== null ? pauseTimer(prev.endAt, current, true) : prev
      );
    },
    // 숨겨져서 멈췄다면 이어서 실행하고, 아니면 다음 tick 을 기다리지 않고 바로 남은 시간을 맞춥니다.
    onShow: () => {
      updateTimer((prev, current) =>
        prev.pausedByHidden ? resumeTimer(prev, current) : prev
      );
    },
    enabled: isRunning || timer.pausedByHidden,
  });

  const totalSeconds = Math.ceil(remainingMs / 1000);

  return {
    remainingMs,
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isRunning,
    isComplete: !isPending && remainingMs <= 0,
    start,
    pause,
    reset,
    addTime,
  };
}
