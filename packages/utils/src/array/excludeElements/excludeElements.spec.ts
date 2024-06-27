import { excludeElements } from '.';

describe('excludeElements', () => {
  it('filter after second parameter values from first parameter.', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const excludedElements = [1, 3];

    expect(excludeElements(array, excludedElements)).toEqual([2, 4, 5, 6]);
  });

  it('should filter boolean.', () => {
    const array = [true, false, false, true];
    const excludedElements = [true];

    expect(excludeElements(array, excludedElements)).toEqual([false, false]);
  });

  it('should filter string.', () => {
    const array = ['name', 'value', 'value', 'key'];
    const excludedElements = ['value'];

    expect(excludeElements(array, excludedElements)).toEqual(['name', 'key']);
  });

  it('should filter object.', () => {
    const people = [
      { name: 'kim', address: { city: 'Seoul' } },
      { name: 'lee', address: { city: 'NewYork' } },
      { name: 'kim', address: { city: 'Seoul' } },
    ];

    expect(
      excludeElements(
        people,
        [{ name: 'kim', address: { city: 'Seoul' } }],
        (item) => item.name
      )
    ).toEqual([{ name: 'lee', address: { city: 'NewYork' } }]);
  });

  it('should filter tuple.', () => {
    const array = [
      [3, 'a'],
      [4, 'b'],
      [3, 'a'],
    ];
    const excludedElements = [3, 'a'];

    expect(
      excludeElements(array, [excludedElements], (item) => JSON.stringify(item))
    ).toEqual([[4, 'b']]);
  });
});
