import { hasProperty } from '../../validator';

export const deepCopy = <T>(source: T, map = new WeakMap()): T => {
  // Primitive Type
  if (typeof source !== 'object' || source === null) {
    return source;
  }

  // Handling circular references
  if (map.has(source)) {
    return map.get(source);
  }

  let clone: any;

  // Array
  if (Array.isArray(source)) {
    clone = [];
    map.set(source, clone);
    for (const item of source) {
      clone.push(deepCopy(item, map));
    }
    return clone as T;
  }

  // Set
  if (source instanceof Set) {
    clone = new Set();
    map.set(source, clone);
    for (const item of source) {
      clone.add(deepCopy(item, map));
    }
    return clone as T;
  }

  // Map
  if (source instanceof Map) {
    clone = new Map();
    map.set(source, clone);
    for (const [key, value] of source) {
      clone.set(deepCopy(key, map), deepCopy(value, map));
    }
    return clone as T;
  }

  // Date
  if (source instanceof Date) {
    return new Date(source.getTime()) as T;
  }

  // RegExp
  if (source instanceof RegExp) {
    return new RegExp(source.source, source.flags) as T;
  }

  // Object
  clone = Object.create(Object.getPrototypeOf(source));
  map.set(source, clone);
  for (const key in source) {
    if (hasProperty(source, key)) {
      clone[key] = deepCopy((source as Record<string, any>)[key], map);
    }
  }
  return clone as T;
};
