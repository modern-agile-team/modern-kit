import { describe, it, expect } from 'vitest';
import { noop } from '.';

describe('noop', () => {
  it('should return undefined', () => {
    const result = noop();

    expect(result).toBeUndefined();
  });
});
