import { describe, it, expectTypeOf } from 'vitest';
import { ExtractSetType } from '.';

describe('ExtractSetType', () => {
  it('Set의 제네릭 타입을 추론해야 합니다.', () => {
    const arr = [1, 2, 3, 4, 5] as const;
    const testSet = new Set(arr);
    const convertedTestArr = [...testSet];

    type extractedSetType = ExtractSetType<typeof testSet>; // 1 | 2 | 3 | 4 | 5

    expectTypeOf(convertedTestArr).toEqualTypeOf<extractedSetType[]>();
  });
});
