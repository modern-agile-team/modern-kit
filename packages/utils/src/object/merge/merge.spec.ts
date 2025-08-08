import { describe, expect, it } from 'vitest';
import { merge } from '.';

describe('merge', () => {
  it('source 객체 속성들은 target 객체에 병합해야 합니다.', () => {
    const target = { a: { x: 1, y: 2 }, b: 2 };
    const source = { a: { y: 3, z: 4 }, c: 5 };
    const result = merge(target, source);

    expect(result).toEqual({ a: { x: 1, y: 3, z: 4 }, b: 2, c: 5 });
  });

  it('병합 시 target 객체를 변경하지 않고 새로운 객체를 반환해야 합니다.', () => {
    const target = { a: { x: 1, y: 2 }, b: 2 };
    const source = { a: { y: 3, z: 4 }, c: 5 };
    const result = merge(target, source);

    expect(result).not.toEqual(target);
  });

  it('배열을 깊이 병합해야 합니다.', () => {
    const target = { a: [1, { name: 'modern-kit' }] };
    const source = { a: [3, { address: 'seocho' }] };
    const result = merge(target, source);

    expect(result).toEqual({
      a: [3, { name: 'modern-kit', address: 'seocho' }],
    });
  });

  it('배열 혹은 순수 객체의 경우 병합 처리 시 깊은 복사되야 합니다.', () => {
    const numbers = [1, 2, 3];

    const target = { a: 1, b: {} };
    const source = { b: numbers, c: 4 };
    const result = merge(target, source);

    expect(result).toEqual({ a: 1, b: numbers, c: 4 });
    // 배열이나 순수 객체의 경우 source의 원본 값을 깊은 복사합니다.
    expect(result.b).not.toBe(numbers);
  });

  it('배열 혹은 순수 객체가 아닌 경우 병합 처리 시 원래 값을 사용해야합니다.', () => {
    const date = new Date();
    const target = {};
    const source = { a: date };
    const result = merge(target, source);

    expect(result).toEqual({ a: date });
    // 배열이나 순수 객체가 아닌 경우 source의 원본 값을 그대로 사용합니다.
    expect(result.a).toBe(date);
  });

  it('source 속성의 값으로 undefined가 있을 경우 target의 값을 덮어쓰지 않아야 합니다.', () => {
    const target = { a: 1, b: 2 };
    const source = { b: undefined, c: 3 };
    const result = merge(target, source);

    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });
});
