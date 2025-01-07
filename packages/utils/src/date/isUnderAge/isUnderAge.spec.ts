import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { isUnderAge } from '.';

beforeEach(() => {
  /**
   * 테스트를 위해 2025년 01월 01일로 날짜 고정
   *
   * 1. 2006년 01월 01일: 정확히 만 19세 (기대값: false)
   * 2. 2006년 01월 02일: 만 19세보다 어림 (기대값: true)
   * 3. 2005년 12월 31일: 만 19세보다 많음 (기대값: false)
   */
  vi.setSystemTime(new Date('2025-01-01'));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('isUnderAge', () => {
  it('만 19세 미만인 경우 true를 반환해야 합니다.', () => {
    // Date 객체
    expect(
      isUnderAge({ birthDate: new Date('2006-01-02'), targetAge: 19 })
    ).toBeTruthy();

    // 문자열
    expect(isUnderAge({ birthDate: '2006-01-02', targetAge: 19 })).toBeTruthy();
  });

  it('정확히 만 19세인 경우 false를 반환해야 합니다.', () => {
    // Date 객체
    expect(
      isUnderAge({ birthDate: new Date('2006-01-01'), targetAge: 19 })
    ).toBeFalsy();

    // 문자열
    expect(isUnderAge({ birthDate: '2006-01-01', targetAge: 19 })).toBeFalsy();
  });

  it('만 19세가 지난 경우 false를 반환해야 합니다.', () => {
    // Date 객체
    expect(
      isUnderAge({ birthDate: new Date('2005-12-31'), targetAge: 19 })
    ).toBeFalsy();

    // 문자열
    expect(isUnderAge({ birthDate: '2005-12-31', targetAge: 19 })).toBeFalsy();
  });

  it('inclusive 값을 기준으로 기준 나이를 포함할지 여부를 결정해야 한다.', () => {
    // Date 객체
    expect(
      isUnderAge({
        birthDate: new Date('2006-01-01'),
        targetAge: 19,
        inclusive: true,
      })
    ).toBeTruthy();

    // 문자열
    expect(
      isUnderAge({ birthDate: '2006-01-01', targetAge: 19, inclusive: false })
    ).toBeFalsy();
  });

  it('잘못된 날짜 형식에 대해 에러를 던진다', () => {
    expect(() =>
      isUnderAge({ birthDate: 'invalid-date', targetAge: 19 })
    ).toThrow('유효하지 않은 날짜 형식입니다.');
  });
});
