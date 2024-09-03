import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
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

  it('주어진 간격만큼 콜백 함수를 호출해야 합니다.', () => {
    renderHook(() => useInterval(mockFn, delayTime));

    expect(mockFn).toBeCalledTimes(0);

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(2);
  });

  it('enabled가 true인 경우에 interval이 활성화되야 합니다.', () => {
    const { rerender } = renderHook(
      ({ enabled }) => useInterval(mockFn, { delay: delayTime, enabled }),
      {
        initialProps: { enabled: false },
      }
    );

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(0);

    rerender({ enabled: true }); // enabled true 설정

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(2);
  });

  it('set 함수를 호출하면 명시적으로 interval이 설정되야 합니다.', async () => {
    const { result } = renderHook(() =>
      useInterval(mockFn, { delay: delayTime, enabled: false })
    );

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(0);

    result.current.set(); // interval 설정

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(2);
  });

  it('clear 함수를 호출하면 명시적으로 interval이 초기화되야 합니다.', async () => {
    const { result } = renderHook(() =>
      useInterval(mockFn, { delay: delayTime, enabled: false })
    );

    result.current.set();

    vi.advanceTimersByTime(delayTime / 2);
    expect(mockFn).toBeCalledTimes(0);

    result.current.clear(); // interval 초기화

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(0);
  });

  it('reset 함수를 호출하면 명시적으로 interval이 재설정되야 합니다.', async () => {
    const { result } = renderHook(() =>
      useInterval(mockFn, { delay: delayTime, enabled: false })
    );

    result.current.set();

    vi.advanceTimersByTime(delayTime / 2);
    expect(mockFn).toBeCalledTimes(0);

    result.current.reset(); // interval 재설정

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(2);
  });
});
