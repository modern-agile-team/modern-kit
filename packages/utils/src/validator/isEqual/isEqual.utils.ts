import { isNumber, isFunction } from '../../validator';

const compareObjectOrArray = (
  source: any,
  target: any,
  visited: WeakMap<object, any>
) => {
  const sourceKeys = Object.keys(source);
  const targetKeys = Object.keys(target);

  if (sourceKeys.length !== targetKeys.length) {
    return false;
  }

  for (let i = 0; i < sourceKeys.length; i++) {
    const key = sourceKeys[i];

    if (
      !targetKeys.includes(key) ||
      !isEqualInternal(source[key], target[key], visited)
    ) {
      return false;
    }
  }

  return true;
};

export const isEqualInternal = (
  source: any,
  target: any,
  visited: WeakMap<object, any>
) => {
  // Primitive Type
  if (source === target) {
    return true;
  }

  // NaN
  if (isNumber(source) && isNumber(target) && isNaN(source) && isNaN(target)) {
    return true;
  }

  // Function
  if (isFunction(source) && isFunction(target)) {
    return source.toString() === target.toString();
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

  // Handling Circular References
  if (visited.has(source) && visited.get(source) === target) {
    return true;
  }

  visited.set(source, target);

  // Returns false if the constructors are different.
  if (source.constructor !== target.constructor) {
    return false;
  }

  // Set
  if (source instanceof Set) {
    if (source.size !== target.size) return false;

    const sourceSetToArr = [...source];
    const targetSetToArr = [...target];

    return compareObjectOrArray(sourceSetToArr, targetSetToArr, visited);
  }

  // Map
  if (source instanceof Map) {
    if (source.size !== target.size) return false;

    for (const [key, value] of source) {
      if (
        !target.has(key) ||
        !isEqualInternal(value, target.get(key), visited)
      ) {
        return false;
      }
    }
    return true;
  }

  // Object & Array
  return compareObjectOrArray(source, target, visited);
};
