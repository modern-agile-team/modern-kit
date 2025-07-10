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
  it('함수 호출을 디바운스해야 한다', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() => useDebounce(mockFn, DELAY_TIME));

    result.current();
    result.current();
    result.current();

    vi.advanceTimersByTime(DELAY_TIME);
    expect(mockFn).toBeCalledTimes(1);
  });

  it('지정된 대기 시간만큼 함수 호출을 지연시켜야 한다', async () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() => useDebounce(mockFn, DELAY_TIME));

    result.current();
    vi.advanceTimersByTime(DELAY_TIME / 2);
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(DELAY_TIME / 2);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('대기 시간이 끝나기 전에 다시 호출되면 대기 시간을 리셋해야 한다', async () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() => useDebounce(mockFn, DELAY_TIME));

    result.current();
    vi.advanceTimersByTime(DELAY_TIME / 2);

    result.current();
    vi.advanceTimersByTime(DELAY_TIME / 2);

    result.current();
    vi.advanceTimersByTime(DELAY_TIME / 2);

    result.current();

    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(DELAY_TIME);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('디바운스된 함수 호출을 취소할 수 있어야 한다', async () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() => useDebounce(mockFn, DELAY_TIME));

    result.current();

    result.current.cancel(); // 디바운스 함수 호출 취소

    vi.advanceTimersByTime(DELAY_TIME);

    expect(mockFn).not.toHaveBeenCalled();
  });

  it('함수를 올바른 인자와 함께 호출해야 한다', async () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() => useDebounce(mockFn, DELAY_TIME));

    result.current('test', 123);

    vi.advanceTimersByTime(DELAY_TIME * 2);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('test', 123);
  });

  it('언마운트 시 디바운스가 취소되야 합니다.', () => {
    const mockFn = vi.fn();

    const { result, unmount } = renderHook(() =>
      useDebounce(mockFn, DELAY_TIME)
    );

    result.current();

    unmount(); // 언마운트

    vi.advanceTimersByTime(DELAY_TIME);
    expect(mockFn).not.toHaveBeenCalled();
  });

  it('maxWait 옵션을 사용해 최대 대기 시간을 설정할 수 있어야 한다', async () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() =>
      useDebounce(mockFn, DELAY_TIME, {
        maxWait: DELAY_TIME / 2, // 25ms
      })
    );

    result.current();
    vi.advanceTimersByTime(DELAY_TIME / 5); // 10ms
    expect(mockFn).toHaveBeenCalledTimes(0);

    result.current();
    vi.advanceTimersByTime(DELAY_TIME / 5); // 10ms
    expect(mockFn).toHaveBeenCalledTimes(0);

    result.current();
    vi.advanceTimersByTime(DELAY_TIME / 10); //5ms

    // debounce는 기본적으로 호출되면 대기 시간이 초기화됩니다.
    // maxWait 옵션은 연속적인 호출이 발생하더라도 첫 호출 기준으로 최대 대기 시간이 지나면 강제로 함수가 실행됩니다.
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('leading: true, trailing: true 일 때 처음 호출과 마지막 호출을 모두 실행해야 한다', async () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() =>
      useDebounce(mockFn, DELAY_TIME, {
        leading: true,
        trailing: true,
      })
    );

    result.current();
    expect(mockFn).toHaveBeenCalledTimes(1);

    result.current(); // 대기 시간 내 호출, trailing: true 이므로 후행 호출
    vi.advanceTimersByTime(DELAY_TIME);

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('leading: true, trailing: false 일 때 처음 호출을 실행하고 마지막 호출을 실행하지 않아야 한다', async () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() =>
      useDebounce(mockFn, DELAY_TIME, {
        leading: true,
        trailing: false,
      })
    );

    result.current();
    expect(mockFn).toHaveBeenCalledTimes(1);

    result.current(); // 대기 시간 내 호출, trailing: false 이므로 후행 호출되지 않음
    vi.advanceTimersByTime(DELAY_TIME);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('leading: false, trailing: true 일 때 처음 호출을 실행하지 않고 마지막 호출을 실행해야 한다', async () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() =>
      useDebounce(mockFn, DELAY_TIME, {
        leading: false,
        trailing: true,
      })
    );

    result.current(); // leading: false 이므로 대기 시간 이후 후행 호출
    expect(mockFn).toHaveBeenCalledTimes(0);

    vi.advanceTimersByTime(DELAY_TIME);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('leading: false, trailing: false 일 때 처음 호출과 마지막 호출을 모두 실행하지 않아야 한다', async () => {
    const mockFn = vi.fn();

    const { result } = renderHook(() =>
      useDebounce(mockFn, DELAY_TIME, {
        leading: false,
        trailing: false,
      })
    );

    result.current();
    expect(mockFn).toHaveBeenCalledTimes(0);

    result.current();
    vi.advanceTimersByTime(DELAY_TIME);

    expect(mockFn).toHaveBeenCalledTimes(0);
  });

  it('AbortSignal에 의해 중단된 경우 디바운스된 함수를 호출하지 않아야 한다', async () => {
    const mockFn = vi.fn();
    const controller = new AbortController();
    const signal = controller.signal;

    controller.abort();

    const { result } = renderHook(() =>
      useDebounce(mockFn, DELAY_TIME, { signal })
    );

    result.current();

    vi.advanceTimersByTime(DELAY_TIME);

    expect(mockFn).not.toHaveBeenCalled();
  });
});
