import { describe, it, expect, expectTypeOf } from 'vitest';
import { flattenDeepThenMap } from '.';

describe('flattenDeepThenMap', () => {
  const arr = [1, 2, [3, 4, [5, 6]]];

  it('모든 깊이로 평탄화하고 반복 함수를 각 요소에 적용해야 합니다.', () => {
    const flattenArray = flattenDeepThenMap(arr, (item) => ({ id: item }));
    expect(flattenArray).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
    ]);
    expectTypeOf(flattenArray).toEqualTypeOf<{ id: number }[]>();
  });

  it('빈 배열과 같은 엣지 케이스를 처리해야 합니다.', () => {
    expect(flattenDeepThenMap([], (item) => ({ id: item }))).toEqual([]);
  });
});
