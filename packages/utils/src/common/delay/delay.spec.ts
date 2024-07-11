import { describe, expect, it } from 'vitest';
import { delay } from '.';

const time = 200;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe.concurrent('delay', () => {
  it('should delay the promise by the given time', async () => {
    const start = Date.now();

    const delayPromise = delay(time);

    vi.advanceTimersByTime(time); // 타이머를 time 만큼 진행시킴

    await delayPromise;

    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(time);
  });

  it('should reject with invalid time', () => {
    const errorMessage = 'Invalid time value';

    expect(delay(-100)).rejects.toThrow(errorMessage);
    expect(delay(NaN)).rejects.toThrow(errorMessage);
    expect(delay(Infinity)).rejects.toThrow(errorMessage);
    expect(delay(-Infinity)).rejects.toThrow(errorMessage);
    expect(delay(0.123)).rejects.toThrow(errorMessage);
  });
});
