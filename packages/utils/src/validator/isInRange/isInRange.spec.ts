import { describe, it, expect } from 'vitest';
import { isInRange } from '.';

describe('isInRange', () => {
  it('should return true if value is in range', () => {
    expect(
      isInRange({
        value: 5,
        min: 0,
        max: 10,
      })
    ).toBe(true);
  });

  it('should return correct value if equalOptions min is true and max is false', () => {
    expect(
      isInRange({
        value: 0,
        min: 0,
        max: 10,
      })
    ).toBe(true);
    expect(
      isInRange({
        value: 10,
        min: 0,
        max: 10,
      })
    ).toBe(false);
  });

  it('should return correct value if equalOptions min is false and max is true', () => {
    expect(
      isInRange({
        value: 0,
        min: 0,
        max: 10,
        equalOptions: {
          min: false,
          max: true,
        },
      })
    ).toBe(false);
    expect(
      isInRange({
        value: 10,
        min: 0,
        max: 10,
        equalOptions: {
          min: false,
          max: true,
        },
      })
    ).toBe(true);
  });

  it('should return correct value if equalOptions min and max is false', () => {
    expect(
      isInRange({
        value: 0,
        min: 0,
        max: 10,
        equalOptions: {
          min: false,
        },
      })
    ).toBe(false);
    expect(
      isInRange({
        value: 10,
        min: 0,
        max: 10,
        equalOptions: {
          min: false,
        },
      })
    ).toBe(false);
  });

  it('should return correct value if equalOptions min and max is true', () => {
    expect(
      isInRange({
        value: 0,
        min: 0,
        max: 10,
        equalOptions: {
          max: true,
        },
      })
    ).toBe(true);
    expect(
      isInRange({
        value: 10,
        min: 0,
        max: 10,
        equalOptions: {
          max: true,
        },
      })
    ).toBe(true);
  });

  it('should return false if value is not in range', () => {
    expect(
      isInRange({
        value: 15,
        min: 0,
        max: 10,
      })
    ).toBe(false);
  });

  it('should throw error if min or max is invalid value', () => {
    expect(() =>
      isInRange({
        value: 0,
        min: null as unknown as number,
        max: 10,
      })
    ).toThrowError('min and max values are invalid.');

    expect(() =>
      isInRange({
        value: 0,
        min: 0,
        max: null as unknown as number,
      })
    ).toThrowError('min and max values are invalid.');
  });

  it('should throw error if min is greater than max', () => {
    expect(() =>
      isInRange({
        value: 5,
        min: 10,
        max: 0,
      })
    ).toThrowError('min value cannot be greater than the max value.');
  });
});
