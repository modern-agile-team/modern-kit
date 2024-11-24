import { describe, expect, test } from 'vitest';
import { clamp } from '.';

describe('clamp', () => {
  test('value가 min보다 작을 때 min을 반환한다.', () => {
    expect(clamp(-1, 0, 10)).toBe(0);
  });

  test('value가 max보다 클 때 max를 반환한다.', () => {
    expect(clamp(11, 0, 10)).toBe(10);
  });

  test('value가 min과 max 사이에 있을 때 value를 반환한다.', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  test('value가 min과 같을 때 value(or min)를 반환한다.', () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  test('value가 max와 같을 때 value(or max)를 반환한다.', () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });

  test('value가 min과 max가 같을 때 value(or min or max)를 반환한다.', () => {
    expect(clamp(5, 5, 5)).toBe(5);
  });
});
