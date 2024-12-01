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
  it('callOnMount가 true면 마운트 시 콜백을 호출해야 합니다.', () => {
    const mockFn = vi.fn();

    renderHook(() =>
      useDependencyTimeout(mockFn, delayTime, [], { callOnMount: true })
    );

    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(delayTime);

    expect(mockFn).toBeCalledTimes(2);
  });

  it('callOnMount가 false면 마운트 시 콜백을 호출하지 않아야 합니다.', () => {
    const mockFn = vi.fn();

    renderHook(() =>
      useDependencyTimeout(mockFn, delayTime, [], { callOnMount: false })
    );

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);

    expect(mockFn).toBeCalledTimes(1);
  });

  it('의존성이 변경될 때 타임아웃을 리셋해야 합니다.', () => {
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

  it('타임아웃을 해제할 수 있어야 합니다.', () => {
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

  it('타임아웃을 수동으로 리셋할 수 있어야 합니다.', () => {
    const mockFn = vi.fn();

    renderHook(() =>
      useDependencyTimeout(mockFn, delayTime, [], { callOnMount: false })
    );

    vi.advanceTimersByTime(delayTime);

    expect(mockFn).toBeCalledTimes(1);
  });
});
