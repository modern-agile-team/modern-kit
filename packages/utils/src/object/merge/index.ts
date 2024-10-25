import { isPlainObject } from '../../validator/isPlainObject';
import { cloneDeep } from '../../common/cloneDeep';
import { objectKeys } from '../objectKeys';

/**
 * @description `source` 객체의 속성들을 재귀적으로 `target` 객체에 병합합니다.
 * 배열과 일반 객체는 재귀적으로 병합되며, 배열 혹은 일반 객체가 아닌 `source`의 값들은 `target`에 값이 존재하면 덮어쓰고, 존재하지 않으면 추가됩니다.
 *
 * @template T - 병합할 대상 객체의 타입.
 * @template S - 병합할 소스 객체의 타입.
 * @param {T} target - `source`의 속성을 병합할 대상 객체.
 * @param {S} source - 병합될 속성을 가진 소스 객체.
 * @returns {T & S} - 병합된 대상 객체와 소스 객체의 모든 속성을 포함하는 새로운 객체.
 *
 * @example
 * const target = { a: { x: 1, y: 2 }, b: 2 };
 * const source = { a: { y: 3, z: 4 }, c: 5 };
 * merge(target, source); // { a: { x: 1, y: 3, z: 4 }, b: 2, c: 5 }
 *
 * @example
 * const target = { a: [1, { name: 'modern' }] };
 * const source = { a: [3, { address: 'seoul' }] };
 * merge(target, source); // { a: [3, { name: 'modern', address: 'seoul' }] }
 */
export function merge<
  T extends Record<PropertyKey, any>,
  S extends Record<PropertyKey, any>
>(target: T, source: S): T & S {
  const mergedTarget = cloneDeep(target);

  const innerMerge = (target: any, source: any) => {
    const sourceKeys = objectKeys(source);

    for (let i = 0; i < sourceKeys.length; i++) {
      const key = sourceKeys[i];

      const sourceValue = source[key];
      const targetValue = target[key];

      if (Array.isArray(sourceValue)) {
        if (Array.isArray(targetValue)) {
          target[key] = innerMerge(targetValue, sourceValue);
        } else {
          target[key] = innerMerge([], sourceValue);
        }
      } else if (isPlainObject(sourceValue)) {
        if (isPlainObject(targetValue)) {
          target[key] = innerMerge(targetValue, sourceValue);
        } else {
          target[key] = innerMerge({}, sourceValue);
        }
      } else if (targetValue === undefined || sourceValue !== undefined) {
        target[key] = sourceValue;
      }
    }
    return target;
  };

  return innerMerge(mergedTarget, source);
}
