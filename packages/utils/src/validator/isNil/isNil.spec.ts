import { describe, it, expect } from 'vitest';
import { isNil } from '.';

describe('isNil', () => {
  it('null이나 undefined가 아닌 값에 대해 false를 반환해야 합니다.', () => {
    for (const el of [1, 'dasdsa', { foo: 'bar' }, () => {}, Symbol()]) {
      expect(isNil(el)).toBe(false);
    }
  });

  it('null이나 undefined에 대해 true를 반환해야 합니다.', () => {
    for (const el of [null, undefined]) {
      expect(isNil(el)).toBe(true);
    }
  });
});
