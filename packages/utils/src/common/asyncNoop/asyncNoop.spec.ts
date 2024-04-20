import { describe, expect, it } from 'vitest';
import { asyncNoop } from '.';

describe('asyncNoop', () => {
  it('should return a Promise', () => {
    expect(asyncNoop()).toBeInstanceOf(Promise);
  });
});
