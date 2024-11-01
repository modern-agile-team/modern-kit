import { describe, it, expect, expectTypeOf } from 'vitest';
import { isPromise } from '.';
import { asyncNoop } from '../../common/asyncNoop';

describe('isPromise', () => {
  it('value가 Promise라면 true를 반환해야 합니다.', () => {
    expect(isPromise(Promise.resolve())).toBeTruthy();
    expect(isPromise(asyncNoop())).toBeTruthy();
  });

  it('value가 Promise가 아니라면 false를 반환해야 합니다.', () => {
    expect(isPromise(() => {})).toBeFalsy();
    expect(isPromise('123')).toBeFalsy();
    expect(isPromise(true)).toBeFalsy();
    expect(isPromise({})).toBeFalsy();
    expect(isPromise(null)).toBeFalsy();
  });

  it('isPromise가 true를 반환하면 value의 타입이 Promise로 좁혀져야 합니다.', () => {
    const promise: any = Promise.resolve(1);

    if (isPromise<number>(promise)) {
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    } else {
      expectTypeOf(promise).toEqualTypeOf<any>();
    }
  });
});
