import { size } from '.';

describe('size function', () => {
  it('should return the length of a string', () => {
    expect(size('foo')).toBe(3);
  });

  it('should return the length of a array', () => {
    expect(size([1, 2, 3])).toBe(3);
  });

  it('should return the size of a Set', () => {
    const set = new Set([1, 2, 3]);
    expect(size(set)).toBe(3);
  });

  it('should return the size of a Map', () => {
    const map = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    expect(size(map)).toBe(2);
  });

  it('should return the length of a NodeList', () => {
    document.body.innerHTML = '<div></div><div></div><div></div>';

    const nodeList = document.querySelectorAll('div');
    expect(size(nodeList)).toBe(3);
  });

  it('should return the length of an HTMLCollection', () => {
    document.body.innerHTML = '<div></div><div></div><div></div>';

    const htmlCollection = document.getElementsByTagName('div');
    expect(size(htmlCollection)).toBe(3);
  });

  it('should return the number of keys in a plain object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(size(obj)).toBe(3);
  });

  it('should throw an error for invalid values', () => {
    expect(() => size(123 as any)).toThrow('Invalid value');
    expect(() => size(null as any)).toThrow('Invalid value');
    expect(() => size(undefined as any)).toThrow('Invalid value');
    expect(() => size(new WeakMap())).toThrow('Invalid value');
    expect(() => size(new WeakSet())).toThrow('Invalid value');
  });
});
