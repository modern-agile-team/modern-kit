import { describe, it, expect } from 'vitest';
import { isEmpty } from '.';

describe('isEmpty', () => {
  it('null/undefined 이면 true 를 반환해야 합니다.', () => {
    expect(isEmpty(null)).toBeTruthy();
    expect(isEmpty(undefined)).toBeTruthy();
  });

  it('빈 문자열이면 true, 그렇지 않으면 false 를 반환해야 합니다.', () => {
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty(' ')).toBeFalsy();
    expect(isEmpty('a')).toBeFalsy();
  });

  it('빈 배열이면 true, 그렇지 않으면 false 를 반환해야 합니다.', () => {
    expect(isEmpty([])).toBeTruthy();
    expect(isEmpty([0])).toBeFalsy();
    expect(isEmpty([undefined])).toBeFalsy();
  });

  it('size 가 0인 Map/Set 이면 true, 그렇지 않으면 false 를 반환해야 합니다.', () => {
    expect(isEmpty(new Map())).toBeTruthy();
    expect(isEmpty(new Set())).toBeTruthy();
    expect(isEmpty(new Map([['a', 1]]))).toBeFalsy();
    expect(isEmpty(new Set([1]))).toBeFalsy();
  });

  it('key 가 없는 순수 객체이면 true, 그렇지 않으면 false 를 반환해야 합니다.', () => {
    expect(isEmpty({})).toBeTruthy();
    expect(isEmpty(Object.create(null))).toBeTruthy();

    expect(isEmpty({ a: 1 })).toBeFalsy();
    expect(isEmpty({ a: undefined })).toBeFalsy();
  });

  it('클래스 인스턴스나 프로토타입이 있는 객체는 순수 객체가 아니므로 false 를 반환해야 합니다.', () => {
    class Foo {}

    expect(isEmpty(new Foo())).toBeFalsy();
    expect(isEmpty(Object.create({ a: 1 }))).toBeFalsy();
  });

  it('숫자, boolean, 함수, Date 등은 false 를 반환해야 합니다.', () => {
    for (const el of [0, 1, NaN, true, false, () => {}, new Date(), Symbol()]) {
      expect(isEmpty(el)).toBeFalsy();
    }
  });
});
