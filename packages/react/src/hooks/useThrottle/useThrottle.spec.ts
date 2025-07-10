import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useThrottle } from '.';

const DELAY_TIME = 50;

beforeEach(() => {
  // https://github.com/testing-library/user-event/issues/833#issuecomment-1725364780
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useThrottle', () => {
  it('함수 호출을 스로틀링해야 한다', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() => useThrottle(mockFn, DELAY_TIME));

    result.current(); // 첫 호출은 즉시 실행
    expect(mockFn).toBeCalledTimes(1);

    result.current(); // 대기 시간 내에 호출되기 때문에 무시
    result.current();

    vi.advanceTimersByTime(DELAY_TIME);

    expect(mockFn).toBeCalledTimes(2); // 대기 시간 이후 실행
  });

  it('함수가 올바른 인자와 함께 호출되어야 한다', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() => useThrottle(mockFn, DELAY_TIME));

    result.current('test', 123);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('test', 123);
  });

  it('한 번만 호출될 때는 후행 호출이 트리거되지 않아야 한다', async () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() => useThrottle(mockFn, DELAY_TIME));

    result.current();
    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(DELAY_TIME);
    expect(mockFn).toBeCalledTimes(1);
  });

  it('언마운트 시 쓰로틀링이 취소되야 합니다.', () => {
    const mockFn = vi.fn();

    const { result, unmount } = renderHook(() =>
      useThrottle(mockFn, DELAY_TIME)
    );

    result.current();
    expect(mockFn).toBeCalledTimes(1);

    result.current();
    result.current();

    unmount(); // 언마운트

    vi.advanceTimersByTime(DELAY_TIME);

    expect(mockFn).toBeCalledTimes(1); // 언마운트 되어 쓰로틀링이 취소되어 실행되지 않음
  });

  it('trailing 옵션이 false인 경우 마지막 호출을 무시해야 한다', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() =>
      useThrottle(mockFn, DELAY_TIME, { trailing: false })
    );

    result.current();
    expect(mockFn).toBeCalledTimes(1);

    result.current();

    vi.advanceTimersByTime(DELAY_TIME);
    expect(mockFn).toBeCalledTimes(1);
  });

  it('leading 옵션이 false인 경우 첫 번째 호출을 무시해야 한다', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() =>
      useThrottle(mockFn, DELAY_TIME, { leading: false })
    );

    result.current();
    expect(mockFn).toBeCalledTimes(0);

    vi.advanceTimersByTime(DELAY_TIME);

    result.current();
    expect(mockFn).toBeCalledTimes(1);
  });

  it('leading: false 옵션을 사용할 때는 첫 호출이 트리거되지 않아야 한다', async () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() =>
      useThrottle(mockFn, DELAY_TIME, { leading: false })
    );

    result.current();
    expect(mockFn).toBeCalledTimes(0);

    vi.advanceTimersByTime(DELAY_TIME);
    expect(mockFn).toBeCalledTimes(1);
  });

  it('trailing: false 옵션을 사용할 때는 마지막 호출이 트리거되지 않아야 한다', async () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() =>
      useThrottle(mockFn, DELAY_TIME, { trailing: false })
    );

    result.current();
    expect(mockFn).toBeCalledTimes(1);

    vi.advanceTimersByTime(DELAY_TIME);
    expect(mockFn).toBeCalledTimes(1);
  });

  it('leading: true, trailing: true 옵션을 사용할 때는 첫 호출과 마지막 호출이 트리거되어야 한다', async () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() =>
      useThrottle(mockFn, DELAY_TIME, {
        leading: true,
        trailing: true,
      })
    );

    result.current();
    expect(mockFn).toBeCalledTimes(1);

    result.current();

    vi.advanceTimersByTime(DELAY_TIME);
    expect(mockFn).toBeCalledTimes(2);
  });

  it('leading: false 와 trailing: false 옵션을 사용할 때는 첫 호출과 마지막 호출이 모두 트리거되지 않아야 한다', async () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() =>
      useThrottle(mockFn, DELAY_TIME, {
        leading: false,
        trailing: false,
      })
    );

    result.current();
    expect(mockFn).toBeCalledTimes(0);

    vi.advanceTimersByTime(DELAY_TIME);
    expect(mockFn).toBeCalledTimes(0);
  });

  it('AbortController을 통해 초기 호출을 중단할 수 있어야 한다', async () => {
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

  it('AbortController을 통해 후행 호출을 중단할 수 있어야 한다', async () => {
    const mockFn = vi.fn();
    const controller = new AbortController();

    const { result } = renderHook(() =>
      useThrottle(mockFn, DELAY_TIME, { signal: controller.signal })
    );

    result.current();
    expect(mockFn).toBeCalledTimes(1);

    result.current();

    controller.abort();

    vi.advanceTimersByTime(DELAY_TIME);
    expect(mockFn).toBeCalledTimes(1);
  });
});
