import { union } from '.';

describe.concurrent('union', () => {
  it('should combine two arrays and remove duplicates', () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [1, 2, 4, 5];

    expect(union(arr1, arr2)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should use iteratee to determine uniqueness', () => {
    const arr1 = [
      { id: 1, name: 'john' },
      { id: 2, name: 'jane' },
    ];
    const arr2 = [
      { id: 1, name: 'john' },
      { id: 3, name: 'gromit' },
    ];

    expect(union(arr1, arr2, (item) => item.id)).toEqual([
      { id: 1, name: 'john' },
      { id: 2, name: 'jane' },
      { id: 3, name: 'gromit' },
    ]);
  });

  it('should correctly infer types while combining arrays and removing duplicates', () => {
    const arr1 = [1, 2, 3, 4] as const;
    const arr2 = [1, 2, 4, 5] as const;

    const unionArray = union(arr1, arr2);
    expect(unionArray).toEqual([1, 2, 3, 4, 5]);
    expectTypeOf(unionArray).toEqualTypeOf<(1 | 2 | 3 | 4 | 5)[]>();
  });
});
