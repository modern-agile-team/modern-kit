import { hasProperty } from '../../validator';

export const deepCopy = <T>(value: T) => {
  const referenceMap = new WeakMap();

  const deepClone = (target: T): T => {
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
      const newArray: any[] = [];

      referenceMap.set(target, newArray);
      for (const item of target) {
        newArray.push(deepClone(item));
      }
      return newArray as T;
    }

    // Set
    if (target instanceof Set) {
      const newSet = new Set();

      referenceMap.set(target, newSet);
      for (const item of target) {
        newSet.add(deepClone(item));
      }
      return newSet as T;
    }

    // Map
    if (target instanceof Map) {
      const newMap = new Map();

      referenceMap.set(target, newMap);
      for (const [key, value] of target) {
        newMap.set(deepClone(key), deepClone(value));
      }
      return newMap as T;
    }

    // Date
    if (target instanceof Date) {
      return new Date(target.getTime()) as T;
    }

    // RegExp
    if (target instanceof RegExp) {
      return new RegExp(target.source, target.flags) as T;
    }

    // Object
    const newObject: Record<PropertyKey, any> = Object.create(
      Object.getPrototypeOf(target)
    );

    referenceMap.set(target, newObject);
    for (const key in target) {
      if (hasProperty(target, key)) {
        newObject[key] = deepClone((target as Record<PropertyKey, any>)[key]);
      }
    }

    return deepClone(target) as T;
  };

  return deepClone(value);
};
