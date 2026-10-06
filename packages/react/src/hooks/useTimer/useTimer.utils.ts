export interface TimerState {
  endAt: number | null;
  remainingMs: number;
  pausedByHidden: boolean;
}

/** 실행 중인 타이머를 멈추고, 종료 시각(`endAt`)까지 남은 시간을 보존합니다. */
export const pauseTimer = (
  endAt: number,
  current: number,
  pausedByHidden: boolean
): TimerState => ({
  endAt: null,
  remainingMs: Math.max(0, endAt - current),
  pausedByHidden,
});

/** 보존한 남은 시간부터 타이머를 다시 실행합니다. */
export const resumeTimer = (prev: TimerState, current: number): TimerState => ({
  endAt: current + prev.remainingMs,
  remainingMs: prev.remainingMs,
  pausedByHidden: false,
});

const DEFAULT_INTERVAL_MS = 1000;

/** 갱신 간격을 정수로 맞춥니다. 1 미만이거나 유효하지 않은 값이면 기본값(`1000`)을 사용합니다. */
export const toIntervalMs = (intervalMs: number | undefined) =>
  intervalMs !== undefined && Number.isFinite(intervalMs) && intervalMs >= 1
    ? Math.trunc(intervalMs)
    : DEFAULT_INTERVAL_MS;

/** ms 값을 정수로 맞춥니다. 소수는 정수부만 사용하고, `NaN` / `Infinity` 는 0 으로 처리합니다. */
export const toSafeMs = (ms: number) =>
  Number.isFinite(ms) ? Math.trunc(ms) : 0;

/** `number` 또는 `Date` 를 정수 `timestamp` 로 변환합니다. 유효하지 않은 값이면 `null` 을 반환합니다. */
export const toTimestamp = (value: number | Date) => {
  const timestamp = value instanceof Date ? value.getTime() : value;

  return Number.isFinite(timestamp) ? Math.trunc(timestamp) : null;
};

/** document가 숨겨져 있는지 여부를 반환합니다. */
export const isDocumentHidden = () =>
  typeof document !== 'undefined' && document.visibilityState === 'hidden';

/** 초기 남은 시간을 계산합니다. */
export const getInitialRemainingMs = (
  durationMs: number | undefined,
  endAt: number | null,
  now: number
) => Math.max(0, endAt !== null ? endAt - now : (durationMs ?? 0));
