import { describe, it, expect, expectTypeOf } from 'vitest';
import { hasProperty } from '.';

describe('hasProperty', () => {
  const testObj = { foo: 'foo', bar: 'bar' } as const;

  it('객체에 프로퍼티가 존재하는 경우 true를 반환해야 합니다.', () => {
    const testKey = 'foo';

    expect(hasProperty(testObj, testKey)).toBeTruthy();
  });

  it('객체에 프로퍼티가 존재하지 않는 경우 false를 반환해야 합니다.', () => {
    const testKey = 'zoo';

    expect(hasProperty(testObj, testKey)).toBeFalsy();
  });

  it('객체에 포함된 프로퍼티인 경우 두 번째 인자의 타입을 좁혀야 합니다.', () => {
    const testKey = 'foo' as string;

    if (hasProperty(testObj, testKey)) {
      expectTypeOf(testKey).toEqualTypeOf<'foo' | 'bar'>();
    } else {
      expectTypeOf(testKey).toEqualTypeOf<string>();
    }
  });
});
