import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { delay } from '.';

const time = 200;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('delay', () => {
  it('주어진 시간만큼 프로미스를 지연시켜야 합니다.', async () => {
    const promise = delay(time);

    await vi.advanceTimersByTimeAsync(time);

    await expect(promise).resolves.toBeUndefined();
  });

  it('유효하지 않은 시간이 주어지면 거부해야 합니다.', () => {
    const errorMessage = 'Invalid time value';

    expect(delay(-100)).rejects.toThrow(errorMessage);
    expect(delay(NaN)).rejects.toThrow(errorMessage);
    expect(delay(Infinity)).rejects.toThrow(errorMessage);
    expect(delay(-Infinity)).rejects.toThrow(errorMessage);
    expect(delay(0.123)).rejects.toThrow(errorMessage);
  });
});
