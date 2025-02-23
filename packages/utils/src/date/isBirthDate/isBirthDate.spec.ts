import { describe, it, expect } from 'vitest';
import { isBirthDate } from './';

describe('isBirthDate', () => {
  it('구분자 없이 6자리 생년월일(YYMMDD)이 유효하면 true를 반환해야 합니다', () => {
    expect(isBirthDate('950913')).toBe(true);
  });

  it('구분자 없이 8자리 생년월일(YYYYMMDD)이 유효하면 true를 반환해야 합니다', () => {
    expect(isBirthDate('19950913')).toBe(true);
  });

  it('하이픈 구분자(패턴8)를 사용한 유효한 생년월일이면 true를 반환해야 합니다', () => {
    expect(isBirthDate('1995-09-13')).toBe(true);
  });

  it('점 구분자(패턴6)를 사용한 유효한 생년월일이면 true를 반환해야 합니다', () => {
    expect(isBirthDate('95.09.13')).toBe(true);
  });

  it('"&" 구분자를 사용한 생년월일은 false를 반환해야 합니다', () => {
    expect(isBirthDate('1995&09&13')).toBe(false);
  });

  it('구분자가 올바른 위치에 있지 않은 생년월일은 false를 반환해야 합니다', () => {
    expect(isBirthDate('199-509-13')).toBe(false);
  });

  it('월 또는 일이 2자리가 아닐 경우 false를 반환해야 합니다.', () => {
    expect(isBirthDate('1995-9-13')).toBe(false);
  });

  it('숫자가 아닌 문자가 포함된 생년월일은 false를 반환해야 합니다.', () => {
    expect(isBirthDate('1995-0a-13')).toBe(false);
  });

  it('혼합된 구분자를 사용한 생년월일은 false를 반환해야 합니다.', () => {
    expect(isBirthDate('1995-09/13')).toBe(false);
  });

  it('월과 일 사이에 구분자가 없는 생년월일은 false를 반환해야 합니다.', () => {
    expect(isBirthDate('1995/0913')).toBe(false);
  });

  it('유효하지 않은 길이의 숫자 문자열(7자리)은 false를 반환해야 합니다.', () => {
    expect(isBirthDate('1234567')).toBe(false);
  });

  it('월별 최대 일수를 초과하는 잘못된 날짜(구분자 없이)는 false를 반환해야 합니다.', () => {
    expect(isBirthDate('19950230')).toBe(false);
  });

  it('윤년의 올바른 윤일(YYYYMMDD)이면 true를 반환해야 합니다.', () => {
    expect(isBirthDate('20000229')).toBe(true);
  });

  it('윤년이 아닌 해의 윤일(YYYYMMDD)은 false를 반환해야 합니다.', () => {
    expect(isBirthDate('19000229')).toBe(false);
  });

  it('월이나 일이 "00"인 날짜는 false를 반환해야 합니다.', () => {
    expect(isBirthDate('19950013')).toBe(false); // month 00
    expect(isBirthDate('19950900')).toBe(false); // day 00
  });

  it('빈 문자열은 false를 반환해야 합니다.', () => {
    expect(isBirthDate('')).toBe(false);
  });

  it('앞뒤에 공백이 있는 입력은 false를 반환해야 합니다.', () => {
    expect(isBirthDate(' 19950913')).toBe(false);
  });

  it('입력된 연도(YY)가 현재 연도(YY)보다 크지 않은 경우, 6자리 생년월일을 올바르게 파싱해야 합니다.', () => {
    expect(isBirthDate('010101')).toBe(true);
  });
});
