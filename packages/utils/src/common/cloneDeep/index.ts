/**
 * @description 인자로 넣은 값을 깊게 복사 함수입니다.
 * 자주 사용하는 원시 타입, 배열, Set, Map, Date, RegExp, 그리고 일반 객체를 지원하며, 순환 참조도 처리합니다.
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
  const referenceMap = new WeakMap();

  const copyWthRecursion = (target: T): T => {
    // Primitive Type
    if (typeof target !== 'object' || target === null) {
      return target;
    }

    // Handling circular references
    if (referenceMap.has(target)) {
      return referenceMap.get(target);
    }

    // Array
    if (Array.isArray(target)) {
      const newArray = new Array(target.length);
      referenceMap.set(target, newArray);

      for (let i = 0; i < target.length; i++) {
        newArray[i] = copyWthRecursion(target[i]);
      }
      return newArray as T;
    }

    // Set
    if (target instanceof Set) {
      const newSet = new Set();
      referenceMap.set(target, newSet);

      for (const item of target) {
        newSet.add(copyWthRecursion(item));
      }
      return newSet as T;
    }

    // Map
    if (target instanceof Map) {
      const newMap = new Map();

      referenceMap.set(target, newMap);
      for (const [key, value] of target) {
        newMap.set(copyWthRecursion(key), copyWthRecursion(value));
      }
      return newMap as T;
    }

    // Date
    if (target instanceof Date) {
      return new Date(target.getTime()) as T;
    }

    // RegExp
    if (target instanceof RegExp) {
      const result = new RegExp(target.source, target.flags);
      result.lastIndex = target.lastIndex;

      return result as T;
    }

    // Object
    const newObject: Record<PropertyKey, any> = {};
    referenceMap.set(target, newObject);

    const keys = Reflect.ownKeys(target); // symbol 유지

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      newObject[key] = copyWthRecursion(
        (target as Record<PropertyKey, any>)[key]
      );
    }

    return newObject as T;
  };

  return copyWthRecursion(value);
}
