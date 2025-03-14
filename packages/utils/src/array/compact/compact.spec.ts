import { describe, it, expect } from 'vitest';
import { compact } from '.';

describe('compact', () => {
  it('배열에서 모든 falsy 값(0, false, null, undefined, NaN, "")을 제거해야 합니다', () => {
    const arr = [0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5] as const;
    expect(compact(arr)).toEqual([1, 2, 3, 4, 5]);
  });

  it('모든 입력 값이 falsy인 경우 빈 배열을 반환해야 합니다', () => {
    const arr = [false, null, undefined, '', 0, NaN] as const;
    expect(compact(arr)).toEqual([]);
  });

  it('falsy 값이 없는 경우 동일한 배열을 반환해야 합니다', () => {
    const arr = [1, 'apple', true, {}, []] as const;
    expect(compact(arr)).toEqual([1, 'apple', true, {}, []]);
  });

  it('혼합된 유형의 배열을 올바르게 처리해야 합니다', () => {
    const arr = [1, 'test', false, { three: 3 }, null, [4], undefined] as const;
    expect(compact(arr)).toEqual([1, 'test', { three: 3 }, [4]]);
  });

  it('원래 배열을 수정하지 않아야 합니다', () => {
    const original = [1, null, 2, undefined, 3] as const;
    const result = compact(original);
    expect(result).toEqual([1, 2, 3]);
    expect(original).toEqual([1, null, 2, undefined, 3]);
  });

  it('빈 배열 입력 시 빈 배열을 반환해야 합니다', () => {
    const emptyArr: readonly [] = [];
    expect(compact(emptyArr)).toEqual([]);
  });
});
