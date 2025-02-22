import { describe, expect, it } from 'vitest';
import { parseDateString } from '.';

describe('parseDateString', () => {
  it('YYYY-MM-DD 형식의 날짜 문자열을 YYYY/MM/DD 형식으로 변환해야 합니다.', () => {
    const parsedDateString1 = parseDateString('2025-01-01');
    const parsedDateString2 = parseDateString('2025-01-01 13:45:00');
    const parsedDateString3 = parseDateString('2025-01-01T13:45:00');

    expect(parsedDateString1).toBe('2025/01/01');
    expect(parsedDateString2).toBe('2025/01/01 13:45:00');
    expect(parsedDateString3).toBe('2025/01/01 13:45:00');

    const date1 = new Date(parsedDateString1);
    const date2 = new Date(parsedDateString2);
    const date3 = new Date(parsedDateString3);

    expect(date1.toLocaleString('ko-KR')).toBe('2025. 1. 1. 오전 12:00:00');
    expect(date2.toLocaleString('ko-KR')).toBe('2025. 1. 1. 오후 1:45:00');
    expect(date3.toLocaleString('ko-KR')).toBe('2025. 1. 1. 오후 1:45:00');
  });

  it('YYYY.MM.DD 형식의 날짜 문자열을 YYYY/MM/DD 형식으로 변환해야 합니다.', () => {
    const parsedDateString1 = parseDateString('2025.01.01');
    const parsedDateString2 = parseDateString('2025.01.01 13:45:00');

    expect(parsedDateString1).toBe('2025/01/01');
    expect(parsedDateString2).toBe('2025/01/01 13:45:00');

    const date1 = new Date(parsedDateString1);
    const date2 = new Date(parsedDateString2);

    expect(date1.toLocaleString('ko-KR')).toBe('2025. 1. 1. 오전 12:00:00');
    expect(date2.toLocaleString('ko-KR')).toBe('2025. 1. 1. 오후 1:45:00');
  });

  it('YYYY-MM-DD, YYYY.MM.DD 외 형식의 날짜 문자열은 그대로 반환해야 합니다.', () => {
    const parsedDateString1 = parseDateString('2025/01/01');
    const parsedDateString2 = parseDateString('2025/01/01 13:45:00');
    const parsedDateString3 = parseDateString('01/01/2025');
    const parsedDateString4 = parseDateString('01/01/2025 13:45:00');

    expect(parsedDateString1).toBe('2025/01/01');
    expect(parsedDateString2).toBe('2025/01/01 13:45:00');
    expect(parsedDateString3).toBe('01/01/2025');
    expect(parsedDateString4).toBe('01/01/2025 13:45:00');

    const date1 = new Date(parsedDateString1);
    const date2 = new Date(parsedDateString2);
    const date3 = new Date(parsedDateString3);
    const date4 = new Date(parsedDateString4);

    expect(date1.toLocaleString('ko-KR')).toBe('2025. 1. 1. 오전 12:00:00');
    expect(date2.toLocaleString('ko-KR')).toBe('2025. 1. 1. 오후 1:45:00');
    expect(date3.toLocaleString('ko-KR')).toBe('2025. 1. 1. 오전 12:00:00');
    expect(date4.toLocaleString('ko-KR')).toBe('2025. 1. 1. 오후 1:45:00');
  });
});
