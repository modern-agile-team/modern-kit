import { intersection } from '.';

describe('intersection', () => {
  it('should find the intersection of two arrays without duplicates', () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [1, 2, 4, 5];

    expect(intersection(arr1, arr2)).toEqual([1, 2, 4]);
  });

  it('should find the intersection of two arrays and remove duplicates within each array', () => {
    const arr1 = [1, 1, 2, 2, 3, 4];
    const arr2 = [1, 2, 4, 4, 5, 5];

    expect(intersection(arr1, arr2)).toEqual([1, 2, 4]);
  });

  it('should use a custom comparator to find the intersection of two arrays of objects', () => {
    const arr1 = [
      { id: 1, name: 'john' },
      { id: 2, name: 'gromit' },
    ];
    const arr2 = [
      { id: 1, name: 'john' },
      { id: 3, name: 'dylan' },
    ];

    expect(
      intersection(
        arr1,
        arr2,
        (x, y) => JSON.stringify(x) === JSON.stringify(y),
      ),
    ).toEqual([{ id: 1, name: 'john' }]);
  });
});
