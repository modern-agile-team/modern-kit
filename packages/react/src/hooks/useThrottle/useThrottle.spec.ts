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

  it('대기 시간 내에 호출되지 않으면 함수가 즉시 실행되어야 합니다.', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() => useThrottle(mockFn, DELAY_TIME));

    result.current(); // 첫 호출은 즉시 실행
    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(DELAY_TIME / 2);
    expect(mockFn).toBeCalledTimes(1);

    result.current(); // 대기 시간 내에 호출되기 때문에 무시
    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(DELAY_TIME / 2);
    expect(mockFn).toHaveBeenCalledTimes(1);

    result.current(); // 대기 시간 이후에 호출되기 때문에 실행
    expect(mockFn).toBeCalledTimes(2);

    vi.advanceTimersByTime(DELAY_TIME / 2);
    expect(mockFn).toHaveBeenCalledTimes(2);

    result.current(); // 대기 시간 내에 호출되기 때문에 무시
    expect(mockFn).toHaveBeenCalledTimes(2);

    vi.advanceTimersByTime(DELAY_TIME / 2);
    expect(mockFn).toHaveBeenCalledTimes(2);

    result.current(); // 대기 시간 이후에 호출되기 때문에 실행
    expect(mockFn).toHaveBeenCalledTimes(3);
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

  it('AbortController을 통해 초기 호출을 중단할 수 있어야 한다', () => {
    const mockFn = vi.fn();
    const controller = new AbortController();

    controller.abort();

    const { result } = renderHook(() =>
      useThrottle(mockFn, DELAY_TIME, { signal: controller.signal })
    );

    result.current();

    expect(mockFn).toBeCalledTimes(0);

    vi.advanceTimersByTime(DELAY_TIME);
    expect(mockFn).toBeCalledTimes(0);
  });
});
