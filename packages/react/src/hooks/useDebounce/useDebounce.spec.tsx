import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDebounce } from '.';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useDebounce', () => {
  it('should call passed function after given amount of time', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() => useDebounce(mockFn, 500));

    result.current();

    vi.advanceTimersByTime(300);
    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(200);
    expect(mockFn).toBeCalledTimes(1);
  });

  it('should only be called once even if it is called multiple times within the delay time.', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() => useDebounce(mockFn, 500));

    result.current();
    result.current();
    result.current();

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(500);
    expect(mockFn).toBeCalledTimes(1);

    result.current();
    result.current();

    vi.advanceTimersByTime(500);
    expect(mockFn).toBeCalledTimes(2);

    result.current();

    vi.advanceTimersByTime(500);
    expect(mockFn).toBeCalledTimes(3);
  });

  it('debounce should be cancelled on unmount', () => {
    const mockFn = vi.fn();

    const { result, unmount } = renderHook(() => useDebounce(mockFn, 500));

    result.current();

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(300);

    unmount();

    vi.advanceTimersByTime(200);
    expect(mockFn).not.toBeCalled();
  });
});
