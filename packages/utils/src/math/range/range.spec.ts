import { range } from '.';

describe('range', () => {
  it('should return an array of numbers from 1 to the given number when one argument is provided', () => {
    const result = range(5);

    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  it('should return an array of numbers from the first argument to the second argument when two arguments are provided', () => {
    const result = range(1, 5);

    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('should return an array of numbers from the first argument to the second argument when minus two arguments are provided', () => {
    const result = range(-10, -5);

    expect(result).toEqual([-10, -9, -8, -7, -6]);
  });

  it('should return an empty array when second argument is bigger than first argument', () => {
    const result = range(10, 5, 1);

    expect(result).toEqual([]);
  });

  it('should return an correct array when second argument is bigger than first argument with step', () => {
    const result2 = range(10, 5, -1);

    expect(result2).toEqual([10, 9, 8, 7, 6]);
  });

  it('should return an error if step is zero', () => {
    expect(() => range(1, 5, 0)).toThrowError(
      'The step value must be a non-zero integer.',
    );
  });

  it('should return an error if step is not integer', () => {
    expect(() => range(1, 5, 1.1)).toThrowError(
      'The step value must be a non-zero integer.',
    );
  });

  it('should return an array of numbers from 1 to 10 with a step of 2', () => {
    const result = range(1, 10, 2);

    expect(result).toEqual([1, 3, 5, 7, 9]);
  });
});
