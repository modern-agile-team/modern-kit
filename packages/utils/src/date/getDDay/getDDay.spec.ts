import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { getDDay } from '.';

beforeEach(() => {
  // 2025년 1월 1일 00:00:00 로 현재 날짜 고정
  vi.setSystemTime(new Date('2025-01-01 00:00:00'));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('getDDay', () => {
  it('목표 날짜가 현재보다 과거인 경우 음수 일수를 반환해야 합니다.', () => {
    // Date 객체 케이스
    expect(getDDay(new Date('2024-12-31 00:00:00'))).toEqual({
      days: -1,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    // 문자열 케이스
    expect(getDDay('2024-12-25 00:00:00')).toEqual({
      days: -7,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it('목표 날짜가 현재보다 미래인 경우 양수 일수를 반환해야 합니다.', () => {
    // Date 객체 케이스
    expect(getDDay(new Date('2025-01-02 00:00:00'))).toEqual({
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    // 문자열 케이스
    expect(getDDay('2025-01-05 00:00:00')).toEqual({
      days: 4,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it('시간 차이가 있는 경우 상세 시간을 정확히 계산한다', () => {
    // Date 객체 케이스
    expect(getDDay(new Date('2025-01-01 02:30:45'))).toEqual({
      days: 0,
      hours: 2,
      minutes: 30,
      seconds: 45,
    });

    // 문자열 케이스
    expect(getDDay('2024-12-31 18:15:30')).toEqual({
      days: 0,
      hours: -5,
      minutes: -44,
      seconds: -30,
    });
  });

  it('목표 날짜가 현재와 같은 경우 모든 값이 0을 반환해야 합니다.', () => {
    // Date 객체 케이스
    expect(getDDay(new Date('2025-01-01 00:00:00'))).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    // 문자열 케이스
    expect(getDDay('2025-01-01 00:00:00')).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it('잘못된 날짜 형식에 대해 에러를 발생시켜야 함', () => {
    expect(() => getDDay('invalid-date')).toThrow(
      '유효하지 않은 날짜 형식입니다.'
    );
  });
});
