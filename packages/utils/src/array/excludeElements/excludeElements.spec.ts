import { excludeElements } from '.';

describe('excludeElements', () => {
  it('filter after second parameter values from first parameter.', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const excludedElements = [1, 3];

    expect(excludeElements(array, ...excludedElements)).toEqual([2, 4, 5, 6]);
  });

  it('should filter boolean.', () => {
    const array = [true, false, false, true];
    const excludedElements = [true];

    expect(excludeElements(array, ...excludedElements)).toEqual([false, false]);
  });

  it('should filter string.', () => {
    const array = ['name', 'value', 'value', 'key'];
    const excludedElements = ['value'];

    expect(excludeElements(array, ...excludedElements)).toEqual([
      'name',
      'key',
    ]);
  });

  it('should filter object.', () => {
    const excludePerson = { name: 'kim', address: { city: 'Seoul' } };
    const notExcludePerson = { name: 'lee', address: { city: 'NewYork' } };

    const people = [excludePerson];

    expect(excludeElements(people, excludePerson)).toEqual([]);
    expect(excludeElements(people, notExcludePerson)).toEqual(people);
  });

  it('should filter tuple.', () => {
    const array = [[3, 'a']];
    const excludedElements = [3, 'a'];

    expect(excludeElements(array, excludedElements)).toEqual([]);
  });
});
