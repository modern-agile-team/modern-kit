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
  it('durationMs와 endAt은 함께 사용할 수 없어야 합니다.', () => {
    renderHook(() =>
      // @ts-expect-error durationMs 와 endAt 은 동시에 전달할 수 없습니다.
      useTimer({ durationMs: HOUR, endAt: Date.now() + HOUR })
    );
  });

  describe('durationMs', () => {
    it('durationMs로 초기화되고, 기본적으로 시작하지 않아야 합니다.', () => {
      const { result } = renderHook(() => useTimer({ durationMs: HOUR }));

      act(() => vi.advanceTimersByTime(5 * SECOND));

      expect(result.current.remainingMs).toBe(HOUR);
      expect(result.current.isRunning).toBe(false);
    });

    it('autoStart가 true이면 마운트 시 바로 시작해야 합니다.', () => {
      const { result } = renderHook(() =>
        useTimer({ durationMs: HOUR, autoStart: true })
      );

      act(() => vi.advanceTimersByTime(5 * SECOND));

      expect(result.current.isRunning).toBe(true);
      expect(result.current.remainingMs).toBe(HOUR - 5 * SECOND);
    });

    it('start 후 시간이 흐르면 남은 시간과 시/분/초가 줄어들어야 합니다.', () => {
      const { result } = renderHook(() => useTimer({ durationMs: HOUR }));

      expect(result.current).toMatchObject({
        hours: 1,
        minutes: 0,
        seconds: 0,
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

    it('pause하면 남은 시간이 유지되고, start하면 이어서 진행해야 합니다.', () => {
      const { result } = renderHook(() => useTimer({ durationMs: HOUR }));

      act(() => result.current.start());
      act(() => vi.advanceTimersByTime(10 * SECOND));
      act(() => result.current.pause());
      act(() => vi.advanceTimersByTime(30 * SECOND));

      expect(result.current.isRunning).toBe(false);
      expect(result.current.remainingMs).toBe(HOUR - 10 * SECOND);

      act(() => result.current.start());
      act(() => vi.advanceTimersByTime(5 * SECOND));

      expect(result.current.remainingMs).toBe(HOUR - 15 * SECOND);
    });

    it('reset하면 멈추고 durationMs로 되돌아가야 합니다.', () => {
      const { result } = renderHook(() => useTimer({ durationMs: HOUR }));

      act(() => result.current.start());
      act(() => vi.advanceTimersByTime(10 * SECOND));
      act(() => result.current.reset());

      expect(result.current.isRunning).toBe(false);
      expect(result.current.remainingMs).toBe(HOUR);
    });
  });

  describe('완료', () => {
    it('남은 시간이 0이 되면 멈추고 onComplete를 한 번 호출해야 합니다.', () => {
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
    });

    it('완료된 뒤에는 start해도 다시 시작하지 않아야 합니다.', () => {
      const { result } = renderHook(() =>
        useTimer({ durationMs: SECOND, autoStart: true })
      );

      act(() => vi.advanceTimersByTime(SECOND));
      act(() => result.current.start());

      expect(result.current.isRunning).toBe(false);
    });

    it('onTick은 갱신될 때마다 남은 시간(ms)을 인자로 호출되어야 합니다.', () => {
      const onTick = vi.fn();
      renderHook(() =>
        useTimer({ durationMs: 3 * SECOND, autoStart: true, onTick })
      );

      act(() => vi.advanceTimersByTime(3 * SECOND));

      expect(onTick.mock.calls).toEqual([[2 * SECOND], [SECOND], [0]]);
    });
  });

  describe('addTime', () => {
    it('실행 중이거나 일시정지 중일 때 남은 시간에 누적해야 합니다.', () => {
      const { result } = renderHook(() =>
        useTimer({ durationMs: MINUTE, autoStart: true })
      );

      act(() => result.current.addTime(10 * MINUTE));
      expect(result.current.remainingMs).toBe(11 * MINUTE);

      act(() => result.current.pause());
      act(() => result.current.addTime(MINUTE));
      expect(result.current.remainingMs).toBe(12 * MINUTE);
    });

    it('음수로 남은 시간보다 많이 빼면 0이 되고 완료되어야 합니다.', () => {
      const onComplete = vi.fn();
      const { result } = renderHook(() =>
        useTimer({ durationMs: MINUTE, autoStart: true, onComplete })
      );

      act(() => result.current.addTime(-2 * MINUTE));

      expect(result.current.remainingMs).toBe(0);
      expect(result.current.isComplete).toBe(true);
      expect(onComplete).toHaveBeenCalledOnce();
    });
  });

  describe('ms 값 보정', () => {
    it('durationMs와 addTime의 소수는 정수부만 사용해야 합니다.', () => {
      const { result } = renderHook(() => useTimer({ durationMs: HOUR + 0.9 }));

      expect(result.current.remainingMs).toBe(HOUR);
      expect(result.current).toMatchObject({
        hours: 1,
        minutes: 0,
        seconds: 0,
      });

      act(() => result.current.addTime(MINUTE + 0.5));

      expect(result.current.remainingMs).toBe(HOUR + MINUTE);
    });

    it.each([NaN, Infinity, -Infinity])(
      'addTime에 %s 을 전달하면 무시해야 합니다.',
      (ms) => {
        const { result } = renderHook(() =>
          useTimer({ durationMs: HOUR, autoStart: true })
        );

        act(() => result.current.addTime(ms));
        act(() => vi.advanceTimersByTime(SECOND));

        expect(result.current.remainingMs).toBe(HOUR - SECOND);
      }
    );

    it('durationMs가 NaN이면 0으로 처리해야 합니다.', () => {
      const { result } = renderHook(() => useTimer({ durationMs: NaN }));

      expect(result.current.remainingMs).toBe(0);
      expect(result.current.isComplete).toBe(true);
    });

    it('유효하지 않은 endAt이면 완료되지 않은 채 대기해야 합니다.', () => {
      const onComplete = vi.fn();
      const { result } = renderHook(() =>
        useTimer({ endAt: new Date('invalid'), onComplete })
      );

      expect(result.current.remainingMs).toBe(0);
      expect(result.current.isComplete).toBe(false);
      expect(onComplete).not.toHaveBeenCalled();
    });
  });

  describe('실제 시각 기준', () => {
    it.each([
      ['intervalMs 1000', 3.5 * SECOND, undefined],
      ['intervalMs 60000', 61 * SECOND, MINUTE],
    ])(
      '남은 시간이 interval 경계와 맞지 않아도 정확히 0이 되는 시점에 완료되어야 합니다. (%s)',
      (_, durationMs, intervalMs) => {
        const onComplete = vi.fn();
        const { result } = renderHook(() =>
          useTimer({ durationMs, intervalMs, autoStart: true, onComplete })
        );

        act(() => vi.advanceTimersByTime(durationMs - 1));
        expect(result.current.isComplete).toBe(false);

        act(() => vi.advanceTimersByTime(1));
        expect(result.current.isComplete).toBe(true);
        expect(onComplete).toHaveBeenCalledOnce();
      }
    );

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

    it('interval이 지연되어도 다음 갱신에서 실제 남은 시간으로 맞춰져야 합니다.', () => {
      const { result } = renderHook(() =>
        useTimer({ durationMs: HOUR, autoStart: true })
      );

      passTimeWithoutTick(10 * MINUTE);
      act(() => vi.advanceTimersByTime(SECOND));

      expect(result.current.remainingMs).toBe(HOUR - 10 * MINUTE - SECOND);
    });

    it('백그라운드에서 돌아오면 바로 실제 남은 시간으로 맞춰져야 합니다.', () => {
      const { result } = renderHook(() =>
        useTimer({ durationMs: HOUR, autoStart: true })
      );

      passTimeWithoutTick(10 * MINUTE);
      changeVisibility('visible');

      expect(result.current.remainingMs).toBe(HOUR - 10 * MINUTE);
    });
  });

  describe('pauseOnHidden', () => {
    it('실행 중에 숨겨지면 멈추고, 다시 보이면 남은 시간부터 이어서 진행해야 합니다.', () => {
      const { result } = renderHook(() =>
        useTimer({ durationMs: HOUR, autoStart: true, pauseOnHidden: true })
      );

      act(() => vi.advanceTimersByTime(10 * SECOND));
      changeVisibility('hidden');
      passTimeWithoutTick(10 * MINUTE);

      expect(result.current.isRunning).toBe(false);
      expect(result.current.remainingMs).toBe(HOUR - 10 * SECOND);

      changeVisibility('visible');
      act(() => vi.advanceTimersByTime(SECOND));

      expect(result.current.isRunning).toBe(true);
      expect(result.current.remainingMs).toBe(HOUR - 11 * SECOND);
    });

    it.each([
      ['사용자가 일시정지한 상태', true],
      ['시작하지 않은 상태', false],
    ])(
      '%s에서는 숨겨졌다 다시 보여도 시작하지 않아야 합니다.',
      (_, startThenPause) => {
        const { result } = renderHook(() =>
          useTimer({ durationMs: HOUR, pauseOnHidden: true })
        );

        if (startThenPause) {
          act(() => result.current.start());
          act(() => result.current.pause());
        }

        changeVisibility('hidden');
        changeVisibility('visible');

        expect(result.current.isRunning).toBe(false);
      }
    );

    it.each(['pause', 'reset'] as const)(
      '숨겨져 멈춘 동안 %s 하면 다시 보여도 시작하지 않아야 합니다.',
      (action) => {
        const { result } = renderHook(() =>
          useTimer({ durationMs: HOUR, autoStart: true, pauseOnHidden: true })
        );

        changeVisibility('hidden');
        act(() => result.current[action]());
        changeVisibility('visible');

        expect(result.current.isRunning).toBe(false);
      }
    );

    it('숨겨져 멈춘 동안 addTime 하면 다시 보일 때 바뀐 시간부터 이어서 진행해야 합니다.', () => {
      const { result } = renderHook(() =>
        useTimer({ durationMs: HOUR, autoStart: true, pauseOnHidden: true })
      );

      changeVisibility('hidden');
      act(() => result.current.addTime(10 * MINUTE));
      changeVisibility('visible');

      expect(result.current.isRunning).toBe(true);
      expect(result.current.remainingMs).toBe(HOUR + 10 * MINUTE);
    });

    it('백그라운드 탭에서 마운트되면 처음 보일 때 시작해야 합니다.', () => {
      mockVisibility('hidden');

      const { result } = renderHook(() =>
        useTimer({ durationMs: HOUR, autoStart: true, pauseOnHidden: true })
      );
      passTimeWithoutTick(10 * MINUTE);

      expect(result.current.isRunning).toBe(false);

      changeVisibility('visible');

      expect(result.current.isRunning).toBe(true);
      expect(result.current.remainingMs).toBe(HOUR);
    });

    it('pauseOnHidden이 없으면 숨겨진 동안에도 시간이 흘러야 합니다.', () => {
      const { result } = renderHook(() =>
        useTimer({ durationMs: HOUR, autoStart: true })
      );

      changeVisibility('hidden');
      passTimeWithoutTick(10 * MINUTE);
      changeVisibility('visible');

      expect(result.current.remainingMs).toBe(HOUR - 10 * MINUTE);
    });

    it('endAt과 함께 사용할 수 없어야 합니다.', () => {
      renderHook(() =>
        // @ts-expect-error 절대 시각인 endAt 은 멈출 수 없습니다.
        useTimer({ endAt: Date.now() + HOUR, pauseOnHidden: true })
      );
    });
  });

  describe('endAt', () => {
    it.each([
      ['timestamp', () => Date.now() + HOUR],
      ['Date', () => new Date(Date.now() + HOUR)],
    ])(
      'endAt(%s)까지 남은 시간으로 초기화되고, 바로 시작해야 합니다.',
      (_, getEndAt) => {
        const endAt = getEndAt();
        const { result } = renderHook(() => useTimer({ endAt }));

        expect(result.current.remainingMs).toBe(HOUR);

        act(() => vi.advanceTimersByTime(SECOND));

        expect(result.current.remainingMs).toBe(HOUR - SECOND);
      }
    );

    it('endAt이 바뀌면 새 종료 시각으로 다시 맞춰야 합니다.', () => {
      const { result, rerender } = renderHook(
        ({ endAt }) => useTimer({ endAt }),
        { initialProps: { endAt: Date.now() + HOUR } }
      );

      rerender({ endAt: Date.now() + 2 * HOUR });
      act(() => vi.advanceTimersByTime(SECOND));

      expect(result.current.remainingMs).toBe(2 * HOUR - SECOND);
    });

    it('endAt에 도달하면 완료되고 onComplete를 한 번 호출해야 합니다.', () => {
      const onComplete = vi.fn();
      const { result } = renderHook(() =>
        useTimer({ endAt: Date.now() + 3 * SECOND, onComplete })
      );

      act(() => vi.advanceTimersByTime(10 * SECOND));

      expect(result.current.isComplete).toBe(true);
      expect(onComplete).toHaveBeenCalledOnce();
    });

    it('실행 중에 endAt이 이미 지난 시각으로 바뀌면 완료되고 onComplete를 호출해야 합니다.', () => {
      const onComplete = vi.fn();
      const { result, rerender } = renderHook(
        ({ endAt }) => useTimer({ endAt, onComplete }),
        { initialProps: { endAt: Date.now() + HOUR } }
      );

      act(() => vi.advanceTimersByTime(SECOND));
      rerender({ endAt: Date.now() - SECOND });

      expect(result.current.isComplete).toBe(true);
      expect(onComplete).toHaveBeenCalledOnce();
    });

    it('이미 지난 endAt이면 완료 상태로 시작하고 onComplete는 호출하지 않아야 합니다.', () => {
      const onComplete = vi.fn();
      const { result } = renderHook(() =>
        useTimer({ endAt: Date.now() - MINUTE, onComplete })
      );

      expect(result.current.isComplete).toBe(true);
      expect(onComplete).not.toHaveBeenCalled();
    });

    it.each([null, undefined])(
      'endAt이 %s 이면 완료되지 않은 채 대기해야 합니다.',
      (endAt) => {
        const onComplete = vi.fn();
        const { result } = renderHook(() => useTimer({ endAt, onComplete }));

        act(() => vi.advanceTimersByTime(10 * SECOND));

        expect(result.current.remainingMs).toBe(0);
        expect(result.current.isComplete).toBe(false);
        expect(onComplete).not.toHaveBeenCalled();
      }
    );

    it('대기 중에 endAt이 들어오면 바로 시작해야 합니다.', () => {
      const { result, rerender } = renderHook(
        ({ endAt }) => useTimer({ endAt }),
        { initialProps: { endAt: undefined as number | undefined } }
      );

      rerender({ endAt: Date.now() + HOUR });
      act(() => vi.advanceTimersByTime(SECOND));

      expect(result.current.remainingMs).toBe(HOUR - SECOND);
    });

    it('실행 중에 endAt이 대기 상태로 바뀌면 멈추고 onComplete는 호출하지 않아야 합니다.', () => {
      const onComplete = vi.fn();
      const { result, rerender } = renderHook(
        ({ endAt }) => useTimer({ endAt, onComplete }),
        { initialProps: { endAt: (Date.now() + HOUR) as number | null } }
      );

      rerender({ endAt: null });
      act(() => vi.advanceTimersByTime(10 * SECOND));

      expect(result.current.remainingMs).toBe(0);
      expect(result.current.isComplete).toBe(false);
      expect(onComplete).not.toHaveBeenCalled();
    });

    it('마감을 바꿀 수 있는 옵션과 제어 함수는 제공하지 않아야 합니다.', () => {
      const { result } = renderHook(() =>
        useTimer({ endAt: Date.now() + HOUR })
      );

      expectTypeOf(result.current).not.toHaveProperty('start');
      expectTypeOf(result.current).not.toHaveProperty('pause');
      expectTypeOf(result.current).not.toHaveProperty('reset');
      expectTypeOf(result.current).not.toHaveProperty('addTime');

      renderHook(() =>
        // @ts-expect-error endAt 은 항상 바로 시작하므로 autoStart 를 받지 않습니다.
        useTimer({ endAt: Date.now() + HOUR, autoStart: false })
      );
    });
  });
});
