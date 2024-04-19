import { isNotNullish } from '.';

describe('isNotNullish', () => {
  it('should return true for non-nullish values', () => {
    for (const el of [1, 'dasdsa', { foo: 'bar' }, () => {}, Symbol()]) {
      expect(isNotNullish(el)).toBe(true);
    }
  });

  it('should return false for nullish values', () => {
    for (const el of [null, undefined]) {
      expect(isNotNullish(el)).toBe(false);
    }
  });
});
