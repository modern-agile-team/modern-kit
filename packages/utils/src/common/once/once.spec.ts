import { describe, it, expect, vi } from 'vitest';
import { once } from '.';

describe('once', () => {
  it('should call the function only once', () => {
    const callback = vi.fn(() => 'result');
    const onceCallback = once(callback);

    const firstResult = onceCallback();
    const secondResult = onceCallback();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(firstResult).toBe('result');
    expect(secondResult).toBe('result');
  });

  it('should return the cached result on subsequent calls', () => {
    const callback = vi.fn(() => Math.random()); // random
    const onceCallback = once(callback);

    const firstResult = onceCallback();
    const secondResult = onceCallback();

    expect(secondResult).toBe(firstResult);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should pass the arguments to the callback on the first call', () => {
    const callback = vi.fn((x: number, y: number) => x + y);
    const onceCallback = once(callback);

    const firstResult = onceCallback(2, 3);
    const secondResult = onceCallback(2, 3);

    expect(firstResult).toBe(5);
    expect(secondResult).toBe(5);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should ignore arguments on subsequent calls', () => {
    const callback = vi.fn((x: number, y: number) => x + y);
    const onceCallback = once(callback);

    const firstResult = onceCallback(2, 3);
    const secondResult = onceCallback(10, 20); // ignore arguments

    expect(firstResult).toBe(5);
    expect(secondResult).toBe(5);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
