import { describe, it, expectTypeOf } from 'vitest';
import { Integer } from '.';

describe('Integer', () => {
  it('정수라면 해당 타입을 반환하고, 정수가 아니라면 never를 반환해야 합니다. ', () => {
    const validInteger1: Integer<1> = 1; // 양의 정수
    const validInteger2: Integer<-1> = -1; // 음의 정수
    const invalidInteger: Integer<1.5> = null as unknown as Integer<1.5>;

    expectTypeOf(validInteger1).toEqualTypeOf<1>();
    expectTypeOf(validInteger2).toEqualTypeOf<-1>();
    expectTypeOf(invalidInteger).toEqualTypeOf<never>();
  });
});
