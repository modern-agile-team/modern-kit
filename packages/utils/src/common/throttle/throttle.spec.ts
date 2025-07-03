import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { throttle } from '.';

beforeEach(() => {
  // https://github.com/testing-library/user-event/issues/833#issuecomment-1725364780
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

const DELAY_TIME = 50;

describe('throttle', () => {
  it('함수 호출을 스로틀링해야 한다', () => {
    const func = vi.fn();

    const throttledFunc = throttle(func, DELAY_TIME);

    throttledFunc(); // 첫 호출은 즉시 실행
    expect(func).toHaveBeenCalledTimes(1);

    throttledFunc(); // 대기 시간 내에 호출되기 때문에 무시
    throttledFunc();

    vi.advanceTimersByTime(DELAY_TIME);

    expect(func).toHaveBeenCalledTimes(2);
  });

  it('함수가 올바른 인자와 함께 호출되어야 한다', () => {
    const func = vi.fn();
    const throttledFunc = throttle(func, DELAY_TIME);

    throttledFunc('test', 123);

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith('test', 123);
  });

  it('한 번만 호출될 때는 후행 호출이 트리거되지 않아야 한다', async () => {
    const func = vi.fn();

    const throttled = throttle(func, DELAY_TIME);

    throttled();
    expect(func).toBeCalledTimes(1);

    vi.advanceTimersByTime(DELAY_TIME);
    expect(func).toBeCalledTimes(1);
  });

  it('trailing 옵션이 false인 경우 마지막 호출을 무시해야 한다', () => {
    const func = vi.fn();
    const throttledFunc = throttle(func, DELAY_TIME, { trailing: false });

    throttledFunc();
    expect(func).toBeCalledTimes(1);

    throttledFunc();

    vi.advanceTimersByTime(DELAY_TIME);
    expect(func).toBeCalledTimes(1);
  });

  it('leading 옵션이 false인 경우 첫 번째 호출을 무시해야 한다', () => {
    const func = vi.fn();
    const throttledFunc = throttle(func, DELAY_TIME, { leading: false });

    throttledFunc();
    expect(func).toBeCalledTimes(0);

    vi.advanceTimersByTime(DELAY_TIME);

    throttledFunc();
    expect(func).toBeCalledTimes(1);
  });

  it('AbortController을 통해 초기 호출을 중단할 수 있어야 한다', async () => {
    const func = vi.fn();

    const controller = new AbortController();
    controller.abort();

    const throttled = throttle(func, DELAY_TIME, { signal: controller.signal });

    throttled();
    expect(func).toBeCalledTimes(0);

    vi.advanceTimersByTime(DELAY_TIME);
    expect(func).toBeCalledTimes(0);
  });

  it('AbortController을 통해 후행 호출을 중단할 수 있어야 한다', async () => {
    const func = vi.fn();
    const controller = new AbortController();

    const throttled = throttle(func, DELAY_TIME, { signal: controller.signal });

    throttled();
    expect(func).toBeCalledTimes(1);

    throttled();

    controller.abort();

    vi.advanceTimersByTime(DELAY_TIME);
    expect(func).toBeCalledTimes(1);
  });
});
