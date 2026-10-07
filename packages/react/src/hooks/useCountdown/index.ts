import { clamp } from '@modern-kit/utils';
import { useCallback, useState } from 'react';

import { useCounter } from '../useCounter';
import { useInterval } from '../useInterval';
import { usePreservedCallback } from '../usePreservedCallback';
import { useVisibilityChange } from '../useVisibilityChange';

const isDocumentHidden = () =>
  typeof document !== 'undefined' && document.visibilityState === 'hidden';

interface UseCountdownOptions {
  countStart: number;
  countStop?: number;
  intervalMs?: number;
  onComplete?: (count: number) => void;
  onTick?: (count: number) => void;
  pauseOnHidden?: boolean;
}

interface UseCountdownReturnType {
  count: number;
  isComplete: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  restart: () => void;
  addCount: (amount: number) => void;
}

/**
 * @description 지정한 간격으로 값을 감소시키는 카운트다운 훅입니다.
 * `countStop`에 도달하면 자동으로 멈춥니다.
 *
 * tick 수를 세는 방식이라 백그라운드 탭에서는 브라우저가 타이머를 늦추거나 멈춰 카운트가 정확하지 않습니다.
 * 화면을 보고 있을 때만 줄어들어야 한다면 `pauseOnHidden` 을, 실제 시각과 맞아야 한다면 `useTimer` 를 사용합니다.
 *
 * @param {UseCountdownOptions} options - 카운트다운 설정
 * @param {number} options.countStart - 카운트다운 시작 값. 소수는 정수부만 사용됩니다.
 * @param {number} [options.countStop=0] - 카운트다운이 멈출 값. 소수는 정수부만 사용됩니다.
 * @param {number} [options.intervalMs=1000] - 카운트 간격(ms)
 * @param {(count: number) => void} [options.onComplete] - 카운트다운이 `countStop`에 도달했을 때 그 값(`countStop`)을 인자로 호출됩니다.
 * @param {(count: number) => void} [options.onTick] - 카운트다운이 감소할 때마다 매 tick, 이번 tick의 결과값을 인자로 호출됩니다.
 * @param {boolean} [options.pauseOnHidden=false] - 실행 중에 화면이 숨겨지면 멈추고, 다시 보이면 이어서 진행합니다.
 * @returns {UseCountdownReturnType} 현재 카운트 값과 상태, 제어 함수들을 담은 객체.
 * - `count`: 현재 카운트 값
 * - `isComplete`: `countStop`에 도달했는지 여부
 * - `start`: 카운트다운 시작
 * - `pause`: 카운트다운 일시정지 (현재 카운트 유지)
 * - `reset`: 멈춤 + 시작 값으로 리셋
 * - `restart`: 시작 값으로 리셋 + 바로 시작. 완료된 뒤에도 다시 시작할 수 있습니다.
 * - `addCount`: 현재 카운트에 값을 누적
 *
 * @example
 * // 1초(intervalMs)마다 1씩 줄어드는 60초 카운트다운
 * const { count, isComplete, start, addCount } = useCountdown({
 *   countStart: 60,
 *   onComplete: (count) => console.log('done', count), // count === countStop
 *   onTick: (count) => console.log('tick', count),      // 이번 tick 결과값
 * });
 *
 * start();     // 60 → 59 ... 0 에서 자동 정지 후 onComplete 호출
 * addCount(5); // 현재 카운트에 5 누적 (+5초 버튼)
 *
 * @example
 * // 백그라운드 탭에서 일시정지되는 60초 카운트다운 예제
 * const { count, isComplete, start, addCount } = useCountdown({
 *   countStart: 60,
 *   pauseOnHidden: true, // 브라우저 탭이 백그라운드로 가면 일시정지
 *   onComplete: (count) => console.log('done', count), // count === countStop
 *   onTick: (count) => console.log('tick', count),      // 이번 tick 결과값
 * });
 */
export function useCountdown({
  countStart,
  countStop = 0,
  intervalMs = 1000,
  onComplete: onCompleteProp,
  onTick: onTickProp,
  pauseOnHidden = false,
}: UseCountdownOptions): UseCountdownReturnType {
  // 소수 경계값은 count 가 countStop 에 정확히 도달하지 못하게 하므로 정수로 맞춥니다.
  const startCount = Math.trunc(countStart);
  const stopCount = Math.trunc(countStop);

  const onComplete = usePreservedCallback(onCompleteProp);
  const onTick = usePreservedCallback(onTickProp);

  const {
    counter: count,
    decrement,
    reset: resetCounter,
    setCounter,
  } = useCounter(startCount);

  const [isCountdownRunning, setCountdownRunning] = useState(false);
  const [isPausedByHidden, setPausedByHidden] = useState(false);

  const checkIsComplete = useCallback(
    (value: number) => value <= stopCount,
    [stopCount]
  );

  const start = useCallback(() => {
    if (pauseOnHidden && isDocumentHidden()) {
      setPausedByHidden(true);
      return;
    }

    setPausedByHidden(false);
    setCountdownRunning(true);
  }, [pauseOnHidden, setCountdownRunning]);

  const pause = useCallback(() => {
    setPausedByHidden(false);
    setCountdownRunning(false);
  }, [setCountdownRunning]);

  const reset = useCallback(() => {
    pause();
    resetCounter();
  }, [pause, resetCounter]);

  const countdownCallback = useCallback(() => {
    // 이미 멈출 값에 도달했으면 정지만 하고 종료합니다.
    if (checkIsComplete(count)) {
      pause();
      return;
    }

    decrement();
    const next = count - 1;
    onTick(next);

    // 이번 tick 으로 countStop 에 도달하면 멈추고 완료 콜백을 호출합니다.
    if (checkIsComplete(next)) {
      pause();
      onComplete(next);
    }
  }, [count, decrement, checkIsComplete, pause, onTick, onComplete]);

  const addCount = useCallback(
    (amount: number) => {
      // 소수 입력은 정수부만 누적하고, countStop 아래로는 내려가지 않게 클램프합니다.
      setCounter((prev) =>
        clamp(prev + Math.trunc(amount), stopCount, Infinity)
      );
    },
    [stopCount, setCounter]
  );

  const { reset: resetInterval } = useInterval(countdownCallback, {
    delay: intervalMs,
    enabled: isCountdownRunning,
  });

  const restart = useCallback(() => {
    resetCounter();

    // 실행 중이면 interval 을 새로 맞춰, 첫 감소까지 intervalMs 를 온전히 기다리게 합니다.
    if (isCountdownRunning) {
      resetInterval();
      return;
    }

    start();
  }, [isCountdownRunning, resetCounter, resetInterval, start]);

  useVisibilityChange({
    onHide: () => {
      if (!isCountdownRunning) return;

      setCountdownRunning(false);
      setPausedByHidden(true);
    },
    onShow: () => {
      if (!isPausedByHidden) return;

      setPausedByHidden(false);
      setCountdownRunning(true);
    },
    enabled: (pauseOnHidden && isCountdownRunning) || isPausedByHidden,
  });

  return {
    count,
    isComplete: checkIsComplete(count),
    start,
    pause,
    reset,
    restart,
    addCount,
  };
}
