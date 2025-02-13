import { describe, it, expect } from 'vitest';
import { fill } from '.';

describe('fill', () => {
  it('시작 인덱스와 끝 인덱스가 제공되지 않으면 전체 배열을 채워야 합니다.', () => {
    const array = [1, 2, 3, 4, 5];
    const value = '*';

    expect(fill(array, value)).toEqual(['*', '*', '*', '*', '*']);
  });

  it('시작 인덱스와 끝 인덱스가 제공되지 않으면 배열 인스턴스를 채워야 합니다.', () => {
    const array = Array(3);
    const value = '*';

    expect(fill(array, value)).toEqual(['*', '*', '*']);
  });

  it('시작 인덱스만 제공되면 시작 인덱스부터 끝까지 채워야 합니다.', () => {
    const array = [1, 2, 3, 4, 5];
    const value = '*';

    expect(fill(array, value, 2)).toEqual([1, 2, '*', '*', '*']);
  });

  it('시작 인덱스와 끝 인덱스가 모두 제공되면 해당 범위를 채워야 합니다.', () => {
    const array = [1, 2, 3, 4, 5];
    const value = '*';

    expect(fill(array, value, 2, 3)).toEqual([1, 2, '*', 4, 5]);
  });
});
