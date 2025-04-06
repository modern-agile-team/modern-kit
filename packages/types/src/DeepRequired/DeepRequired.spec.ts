import { describe, it, expectTypeOf } from 'vitest';
import { DeepRequired } from '.';

describe('DeepRequired', () => {
  interface User {
    name?: string;
    age?: string;
    address?: {
      street?: string;
      city?: string;
    };
  }

  it('중첩된 객체의 모든 속성을 필수로 만들어야 합니다.', () => {
    const user = {} as DeepRequired<User>;

    expectTypeOf(user).toEqualTypeOf<{
      name: string;
      age: string;
      address: { street: string; city: string };
    }>();
  });
});
