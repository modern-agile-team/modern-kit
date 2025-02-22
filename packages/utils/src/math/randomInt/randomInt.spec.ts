import { describe, it, expect } from 'vitest';
import { randomInt } from '.';

describe('randomInt', () => {
  it('하나의 인자만 전달하면 0부터 해당 값 사이의 정수를 반환해야 한다.', () => {
    const maximum = 10;
    const result = randomInt(maximum);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(maximum); // 최대값은 미만이어야 합니다.
  });

  it('두 개의 인자를 전달하면 최소값과 최대값 사이의 정수를 반환해야 한다.', () => {
    const minimum = 5;
    const maximum = 15;
    const result = randomInt(minimum, maximum);
    expect(result).toBeGreaterThanOrEqual(minimum);
    expect(result).toBeLessThan(maximum); // 최대값은 미만이어야 합니다.
  });

  it('최소값과 최대값이 같으면 해당 숫자를 반환해야 한다.', () => {
    const value = 7;
    const result = randomInt(value, value);
    expect(result).toBe(value);
  });

  it('음수 범위에서도 정상적으로 정수를 반환해야 한다.', () => {
    const minimum = -10;
    const maximum = -5;
    const result = randomInt(minimum, maximum);
    expect(result).toBeGreaterThanOrEqual(minimum);
    expect(result).toBeLessThan(maximum);
  });

  it('큰 범위에서도 정상적으로 정수를 반환해야 한다.', () => {
    const minimum = 100;
    const maximum = 200;
    const result = randomInt(minimum, maximum);
    expect(result).toBeGreaterThanOrEqual(minimum);
    expect(result).toBeLessThan(maximum);
  });

  it('최소값이 최대값보다 크면 에러를 발생시켜야 한다.', () => {
    expect(() => randomInt(10, 5)).toThrow(
      'maximum은 minimum보다 커야 합니다.'
    );
  });
});
