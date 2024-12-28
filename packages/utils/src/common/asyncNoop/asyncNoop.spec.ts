import { describe, it, expect } from 'vitest';
import { asyncNoop } from '.';

describe('asyncNoop', () => {
  it('Promise를 반환해야 합니다', () => {
    expect(asyncNoop()).toBeInstanceOf(Promise);
  });
});
