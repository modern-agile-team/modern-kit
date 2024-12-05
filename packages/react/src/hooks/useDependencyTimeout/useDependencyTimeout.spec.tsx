import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDependencyTimeout } from '.';

const delayTime = 1000;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useDependencyTimeout', () => {
  it('의존성이 변경되면 타임아웃이 리셋되어야 합니다.', () => {
    const mockFn = vi.fn();

    const { rerender } = renderHook(
      ({ deps }) =>
        useDependencyTimeout(mockFn, { delay: delayTime, enabled: true }, deps),
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

  it('타임아웃을 수동으로 해제할 수 있어야 합니다.', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() =>
      useDependencyTimeout(mockFn, { delay: delayTime, enabled: true }, [])
    );

    vi.advanceTimersByTime(delayTime / 2);

    act(() => {
      result.current.clear();
    });

    vi.advanceTimersByTime(delayTime);

    expect(mockFn).not.toBeCalled();
  });

  it('타임아웃을 수동으로 리셋할 수 있어야 합니다.', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() =>
      useDependencyTimeout(mockFn, { delay: delayTime, enabled: true }, [])
    );

    vi.advanceTimersByTime(delayTime / 2);

    act(() => {
      result.current.reset();
    });

    vi.advanceTimersByTime(delayTime / 2);

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime / 2);

    expect(mockFn).toBeCalledTimes(1);
  });

  it('enabled가 false면 타임아웃이 동작하지 않아야 합니다.', () => {
    const mockFn = vi.fn();

    renderHook(() =>
      useDependencyTimeout(mockFn, { delay: delayTime, enabled: false }, [])
    );

    vi.advanceTimersByTime(delayTime);

    expect(mockFn).not.toBeCalled();
  });
});
