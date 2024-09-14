import { describe, it, expect } from 'vitest';
import { fill } from '.';

describe('fill', () => {
  it('should fill the entire array when no start or end index is provided', () => {
    const array = [1, 2, 3, 4, 5];
    const value = '*';

    expect(fill(array, value)).toEqual(['*', '*', '*', '*', '*']);
  });

  it('should fill an array instance when no start or end index is provided', () => {
    const array = Array(3);
    const value = '*';

    expect(fill(array, value)).toEqual(['*', '*', '*']);
  });

  it('should fill the array from the start index to the end when only start index is provided', () => {
    const array = [1, 2, 3, 4, 5];
    const value = '*';

    expect(fill(array, value, 2)).toEqual([1, 2, '*', '*', '*']);
  });

  it('should fill the array from the start index to the end index when both are provided', () => {
    const array = [1, 2, 3, 4, 5];
    const value = '*';

    expect(fill(array, value, 2, 3)).toEqual([1, 2, '*', 4, 5]);
  });
});
