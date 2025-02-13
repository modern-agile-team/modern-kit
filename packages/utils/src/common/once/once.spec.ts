import { describe, it, expect, vi } from 'vitest';
import { once } from '.';

describe('once', () => {
  it('함수가 한 번만 호출되어야 합니다.', () => {
    const callback = vi.fn(() => 'result');
    const onceCallback = once(callback);

    const firstResult = onceCallback();
    const secondResult = onceCallback();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(firstResult).toBe('result');
    expect(secondResult).toBe('result');
  });

  it('이후 호출에서는 캐시된 결과를 반환해야 합니다.', () => {
    const callback = vi.fn(() => Math.random()); // random
    const onceCallback = once(callback);

    const firstResult = onceCallback();
    const secondResult = onceCallback();

    expect(secondResult).toBe(firstResult);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('첫 번째 호출에서는 콜백에 인자를 전달해야 합니다.', () => {
    const callback = vi.fn((x: number, y: number) => x + y);
    const onceCallback = once(callback);

    const firstResult = onceCallback(2, 3);
    const secondResult = onceCallback(2, 3);

    expect(firstResult).toBe(5);
    expect(secondResult).toBe(5);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('이후 호출에서는 인자를 무시해야 합니다.', () => {
    const callback = vi.fn((x: number, y: number) => x + y);
    const onceCallback = once(callback);

    const firstResult = onceCallback(2, 3);
    const secondResult = onceCallback(10, 20); // ignore arguments

    expect(firstResult).toBe(5);
    expect(secondResult).toBe(5);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
