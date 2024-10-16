export function cloneDeep<T>(value: T) {
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
