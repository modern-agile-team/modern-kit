import { sum } from '.';

describe('sum', () => {
  it('should sum an array of numbers', () => {
    const result = sum([1, 2, 3, 4, 5]);

    expect(result).toBe(15);
  });

  it('should sum an empty array', () => {
    const result = sum([]);

    expect(result).toBe(0);
  });

  it('should sum with iteratee function', () => {
    const result = sum([1, 2, 3, 4, 5], (item) => item * 2);

    expect(result).toBe(30);
  });

  it('should sum with iteratee function returning zero', () => {
    const result = sum([1, 2, 3, 4, 5], () => 0);

    expect(result).toBe(0);
  });

  it('should sum an array of objects using iteratee function', () => {
    const arr = [{ value: 1 }, { value: 2 }, { value: 3 }];
    const result = sum(arr, (item) => item.value);

    expect(result).toBe(6);
  });
});
