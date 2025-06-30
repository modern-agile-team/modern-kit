import { describe, it, expectTypeOf } from 'vitest';
import { Reference } from '.';

describe('Reference', () => {
  it('참조 타입을 반환하며, 조건식으로 타입을 구분 할 수 있어야 합니다.', () => {
    const value = {} as Reference;

    if (typeof value === 'object') {
      expectTypeOf(value).toEqualTypeOf<
        Exclude<Reference, (...args: any[]) => any>
      >();
    }

    if (Array.isArray(value)) {
      expectTypeOf(value).toEqualTypeOf<any[]>();
    }

    if (typeof value === 'function') {
      expectTypeOf(value as (...args: any[]) => any).toEqualTypeOf<
        (...args: any[]) => any
      >();
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

    if (value instanceof Promise) {
      expectTypeOf(value).toEqualTypeOf<Promise<any>>();
    }

    if (value instanceof ArrayBuffer) {
      expectTypeOf(value).toEqualTypeOf<ArrayBuffer>();
    }

    if (value instanceof DataView) {
      expectTypeOf(value).toEqualTypeOf<DataView>();
    }

    if (value instanceof Int8Array) {
      expectTypeOf(value).toEqualTypeOf<Int8Array>();
    }

    if (value instanceof Uint8Array) {
      expectTypeOf(value).toEqualTypeOf<Uint8Array>();
    }

    if (value instanceof Uint8ClampedArray) {
      expectTypeOf(value).toEqualTypeOf<Uint8ClampedArray>();
    }

    if (value instanceof Int16Array) {
      expectTypeOf(value).toEqualTypeOf<Int16Array>();
    }

    if (value instanceof Uint16Array) {
      expectTypeOf(value).toEqualTypeOf<Uint16Array>();
    }

    if (value instanceof Int32Array) {
      expectTypeOf(value).toEqualTypeOf<Int32Array>();
    }

    if (value instanceof Uint32Array) {
      expectTypeOf(value).toEqualTypeOf<Uint32Array>();
    }

    if (value instanceof Float32Array) {
      expectTypeOf(value).toEqualTypeOf<Float32Array>();
    }

    if (value instanceof Float64Array) {
      expectTypeOf(value).toEqualTypeOf<Float64Array>();
    }

    if (value instanceof BigInt64Array) {
      expectTypeOf(value).toEqualTypeOf<BigInt64Array>();
    }

    if (value instanceof BigUint64Array) {
      expectTypeOf(value).toEqualTypeOf<BigUint64Array>();
    }
  });
});
