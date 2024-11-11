import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useDependencyTimeout from '.';

const delayTime = 1000;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useDependencyTimeout', () => {
  it('should call callback on mount if callOnMount is true', () => {
    const mockFn = vi.fn();

    renderHook(() =>
      useDependencyTimeout(mockFn, delayTime, [], { callOnMount: true })
    );

    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(delayTime);

    expect(mockFn).toBeCalledTimes(2);
  });

  it('should not call callback on mount if callOnMount is false', () => {
    const mockFn = vi.fn();

    renderHook(() =>
      useDependencyTimeout(mockFn, delayTime, [], { callOnMount: false })
    );

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);

    expect(mockFn).toBeCalledTimes(1);
  });

  it('should reset the timeout when dependencies change', () => {
    const mockFn = vi.fn();

    const { rerender } = renderHook(
      ({ deps }) =>
        useDependencyTimeout(mockFn, delayTime, deps, { callOnMount: false }),
      {
        initialProps: { deps: [1] },
      }
    );

    vi.advanceTimersByTime(delayTime / 2);

    rerender({ deps: [2] });

    vi.advanceTimersByTime(delayTime / 2);

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime / 2);

    expect(mockFn).toBeCalledTimes(1);
  });

  it('should allow clearing the timeout', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() =>
      useDependencyTimeout(mockFn, delayTime, [], { callOnMount: false })
    );

    vi.advanceTimersByTime(delayTime / 2);

    act(() => {
      result.current.clear();
    });

    vi.advanceTimersByTime(delayTime);

    expect(mockFn).not.toBeCalled();
  });

  it('should allow manual reset of the timeout', () => {
    const mockFn = vi.fn();

    renderHook(() =>
      useDependencyTimeout(mockFn, delayTime, [], { callOnMount: false })
    );

    vi.advanceTimersByTime(delayTime);

    expect(mockFn).toBeCalledTimes(1);
  });
});
