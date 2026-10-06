import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  onTestFinished,
  expectTypeOf,
} from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useTimer } from '.';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
});

afterEach(() => {
  vi.useRealTimers();
});

/** interval 이 실행되지 않은 채 시간만 흐른 상황(백그라운드 탭 등)을 만듭니다. */
const passTimeWithoutTick = (ms: number) => {
  vi.setSystemTime(Date.now() + ms);
};

const mockVisibility = (state: DocumentVisibilityState) => {
  const spy = vi
    .spyOn(document, 'visibilityState', 'get')
    .mockReturnValue(state);
  onTestFinished(() => spy.mockRestore());
};

/** 화면 표시 상태를 바꾸고 visibilitychange 이벤트를 발생시킵니다. */
const changeVisibility = (state: DocumentVisibilityState) => {
  mockVisibility(state);

  act(() => {
    document.dispatchEvent(new Event('visibilitychange'));
  });
};

describe('useTimer', () => {
  it('모드에 맞지 않는 옵션은 함께 사용할 수 없고, endAt 모드는 제어 함수를 제공하지 않아야 합니다.', () => {
    renderHook(() =>
      // @ts-expect-error durationMs 와 endAt 은 동시에 전달할 수 없습니다.
      useTimer({ durationMs: HOUR, endAt: Date.now() + HOUR })
    );
    renderHook(() =>
      // @ts-expect-error endAt 은 항상 바로 시작하므로 autoStart 를 받지 않습니다.
      useTimer({ endAt: Date.now() + HOUR, autoStart: false })
    );
    renderHook(() =>
      // @ts-expect-error 절대 시각인 endAt 은 멈출 수 없습니다.
      useTimer({ endAt: Date.now() + HOUR, pauseOnHidden: true })
    );

    const { result } = renderHook(() => useTimer({ endAt: Date.now() + HOUR }));

    expectTypeOf(result.current).not.toHaveProperty('start');
    expectTypeOf(result.current).not.toHaveProperty('pause');
    expectTypeOf(result.current).not.toHaveProperty('reset');
    expectTypeOf(result.current).not.toHaveProperty('addTime');
  });

  describe('durationMs', () => {
    it('기본적으로 시작하지 않고, start하면 남은 시간과 시/분/초가 줄어들어야 합니다.', () => {
      const { result } = renderHook(() => useTimer({ durationMs: HOUR }));

      act(() => vi.advanceTimersByTime(5 * SECOND));

      expect(result.current).toMatchObject({
        remainingMs: HOUR,
        hours: 1,
        minutes: 0,
        seconds: 0,
        isRunning: false,
      });

      act(() => result.current.start());
      act(() => vi.advanceTimersByTime(SECOND));

      expect(result.current).toMatchObject({
        remainingMs: HOUR - SECOND,
        hours: 0,
        minutes: 59,
        seconds: 59,
        isRunning: true,
      });
    });

    it('autoStart가 true이면 마운트 시 바로 시작해야 합니다.', () => {
      const { result } = renderHook(() =>
        useTimer({ durationMs: HOUR, autoStart: true })
      );

      act(() => vi.advanceTimersByTime(5 * SECOND));

      expect(result.current.remainingMs).toBe(HOUR - 5 * SECOND);
    });

    it('pause하면 남은 시간이 유지되고, start하면 이어서 진행하며, reset하면 처음으로 돌아가야 합니다.', () => {
      const { result } = renderHook(() =>
        useTimer({ durationMs: HOUR, autoStart: true })
      );

      act(() => vi.advanceTimersByTime(10 * SECOND));
      act(() => result.current.pause());
      act(() => vi.advanceTimersByTime(30 * SECOND));

      expect(result.current.isRunning).toBe(false);
      expect(result.current.remainingMs).toBe(HOUR - 10 * SECOND);

      act(() => result.current.start());
      act(() => vi.advanceTimersByTime(5 * SECOND));

      expect(result.current.remainingMs).toBe(HOUR - 15 * SECOND);

      act(() => result.current.reset());

      expect(result.current.isRunning).toBe(false);
      expect(result.current.remainingMs).toBe(HOUR);
    });

    it('restart하면 실행 중이거나 완료된 뒤에도 durationMs부터 다시 시작해야 합니다.', () => {
      const onComplete = vi.fn();
      const { result } = renderHook(() =>
        useTimer({ durationMs: 3 * SECOND, autoStart: true, onComplete })
      );

      act(() => vi.advanceTimersByTime(SECOND));
      act(() => result.current.restart());

      expect(result.current.isRunning).toBe(true);
      expect(result.current.remainingMs).toBe(3 * SECOND);

      act(() => vi.advanceTimersByTime(3 * SECOND));
      expect(onComplete).toHaveBeenCalledOnce();

      act(() => result.current.restart());
      act(() => vi.advanceTimersByTime(SECOND));

      expect(result.current.isRunning).toBe(true);
      expect(result.current.remainingMs).toBe(2 * SECOND);
    });

    it('대기 중에 durationMs가 바뀌면 새 값으로 맞추고, 시작하지 않아야 합니다.', () => {
      const { result, rerender } = renderHook(
        ({ durationMs }) => useTimer({ durationMs }),
        { initialProps: { durationMs: 5 * MINUTE } }
      );

      rerender({ durationMs: 10 * MINUTE });

      expect(result.current.isRunning).toBe(false);
      expect(result.current.remainingMs).toBe(10 * MINUTE);
    });

    it('실행 중에 durationMs가 바뀌면 새 값부터 다시 시작해야 합니다.', () => {
      const { result, rerender } = renderHook(
        ({ durationMs }) => useTimer({ durationMs, autoStart: true }),
        { initialProps: { durationMs: 5 * MINUTE } }
      );

      act(() => vi.advanceTimersByTime(MINUTE));
      rerender({ durationMs: 10 * MINUTE });
      act(() => vi.advanceTimersByTime(SECOND));

      expect(result.current.isRunning).toBe(true);
      expect(result.current.remainingMs).toBe(10 * MINUTE - SECOND);
    });
  });

  describe('완료', () => {
    it('남은 시간이 0이 되면 멈추고 onComplete를 한 번 호출하며, 이후 start해도 다시 시작하지 않아야 합니다.', () => {
      const onComplete = vi.fn();
      const { result } = renderHook(() =>
        useTimer({ durationMs: 3 * SECOND, autoStart: true, onComplete })
      );

      act(() => vi.advanceTimersByTime(10 * SECOND));

      expect(result.current).toMatchObject({
        remainingMs: 0,
        isRunning: false,
        isComplete: true,
      });
      expect(onComplete).toHaveBeenCalledOnce();

      act(() => result.current.start());

      expect(result.current.isRunning).toBe(false);
      expect(onComplete).toHaveBeenCalledOnce();
    });

    it('남은 시간이 interval 경계와 맞지 않아도 정확히 0이 되는 시점에 완료되어야 합니다.', () => {
      const onComplete = vi.fn();
      const { result } = renderHook(() =>
        useTimer({
          durationMs: 61 * SECOND,
          intervalMs: MINUTE,
          autoStart: true,
          onComplete,
        })
      );

      act(() => vi.advanceTimersByTime(61 * SECOND - 1));
      expect(result.current.isComplete).toBe(false);

      act(() => vi.advanceTimersByTime(1));
      expect(result.current.isComplete).toBe(true);
      expect(onComplete).toHaveBeenCalledOnce();
    });

    it.each([undefined, 0, NaN])(
      'onTick은 intervalMs(%s, 유효하지 않으면 1000ms)마다 남은 시간을 인자로 호출되어야 합니다.',
      (intervalMs) => {
        const onTick = vi.fn();
        renderHook(() =>
          useTimer({
            durationMs: 3 * SECOND,
            intervalMs,
            autoStart: true,
            onTick,
          })
        );

        act(() => vi.advanceTimersByTime(3 * SECOND));

        expect(onTick.mock.calls).toEqual([[2 * SECOND], [SECOND], [0]]);
      }
    );
  });

  describe('addTime', () => {
    it('실행 중이거나 일시정지 중일 때 남은 시간에 정수부만 누적하고, NaN / Infinity는 무시해야 합니다.', () => {
      const { result } = renderHook(() =>
        useTimer({ durationMs: MINUTE, autoStart: true })
      );

      act(() => result.current.addTime(10 * MINUTE + 0.5));
      expect(result.current.remainingMs).toBe(11 * MINUTE);

      act(() => result.current.pause());
      act(() => result.current.addTime(MINUTE));
      expect(result.current.remainingMs).toBe(12 * MINUTE);

      act(() => result.current.addTime(NaN));
      act(() => result.current.addTime(Infinity));
      expect(result.current.remainingMs).toBe(12 * MINUTE);
    });

    it('음수로 남은 시간보다 많이 빼면 0이 되고 완료되어야 합니다.', () => {
      const onComplete = vi.fn();
      const { result } = renderHook(() =>
        useTimer({ durationMs: MINUTE, autoStart: true, onComplete })
      );

      act(() => result.current.addTime(-2 * MINUTE));

      expect(result.current.isComplete).toBe(true);
      expect(onComplete).toHaveBeenCalledOnce();
    });
  });

  it.each([
    [HOUR + 0.9, HOUR],
    [NaN, 0],
  ])('durationMs가 %s 이면 %s 로 보정해야 합니다.', (durationMs, expected) => {
    const { result } = renderHook(() => useTimer({ durationMs }));

    expect(result.current.remainingMs).toBe(expected);
  });

  describe('실제 시각 기준', () => {
    it('1초 중간에 재개해도 표시되는 초가 실제 남은 시간과 맞아야 합니다.', () => {
      const { result } = renderHook(() =>
        useTimer({ durationMs: 10 * SECOND, autoStart: true })
      );

      act(() => vi.advanceTimersByTime(1500));
      act(() => result.current.pause());
      act(() => result.current.start());

      // 남은 8500ms → 500ms 뒤 8초, 1500ms 뒤 7초
      act(() => vi.advanceTimersByTime(500));
      expect(result.current.seconds).toBe(8);

      act(() => vi.advanceTimersByTime(SECOND));
      expect(result.current.seconds).toBe(7);
    });

    it('백그라운드에 있던 시간도 흐른 것으로 계산하고, 돌아오면 바로 맞춰야 합니다.', () => {
      const { result } = renderHook(() =>
        useTimer({ durationMs: HOUR, autoStart: true })
      );

      changeVisibility('hidden');
      passTimeWithoutTick(10 * MINUTE);
      changeVisibility('visible');

      expect(result.current.remainingMs).toBe(HOUR - 10 * MINUTE);

      act(() => vi.advanceTimersByTime(SECOND));

      expect(result.current.remainingMs).toBe(HOUR - 10 * MINUTE - SECOND);
    });
  });

  describe('pauseOnHidden', () => {
    it('숨겨지면 멈추고, 숨겨진 동안 addTime한 시간까지 반영해 다시 보일 때 이어서 진행해야 합니다.', () => {
      const { result } = renderHook(() =>
        useTimer({ durationMs: HOUR, autoStart: true, pauseOnHidden: true })
      );

      act(() => vi.advanceTimersByTime(10 * SECOND));
      changeVisibility('hidden');
      passTimeWithoutTick(10 * MINUTE);
      act(() => result.current.addTime(MINUTE));

      expect(result.current.isRunning).toBe(false);
      expect(result.current.remainingMs).toBe(HOUR - 10 * SECOND + MINUTE);

      changeVisibility('visible');
      act(() => vi.advanceTimersByTime(SECOND));

      expect(result.current.isRunning).toBe(true);
      expect(result.current.remainingMs).toBe(HOUR - 11 * SECOND + MINUTE);
    });

    it.each([
      ['일시정지한 뒤 숨김·복귀', 'beforeHide'],
      ['숨겨져 멈춘 동안 일시정지', 'whileHidden'],
    ] as const)(
      '사용자가 일시정지했다면 다시 보여도 시작하지 않아야 합니다. (%s)',
      (_, pauseTiming) => {
        const { result } = renderHook(() =>
          useTimer({ durationMs: HOUR, autoStart: true, pauseOnHidden: true })
        );

        if (pauseTiming === 'beforeHide') act(() => result.current.pause());
        changeVisibility('hidden');
        if (pauseTiming === 'whileHidden') act(() => result.current.pause());
        changeVisibility('visible');

        expect(result.current.isRunning).toBe(false);
      }
    );

    it.each([
      ['숨겨진 상태에서 start', false],
      ['백그라운드 탭에서 autoStart로 마운트', true],
    ])('%s 하면 처음 보일 때 시작해야 합니다.', (_, autoStart) => {
      mockVisibility('hidden');

      const { result } = renderHook(() =>
        useTimer({ durationMs: HOUR, autoStart, pauseOnHidden: true })
      );

      if (!autoStart) act(() => result.current.start());
      passTimeWithoutTick(10 * MINUTE);

      expect(result.current.isRunning).toBe(false);

      changeVisibility('visible');

      expect(result.current.isRunning).toBe(true);
      expect(result.current.remainingMs).toBe(HOUR);
    });
  });

  describe('endAt', () => {
    it.each([
      ['timestamp', () => Date.now() + HOUR],
      ['Date', () => new Date(Date.now() + HOUR)],
    ])(
      'endAt(%s)까지 남은 시간으로 초기화되고, 바로 시작하며, 종료 시각에 도달하면 멈춰야 합니다.',
      (_, getEndAt) => {
        const endAt = getEndAt();
        const { result } = renderHook(() => useTimer({ endAt }));

        act(() => vi.advanceTimersByTime(SECOND));

        expect(result.current.remainingMs).toBe(HOUR - SECOND);
        expect(result.current.isRunning).toBe(true);

        act(() => vi.advanceTimersByTime(HOUR - SECOND));

        expect(result.current.isRunning).toBe(false);
        expect(result.current.isComplete).toBe(true);
      }
    );

    it.each([null, undefined, new Date('invalid')])(
      'endAt이 %s 이면 완료되지 않은 채 대기해야 합니다.',
      (endAt) => {
        const onComplete = vi.fn();
        const { result } = renderHook(() => useTimer({ endAt, onComplete }));

        act(() => vi.advanceTimersByTime(10 * SECOND));

        expect(result.current.remainingMs).toBe(0);
        expect(result.current.isRunning).toBe(false);
        expect(result.current.isComplete).toBe(false);
        expect(onComplete).not.toHaveBeenCalled();
      }
    );

    it('대기 중에 endAt이 들어오면 시작하고, endAt이 바뀌면 새 종료 시각으로 다시 맞춰야 합니다.', () => {
      const { result, rerender } = renderHook(
        ({ endAt }) => useTimer({ endAt }),
        { initialProps: { endAt: undefined as number | undefined } }
      );

      expect(result.current.isRunning).toBe(false);

      rerender({ endAt: Date.now() + HOUR });
      act(() => vi.advanceTimersByTime(SECOND));

      expect(result.current.isRunning).toBe(true);
      expect(result.current.remainingMs).toBe(HOUR - SECOND);

      rerender({ endAt: Date.now() + 2 * HOUR });
      act(() => vi.advanceTimersByTime(SECOND));

      expect(result.current.remainingMs).toBe(2 * HOUR - SECOND);
    });

    it.each([
      ['이미 지난 시각', () => Date.now() - SECOND, true],
      ['대기 상태(null)', () => null, false],
    ])(
      '실행 중에 endAt이 %s 으로 바뀌면 멈추고, onComplete 호출 여부는 %s 여야 합니다.',
      (_, getNextEndAt, shouldComplete) => {
        const onComplete = vi.fn();
        const { result, rerender } = renderHook(
          ({ endAt }) => useTimer({ endAt, onComplete }),
          { initialProps: { endAt: (Date.now() + HOUR) as number | null } }
        );

        rerender({ endAt: getNextEndAt() });

        expect(result.current.remainingMs).toBe(0);
        expect(result.current.isRunning).toBe(false);
        expect(result.current.isComplete).toBe(shouldComplete);
        expect(onComplete).toHaveBeenCalledTimes(shouldComplete ? 1 : 0);
      }
    );

    it('마운트 시 이미 지난 endAt이면 완료 상태로 시작하고 onComplete는 호출하지 않아야 합니다.', () => {
      const onComplete = vi.fn();
      const { result } = renderHook(() =>
        useTimer({ endAt: Date.now() - MINUTE, onComplete })
      );

      expect(result.current.isRunning).toBe(false);
      expect(result.current.isComplete).toBe(true);
      expect(onComplete).not.toHaveBeenCalled();
    });
  });
});
