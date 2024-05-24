import { describe, expect, it } from 'vitest';
import { delay } from '.';

describe('delay', () => {
  it('should delay the promise by the given time', async () => {
    const time = 200;
    const start = Date.now();

    await delay(time);

    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(time);
  });

  it('should reject with negative time', async () => {
    await expect(delay(-100)).rejects.toThrow('Invalid time value');
  });

  it('should reject with NaN time', async () => {
    await expect(delay(NaN)).rejects.toThrow('Invalid time value');
  });
});
