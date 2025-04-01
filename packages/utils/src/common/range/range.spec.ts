import { describe, it, expect } from 'vitest';
import { range } from '.';

describe('range', () => {
  describe('기본 동작', () => {
    it('종료값만 제공될 경우 0부터 종료값-1까지의 배열을 생성해야 한다.', () => {
      expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    });

    it('시작값과 종료값이 제공될 때 시작값부터 종료값까지 1씩 증가하는 배열을 생성해야 한다.', () => {
      expect(range(1, 5)).toEqual([1, 2, 3, 4]);
    });

    it('시작값과 종료값, step 값이 제공될 때 시작값부터 종료값까지 step 값을 간격으로 구성된 배열을 생성해야 한다.', () => {
      expect(range(1, 10, 2)).toEqual([1, 3, 5, 7, 9]);
    });

    it('start가 end보다 클 경우 내림차순 배열을 생성해야 한다.', () => {
      expect(range(5, 1)).toEqual([5, 4, 3, 2]);
      expect(range(10, 0, 2)).toEqual([10, 8, 6, 4, 2]);
    });
  });

  describe('음수 범위 처리', () => {
    it('종료값만 제공될 경우 0부터 종료값-1까지의 배열을 생성해야 한다.', () => {
      expect(range(-5)).toEqual([0, -1, -2, -3, -4]);
    });

    it('시작값과 종료값이 제공될 때 시작값부터 종료값까지 1씩 증가하는 배열을 생성해야 한다.', () => {
      expect(range(-10, -5)).toEqual([-10, -9, -8, -7, -6]);
    });

    it('시작값과 종료값, step 값이 제공될 때 시작값부터 종료값까지 step 값을 간격으로 구성된 배열을 생성해야 한다.', () => {
      expect(range(-10, 0, 2)).toEqual([-10, -8, -6, -4, -2]);
    });

    it('start가 end보다 클 경우 내림차순 배열을 생성해야 한다.', () => {
      expect(range(-5, -10)).toEqual([-5, -6, -7, -8, -9]);
      expect(range(0, -10, 2)).toEqual([0, -2, -4, -6, -8]);
    });
  });

  describe('예외 처리', () => {
    it('유효하지 않은 간격값에 대해 에러를 발생시켜야 한다', () => {
      expect(() => range(1, 5, 0)).toThrow('step은 1 이상의 정수여야 합니다.');
      expect(() => range(1, 5, -1)).toThrow('step은 1 이상의 정수여야 합니다.');
      expect(() => range(1, 5, 1.5)).toThrow(
        'step은 1 이상의 정수여야 합니다.'
      );
    });
  });
});
