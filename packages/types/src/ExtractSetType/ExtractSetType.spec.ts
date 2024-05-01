import { ExtractSetType } from '.';

describe('ExtractSetType', () => {
  it('should infer the generic type of a Set', () => {
    const arr = [1, 2, 3, 4, 5] as const;
    const testSet = new Set(arr);
    const convertedTestArr = [...testSet];

    type extractedSetType = ExtractSetType<typeof testSet>; // 1 | 2 | 3 | 4 | 5

    expectTypeOf(convertedTestArr).toEqualTypeOf<extractedSetType[]>();
  });
});
