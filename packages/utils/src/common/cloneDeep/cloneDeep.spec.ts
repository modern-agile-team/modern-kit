// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { cloneDeep } from '.';

describe('cloneDeep', () => {
  it('원시값을 깊게 복사해야 합니다', () => {
    const originNum = 42;
    const copiedNum = cloneDeep(originNum);

    expect(copiedNum).toBe(originNum);
  });

  it('배열을 깊게 복사해야 합니다', () => {
    const originArray = [1, 2, [3, 4]];
    const copiedArray = cloneDeep(originArray);

    expect(copiedArray).toEqual(originArray);
    expect(copiedArray).not.toBe(originArray);
  });

  it('배열의 순환 참조도 깊게 복사해야 합니다', () => {
    const originArray: any[] = [];
    originArray.push(originArray);

    const copiedArr = cloneDeep(originArray);

    expect(copiedArr).toEqual(copiedArr[0]);
    expect(copiedArr).not.toBe(originArray);
    expect(copiedArr).not.toBe(originArray[0]);
  });

  it('객체의 순환 참조도 깊게 복사해야 합니다', () => {
    const originObject = { origin: {} };
    originObject.origin = originObject;

    const copiedObject = cloneDeep(originObject);

    expect(copiedObject).toEqual(copiedObject.origin);
    expect(copiedObject).not.toBe(originObject);
    expect(copiedObject).not.toBe(originObject.origin);
  });

  it('객체를 깊게 복사해야 합니다', () => {
    const originObj = { a: 1, b: { c: 2, d: [0, 1] } };
    const copiedObj = cloneDeep(originObj);

    expect(copiedObj).toEqual(originObj);
    expect(copiedObj).not.toBe(originObj);
    expect(copiedObj.b.d).not.toBe(originObj.b.d);
  });

  it('Set을 깊게 복사해야 합니다', () => {
    const originSet = new Set([1, 2, 3]);
    const copiedSet = cloneDeep(originSet);

    expect(copiedSet).toEqual(originSet);
    expect(copiedSet).not.toBe(originSet);
  });

  it('Map을 깊게 복사해야 합니다', () => {
    const originMap = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const copiedMap = cloneDeep(originMap);

    expect(copiedMap).toEqual(originMap);
    expect(copiedMap).not.toBe(originMap);
  });

  it('Date를 깊게 복사해야 합니다', () => {
    const date = new Date();
    const copiedDate = cloneDeep(date);

    expect(copiedDate.getTime()).toEqual(date.getTime());
    expect(copiedDate).not.toBe(date);
  });

  it('정규식을 깊게 복사해야 합니다', () => {
    const regex = /test/gi;
    const copiedRegex = cloneDeep(regex);

    expect(copiedRegex.source).toEqual(regex.source);
    expect(copiedRegex.flags).toEqual(regex.flags);
    expect(copiedRegex).not.toBe(regex);
  });

  it('열거 가능한 symbol key 는 복사하고, 열거 불가 symbol key 는 복사하지 않아야 합니다', () => {
    const enumerableSymbol = Symbol('enumerable');
    const nonEnumerableSymbol = Symbol('nonEnumerable');

    const originObj: Record<PropertyKey, unknown> = {
      [enumerableSymbol]: { a: 1 },
    };
    Object.defineProperty(originObj, nonEnumerableSymbol, {
      value: 2,
      enumerable: false,
    });

    const copiedObj = cloneDeep(originObj);

    expect(copiedObj[enumerableSymbol]).toEqual({ a: 1 });
    expect(copiedObj[enumerableSymbol]).not.toBe(originObj[enumerableSymbol]);
<<<<<<< HEAD
    expect(Object.getOwnPropertySymbols(copiedObj)).toEqual([enumerableSymbol]);
=======
    expect(Object.getOwnPropertySymbols(copiedObj)).toEqual([
      enumerableSymbol,
    ]);
>>>>>>> 24817925 (chore: vitest v5 적용)
  });

  it('`__proto__` key 는 프로토타입을 바꾸지 않고 own 속성으로 복사해야 합니다', () => {
    const originObj = JSON.parse('{ "__proto__": { "polluted": true } }');

    const copiedObj = cloneDeep(originObj);

    expect(Object.getPrototypeOf(copiedObj)).toBe(Object.prototype);
    expect(Object.prototype.hasOwnProperty.call(copiedObj, '__proto__')).toBe(
      true
    );
    expect(copiedObj.__proto__).toEqual({ polluted: true });
    expect(copiedObj.__proto__).not.toBe(originObj.__proto__);
    expect(copiedObj.polluted).toBeUndefined();
  });

  it('복사할 수 없는 객체는 참조를 그대로 반환해야 합니다', () => {
    const nonCloneables = [
      new ArrayBuffer(8),
      new Uint8Array([1, 2, 3]),
      new DataView(new ArrayBuffer(8)),
      new Blob(['test']),
      new WeakMap(),
      new WeakSet(),
      Promise.resolve(),
      document.createElement('div'),
    ];

    nonCloneables.forEach((value) => {
      expect(cloneDeep(value)).toBe(value);
    });

    const originObj = { buffer: new ArrayBuffer(8) };
    const copiedObj = cloneDeep(originObj);

    expect(copiedObj).not.toBe(originObj);
    expect(copiedObj.buffer).toBe(originObj.buffer);
  });

  it('클래스 인스턴스는 프로토타입을 유지해 복사해야 합니다', () => {
    class Person {
      constructor(
        public name: string,
        public info: { age: number }
      ) {}

      greet() {
        return `hello ${this.name}`;
      }
    }

    const originPerson = new Person('modern', { age: 1 });
    const copiedPerson = cloneDeep(originPerson);

    expect(copiedPerson).not.toBe(originPerson);
    expect(copiedPerson).toBeInstanceOf(Person);
    expect(copiedPerson.greet()).toBe('hello modern');
    expect(copiedPerson.info).toEqual({ age: 1 });
    expect(copiedPerson.info).not.toBe(originPerson.info);
  });

  describe('Error', () => {
    it('프로토타입과 message, stack 을 유지해 복사해야 합니다', () => {
      const originError = new TypeError('error message');
      const copiedError = cloneDeep(originError);

      expect(copiedError).not.toBe(originError);
      expect(copiedError).toBeInstanceOf(TypeError);
      expect(copiedError.message).toBe(originError.message);
      expect(copiedError.stack).toBe(originError.stack);
      expect(Object.keys(copiedError)).toEqual([]);
    });

    it('cause 를 열거 불가 속성으로 깊게 복사해야 합니다', () => {
      const cause = { reason: 'network' };
      const originError = new Error('error message', { cause });
      const copiedError = cloneDeep(originError);

      expect(copiedError.cause).toEqual(cause);
      expect(copiedError.cause).not.toBe(cause);
      expect(
        Object.getOwnPropertyDescriptor(copiedError, 'cause')?.enumerable
      ).toBe(false);
    });

    it('cause 가 없으면 cause 속성을 만들지 않아야 합니다', () => {
      const copiedError = cloneDeep(new Error('error message'));

      expect(Object.prototype.hasOwnProperty.call(copiedError, 'cause')).toBe(
        false
      );
    });

    it('열거 가능한 사용자 정의 속성을 깊게 복사해야 합니다', () => {
      const originError = Object.assign(new Error('error message'), {
        code: 500,
        meta: { retry: true },
      });
      const copiedError = cloneDeep(originError);

      expect(copiedError.code).toBe(500);
      expect(copiedError.meta).toEqual({ retry: true });
      expect(copiedError.meta).not.toBe(originError.meta);
    });

    it('Error 의 순환 참조도 깊게 복사해야 합니다', () => {
      const originError = new Error('error message') as Error & {
        self?: Error;
      };
      originError.self = originError;

      const copiedError = cloneDeep(originError);

      expect(copiedError.self).toBe(copiedError);
    });
  });
});
