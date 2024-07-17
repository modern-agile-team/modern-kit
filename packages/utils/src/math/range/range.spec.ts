import { range } from '.';

describe('range', () => {
  it('should return an array of numbers from 1 to the given number when one argument is provided', () => {
    const result = range(5);

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return an array of numbers from the first argument to the second argument when two arguments are provided', () => {
    const result = range(1, 5);

    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return an error if the start value is greater than the end value', () => {
    expect(() => range(5, 1)).toThrowError(
      'min value cannot be greater than the max value.',
    );
  });

  it('should return an error if step is zero', () => {
    expect(() => range(1, 5, 0)).toThrowError(
      'step value cannot be zero (neither +0 nor -0).',
    );
    expect(() => range(1, 5, -0)).toThrowError(
      'step value cannot be zero (neither +0 nor -0).',
    );
  });

  it('should return an error if step is not integer', () => {
    expect(() => range(1, 5, 1.1)).toThrowError(
      'step value must be an integer.',
    );
  });

  it('should return an array of numbers from 1 to 10 with a step of 2', () => {
    const result = range(1, 10, 2);

    expect(result).toEqual([1, 3, 5, 7, 9]);
  });
});
