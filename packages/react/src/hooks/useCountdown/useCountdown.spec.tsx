import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  onTestFinished,
} from 'vitest';
import { act, renderHook } from '@testing-library/react';

import { useCountdown } from '.';

const intervalMs = 1000;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

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

describe('useCountdown', () => {
  it('countStart 값으로 초기화되어야 합니다.', () => {
    const { result } = renderHook(() => useCountdown({ countStart: 10 }));

    expect(result.current.count).toBe(10);
  });

  it('start 호출 전에는 값이 변하지 않아야 합니다.', () => {
    const { result } = renderHook(() => useCountdown({ countStart: 10 }));

    act(() => {
      vi.advanceTimersByTime(intervalMs * 3);
    });

    expect(result.current.count).toBe(10);
  });

  it('start 호출 시 간격마다 값이 감소해야 합니다.', () => {
    const { result } = renderHook(() => useCountdown({ countStart: 10 }));

    act(() => result.current.start());

    act(() => {
      vi.advanceTimersByTime(intervalMs);
    });
    expect(result.current.count).toBe(9);

    act(() => {
      vi.advanceTimersByTime(intervalMs * 2);
    });
    expect(result.current.count).toBe(7);
  });

  it('countStop에 도달하면 자동으로 멈춰야 합니다.', () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 2, countStop: 0 })
    );

    act(() => result.current.start());

    // tick마다 리렌더가 일어나도록 한 간격씩 진행 (실제 사용 시 tick 간 리렌더 상황과 동일)
    for (let i = 0; i < 5; i += 1) {
      act(() => {
        vi.advanceTimersByTime(intervalMs);
      });
    }

    // 2 → 1 → 0 에서 정지, 이후 시간이 흘러도 유지
    expect(result.current.count).toBe(0);
  });

  it('pause 호출 시 값이 더 이상 변하지 않아야 합니다.', () => {
    const { result } = renderHook(() => useCountdown({ countStart: 10 }));

    act(() => result.current.start());

    act(() => {
      vi.advanceTimersByTime(intervalMs);
    });
    expect(result.current.count).toBe(9);

    act(() => result.current.pause());

    act(() => {
      vi.advanceTimersByTime(intervalMs * 3);
    });
    expect(result.current.count).toBe(9);
  });

  it('reset 호출 시 멈추고 시작 값으로 복귀해야 합니다.', () => {
    const { result } = renderHook(() => useCountdown({ countStart: 10 }));

    act(() => result.current.start());

    act(() => {
      vi.advanceTimersByTime(intervalMs * 3);
    });
    expect(result.current.count).toBe(7);

    act(() => result.current.reset());
    expect(result.current.count).toBe(10);

    act(() => {
      vi.advanceTimersByTime(intervalMs * 2);
    });
    // reset은 멈춤도 포함하므로 값이 유지되어야 함
    expect(result.current.count).toBe(10);
  });

  it('restart 호출 시 실행 중이거나 완료된 뒤에도 시작 값부터 다시 시작해야 합니다.', () => {
    const { result } = renderHook(() => useCountdown({ countStart: 3 }));

    act(() => result.current.start());
    act(() => {
      vi.advanceTimersByTime(intervalMs * 1.5);
    });
    expect(result.current.count).toBe(2);

    // 실행 중 restart: 첫 감소까지 intervalMs 를 온전히 기다려야 함
    act(() => result.current.restart());
    expect(result.current.count).toBe(3);

    act(() => {
      vi.advanceTimersByTime(intervalMs - 1);
    });
    expect(result.current.count).toBe(3);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.count).toBe(2);

    act(() => {
      vi.advanceTimersByTime(intervalMs * 2);
    });
    expect(result.current.isComplete).toBe(true);

    // 완료 후 restart
    act(() => result.current.restart());
    expect(result.current.count).toBe(3);

    act(() => {
      vi.advanceTimersByTime(intervalMs);
    });
    expect(result.current.count).toBe(2);
  });

  it('intervalMs 옵션에 따라 호출 간격이 조정되어야 합니다.', () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 10, intervalMs: 500 })
    );

    act(() => result.current.start());

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current.count).toBe(9);
  });

  it('isComplete는 count가 countStop에 도달했을 때 true가 되어야 합니다.', () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 2, countStop: 0 })
    );

    expect(result.current.isComplete).toBe(false);

    act(() => result.current.start());

    act(() => {
      vi.advanceTimersByTime(intervalMs * 2);
    });

    expect(result.current.count).toBe(0);
    expect(result.current.isComplete).toBe(true);
  });

  it('onTick은 감소할 때마다 매 tick 호출되어야 합니다.', () => {
    const onTick = vi.fn();
    const { result } = renderHook(() =>
      useCountdown({ countStart: 10, onTick })
    );

    act(() => result.current.start());

    act(() => {
      vi.advanceTimersByTime(intervalMs * 3);
    });

    expect(onTick).toHaveBeenCalledTimes(3);
  });

  it('onComplete은 countStop에 도달했을 때 한 번 호출되어야 합니다.', () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() =>
      useCountdown({ countStart: 2, countStop: 0, onComplete })
    );

    act(() => result.current.start());

    // tick마다 리렌더가 일어나도록 한 간격씩 진행 (2 → 1 → 0 도달 시점에 호출)
    for (let i = 0; i < 5; i += 1) {
      act(() => {
        vi.advanceTimersByTime(intervalMs);
      });
    }

    // 이후 시간이 더 흘러도 다시 호출되지 않고 정확히 한 번만 호출되어야 함
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('addCount는 현재 카운트에 값을 누적해야 합니다.', () => {
    const { result } = renderHook(() => useCountdown({ countStart: 10000 }));

    act(() => result.current.addCount(5000));
    expect(result.current.count).toBe(15000);

    act(() => result.current.addCount(5000));
    expect(result.current.count).toBe(20000);
  });

  it('addCount에 음수를 주어도 countStop 아래로는 내려가지 않고 isComplete가 true여야 합니다.', () => {
    const { result } = renderHook(() =>
      useCountdown({ countStart: 3, countStop: 0 })
    );

    expect(result.current.isComplete).toBe(false);

    act(() => result.current.addCount(-10));

    // countStop(0) 으로 클램프
    expect(result.current.count).toBe(0);
    expect(result.current.isComplete).toBe(true);
  });

  it('onTick은 이번 tick의 감소 결과값을 인자로 받아야 합니다.', () => {
    const onTick = vi.fn();
    const { result } = renderHook(() =>
      useCountdown({ countStart: 10, onTick })
    );

    act(() => result.current.start());

    // tick 간 리렌더가 일어나도록 한 간격씩 진행 (실제 사용 시 tick 간 리렌더 상황과 동일)
    for (const expected of [9, 8, 7]) {
      act(() => {
        vi.advanceTimersByTime(intervalMs);
      });
      expect(onTick).toHaveBeenLastCalledWith(expected);
    }
  });

  it('onComplete은 countStop 값을 인자로 받아야 합니다.', () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() =>
      useCountdown({ countStart: 2, countStop: 0, onComplete })
    );

    act(() => result.current.start());

    for (let i = 0; i < 5; i += 1) {
      act(() => {
        vi.advanceTimersByTime(intervalMs);
      });
    }

    expect(onComplete).toHaveBeenCalledWith(0);
  });

  it('소수 countStart는 정수로 잘려 초기화되어야 합니다.', () => {
    const { result } = renderHook(() => useCountdown({ countStart: 10.9 }));

    expect(result.current.count).toBe(10);
  });

  it('addCount에 소수를 주면 소수부가 버려진 정수만 누적되어야 합니다.', () => {
    const { result } = renderHook(() => useCountdown({ countStart: 10 }));

    act(() => result.current.addCount(5.9));
    expect(result.current.count).toBe(15);

    act(() => result.current.addCount(-2.9));
    expect(result.current.count).toBe(13);
  });

  it('소수 countStart도 countStop에 정확히 도달해 자동으로 멈춰야 합니다.', () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() =>
      useCountdown({ countStart: 2.9, countStop: 0, onComplete })
    );

    act(() => result.current.start());

    for (let i = 0; i < 5; i += 1) {
      act(() => {
        vi.advanceTimersByTime(intervalMs);
      });
    }

    expect(result.current.count).toBe(0);
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith(0);
  });

  describe('pauseOnHidden', () => {
    it('실행 중에 숨겨지면 멈추고, 다시 보이면 이어서 진행해야 합니다.', () => {
      const { result } = renderHook(() =>
        useCountdown({ countStart: 10, pauseOnHidden: true })
      );

      act(() => result.current.start());
      act(() => vi.advanceTimersByTime(2 * intervalMs));
      changeVisibility('hidden');
      act(() => vi.advanceTimersByTime(5 * intervalMs));

      expect(result.current.count).toBe(8);

      changeVisibility('visible');
      act(() => vi.advanceTimersByTime(intervalMs));

      expect(result.current.count).toBe(7);
    });

    it.each([
      ['멈춘 뒤 숨김·복귀', 'beforeHide'],
      ['숨겨져 멈춘 동안 pause', 'whileHidden'],
    ] as const)(
      '사용자가 멈췄다면 다시 보여도 시작하지 않아야 합니다. (%s)',
      (_, stopTiming) => {
        const { result } = renderHook(() =>
          useCountdown({ countStart: 10, pauseOnHidden: true })
        );

        act(() => result.current.start());
        if (stopTiming === 'beforeHide') {
          act(() => result.current.pause());
        }
        changeVisibility('hidden');
        if (stopTiming === 'whileHidden') {
          act(() => result.current.pause());
        }
        changeVisibility('visible');
        act(() => vi.advanceTimersByTime(3 * intervalMs));

        expect(result.current.count).toBe(10);
      }
    );

    it('숨겨진 상태에서 start하면 처음 보일 때 시작해야 합니다.', () => {
      mockVisibility('hidden');

      const { result } = renderHook(() =>
        useCountdown({ countStart: 10, pauseOnHidden: true })
      );

      act(() => result.current.start());
      act(() => vi.advanceTimersByTime(3 * intervalMs));

      expect(result.current.count).toBe(10);

      changeVisibility('visible');
      act(() => vi.advanceTimersByTime(intervalMs));

      expect(result.current.count).toBe(9);
    });

    it('pauseOnHidden이 없으면 숨겨진 동안에도 감소해야 합니다.', () => {
      const { result } = renderHook(() => useCountdown({ countStart: 10 }));

      act(() => result.current.start());
      changeVisibility('hidden');
      act(() => vi.advanceTimersByTime(3 * intervalMs));

      expect(result.current.count).toBe(7);
    });
  });
});
