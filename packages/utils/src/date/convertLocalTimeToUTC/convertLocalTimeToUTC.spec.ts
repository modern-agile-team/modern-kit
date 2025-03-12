import { describe, it, expect } from 'vitest';
import { convertLocalTimeToUTC } from '.';

describe('convertLocalTimeToUTC', () => {
  it('로컬 시간을 UTC로 올바르게 변환해야 합니다', () => {
    const localDate = new Date('2023-10-01 12:00:00'); // 로컬 시간
    const expectedUTC = new Date('2023-10-01T12:00:00Z'); // UTC 시간

    expect(convertLocalTimeToUTC(localDate)).toBe(expectedUTC.getTime());
  });

  it('로컬 시간을 변환한 결과가 Date.UTC를 사용한 결과와 같아야 합니다', () => {
    const localDate = new Date('2023-10-01 12:00:00'); // 로컬 시간
    const date2 = new Date(Date.UTC(2023, 9, 1, 12, 0, 0));

    expect(convertLocalTimeToUTC(localDate)).toBe(date2.getTime());
  });
});
