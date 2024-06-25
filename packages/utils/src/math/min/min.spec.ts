import { min } from '.';

describe('min', () => {
  it('should return the minimum number from an array of numbers', () => {
    const arr = [5, 2, 9, 1, 5, 6];
    const result = min(arr);

    expect(result).toBe(1);
  });

  it('should return the minimum item based on iteratee function(object)', () => {
    const arr = [
      { value: 5 },
      { value: 2 },
      { value: 9 },
      { value: 1 },
      { value: 5 },
      { value: 6 },
    ];
    const result = min(arr, (item) => item.value);

    expect(result).toEqual({ value: 1 });
  });

  it('should return the minimum item based on iteratee function(string)', () => {
    const arr = ['apple', 'banana', 'lime'];
    const result = min(arr, (item) => item.length);

    expect(result).toBe('lime');
  });

  it('should handle empty array', () => {
    const arr: number[] = [];
    const result = min(arr);

    expect(result).toBeUndefined();
  });

  it('should handle empty array(iteratee)', () => {
    const arr: {
      value: number;
    }[] = [];
    const result = min(arr, (item) => item.value);

    expect(result).toBeUndefined();
  });
});
