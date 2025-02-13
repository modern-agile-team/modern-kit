import { describe, expect, it } from 'vitest';
import { delay } from '.';

const time = 200;

describe('delay', () => {
  it('주어진 시간만큼 프로미스를 지연시켜야 합니다.', async () => {
    const start = Date.now();

    await delay(time);

    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(time);
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
