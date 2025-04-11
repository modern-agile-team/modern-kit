import { describe, it, expect } from 'vitest';
import { xor } from './';

describe('xor', () => {
  it('두 입력 배열이 모두 비어 있을 때 빈 배열을 반환해야 합니다', () => {
    expect(xor([], [])).toEqual([]);
  });

  it('한 배열이 비어 있을 때 모든 요소를 반환해야 합니다', () => {
    expect(xor([1, 2, 3], [])).toEqual([1, 2, 3]);
    expect(xor([], [1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('두 배열의 대칭 차이를 반환해야 합니다', () => {
    expect(xor([1, 2, 3], [2, 3, 4])).toEqual([1, 4]);
  });

  it('문자열 배열에서도 작동해야 합니다', () => {
    expect(xor(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual(['a', 'd']);
  });

  it('iteratee 함수를 사용하여 객체 배열에서도 작동해야 합니다', () => {
    const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const arr2 = [{ id: 2 }, { id: 3 }, { id: 4 }];
    expect(xor(arr1, arr2, (item) => item.id)).toEqual([{ id: 1 }, { id: 4 }]);
  });

  it('두 배열이 동일할 때 빈 배열을 반환해야 합니다', () => {
    expect(xor([1, 2, 3], [1, 2, 3])).toEqual([]);
  });
});
