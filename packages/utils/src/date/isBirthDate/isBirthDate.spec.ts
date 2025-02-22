import { describe, it, expect } from 'vitest';
import { isBirthDate } from './';

describe('isBirthDate', () => {
  it('should return true for valid 6-digit birthdates (YYMMDD) without separator', () => {
    expect(isBirthDate('950913')).toBe(true);
  });

  it('should return true for valid 8-digit birthdates (YYYYMMDD) without separator', () => {
    expect(isBirthDate('19950913')).toBe(true);
  });

  it('should return true for valid birthdates with hyphen separator (pattern8)', () => {
    expect(isBirthDate('1995-09-13')).toBe(true);
  });

  it('should return true for valid birthdates with dot separator (pattern6)', () => {
    expect(isBirthDate('95.09.13')).toBe(true);
  });

  it('should return false for birthdates with invalid separator "&"', () => {
    expect(isBirthDate('1995&09&13')).toBe(false);
  });

  it('should return false for birthdates with incorrect separator position', () => {
    expect(isBirthDate('199-509-13')).toBe(false);
  });

  it('should return false when month or day are not 2 digits', () => {
    expect(isBirthDate('1995-9-13')).toBe(false);
  });

  it('should return false for birthdates with non-numeric characters', () => {
    expect(isBirthDate('1995-0a-13')).toBe(false);
  });

  it('should return false for birthdates with mixed separators', () => {
    expect(isBirthDate('1995-09/13')).toBe(false);
  });

  it('should return false for birthdates with missing separator between month and day', () => {
    expect(isBirthDate('1995/0913')).toBe(false);
  });

  it('should return false for numeric strings with invalid length (7 digits)', () => {
    expect(isBirthDate('1234567')).toBe(false);
  });

  it('should return false for invalid dates exceeding month days (no separator)', () => {
    expect(isBirthDate('19950230')).toBe(false);
  });

  it('should return true for valid leap day on a leap year (YYYYMMDD)', () => {
    expect(isBirthDate('20000229')).toBe(true);
  });

  it('should return false for leap day on a non-leap year (YYYYMMDD)', () => {
    expect(isBirthDate('19000229')).toBe(false);
  });

  it('should return false for dates with zero month or zero day', () => {
    expect(isBirthDate('19950013')).toBe(false); // month 00
    expect(isBirthDate('19950900')).toBe(false); // day 00
  });

  it('should return false for empty string', () => {
    expect(isBirthDate('')).toBe(false);
  });

  it('should return false for input with leading or trailing spaces', () => {
    expect(isBirthDate(' 19950913')).toBe(false);
  });

  it('should correctly parse a 6-digit birthdate when candidateYear is not greater than currentYear', () => {
    expect(isBirthDate('010101')).toBe(true);
  });
});
