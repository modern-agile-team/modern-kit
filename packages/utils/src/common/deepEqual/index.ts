export const deepEqual = (source: any, target: any) => {
  // Primitive Type
  if (source === target) {
    return true;
  }

  // Returns false if either is not an object
  if (
    typeof source !== 'object' ||
    typeof target !== 'object' ||
    source === null ||
    target === null
  ) {
    return false;
  }

  // Set
  if (source instanceof Set && target instanceof Set) {
    if (source.size !== target.size) return false;

    for (const value of source) {
      if (!target.has(value)) return false;
    }
    return true;
  }

  // Map
  if (source instanceof Map && target instanceof Map) {
    if (source.size !== target.size) return false;

    for (const [key, value] of source) {
      if (!target.has(key) || !deepEqual(value, target.get(key))) {
        return false;
      }
    }
    return true;
  }

  // Object & Array
  const keysA = Object.keys(source);
  const keysB = Object.keys(target);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(source[key], target[key])) {
      return false;
    }
  }

  return true;
};
