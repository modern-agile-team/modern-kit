import { describe, it, expect, expectTypeOf } from 'vitest';
import { isPromise } from '.';

describe('isPromise', () => {
  it('should return true if the given value is a Promise', () => {
    expect(isPromise(Promise.resolve())).toBeTruthy();

    expect(isPromise(() => {})).toBeFalsy();
    expect(isPromise('123')).toBeFalsy();
    expect(isPromise(true)).toBeFalsy();
    expect(isPromise({})).toBeFalsy();
    expect(isPromise(null)).toBeFalsy();
  });

  it('should narrow the type to Promise if isPromise returns true', () => {
    const promise: any = Promise.resolve(1);

    if (isPromise<number>(promise)) {
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    } else {
      expectTypeOf(promise).toEqualTypeOf<any>();
    }
  });
});
