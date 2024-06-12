import { Reference } from '.';

describe('Reference', () => {
  it('should properly infer the type', () => {
    const value = {} as Reference;

    if (typeof value === 'object') {
      expectTypeOf(value).toEqualTypeOf<Exclude<Reference, Function>>();
    }

    if (Array.isArray(value)) {
      expectTypeOf(value).toEqualTypeOf<any[]>();
    }

    if (typeof value === 'function') {
      expectTypeOf(value).toEqualTypeOf<Function>();
    }

    if (value instanceof Set) {
      expectTypeOf(value).toEqualTypeOf<Set<any>>();
    }

    if (value instanceof Map) {
      expectTypeOf(value).toEqualTypeOf<Map<any, any>>();
    }

    if (value instanceof WeakMap) {
      expectTypeOf(value).toEqualTypeOf<WeakMap<object, any>>();
    }

    if (value instanceof WeakSet) {
      expectTypeOf(value).toEqualTypeOf<WeakSet<object>>();
    }

    if (value instanceof Date) {
      expectTypeOf(value).toEqualTypeOf<Date>();
    }

    if (value instanceof RegExp) {
      expectTypeOf(value).toEqualTypeOf<RegExp>();
    }

    if (value instanceof Error) {
      expectTypeOf(value).toEqualTypeOf<Error>();
    }
  });
});
