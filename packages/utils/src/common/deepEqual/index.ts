const compareObjectOrArray = (source: any, target: any) => {
  const sourceKeys = Object.keys(source);
  const targetKeys = Object.keys(target);

  if (sourceKeys.length !== targetKeys.length) {
    return false;
  }

  for (const key of sourceKeys) {
    if (!targetKeys.includes(key) || !deepEqual(source[key], target[key])) {
      return false;
    }
  }

  return true;
};

export function deepEqual(source: any, target: any) {
  // Primitive Type
  if (source === target) {
    return true;
  }

  // NaN
  if (
    typeof source === 'number' &&
    typeof target === 'number' &&
    isNaN(source) &&
    isNaN(target)
  ) {
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

  // Returns false if the constructors are different.
  if (source.constructor !== target.constructor) {
    return false;
  }

  // Set
  if (source instanceof Set) {
    if (source.size !== target.size) return false;

    const sourceSetToArr = [...source];
    const targetSetToArr = [...target];

    return compareObjectOrArray(sourceSetToArr, targetSetToArr);
  }

  // Map
  if (source instanceof Map) {
    if (source.size !== target.size) return false;

    for (const [key, value] of source) {
      if (!target.has(key) || !deepEqual(value, target.get(key))) {
        return false;
      }
    }
    return true;
  }

  // Object & Array
  return compareObjectOrArray(source, target);
}
