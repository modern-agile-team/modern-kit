import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createSingleRequest } from '.';
import { delay } from '../delay';

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

const DELAY_TIME = 100;

describe('createSingleRequest', () => {
  it('진행 중인 호출이 없을 때 콜백이 정상적으로 실행되어야 합니다', async () => {
    const mockFn = vi.fn(async () => {
      await delay(DELAY_TIME);
      return 'result';
    });

    const singleRequest = createSingleRequest();
    const wrappedFn = singleRequest(mockFn);

    const promise = wrappedFn();

    await vi.advanceTimersByTimeAsync(DELAY_TIME);

    expect(await promise).toBe('result');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('진행 중인 호출이 있을 때 중복 호출 시 한 번만 실행되어야 합니다', async () => {
    const mockFn = vi.fn(async () => await delay(DELAY_TIME));
    const singleRequest = createSingleRequest();
    const wrappedFn = singleRequest(mockFn);

    wrappedFn();
    wrappedFn();
    wrappedFn();

    expect(mockFn).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(DELAY_TIME);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('진행 중인 호출이 있을 때 중복 호출 시 undefined를 반환해야 합니다', async () => {
    const mockFn = vi.fn(async () => {
      await delay(DELAY_TIME);
      return 'result';
    });

    const singleRequest = createSingleRequest();
    const wrappedFn = singleRequest(mockFn);

    wrappedFn();
    const duplicateResult = await wrappedFn();

    expect(duplicateResult).toBeUndefined();

    await vi.advanceTimersByTimeAsync(DELAY_TIME);
  });

  it('완료 후 재호출이 가능해야 합니다', async () => {
    const mockFn = vi.fn(async () => await delay(DELAY_TIME));
    const singleRequest = createSingleRequest();
    const wrappedFn = singleRequest(mockFn);

    wrappedFn();
    await vi.advanceTimersByTimeAsync(DELAY_TIME);
    expect(mockFn).toHaveBeenCalledTimes(1);

    wrappedFn();
    await vi.advanceTimersByTimeAsync(DELAY_TIME);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('콜백에 전달된 인자가 올바르게 전달되어야 합니다', async () => {
    const mockFn = vi.fn(async (a: number, b: string) => {
      await delay(DELAY_TIME);
      return `${a}-${b}`;
    });

    const singleRequest = createSingleRequest();
    const wrappedFn = singleRequest(mockFn);

    const promise = wrappedFn(42, 'hello');

    await vi.advanceTimersByTimeAsync(DELAY_TIME);

    expect(await promise).toBe('42-hello');
    expect(mockFn).toHaveBeenCalledWith(42, 'hello');
  });

  it('에러 발생 시 에러가 전파되고 잠금이 해제되어 재호출이 가능해야 합니다', async () => {
    const errorFn = vi.fn(async () => {
      throw new Error('에러 발생');
    });
    const successFn = vi.fn(async () => await delay(DELAY_TIME));

    const singleRequest = createSingleRequest();

    await expect(singleRequest(errorFn)()).rejects.toThrow('에러 발생');

    singleRequest(successFn)();
    await vi.advanceTimersByTimeAsync(DELAY_TIME);

    expect(successFn).toHaveBeenCalledTimes(1);
  });

  it('같은 인스턴스에서 서로 다른 콜백이 잠금을 공유해야 합니다', async () => {
    const mockFnA = vi.fn(async () => await delay(DELAY_TIME));
    const mockFnB = vi.fn(async () => await delay(DELAY_TIME));

    const singleRequest = createSingleRequest();

    singleRequest(mockFnA)(); // 실행 중...
    singleRequest(mockFnB)(); // 공유 잠금으로 차단됨

    expect(mockFnA).toHaveBeenCalledTimes(1);
    expect(mockFnB).toHaveBeenCalledTimes(0);

    await vi.advanceTimersByTimeAsync(DELAY_TIME);
  });

  it('다른 인스턴스는 독립적인 잠금을 가져야 합니다', async () => {
    const mockFnA = vi.fn(async () => await delay(DELAY_TIME));
    const mockFnB = vi.fn(async () => await delay(DELAY_TIME));

    const singleRequestA = createSingleRequest();
    const singleRequestB = createSingleRequest();

    singleRequestA(mockFnA)(); // 인스턴스 A 실행 중
    singleRequestB(mockFnB)(); // 인스턴스 B는 독립적이므로 실행됨

    expect(mockFnA).toHaveBeenCalledTimes(1);
    expect(mockFnB).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(DELAY_TIME);
  });
});
