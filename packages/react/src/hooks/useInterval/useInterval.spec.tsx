import { renderHook } from '@testing-library/react';
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
});
