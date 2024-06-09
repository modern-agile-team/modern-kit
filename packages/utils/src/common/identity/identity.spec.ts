import { identity } from '.';

describe('identity', () => {
  it('should return the same string value', () => {
    const value = 'test';
    const result = identity(value);

    expect(result).toBe(value);
    expectTypeOf(result).toEqualTypeOf<string>();
  });

  it('should return the same number value', () => {
    const value = 42;
    const result = identity(value);

    expect(result).toBe(value);
    expectTypeOf(result).toEqualTypeOf<number>();
  });

  it('should return the same boolean value', () => {
    const value = true;
    const result = identity(value);

    expect(result).toBe(value);
    expectTypeOf(result).toEqualTypeOf<boolean>();
  });

  it('should return the same object reference', () => {
    const value = { key: 'value' };
    const result = identity(value);

    expect(result).toBe(value);
    expect(result).toEqual(value); // 참조가 동일한지 확인
    expectTypeOf(result).toEqualTypeOf<{
      key: string;
    }>();
  });

  it('should return the same array reference', () => {
    const value = [1, 2, 3];
    const result = identity(value);

    expect(result).toBe(value);
    expect(result).toEqual(value); // 참조가 동일한지 확인
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  it('should return the same function reference', () => {
    const value = () => 'function';
    const result = identity(value);

    expect(result).toBe(value);
    expectTypeOf(result).toEqualTypeOf<() => string>();
  });

  it('should return the same value for null', () => {
    const value = null;
    const result = identity(value);

    expect(result).toBe(value);
    expectTypeOf(result).toEqualTypeOf<null>();
  });

  it('should return the same value for undefined', () => {
    const value = undefined;
    const result = identity(value);

    expect(result).toBe(value);
    expectTypeOf(result).toEqualTypeOf<undefined>();
  });
});
