import { describe, it, expect } from 'vitest';
import { range } from '.';

describe('range', () => {
  it('하나의 인자가 제공될 때 0부터 해당 숫자까지 1을 간격으로 구성된 숫자 배열을 반환해야 합니다.', () => {
    const result = range(5);

    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  it('start, end 두 인자가 모두 제공될 때 start부터 end까지 1을 간격으로 구성된 숫자 배열을 반환해야 합니다.', () => {
    const result = range(1, 5);

    expect(result).toEqual([1, 2, 3, 4]);
  });

  it('step이 주어질 때 start 값부터 end 값까지 step 값을 간격으로 구성된 숫자 배열을 반환해야 합니다.', () => {
    const result = range(1, 10, 2);

    expect(result).toEqual([1, 3, 5, 7, 9]);
  });

  it('음수로 두 개의 인자가 제공될 때 첫 번째 인자부터 두 번째 인자까지 1을 간격으로 구성된 숫자 배열을 반환해야 합니다.', () => {
    const result = range(-10, -5);

    expect(result).toEqual([-10, -9, -8, -7, -6]);
  });

  it('end 인자가 start 인자보다 클 경우 빈 배열을 반환해야 합니다.', () => {
    const result = range(10, 5, 1);

    expect(result).toEqual([]);
  });

  it('step이 0일 경우 오류를 반환해야 합니다.', () => {
    expect(() => range(1, 5, 0)).toThrowError(
      'step은 0이 아닌 정수여야 합니다.'
    );
  });

  it('step이 정수가 아닐 경우 오류를 반환해야 합니다.', () => {
    expect(() => range(1, 5, 1.1)).toThrowError(
      'step은 0이 아닌 정수여야 합니다.'
    );
  });
});
