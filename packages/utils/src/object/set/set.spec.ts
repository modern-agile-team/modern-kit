import { describe, it, expect } from 'vitest';
import { set } from '.';

describe('set', () => {
  it('객체의 주어진 경로의 값을 업데이트할 수 있어야 합니다', () => {
    const obj = { a: { b: 1 } };

    set(obj, 'a.b', 2);
    expect(obj).toEqual({ a: { b: 2 } });

    set(obj, 'a', { b: 2 });
    expect(obj).toEqual({ a: { b: 2 } });
  });

  it('함수를 사용하여 객체의 주어진 경로의 값을 업데이트할 수 있어야 합니다', () => {
    const obj = { a: { b: 1 } };

    set(obj, 'a.b', (value) => value + 1);
    expect(obj).toEqual({ a: { b: 2 } });
  });

  it('선택적 속성 경로를 통해 객체를 업데이트할 수 있어야 합니다', () => {
    type Obj = { a?: { b: number } };

    const obj: Obj = { a: { b: 1 } };

    set(obj, 'a?.b', 2);
    expect(obj).toEqual({ a: { b: 2 } });
  });

  it('선택적 속성 경로와 함수를 통해 객체를 업데이트할 수 있어야 합니다', () => {
    type Obj = { a?: { b: number } };
    const obj: Obj = { a: { b: 1 } };

    set(obj, 'a?.b', (value) => (value ?? 0) + 1);
    expect(obj).toEqual({ a: { b: 2 } });
  });

  it('경로가 존재하지 않을 때 객체를 업데이트할 수 있어야 합니다', () => {
    type Obj = { a?: { b: number } };
    const obj: Obj = {};

    set(obj, 'a?.b', 1);
    expect(obj).toEqual({ a: { b: 1 } });
  });

  it('불변하게 업데이트할 수 있어야 합니다', () => {
    const originalObj = { a: { b: 1 } };
    const updatedObj = set(originalObj, 'a.b', 2, { immutable: true });

    expect(originalObj).toEqual({ a: { b: 1 } });
    expect(updatedObj).toEqual({ a: { b: 2 } });
  });
});
