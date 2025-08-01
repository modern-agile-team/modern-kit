import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { debounce } from '.';

beforeEach(() => {
  // https://github.com/testing-library/user-event/issues/833#issuecomment-1725364780
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

const DELAY_TIME = 50;

describe('debounce', () => {
  it('함수 호출을 디바운스해야 한다', async () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DELAY_TIME);

    debouncedFunc();
    debouncedFunc();
    debouncedFunc();

    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(DELAY_TIME);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('지정된 대기 시간만큼 함수 호출을 지연시켜야 한다', async () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DELAY_TIME);

    debouncedFunc();
    vi.advanceTimersByTime(DELAY_TIME / 2);
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(DELAY_TIME / 2);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('대기 시간이 끝나기 전에 다시 호출되면 대기 시간을 리셋해야 한다', async () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DELAY_TIME);

    debouncedFunc();
    vi.advanceTimersByTime(DELAY_TIME / 2);

    debouncedFunc();
    vi.advanceTimersByTime(DELAY_TIME / 2);

    debouncedFunc();
    vi.advanceTimersByTime(DELAY_TIME / 2);

    debouncedFunc();

    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(DELAY_TIME);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('디바운스된 함수 호출을 취소할 수 있어야 한다', async () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DELAY_TIME);

    debouncedFunc();
    debouncedFunc.cancel();
    vi.advanceTimersByTime(DELAY_TIME);

    expect(func).not.toHaveBeenCalled();
  });

  it('함수를 올바른 인자와 함께 호출해야 한다', async () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DELAY_TIME);

    debouncedFunc('test', 123);

    vi.advanceTimersByTime(DELAY_TIME * 2);

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith('test', 123);
  });

  it('maxWait 옵션을 사용해 최대 대기 시간을 설정할 수 있어야 한다', async () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DELAY_TIME, {
      maxWait: DELAY_TIME / 2, // 25ms
    });

    debouncedFunc();
    vi.advanceTimersByTime(DELAY_TIME / 5); // 10ms
    expect(func).toHaveBeenCalledTimes(0);

    debouncedFunc();
    vi.advanceTimersByTime(DELAY_TIME / 5); // 10ms
    expect(func).toHaveBeenCalledTimes(0);

    debouncedFunc();
    vi.advanceTimersByTime(DELAY_TIME / 10); //5ms

    // debounce는 기본적으로 호출되면 대기 시간이 초기화됩니다.
    // maxWait 옵션은 연속적인 호출이 발생하더라도 첫 호출 기준으로 최대 대기 시간이 지나면 강제로 함수가 실행됩니다.
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('leading: true, trailing: true 일 때 처음 호출과 마지막 호출을 모두 실행해야 한다', async () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DELAY_TIME, {
      leading: true,
      trailing: true,
    });

    debouncedFunc();
    expect(func).toHaveBeenCalledTimes(1);

    debouncedFunc(); // 대기 시간 내 호출, trailing: true 이므로 후행 호출
    vi.advanceTimersByTime(DELAY_TIME);

    expect(func).toHaveBeenCalledTimes(2);
  });

  it('leading: true, trailing: false 일 때 처음 호출을 실행하고 마지막 호출을 실행하지 않아야 한다', async () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DELAY_TIME, {
      leading: true,
      trailing: false,
    });

    debouncedFunc();
    expect(func).toHaveBeenCalledTimes(1);

    debouncedFunc(); // 대기 시간 내 호출, trailing: false 이므로 후행 호출되지 않음
    vi.advanceTimersByTime(DELAY_TIME);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('leading: false, trailing: true 일 때 처음 호출을 실행하지 않고 마지막 호출을 실행해야 한다', async () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DELAY_TIME, {
      leading: false,
      trailing: true,
    });

    debouncedFunc(); // leading: false 이므로 대기 시간 이후 후행 호출
    expect(func).toHaveBeenCalledTimes(0);

    vi.advanceTimersByTime(DELAY_TIME);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('leading: false, trailing: false 일 때 처음 호출과 마지막 호출을 모두 실행하지 않아야 한다', async () => {
    const func = vi.fn();
    const debouncedFunc = debounce(func, DELAY_TIME, {
      leading: false,
      trailing: false,
    });

    debouncedFunc();
    expect(func).toHaveBeenCalledTimes(0);

    debouncedFunc();
    vi.advanceTimersByTime(DELAY_TIME);

    expect(func).toHaveBeenCalledTimes(0);
  });

  it('AbortSignal에 의해 중단된 경우 디바운스된 함수를 호출하지 않아야 한다', async () => {
    const func = vi.fn();
    const controller = new AbortController();
    const signal = controller.signal;

    controller.abort();

    const debouncedFunc = debounce(func, DELAY_TIME, { signal });

    debouncedFunc();

    vi.advanceTimersByTime(DELAY_TIME);

    expect(func).not.toHaveBeenCalled();
  });

  it('AbortSignal 이벤트 리스너가 중복으로 추가되지 않아야 한다', async () => {
    const func = vi.fn();
    const controller = new AbortController();
    const signal = controller.signal;
    const addEventListenerSpy = vi.spyOn(signal, 'addEventListener');

    const debouncedFunc = debounce(func, DELAY_TIME, { signal });

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
