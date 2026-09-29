/**
 * @description `Error` 의 열거 불가(non-enumerable) own 속성 중 복사본에 유지할 속성입니다.
 */
const ERROR_OWN_KEYS = ['message', 'stack', 'cause'] as const;

/**
 * @description 복사하지 않고 참조를 그대로 반환할 값인지 확인합니다.
 * - `Blob`/`File`: 불변 객체라 공유해도 안전하며, 내부 데이터는 복사할 수 없습니다.
 * - `WeakMap`/`WeakSet`/`Promise`: 내부 상태를 열거하거나 복사할 수 없습니다.
 * - DOM `Node`: 호스트 객체라 복사하면 동작하지 않습니다.
 * - `ArrayBuffer`/TypedArray/`DataView`: 사용 빈도가 낮아 복사를 지원하지 않습니다. (필요 시 로직 추가)
 */
const isNonCloneable = (value: object) =>
  value instanceof ArrayBuffer ||
  ArrayBuffer.isView(value) || // TypedArray(Uint8Array 등), DataView
  (typeof Blob !== 'undefined' && value instanceof Blob) ||
  value instanceof WeakMap ||
  value instanceof WeakSet ||
  value instanceof Promise ||
  (typeof Node !== 'undefined' && value instanceof Node);

/**
 * @description 인자로 넣은 값을 깊게 복사 함수입니다.
 * 자주 사용하는 원시 타입, 배열, Set, Map, Date, RegExp, 객체를 지원함으로써 구현을 단순화했으며, 순환 참조 이슈도 대응합니다.
 *
 * - 열거 가능한 own key(symbol 포함)만 복사하며, getter 는 복사 시점의 값이 됩니다.
 * - 클래스 인스턴스·`Error` 는 프로토타입을 유지하므로 `instanceof` 가 유지됩니다. (`#private` 필드는 복사되지 않습니다)
 *  - 아래 값은 복사하지 않고 참조를 그대로 반환합니다.
 *   - 복사가 불가능하거나 불필요한 값: `Blob`/`File`, `WeakMap`/`WeakSet`, `Promise`, DOM `Node`
 *   - 사용 빈도가 낮아 복사를 지원하지 않는 값: `ArrayBuffer`, TypedArray(`Uint8Array` 등), `DataView` (필요 시 로직 추가)
 *
 * @template T 복사할 값의 타입
 * @param {T} value 깊은 복사를 수행할 대상 값
 * @returns {T} 입력된 값의 깊은 복사본을 반환합니다.
 *
 * @example
 * const original = { a: 1, b: { c: 2 } };
 * const copied = cloneDeep(original);
 *
 * copied; // { a: 1, b: { c: 2 } }
 * copied !== original; // true
 * copied.b !== original.b; // true
 */
export function cloneDeep<T>(value: T): T {
  // 순환 참조 대응을 위한 WeakMap
  const referenceMap = new WeakMap();

  /**
   * @description `source` 의 열거 가능한 string key 와 symbol key 를 깊은 복사하여 `destination` 에 넣습니다.
   */
  const copyEnumerableProperties = (
    source: object,
    destination: Record<PropertyKey, any>
  ) => {
    const keys: PropertyKey[] = Object.keys(source);
    const symbols = Object.getOwnPropertySymbols(source);

    for (let i = 0; i < symbols.length; i++) {
      if (Object.prototype.propertyIsEnumerable.call(source, symbols[i])) {
        keys.push(symbols[i]);
      }
    }

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const copiedValue = copyWithRecursion(
        (source as Record<PropertyKey, any>)[key]
      );

      // `__proto__` 는 대입하면 프로토타입이 바뀌므로 own 속성으로 정의합니다.
      if (key === '__proto__') {
        Object.defineProperty(destination, key, {
          value: copiedValue,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      } else {
        destination[key] = copiedValue;
      }
    }
  };

  const copyWithRecursion = (target: T): T => {
    // Primitive Type
    if (typeof target !== 'object' || target === null) {
      return target;
    }

    // 순환 참조 이슈 대응
    if (referenceMap.has(target)) {
      return referenceMap.get(target);
    }

    // 복사할 수 없거나 복사할 필요가 없는 객체
    if (isNonCloneable(target)) {
      return target;
    }

    // Array
    if (Array.isArray(target)) {
      const newArray = new Array(target.length); // 미리 길이를 정의하는게 메모리적으로 이득
      referenceMap.set(target, newArray);

      for (let i = 0; i < target.length; i++) {
        newArray[i] = copyWithRecursion(target[i]);
      }
      return newArray as T;
    }

    // Set
    if (target instanceof Set) {
      const newSet = new Set();
      referenceMap.set(target, newSet);

      for (const item of target) {
        newSet.add(copyWithRecursion(item));
      }
      return newSet as T;
    }

    // Map
    if (target instanceof Map) {
      const newMap = new Map();
      referenceMap.set(target, newMap);

      for (const [key, value] of target) {
        newMap.set(copyWithRecursion(key), copyWithRecursion(value));
      }
      return newMap as T;
    }

    // Date
    if (target instanceof Date) {
      const newDate = new Date(target.getTime());
      referenceMap.set(target, newDate);

      return newDate as T;
    }

    // RegExp
    if (target instanceof RegExp) {
      const newRegExp = new RegExp(target.source, target.flags);
      newRegExp.lastIndex = target.lastIndex;
      referenceMap.set(target, newRegExp);

      return newRegExp as T;
    }

    // Error
    if (target instanceof Error) {
      const newError = Object.create(Object.getPrototypeOf(target));
      referenceMap.set(target, newError);

      // message, stack, cause 는 열거 불가 속성이라 원본과 같이 열거 불가로 복사합니다.
      for (let i = 0; i < ERROR_OWN_KEYS.length; i++) {
        const key = ERROR_OWN_KEYS[i];

        if (Object.prototype.hasOwnProperty.call(target, key)) {
          Object.defineProperty(newError, key, {
            value: copyWithRecursion(target[key] as T),
            writable: true,
            enumerable: false,
            configurable: true,
          });
        }
      }

      copyEnumerableProperties(target, newError);

      return newError as T;
    }

    // Object
    // 순수 객체는 그대로, 클래스 인스턴스는 프로토타입을 유지해 `instanceof` 와 메서드를 보존합니다.
    const prototype = Object.getPrototypeOf(target);
    const newObject: Record<PropertyKey, any> =
      prototype === Object.prototype ? {} : Object.create(prototype);
    referenceMap.set(target, newObject);

    copyEnumerableProperties(target, newObject);

    return newObject as T;
  };

  return copyWithRecursion(value);
}
