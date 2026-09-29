// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { isPlainObject } from '.';

describe('isPlainObject', () => {
  it('순수 객체에 대해 true를 반환해야 합니다.', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1, b: 2 })).toBe(true);
    expect(isPlainObject(new Object())).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  it('순수 객체가 아니라면 false를 반환해야 합니다.', () => {
    expect(isPlainObject(function () {})).toBe(false);
    expect(isPlainObject(() => {})).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(new Set())).toBe(false);
    expect(isPlainObject(new Map())).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject(1)).toBe(false);
    expect(isPlainObject('')).toBe(false);
    expect(isPlainObject(false)).toBe(false);
    expect(isPlainObject(Symbol())).toBe(false);
    expect(isPlainObject(new Date())).toBe(false);
  });

  it('클래스 인스턴스는 false를 반환해야 합니다.', () => {
    class Point {
      x = 1;
    }
    class Empty {}

    expect(isPlainObject(new Point())).toBe(false);
    expect(isPlainObject(new Empty())).toBe(false);
  });

  it('Object.create(proto) 로 만든 객체는 false를 반환해야 합니다.', () => {
    expect(isPlainObject(Object.create({ a: 1 }))).toBe(false);
    expect(isPlainObject(Object.create(Object.create(Object.prototype)))).toBe(
      false
    );
  });

  it('프로토타입이 Object.prototype 이어도 내장 객체(Math, JSON)는 false를 반환해야 합니다.', () => {
    expect(isPlainObject(Math)).toBe(false);
    expect(isPlainObject(JSON)).toBe(false);
  });

  it('다른 realm(iframe) 에서 만든 순수 객체는 true를 반환해야 합니다.', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);

    const realm = iframe.contentWindow as unknown as typeof globalThis;

    // 전제: iframe 의 Object.prototype 은 현재 realm 과 다른 참조입니다.
    expect(realm.Object.prototype).not.toBe(Object.prototype);

    expect(isPlainObject(new realm.Object())).toBe(true);
    expect(isPlainObject(realm.Object.create(null))).toBe(true);
    expect(isPlainObject(new realm.Array())).toBe(false);

    iframe.remove();
  });
});
