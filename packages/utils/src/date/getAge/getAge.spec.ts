import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest';
import { getAge } from '.';

beforeEach(() => {
  /**
   * 테스트를 위해 2025년 01월 01일로 날짜 고정
   *
   * 1. 2005년 01월 01일: 만 20세
   * 2. 2006년 01월 01일: 정확히 만 19세 (기대값: false)
   * 3. 2007년 01월 01일: 만 18세
   */
  vi.setSystemTime(new Date('2025-01-01'));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('getAge', () => {
  it('Date 객체로 나이를 정확히 계산해야 함', () => {
    expect(getAge(new Date('2007-01-01'))).toBe(18);

    expect(getAge(new Date('2006-06-01'))).toBe(18); // 생일이 지나지 않은 경우
    expect(getAge(new Date('2006-01-01'))).toBe(19);
    expect(getAge(new Date('2005-12-31'))).toBe(19); // 생일이 지난 경우

    expect(getAge(new Date('2005-01-01'))).toBe(20);
  });

  it('날짜 문자열로 나이를 정확히 계산해야 함', () => {
    expect(getAge('2007-01-01')).toBe(18);

    expect(getAge('2006-06-01')).toBe(18); // 생일이 지나지 않은 경우
    expect(getAge('2006-01-01')).toBe(19);
    expect(getAge('2005-12-31')).toBe(19); // 생일이 지난 경우

    expect(getAge('2005-01-01')).toBe(20);
  });

  it('잘못된 날짜 형식에 대해 에러를 발생시켜야 함', () => {
    expect(() => getAge('invalid-date')).toThrow(
      '유효하지 않은 날짜 형식입니다.'
    );
  });
});
