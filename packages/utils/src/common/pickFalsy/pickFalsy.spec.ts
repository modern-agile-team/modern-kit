import { describe, it, expect } from 'vitest';
import { pickFalsy } from '.';

describe('pickFalsy', () => {
  it('기본적으로 null, undefined, false, NaN인 경우 true를 반환해야 한다', () => {
    const isInvalidValue = pickFalsy();

    expect(isInvalidValue(null)).toBeTruthy();
    expect(isInvalidValue(undefined)).toBeTruthy();
    expect(isInvalidValue(false)).toBeTruthy();
    expect(isInvalidValue(NaN)).toBeTruthy();
  });

  it('기본적으로 숫자 0, 빈 문자열, 빈 배열, 빈 객체인 경우 유효한 값으로 판단해 false를 반환해야 한다', () => {
    const isInvalidValue = pickFalsy();

    expect(isInvalidValue(0)).toBeFalsy();
    expect(isInvalidValue('')).toBeFalsy();
    expect(isInvalidValue([])).toBeFalsy();
    expect(isInvalidValue({})).toBeFalsy();
  });

  it('숫자 옵션은 숫자 0인 경우 true를 반환해야 합니다.', () => {
    const isInvalidValue = pickFalsy('number');

    expect(isInvalidValue(0)).toBeTruthy();
    expect(isInvalidValue(-0)).toBeTruthy();

    expect(isInvalidValue(1)).toBeFalsy(); // 유효한 값
  });

  it('문자열 옵션은 빈 문자열인 경우 true를 반환해야 한다', () => {
    const isInvalidValue = pickFalsy('string');

    expect(isInvalidValue('')).toBeTruthy();
    expect(isInvalidValue('a')).toBeFalsy(); // 유효한 값
  });

  it('배열 옵션은 빈 배열인 경우 true를 반환해야 한다', () => {
    const isInvalidValue = pickFalsy('array');

    expect(isInvalidValue([])).toBeTruthy();
    expect(isInvalidValue([1, 2, 3])).toBeFalsy(); // 유효한 값
  });

  it('객체 옵션은 빈 객체인 경우 true를 반환해야 한다', () => {
    const isInvalidValue = pickFalsy('object');

    expect(isInvalidValue({})).toBeTruthy();
    expect(isInvalidValue({ a: 1 })).toBeFalsy(); // 유효한 값
  });

  it('여러 옵션으로 올바른 값을 반환해야 한다', () => {
    const isInvalidValue = pickFalsy('string', 'object', 'array');

    expect(isInvalidValue([])).toBeTruthy();
    expect(isInvalidValue({})).toBeTruthy();
    expect(isInvalidValue('')).toBeTruthy();
    expect(isInvalidValue(0)).toBeFalsy();
  });
});
