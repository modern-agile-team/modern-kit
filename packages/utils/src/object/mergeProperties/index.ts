import { contains } from '../../array';
import { isArray, isPlainObject, isReference } from '../../validator';

/**
 * @description 대상 객체에 원본 객체의 속성을 병합합니다. 특정 속성을 제외할 수 있습니다.
 *
 * @template T - source 객체의 유형입니다.
 * @template K - target 객체의 유형입니다.
 * @param {T} source - 병합할 속성을 가진 원본 객체입니다.
 * @param {K} target - 속성을 병합할 대상 객체입니다.
 * @param {(keyof K)[]} excludedKeys - 병합에서 제외할 속성의 이름을 포함한 문자열 배열입니다.
 * @returns {T & K} - 병합된 새로운 객체를 반환합니다.
 *
 * @example
 * const obj1 = { a: 1, b: [1], c: { d: 1 }}
 * const obj2 = { a: 3, b: [2], c: { e: 2 }, f: 5}
 *
 * const mergedObj1 = mergeObject(obj1, obj2); // { a: 3, b: [1, 2], c: { d: 1, e: 2}, f: 5 }
 * const mergedObj2 = mergeObject(obj1, obj2, ['b', 'c']); // { a: 3, b: [1], c: { d: 1 }, f: 5 }
 */
export function mergeProperties<
  T extends Record<PropertyKey, any>,
  K extends Record<PropertyKey, any>
>(source: T, target: K, excludedKeys?: (keyof K)[]): T & K {
  const mergedObj = { ...source };

  for (const key in target) {
    if (excludedKeys && contains(excludedKeys, key)) continue;

    if (isReference(target[key])) {
      if (isArray(target[key])) {
        mergedObj[key] = isArray(mergedObj[key])
          ? mergedObj[key].concat(target[key])
          : target[key];
      } else {
        mergedObj[key] = mergeProperties(
          isPlainObject(mergedObj[key]) ? mergedObj[key] : {},
          target[key]
        );
      }
    } else {
      mergedObj[key] = target[key];
    }
  }

  return mergedObj;
}
