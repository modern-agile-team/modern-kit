import { describe, it, expect } from 'vitest';
import { isFunction } from '.';

describe('isFunction', () => {
  it('should return true if the argument is a function and false otherwise', () => {
    function example() {}

    expect(isFunction(() => {})).toBeTruthy();
    expect(isFunction(example)).toBeTruthy();

    expect(isFunction('123')).toBeFalsy();
    expect(isFunction(123)).toBeFalsy();
    expect(isFunction({})).toBeFalsy();
    expect(isFunction([])).toBeFalsy();
  });
});
