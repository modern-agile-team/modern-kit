import { describe, it, expect, expectTypeOf } from 'vitest';
import { pickBy } from '.';

describe('pickBy', () => {
  it('주어진 콜백함수가 참인 키를 포함한 객체를 반환해야 합니다.', () => {
    const inputObj = { a: 1, b: '', c: undefined, d: null, e: 'str' };
    const pickedObj = pickBy(inputObj, (value) => !value);

    expect(pickedObj).toEqual({ b: '', c: undefined, d: null });
  });

  it('포함할 키가 없다면 빈 객체를 반환해야 합니다.', () => {
    const inputObj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const pickedObj = pickBy(inputObj, (value) => typeof value === 'string');

    expect(pickedObj).toEqual({});
  });

  it('모든 키가 포함된다면 원본 객체를 반환해야 합니다.', () => {
    const inputObj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const pickedObj = pickBy(inputObj, (value) => typeof value === 'number');

    expect(pickedObj).toEqual(inputObj);
  });

  it('빈 객체가 주어진다면 빈 객체를 반환해야 합니다.', () => {
    const inputObj = {};
    const pickedObj = pickBy(inputObj, () => true);

    expect(pickedObj).toEqual({});
  });
});
