import { describe, expect, it } from 'vitest';
import { random } from '.';

describe('random', () => {
  it('minimum부터 maximum(exclusive)까지의 난수를 생성해야 됩니다.', () => {
    const minimum = 0;
    const maximum = 10;

    for (let i = 0; i < 100; i++) {
      const randomNumber = random(minimum, maximum);
      expect(randomNumber).toBeGreaterThanOrEqual(minimum);
      expect(randomNumber).toBeLessThan(maximum);
    }
  });

  it('0부터 maximum(exclusive)까지의 난수를 생성해야 됩니다.', () => {
    const maximum = 10;

    for (let i = 0; i < 100; i++) {
      const randomNumber = random(maximum);
      expect(randomNumber).toBeGreaterThanOrEqual(0);
      expect(randomNumber).toBeLessThan(maximum);
    }
  });

  it('minimum과 maximum이 같을 경우 해당 값을 반환해야 됩니다.', () => {
    const minimum = 15;
    const maximum = 15;

    const randomNumber = random(minimum, maximum);
    expect(randomNumber).toBe(15);
  });

  it('minimum이 maximum보다 클 경우 오류가 발생해야 됩니다.', () => {
    const minimum = 10;
    const maximum = 0;

    expect(() => random(minimum, maximum)).toThrow(
      'maximum은 minimum보다 커야 합니다.'
    );
  });
});
