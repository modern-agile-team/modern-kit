import { describe, it, expect } from 'vitest';
import { isFunction } from '.';

describe('isFunction', () => {
  it('화살표 함수에 대해 true를 반환해야 합니다.', () => {
    expect(isFunction(() => {})).toBeTruthy();
  });

  it('익명 함수에 대해 true를 반환해야 합니다.', () => {
    expect(isFunction(function () {})).toBeTruthy();
  });

  it('기명 함수에 대해 true를 반환해야 합니다.', () => {
    expect(isFunction(function namedFunction() {})).toBeTruthy();
  });

  it('클래스 메서드에 대해 true를 반환해야 합니다.', () => {
    class MyClass {
      method() {}
    }
    expect(isFunction(new MyClass().method)).toBeTruthy();
  });

  it('Function 생성자에 대해 true를 반환해야 합니다.', () => {
    expect(isFunction(new Function())).toBeTruthy();
  });

  it('객체에 대해 false를 반환해야 합니다.', () => {
    expect(isFunction({})).toBeFalsy();
  });

  it('숫자에 대해 false를 반환해야 합니다.', () => {
    expect(isFunction(123)).toBeFalsy();
  });

  it('문자열에 대해 false를 반환해야 합니다.', () => {
    expect(isFunction('test')).toBeFalsy();
  });

  it('불리언에 대해 false를 반환해야 합니다.', () => {
    expect(isFunction(true)).toBeFalsy();
  });

  it('배열에 대해 false를 반환해야 합니다.', () => {
    expect(isFunction([])).toBeFalsy();
  });

  it('null에 대해 false를 반환해야 합니다.', () => {
    expect(isFunction(null)).toBeFalsy();
  });

  it('undefined에 대해 false를 반환해야 합니다.', () => {
    expect(isFunction(undefined)).toBeFalsy();
  });
});
