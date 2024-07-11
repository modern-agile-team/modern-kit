import { pick } from '.';

describe.concurrent('pick', () => {
  it('should return a new object with a single key extracted from an object', () => {
    const symbol = Symbol('d');
    const inputObj = { a: 1, b: 2, c: 3, [symbol]: 4 } as const;
    const pickedObj = pick(inputObj, 'b');

    expect(pickedObj).toEqual({ b: 2 });
  });

  it('should return a new object with multiple keys extracted from an object', () => {
    const symbol = Symbol('d');
    const inputObj = { a: 1, b: 2, c: 3, [symbol]: 4 } as const;
    const pickedObj = pick(inputObj, ['a', 'c']);

    expect(pickedObj).toEqual({ a: 1, c: 3 });
  });

  it('should return a new object that is deeply copied', () => {
    const symbol = Symbol('d');
    const inputObj = { a: 1, b: { x: 2, y: 3 }, c: 4, [symbol]: 4 } as const;
    const pickedObj = pick(inputObj, ['b']);

    expect(pickedObj.b).not.toBe(inputObj.b);
    expect(pickedObj.b).toEqual(inputObj.b);
  });
});
