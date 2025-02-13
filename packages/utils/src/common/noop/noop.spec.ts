import { describe, it, expect } from 'vitest';
import { noop } from '.';

describe('noop', () => {
  it('undefined를 반환해야 합니다.', () => {
    const result = noop();

    expect(result).toBeUndefined();
  });
});
