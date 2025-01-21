import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDebounce } from '.';

beforeEach(() => {
  // https://github.com/testing-library/user-event/issues/833#issuecomment-1725364780
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useDebounce', () => {
  it('주어진 시간이 지난 후에 전달된 함수가 호출되어야 합니다', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() => useDebounce(mockFn, 500));

    result.current();

    vi.advanceTimersByTime(300);
    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(200);
    expect(mockFn).toBeCalledTimes(1);
  });

  it('지연 시간 내에 여러 번 호출되어도 한 번만 실행되어야 합니다', () => {
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

  it('컴포넌트가 언마운트되면 디바운스가 취소되어야 합니다', () => {
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
