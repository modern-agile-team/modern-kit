import { exclude } from '.';

describe('exclude', () => {
  it('filter after second parameter values from first parameter.', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const excludeElements = [1, 3];

    expect(exclude(array, ...excludeElements)).toEqual([2, 4, 5, 6]);
  });

  it('should filter boolean.', () => {
    const array = [true, false, false, true];
    const excludeElements = [true];

    expect(exclude(array, ...excludeElements)).toEqual([false, false]);
  });

  it('should filter string.', () => {
    const array = ['name', 'value', 'value', 'key'];
    const excludeElements = ['value'];

    expect(exclude(array, ...excludeElements)).toEqual(['name', 'key']);
  });

  it('should filter object.', () => {
    const person = { name: 'kim', address: { city: 'seoul' } };
    const array = [person];
    const excludePerson = person;
    const notExcludePerson = { name: 'kim' };

    expect(exclude(array, excludePerson)).toEqual([]);
    expect(exclude(array, notExcludePerson)).toEqual([person]);
  });

  it('should filter tuple.', () => {
    const array = [[3, 'a']];
    const excludeElements = [3, 'a'];

    expect(exclude(array, excludeElements)).toEqual([]);
  });
});
