import { describe, it, expect } from 'vitest';
import { at } from '.';

describe('at', () => {
  const arr = [10, 20, 30, 40, 50];

  it('주어진 양의 인덱스에서 요소를 반환해야 합니다', () => {
    expect(at(arr)).toBe(10);
    expect(at(arr, 0)).toBe(10);
    expect(at(arr, 2)).toBe(30);
    expect(at(arr, 4)).toBe(50);
  });

  it('음의 인덱스에 대해 배열의 끝에서부터 요소를 반환해야 합니다', () => {
    expect(at(arr, -1)).toBe(50);
    expect(at(arr, -3)).toBe(30);
    expect(at(arr, -5)).toBe(10);
  });

  it('인덱스가 범위를 벗어나면 undefined를 반환해야 합니다', () => {
    expect(at(arr, 5)).toBeUndefined();
    expect(at(arr, -6)).toBeUndefined();
  });

  it('빈 배열에 대해 undefined를 반환해야 합니다', () => {
    expect(at([], 0)).toBeUndefined();
    expect(at([], -1)).toBeUndefined();
  });
});
