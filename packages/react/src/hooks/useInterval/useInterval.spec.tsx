import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useInterval } from '.';

const delayTime = 300;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useInterval', () => {
  const mockFn = vi.fn();

  it('should call the callback function at the correct interval', () => {
    renderHook(() => useInterval(mockFn, delayTime));

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime / 2);
    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(2);
  });

  it('should not run the interval when enabled is false and should run when enabled is true', () => {
    const { rerender } = renderHook(
      ({ enabled }) => useInterval(mockFn, { delay: delayTime, enabled }),
      {
        initialProps: { enabled: true },
      }
    );

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime / 2);

    rerender({ enabled: false });

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).not.toBeCalled();

    rerender({ enabled: true });

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(1);
  });

  it('should not run the interval if delay is undefined', () => {
    renderHook(() => useInterval(mockFn, { delay: undefined }));

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).not.toBeCalled();
  });

  it('should correctly start and stop the interval, calling the callback at the correct times', async () => {
    const { result } = renderHook(() =>
      useInterval(mockFn, { delay: delayTime, enabled: false })
    );

    const startInterval = result.current.start;
    const stopInterval = result.current.stop;

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).not.toBeCalled();

    act(() => startInterval());

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(1);
    expect(result.current.isActing).toBeTruthy();

    act(() => stopInterval());

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(1);
    expect(result.current.isActing).toBeFalsy();
  });
});
