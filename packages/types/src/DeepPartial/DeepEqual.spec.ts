import { describe, it, expectTypeOf } from 'vitest';
import { DeepPartial } from '.';

describe('DeepPartial', () => {
  interface User {
    name: string;
    age: string;
    address: {
      street: string;
      city: string;
    };
  }

  it('DeepPartial 타입은 중첩된 객체의 모든 속성을 선택적으로 만들어줍니다.', () => {
    const user: DeepPartial<User> = {
      name: 'John',
      age: '20',
    };

    expectTypeOf(user).toEqualTypeOf<{
      name?: string;
      age?: string;
      address?: { street?: string; city?: string };
    }>();
  });
});
