export const deepCopy = <T>(source: T): T => {
  // Primitive Type
  if (typeof source !== 'object' || source === null) {
    return source;
  }

  // Array
  if (Array.isArray(source)) {
    const newArray: any[] = [];

    for (const item of source) {
      newArray.push(deepCopy(item));
    }
    return newArray as T;
  }

  // Set
  if (source instanceof Set) {
    const newSet: Set<any> = new Set();

    for (const item of source) {
      newSet.add(deepCopy(item));
    }
    return newSet as T;
  }

  // Map
  if (source instanceof Map) {
    const newMap: Map<any, any> = new Map();

    for (const [key, value] of source) {
      newMap.set(deepCopy(key), deepCopy(value));
    }
    return newMap as T;
  }

  // Object
  const newObject: Record<string, any> = {};

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      newObject[key] = deepCopy(source[key]);
    }
  }
  return newObject as T;
};
