import type { PropertyPath, GetByPath } from '@modern-kit/types';
import { isNil } from '../../validator/isNil';

/**
 * @description 주어진 객체에서 주어진 경로에 해당하는 값을 반환합니다.
 * 주어진 객체의 타입에 옵셔널 프로퍼티가 있는 경우, 옵셔널(?) 경로로 접근해야 합니다.
 *
 * @template T - 조회하고자 하는 객체 타입
 * @template K - 경로 타입
 *
 * @param {T} obj - 조회하고자 하는 객체
 * @param {K} path - 점 표기법으로 구성된 경로
 * @param {GetByPath<T, K>} defaultValue - 경로에 해당하는 값이 존재하지 않을 경우 반환할 기본값입니다.
 * @returns {GetByPath<T, K>} 경로에 해당하는 값
 *
 * @example
 * const obj: { a: { b: { c: number } } } = { a: { b: { c: 1 } } };
 *
 * get(obj, 'a');
 * // value: { b: { c: 1 } }
 * // type: { b: { c: number } }
 *
 * get(obj, 'a.b');
 * // value: { c: 1 }
 * // type: { c: number }
 *
 * get(obj, 'a.b.c');
 * // value: 1
 * // type: number
 *
 * @example
 * const obj = { a: { b?: { c: 1 } } };
 *
 * get(obj, 'a.b?.c'); // 1, type: 1 | undefined
 * get(obj, 'a.b');
 * // value: { c: 1 }
 * // type: { c: 1 } | undefined
 */
export function get<
  T extends Record<PropertyKey, any>,
  K extends PropertyPath<T>
>(obj: T, path: K, defaultValue?: GetByPath<T, K>): GetByPath<T, K> {
  const paths = path.replace(/\?/g, '').split('.');
  let result = obj;

  for (let i = 0; i < paths.length; i++) {
    const currentPath = paths[i];

    if (isNil(result[currentPath])) {
      return defaultValue as GetByPath<T, K>;
    }

    result = result[currentPath];
  }

  return result as GetByPath<T, K>;
}
