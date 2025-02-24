import { describe, it, expect } from 'vitest';
import { isNotNil } from '.';

describe('isNotNil', () => {
  it('null이나 undefined가 아닌 값에 대해 true를 반환해야 합니다.', () => {
    for (const el of [1, 'dasdsa', { foo: 'bar' }, () => {}, Symbol()]) {
      expect(isNotNil(el)).toBe(true);
    }
  });

  it('null이나 undefined 값에 대해 false를 반환해야 합니다.', () => {
    for (const el of [null, undefined]) {
      expect(isNotNil(el)).toBe(false);
    }
  });
});
