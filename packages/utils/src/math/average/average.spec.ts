import { average } from '.';

describe.concurrent('average', () => {
  it('should return 0 for an empty array', () => {
    expect(average([])).toBe(0);
  });

  it('should return the average of numbers in an array', () => {
    expect(average([1, 2, 3, 4, 5])).toBe(3);
    expect(average([10, 20, 30, 40, 50])).toBe(30);
  });

  it('should return the average of numbers in an array with iteratee', () => {
    expect(
      average([{ value: 1 }, { value: 2 }, { value: 3 }], (item) => item.value)
    ).toBe(2);
    expect(
      average(
        [{ value: 10 }, { value: 20 }, { value: 30 }],
        (item) => item.value
      )
    ).toBe(20);
  });

  it('should handle arrays with a single element', () => {
    expect(average([5])).toBe(5);
    expect(average([{ value: 7 }], (item) => item.value)).toBe(7);
  });

  it('should handle arrays with negative numbers', () => {
    expect(average([-1, -2, -3, -4, -5])).toBe(-3);
    expect(
      average(
        [{ value: -10 }, { value: -20 }, { value: -30 }],
        (item) => item.value
      )
    ).toBe(-20);
  });
});
