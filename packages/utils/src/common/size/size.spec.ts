import { describe, it, expect } from 'vitest';
import { size } from '.';

describe('size function', () => {
  it('문자열의 길이를 반환해야 합니다.', () => {
    expect(size('foo')).toBe(3);
  });

  it('배열의 길이를 반환해야 합니다.', () => {
    expect(size([1, 2, 3])).toBe(3);
  });

  it('Set의 크기를 반환해야 합니다.', () => {
    const set = new Set([1, 2, 3]);
    expect(size(set)).toBe(3);
  });

  it('Map의 크기를 반환해야 합니다.', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    expect(size(map)).toBe(2);
  });

  it('NodeList의 길이를 반환해야 합니다.', () => {
    document.body.innerHTML = '<div></div><div></div><div></div>';

    const nodeList = document.querySelectorAll('div');
    expect(size(nodeList)).toBe(3);
  });

  it('HTMLCollection의 길이를 반환해야 합니다.', () => {
    document.body.innerHTML = '<div></div><div></div><div></div>';

    const htmlCollection = document.getElementsByTagName('div');
    expect(size(htmlCollection)).toBe(3);
  });

  it('일반 객체의 키 개수를 반환해야 합니다.', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(size(obj)).toBe(3);
  });

  it('유효하지 않은 값에 대해 에러를 발생시켜야 합니다.', () => {
    expect(() => size(123 as any)).toThrow('유효하지 않은 값입니다.');
    expect(() => size(null as any)).toThrow('유효하지 않은 값입니다.');
    expect(() => size(undefined as any)).toThrow('유효하지 않은 값입니다.');
    expect(() => size(new WeakMap())).toThrow('유효하지 않은 값입니다.');
    expect(() => size(new WeakSet())).toThrow('유효하지 않은 값입니다.');
  });
});
