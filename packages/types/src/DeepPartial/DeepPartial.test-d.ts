import { describe, it, expectTypeOf } from 'vitest';
import { DeepPartial } from '.';

describe('DeepPartial', () => {
  it('중첩된 객체의 모든 속성을 선택적으로 만들어야 합니다.', () => {
    interface User {
      name: string;
      age: string;
      address: {
        street: string;
        city: string;
      };
    }

    expectTypeOf<DeepPartial<User>>().toEqualTypeOf<{
      name?: string;
      age?: string;
      address?: { street?: string; city?: string };
    }>();
  });
});
