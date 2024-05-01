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
});
