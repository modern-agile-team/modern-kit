import { describe, expectTypeOf, it } from 'vitest';
import { capitalize } from '.';

describe('capitalize', () => {
  it('문자열의 첫 글자를 대문자로 변환해야 합니다.', () => {
    const result = capitalize('hello');
    expectTypeOf(result).toEqualTypeOf<'Hello'>();
  });

  it('문자열의 첫 글자가 대문자인 경우 그대로 반환해야 합니다.', () => {
    const result = capitalize('Hello');
    expectTypeOf(result).toEqualTypeOf<'Hello'>();
  });

  it('문자열이 빈 문자열인 경우 빈 문자열을 반환해야 합니다.', () => {
    const result = capitalize('');
    expectTypeOf(result).toEqualTypeOf<''>();
  });

  it('문자열이 숫자인 경우 숫자를 반환해야 합니다.', () => {
    const result = capitalize('123');
    expectTypeOf(result).toEqualTypeOf<'123'>();
  });
});
