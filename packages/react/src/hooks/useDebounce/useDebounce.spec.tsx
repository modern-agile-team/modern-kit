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

const DELAY_TIME = 200;

describe('useDebounce', () => {
  it('주어진 시간이 지난 후에 전달된 함수가 호출되어야 합니다', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() => useDebounce(mockFn, DELAY_TIME));

    result.current();

    vi.advanceTimersByTime(DELAY_TIME / 2);
    expect(mockFn).toBeCalledTimes(0);

    vi.advanceTimersByTime(DELAY_TIME / 2);
    expect(mockFn).toBeCalledTimes(1);
  });

  it('지연 시간 내에 여러 번 호출되어도 한 번만 실행되어야 합니다', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() => useDebounce(mockFn, DELAY_TIME));

    result.current();
    result.current();
    result.current();

    expect(mockFn).toBeCalledTimes(0);

    vi.advanceTimersByTime(DELAY_TIME);
    expect(mockFn).toBeCalledTimes(1);

    result.current();
    result.current();

    vi.advanceTimersByTime(DELAY_TIME);
    expect(mockFn).toBeCalledTimes(2);

    result.current();

    vi.advanceTimersByTime(DELAY_TIME);
    expect(mockFn).toBeCalledTimes(3);
  });

  it('지연 시간 내에 함수가 다시 호출되면, 마지막 호출을 기준으로 지연 시간이 재설정되어야 합니다.', () => {
    const mockFn = vi.fn();
    const { result } = renderHook(() => useDebounce(mockFn, DELAY_TIME));

    result.current();
    expect(mockFn).toBeCalledTimes(0);

    vi.advanceTimersByTime(DELAY_TIME / 2);
    expect(mockFn).toBeCalledTimes(0);

    result.current();

    vi.advanceTimersByTime(DELAY_TIME / 2);
    expect(mockFn).toBeCalledTimes(0);

    result.current();

    vi.advanceTimersByTime(DELAY_TIME / 2);
    expect(mockFn).toBeCalledTimes(0);

    result.current();

    vi.advanceTimersByTime(DELAY_TIME);
    expect(mockFn).toBeCalledTimes(1);
  });

  it('컴포넌트가 언마운트되면 디바운스가 취소되어야 합니다', () => {
    const mockFn = vi.fn();

    const { result, unmount } = renderHook(() =>
      useDebounce(mockFn, DELAY_TIME)
    );

    result.current();

    expect(mockFn).toBeCalledTimes(0);

    vi.advanceTimersByTime(DELAY_TIME / 2);

    unmount();

    vi.advanceTimersByTime(DELAY_TIME / 2);
    expect(mockFn).toBeCalledTimes(0);
  });
});
