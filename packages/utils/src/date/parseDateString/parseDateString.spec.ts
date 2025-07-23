import { describe, expect, it } from 'vitest';
import { parseDateString } from '.';

describe('parseDateString', () => {
  it('YYYY-MM-DD 형식의 날짜 문자열을 YYYY/MM/DD 형식으로 변환해야 합니다.', () => {
    const dateString1 = '2025-01-01';
    const date1 = parseDateString(dateString1);
    expect(date1).toBe('2025/01/01');
  });

  it('YYYY.MM.DD 형식의 날짜 문자열을 YYYY/MM/DD 형식으로 변환해야 합니다.', () => {
    const dateString1 = '2025.01.01';
    const date1 = parseDateString(dateString1);
    expect(date1).toBe('2025/01/01');
  });

  it('YYYY-MM-DD HH:MM:SS 형식의 날짜 문자열을 YYYY/MM/DD HH:MM:SS 형식으로 변환해야 합니다.', () => {
    const dateString1 = '2025-01-01 12:00:00';
    const date1 = parseDateString(dateString1);
    expect(date1).toBe('2025/01/01 12:00:00');
  });

  it('YYYY.MM.DD HH:MM:SS 형식의 날짜 문자열을 YYYY/MM/DD HH:MM:SS 형식으로 변환해야 합니다.', () => {
    const dateString1 = '2025.01.01 12:00:00';
    const date1 = parseDateString(dateString1);
    expect(date1).toBe('2025/01/01 12:00:00');
  });

  it('그 외 형식의 날짜 문자열은 그대로 반환해야 합니다.', () => {
    const dateString1 = '2025-01-01T12:00:00';
    const dateString2 = '2025/01/01';
    const dateString3 = '2025-01-01T12:00:00Z';
    const dateString4 = '2025-01-01T12:00:00+09:00';

    const date1 = parseDateString(dateString1);
    expect(date1).toBe(dateString1);

    const date2 = parseDateString(dateString2);
    expect(date2).toBe(dateString2);

    const date3 = parseDateString(dateString3);
    expect(date3).toBe(dateString3);

    const date4 = parseDateString(dateString4);
    expect(date4).toBe(dateString4);
  });
});
