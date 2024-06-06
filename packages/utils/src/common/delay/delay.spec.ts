import { describe, expect, it } from 'vitest';
import { delay } from '.';

const time = 200;

describe('delay', () => {
  it('should delay the promise by the given time', async () => {
    const start = Date.now();

    await delay(time);

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
