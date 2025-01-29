import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTimeout } from '.';

const delayTime = 1000;

beforeEach(() => {
  // https://github.com/testing-library/user-event/issues/833#issuecomment-1725364780
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useTimeout', () => {
  const mockFn = vi.fn();

  it('지정된 delay 후에 함수가 호출되어야 합니다.', () => {
    renderHook(() => useTimeout(mockFn, { delay: delayTime }));

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalled();
  });

  it('활성화된 경우에만 함수가 호출되어야 합니다.', () => {
    const { rerender } = renderHook(
      ({ enabled }) => useTimeout(mockFn, { delay: delayTime, enabled }),
      {
        initialProps: { enabled: false },
      }
    );

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);

    expect(mockFn).not.toBeCalled();

    rerender({ enabled: true });

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalled();
  });

  it('설정 및 재설정된 후 함수가 호출되어야 합니다.', () => {
    const { result } = renderHook(
      ({ enabled }) => useTimeout(mockFn, { delay: delayTime, enabled }),
      {
        initialProps: { enabled: false },
      }
    );

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);

    expect(mockFn).not.toBeCalled();

    result.current.set();

    vi.advanceTimersByTime(delayTime);

    expect(mockFn).toBeCalledTimes(1);

    result.current.reset();

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(2);
  });

  it('delay가 undefined일 경우 타이머가 바로 실행되어야 합니다.', () => {
    renderHook(() =>
      useTimeout(mockFn, { delay: undefined as unknown as number })
    );

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(0);
    expect(mockFn).toBeCalled();
  });

  it('delay가 0일 경우 타이머가 바로 실행되어야 합니다.', () => {
    renderHook(() => useTimeout(mockFn, { delay: 0 }));

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalled();
  });

  it('delay가 음수일 경우 타이머가 바로 실행되어야 합니다.', () => {
    renderHook(() => useTimeout(mockFn, { delay: -1 }));

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalled();
  });
});
