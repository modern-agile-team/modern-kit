import { hasProperty } from '.';

describe.concurrent('hasProperty', () => {
  const testObj = { foo: 'foo', bar: 'bar' } as const;

  it('should return true if a property exists in a object', () => {
    const testKey = 'foo';

    expect(hasProperty(testObj, testKey)).toBeTruthy();
  });

  it('should return false if a property does not exist in a object', () => {
    const testKey = 'zoo';

    expect(hasProperty(testObj, testKey)).toBeFalsy();
  });

  it('should narrow the type of the second argument if it is included in a object', () => {
    const testKey = 'foo' as string;

    if (hasProperty(testObj, testKey)) {
      expectTypeOf(testKey).toEqualTypeOf<'foo' | 'bar'>();
    } else {
      expectTypeOf(testKey).toEqualTypeOf<string>();
    }
  });
});
