import { describe, it, expectTypeOf } from 'vitest';
import { Merge } from '.';

describe('Merge', () => {
  it('두 개의 객체 타입을 병합하여 새로운 객체 타입을 반환해야 합니다.', () => {
    type MergedType = Merge<
      { a: string; b: number },
      { b: string; c: boolean }
    >; // { a: string; b: string; c: boolean }

    const obj: MergedType = {
      a: 'a',
      b: 'b',
      c: true,
    };

    expectTypeOf(obj as { a: string; b: string; c: boolean }).toEqualTypeOf<{
      a: string;
      b: string;
      c: boolean;
    }>();
  });
});
