import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useThrottle } from '.';

const DELAY_TIME = 300;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useThrottle', () => {
  it('should call the callback function before the timeout.', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() => useThrottle(mockFn, DELAY_TIME));

    result.current();

    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(100);

    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(200);

    expect(mockFn).toBeCalledTimes(1);
  });

  it('should call the function once more at the end of the timeout if called again within the delay period.', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() => useThrottle(mockFn, DELAY_TIME));

    result.current();

    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(100);

    result.current();
    result.current();

    vi.advanceTimersByTime(200);

    expect(mockFn).toBeCalledTimes(2);
  });

  it('should cancel throttling when the component is unmounted.', () => {
    const mockFn = vi.fn();

    const { result, unmount } = renderHook(() =>
      useThrottle(mockFn, DELAY_TIME)
    );

    result.current();

    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(100);

    result.current();
    result.current();

    vi.advanceTimersByTime(100);

    unmount();

    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(100);

    expect(mockFn).toBeCalledTimes(1);
  });

  it('should not call the function at the end if trailing option is set to false.', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() =>
      useThrottle(mockFn, DELAY_TIME, { trailing: false })
    );

    result.current();

    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(100);

    result.current();
    result.current();

    vi.advanceTimersByTime(200);

    expect(mockFn).toBeCalledTimes(1);
  });
});
