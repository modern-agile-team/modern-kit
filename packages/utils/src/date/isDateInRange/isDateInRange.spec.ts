import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { isDateInRange } from '.';

beforeEach(() => {
  /**
   * 테스트를 위해 현재 날짜를 2025년 01월 01일로 날짜 고정
   */
  vi.setSystemTime(new Date('2025-01-01'));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('isDateInRange', () => {
  describe('targetDate가 없는 경우', () => {
    describe('기본 동작 테스트', () => {
      it('타겟 날짜가 없을 경우 현재 날짜를 사용해서 비교해야 합니다.', () => {
        // Date 객체 테스트
        expect(
          isDateInRange({
            fromDate: new Date('2024-12-01'),
            toDate: new Date('2025-02-01'),
          })
        ).toBeTruthy();
        expect(
          isDateInRange({
            fromDate: new Date('2024-01-01'),
            toDate: new Date('2024-12-31'),
          })
        ).toBeFalsy();

        // 문자열 테스트
        expect(
          isDateInRange({ fromDate: '2024-12-01', toDate: '2025-02-01' })
        ).toBeTruthy();
        expect(
          isDateInRange({ fromDate: '2024-01-01', toDate: '2024-12-31' })
        ).toBeFalsy();

        // 숫자
        expect(
          isDateInRange({ fromDate: 1733011200000, toDate: 1738368000000 })
        ).toBeTruthy();
        expect(
          isDateInRange({ fromDate: 1704067200000, toDate: 1735603200000 })
        ).toBeFalsy();
      });
    });

    describe('시작 날짜만 있는 경우', () => {
      it('현재 날짜가 시작 날짜 이후면 true를 반환해야 합니다.', () => {
        expect(isDateInRange({ fromDate: '2024-12-31' })).toBeTruthy();
      });

      it('현재 날짜가 시작 날짜 이전이면 false를 반환해야 합니다.', () => {
        // 문자열 테스트
        expect(isDateInRange({ fromDate: '2025-01-02' })).toBeFalsy();
      });
    });

    describe('종료 날짜만 있는 경우', () => {
      it('현재 날짜가 종료 날짜 이전이면 true를 반환해야 합니다.', () => {
        // 문자열 테스트
        expect(isDateInRange({ toDate: '2025-12-31' })).toBeTruthy();
      });

      it('현재 날짜가 종료 날짜 이후면 false를 반환해야 합니다.', () => {
        // 문자열 테스트
        expect(isDateInRange({ toDate: '2024-12-31' })).toBeFalsy();
      });
    });
  });

  describe('targetDate가 있는 경우', () => {
    describe('기본 동작 테스트', () => {
      it('타겟 날짜가 시작 날짜와 종료 날짜 사이에 있으면 true를 반환해야 합니다.', () => {
        // Date 객체 테스트
        expect(
          isDateInRange({
            targetDate: new Date('2025-01-01'),
            fromDate: new Date('2024-12-31'),
            toDate: new Date('2025-01-02'),
          })
        ).toBeTruthy();
        expect(
          isDateInRange({
            targetDate: new Date('2025-01-03'),
            fromDate: new Date('2024-12-31'),
            toDate: new Date('2025-01-02'),
          })
        ).toBeFalsy();

        // 문자열 테스트
        expect(
          isDateInRange({
            targetDate: '2025-01-01',
            fromDate: '2024-12-31',
            toDate: '2025-01-02',
          })
        ).toBeTruthy();
        expect(
          isDateInRange({
            targetDate: '2025-01-03',
            fromDate: '2024-12-31',
            toDate: '2025-01-02',
          })
        ).toBeFalsy();

        // 숫자
        expect(
          isDateInRange({
            targetDate: 1735689600000,
            fromDate: 1735603200000,
            toDate: 1735776000000,
          })
        ).toBeTruthy();
        expect(
          isDateInRange({
            targetDate: 1735862400000,
            fromDate: 1735603200000,
            toDate: 1735776000000,
          })
        ).toBeFalsy();
      });
    });

    describe('시작 날짜만 있는 경우', () => {
      it('타겟 날짜가 시작 날짜 이후면 true를 반환해야 합니다.', () => {
        // 문자열 테스트
        expect(
          isDateInRange({
            targetDate: '2025-01-01',
            fromDate: '2024-12-31',
          })
        ).toBeTruthy();
      });

      it('타겟 날짜가 시작 날짜 이전이면 false를 반환해야 합니다.', () => {
        // 문자열 테스트
        expect(
          isDateInRange({
            targetDate: '2024-12-31',
            fromDate: '2025-01-01',
          })
        ).toBeFalsy();
      });
    });

    describe('종료 날짜만 있는 경우', () => {
      it('타겟 날짜가 종료 날짜 이전이면 true를 반환해야 합니다.', () => {
        expect(
          isDateInRange({
            targetDate: '2024-12-31',
            toDate: '2025-01-01',
          })
        ).toBeTruthy();
      });

      it('타겟 날짜가 종료 날짜 이후면 false를 반환해야 합니다.', () => {
        expect(
          isDateInRange({
            targetDate: '2025-01-02',
            toDate: '2025-01-01',
          })
        ).toBeFalsy();
      });
    });
  });

  // inclusive 옵션 테스트 이후부터는 원활한 테스트 코드 파악을 위해 Date 객체와 targetDate가 없는 경우에 대한 테스트는 제외합니다.
  describe('inclusive 옵션 테스트', () => {
    it('inclusive가 both일 때 양쪽 경계를 포함해야 합니다.', () => {
      expect(
        isDateInRange({
          targetDate: '2025-01-01',
          fromDate: '2025-01-01',
          toDate: '2025-01-01',
          inclusive: 'both',
        })
      ).toBeTruthy();
    });
  });

  it('inclusive가 from일 때 시작 날짜만 포함해야 합니다.', () => {
    expect(
      isDateInRange({
        targetDate: '2025-01-01',
        fromDate: '2025-01-01',
        toDate: '2025-01-02',
        inclusive: 'from',
      })
    ).toBeTruthy();

    expect(
      isDateInRange({
        targetDate: '2025-01-02',
        fromDate: '2025-01-01',
        toDate: '2025-01-02',
        inclusive: 'from',
      })
    ).toBeFalsy();
  });

  it('inclusive가 to일 때 종료 날짜만 포함해야 합니다.', () => {
    expect(
      isDateInRange({
        targetDate: '2025-01-01',
        fromDate: '2024-12-31',
        toDate: '2025-01-01',
        inclusive: 'to',
      })
    ).toBeTruthy();

    expect(
      isDateInRange({
        targetDate: '2025-01-01',
        fromDate: '2025-01-01',
        toDate: '2025-01-02',
        inclusive: 'to',
      })
    ).toBeFalsy();
  });

  it('inclusive가 none일 때 양쪽 경계를 포함하지 않아야 합니다.', () => {
    expect(
      isDateInRange({
        targetDate: '2025-01-01',
        fromDate: '2024-12-31',
        toDate: '2025-01-02',
        inclusive: 'none',
      })
    ).toBeTruthy();

    expect(
      isDateInRange({
        targetDate: '2025-01-01',
        fromDate: '2025-01-01',
        toDate: '2025-01-02',
        inclusive: 'none',
      })
    ).toBeFalsy();

    expect(
      isDateInRange({
        targetDate: '2025-01-02',
        fromDate: '2025-01-01',
        toDate: '2025-01-02',
        inclusive: 'none',
      })
    ).toBeFalsy();
  });

  describe('"-", "." 문자를 포함한 날짜 형식 테스트', () => {
    it('"/", "." 문자를 포함한 날짜 형식은 유효한 날짜 형식이어야 합니다.', () => {
      expect(
        isDateInRange({ fromDate: '2024.12.01', toDate: '2025.02.01' })
      ).toBeTruthy();

      expect(
        isDateInRange({ fromDate: '2024/12/01', toDate: '2025/02/01' })
      ).toBeTruthy();
    });
  });

  describe('에러 케이스', () => {
    it('타겟 날짜가 유효하지 않은 날짜 형식이면 에러를 던져야 합니다.', () => {
      expect(() =>
        isDateInRange({
          targetDate: 'invalid-date',
          toDate: '2025-01-01',
        })
      ).toThrow('타겟 날짜가 유효하지 않은 날짜 형식입니다.');
    });

    it('시작 날짜가 유효하지 않은 날짜 형식이면 에러를 던져야 합니다.', () => {
      expect(() =>
        isDateInRange({
          fromDate: 'invalid-date',
        })
      ).toThrow('시작 날짜가 유효하지 않은 날짜 형식입니다.');
    });

    it('종료 날짜가 유효하지 않은 날짜 형식이면 에러를 던져야 합니다.', () => {
      expect(() =>
        isDateInRange({
          toDate: 'invalid-date',
        })
      ).toThrow('종료 날짜가 유효하지 않은 날짜 형식입니다.');
    });

    it('시작 날짜가 종료 날짜보다 늦으면 에러를 던져야 합니다.', () => {
      expect(() =>
        isDateInRange({
          fromDate: '2025-02-01',
          toDate: '2025-01-01',
        })
      ).toThrow('시작 날짜가 종료 날짜보다 늦을 수 없습니다.');
    });

    it('fromDate, toDate 모두 없는 경우 에러를 던져야 합니다.', () => {
      expect(() => isDateInRange({})).toThrow(
        '시작 날짜 혹은 종료 날짜 중 하나는 필요합니다.'
      );
    });
  });
});
