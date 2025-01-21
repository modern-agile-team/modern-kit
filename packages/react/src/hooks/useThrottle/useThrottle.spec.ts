import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useThrottle } from '.';

const DELAY_TIME = 300;

beforeEach(() => {
  // https://github.com/testing-library/user-event/issues/833#issuecomment-1725364780
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useThrottle', () => {
  it('타임아웃 이전에 콜백 함수가 호출되어야 합니다.', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() => useThrottle(mockFn, DELAY_TIME));

    result.current();

    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(100);

    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(200);

    expect(mockFn).toBeCalledTimes(1);
  });

  it('지연 시간 내에 다시 호출되면 타임아웃 종료 시 한 번 더 호출되어야 합니다.', () => {
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

  it('컴포넌트가 언마운트되면 쓰로틀링이 취소되어야 합니다.', () => {
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

  it('trailing 옵션이 false로 설정된 경우 마지막에 함수가 호출되지 않아야 합니다.', () => {
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
