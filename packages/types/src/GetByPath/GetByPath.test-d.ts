import { describe, it, expectTypeOf } from 'vitest';
import { GetByPath } from '.';

describe('GetByPath', () => {
  it('객체 타입에서 지정된 경로에 해당하는 값의 타입을 반환해야 합니다.', () => {
    expectTypeOf<GetByPath<{ a: { b: number } }, 'a'>>().toEqualTypeOf<{
      b: number;
    }>();

    expectTypeOf<
      GetByPath<{ a: { b: number } }, 'a.b'>
    >().toEqualTypeOf<number>();
  });

  it('옵셔널 키가 있는 경우, 옵셔널(?) 경로로 접근해야 합니다.', () => {
    expectTypeOf<GetByPath<{ a?: { b?: 1 } }, 'a'>>().toEqualTypeOf<
      | {
          b?: 1;
        }
      | undefined
    >();

    expectTypeOf<GetByPath<{ a?: { b?: 1 } }, 'a?.b'>>().toEqualTypeOf<
      1 | undefined
    >();
  });
});
