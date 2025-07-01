import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { debounce } from '.';

beforeEach(() => {
  // https://github.com/testing-library/user-event/issues/833#issuecomment-1725364780
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('debounce', () => {
  it('함수 호출을 디바운스해야 한다', async () => {
    const func = vi.fn();
    const wait = 50;
    const debouncedFunc = debounce(func, wait);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    vi.advanceTimersByTime(wait);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('지정된 대기 시간만큼 함수 호출을 지연시켜야 한다', async () => {
    const func = vi.fn();
    const wait = 50;
    const debouncedFunc = debounce(func, wait);

    debouncedFunc();
    vi.advanceTimersByTime(wait / 2);
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(wait / 2);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('대기 시간이 끝나기 전에 다시 호출되면 대기 시간을 리셋해야 한다', async () => {
    const func = vi.fn();
    const wait = 50;
    const debouncedFunc = debounce(func, wait);

    debouncedFunc();
    vi.advanceTimersByTime(wait / 2);

    debouncedFunc();
    vi.advanceTimersByTime(wait / 2);

    debouncedFunc();
    vi.advanceTimersByTime(wait / 2);

    debouncedFunc();

    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(wait);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('디바운스된 함수 호출을 취소할 수 있어야 한다', async () => {
    const func = vi.fn();
    const wait = 50;
    const debouncedFunc = debounce(func, wait);

    debouncedFunc();
    debouncedFunc.cancel();
    vi.advanceTimersByTime(wait);

    expect(func).not.toHaveBeenCalled();
  });

  it('함수를 올바른 인자와 함께 호출해야 한다', async () => {
    const func = vi.fn();
    const wait = 50;
    const debouncedFunc = debounce(func, wait);

    debouncedFunc('test', 123);

    vi.advanceTimersByTime(wait * 2);

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith('test', 123);
  });

  it('AbortSignal을 통해 중단되면 디바운스된 함수 호출을 취소해야 한다', async () => {
    const func = vi.fn();
    const wait = 50;
    const controller = new AbortController();
    const signal = controller.signal;
    const debouncedFunc = debounce(func, wait, { signal });

    debouncedFunc();
    controller.abort();

    vi.advanceTimersByTime(wait);

    expect(func).not.toHaveBeenCalled();
  });

  it('maxWait 옵션을 사용해 최대 대기 시간을 설정할 수 있어야 한다', async () => {
    const func = vi.fn();
    const wait = 50;
    const debouncedFunc = debounce(func, wait, { maxWait: wait / 2 });

    debouncedFunc();
    vi.advanceTimersByTime(wait / 5);

    debouncedFunc();
    vi.advanceTimersByTime(wait / 5);

    debouncedFunc();
    vi.advanceTimersByTime(wait / 10);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('이미 AbortSignal에 의해 중단된 경우 디바운스된 함수를 호출하지 않아야 한다', async () => {
    const func = vi.fn();
    const wait = 50;
    const controller = new AbortController();
    const signal = controller.signal;

    controller.abort();

    const debouncedFunc = debounce(func, wait, { signal });

    debouncedFunc();

    vi.advanceTimersByTime(wait);

    expect(func).not.toHaveBeenCalled();
  });

  it('abort 이벤트 리스너가 중복으로 추가되지 않아야 한다', async () => {
    const func = vi.fn();
    const wait = 50;
    const controller = new AbortController();
    const signal = controller.signal;
    const addEventListenerSpy = vi.spyOn(signal, 'addEventListener');

    const debouncedFunc = debounce(func, wait, { signal });

    debouncedFunc();
    debouncedFunc();

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(func).toHaveBeenCalledTimes(1);

    const listenerCount = addEventListenerSpy.mock.calls.filter(
      ([event]) => event === 'abort'
    ).length;
    expect(listenerCount).toBe(1);

    addEventListenerSpy.mockRestore();
  });
});
