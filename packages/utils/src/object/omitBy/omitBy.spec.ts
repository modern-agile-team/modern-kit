import { describe, it, expect, expectTypeOf } from 'vitest';
import { omitBy } from '.';

describe('omitBy', () => {
  it('주어진 콜백함수가 참인 키를 생략한 객체를 반환해야 합니다.', () => {
    const inputObj = { a: 1, b: '', c: undefined, d: null, e: 'str' };
    const omittedObj = omitBy(inputObj, (value) => !value);

    expect(omittedObj).toEqual({ a: 1, e: 'str' });
  });

  it('모든 키가 생략된다면 빈 객체를 반환해야 합니다.', () => {
    const inputObj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const omittedObj = omitBy(inputObj, (value) => typeof value === 'number');

    expect(omittedObj).toEqual({});
  });

  it('생략할 키가 없다면 원본 객체를 반환해야 합니다.', () => {
    const inputObj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
    const omittedObj = omitBy(inputObj, (value) => typeof value === 'string');

    expect(omittedObj).toEqual(inputObj);
  });

  it('빈 객체가 주어진다면 빈 객체를 반환해야 합니다.', () => {
    const inputObj = {};
    const omittedObj = omitBy(inputObj, () => true);

    expect(omittedObj).toEqual({});
  });
});
