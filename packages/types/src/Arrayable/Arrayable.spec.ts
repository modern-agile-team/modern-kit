import { Arrayable } from '.';

describe('Nullable', () => {
  it('제네릭 타입으로 넣어준 원시 타입과 해당 원시 타입으로 이뤄진 배열을 허용합니다.', () => {
    const test = ['123'] as Arrayable<string>;

    expectTypeOf(test).toEqualTypeOf<string | string[]>();
  });

  it('조건식으로 원시 타입, 배열 타입 각각 타입을 좁힐 수 있습니다.', () => {
    const test = ['123'] as Arrayable<string>;

    if (Array.isArray(test)) {
      expectTypeOf(test).toEqualTypeOf<string[]>();
    } else {
      expectTypeOf(test).toEqualTypeOf<string>();
    }
  });
});
