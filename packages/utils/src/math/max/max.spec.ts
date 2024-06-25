import { max } from '.';

describe('max', () => {
  it('should return the maximum number from an array of numbers', () => {
    const arr = [5, 2, 9, 1, 5, 6];
    const result = max(arr);

    expect(result).toBe(9);
  });

  it('should return the maximum item based on iteratee function(object)', () => {
    const arr = [
      { value: 5 },
      { value: 2 },
      { value: 9 },
      { value: 1 },
      { value: 5 },
      { value: 6 },
    ];
    const result = max(arr, (item) => item.value);

    expect(result).toEqual({ value: 9 });
  });

  it('should return the maximum item based on iteratee function(string)', () => {
    const arr = ['apple', 'banana', 'lime'];
    const result = max(arr, (item) => item.length);

    expect(result).toBe('banana');
  });

  it('should handle empty array(default)', () => {
    const arr: number[] = [];
    const result = max(arr);

    expect(result).toBeUndefined();
  });

  it('should handle empty array(iteratee)', () => {
    const arr: {
      value: number;
    }[] = [];
    const result = max(arr, (item) => item.value);

    expect(result).toBeUndefined();
  });
});
