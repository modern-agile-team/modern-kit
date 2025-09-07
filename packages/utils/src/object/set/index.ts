import type { PropertyPath, GetByPath } from '@modern-kit/types';
import { cloneDeep } from '../../common/cloneDeep';
import { hasProperty } from '../../validator/hasProperty';
import { isNil } from '../../validator/isNil';
import { get } from '../get';

/**
 * @description 객체의 특정 경로를 업데이트하고 새로운 객체를 반환합니다.
 *
 * 점 표기법(dot notation)을 사용하여 중첩된 객체의 깊은 속성에 접근할 수 있습니다.
 * 주어진 객체의 타입에 옵셔널 프로퍼티가 있는 경우, 옵셔널(?) 경로로 접근해야 합니다.
 *
 * immutable 옵션을 true로 설정하면, 원본 객체를 수정하지 않고 새로운 객체를 반환합니다.
 *
 * @template T - 업데이트할 객체의 타입
 * @template P - 업데이트할 경로의 타입
 * @template V - 업데이트할 값의 타입
 *
 * @param {T} obj - 업데이트할 객체
 * @param {P} path - 업데이트할 경로
 * @param {V} value - 업데이트할 값
 * @param {boolean} [options.immutable=false] - true일 경우, 원본 객체를 수정하지 않고 새로운 객체를 반환합니다.
 * @returns {T} - 업데이트된 객체
 *
 * @example
 * // 존재하는 경로를 업데이트하는 경우
 * const obj: { a: { b: number } } = { a: { b: 1 } };
 * set(obj, 'a.b', 2);
 * // obj: { a: { b: 2 } }
 *
 * @example
 * // 존재하지 않는 경로를 업데이트하는 경우
 * const obj: { a?: { b?: number } } = {};
 * set(obj, 'a?.b', 2);
 * // { a: { b: 2 } }
 *
 * @example
 * // 불변하게 업데이트하는 경우
 * const originalObj: { a: { b: number } } = { a: { b: 1 } };
 * const updatedObj = set(originalObj, 'a.b', 2, { immutable: true });
 * // originalObj: { a: { b: 1 } }
 * // updatedObj: { a: { b: 2 } }
 */
export function set<
  T extends Record<string, unknown>,
  P extends PropertyPath<T>,
  V extends GetByPath<T, P>
>(obj: T, path: P, value: V, options?: { immutable?: boolean }): T;

/**
 * @description 객체의 특정 경로를 업데이트하고 새로운 객체를 반환합니다.
 *
 * 점 표기법(dot notation)을 사용하여 중첩된 객체의 깊은 속성에 접근할 수 있습니다.
 * 주어진 객체의 타입에 옵셔널 프로퍼티가 있는 경우, 옵셔널(?) 경로로 접근해야 합니다.
 *
 * immutable 옵션을 true로 설정하면, 원본 객체를 수정하지 않고 새로운 객체를 반환합니다.
 *
 * @template T - 업데이트할 객체의 타입
 * @template P - 업데이트할 경로의 타입
 * @template V - 업데이트 함수의 타입
 *
 * @param {T} obj - 업데이트할 객체
 * @param {P} path - 업데이트할 경로
 * @param {V} updater - 현재 값을 받아 새로운 값을 반환하는 함수, 해당 함수의 반환 값을 기반으로 객체의 특정 경로를 업데이트 진행
 * @param {boolean} [options.immutable=false] - true일 경우, 원본 객체를 수정하지 않고 새로운 객체를 반환합니다.
 * @returns {T} - 업데이트된 객체
 *
 * @example
 * // 존재하는 경로를 업데이트하는 경우
 * const obj: { a: { b: number } } = { a: { b: 1 } };
 * set(obj, 'a.b', (value) => value + 1);
 * // { a: { b: 2 } }
 *
 * @example
 * // 존재하지 않는 경로를 업데이트하는 경우
 * const obj: { a?: { b?: number } } = {};
 * set(obj, 'a?.b', (value) => (value ?? 0) + 1);
 * // obj: { a: { b: 1 } }
 *
 * @example
 * // 불변하게 업데이트하는 경우
 * const originalObj: { a: { b: number } } = { a: { b: 1 } };
 * const updatedObj = set(originalObj, 'a.b', (value) => value + 1, { immutable: true });
 * // originalObj: { a: { b: 1 } }
 * // updatedObj: { a: { b: 2 } }
 */
export function set<
  T extends Record<string, unknown>,
  P extends PropertyPath<T>,
  V extends (value: GetByPath<T, P>) => GetByPath<T, P>
>(obj: T, path: P, updater: V, options?: { immutable?: boolean }): T;

export function set<
  T extends Record<string, unknown>,
  P extends PropertyPath<T>,
  V extends GetByPath<T, P> | ((value: GetByPath<T, P>) => GetByPath<T, P>)
>(obj: T, path: P, value: V, options: { immutable?: boolean } = {}): T {
  const immutable = options?.immutable ?? false;
  const clonedObj = immutable ? cloneDeep(obj) : obj;
  const resolvedPath = path.replace(/\?/g, '');
  const paths = resolvedPath.split('.');

  let current: Record<string, any> = clonedObj;

  for (let i = 0; i < paths.length - 1; i++) {
    const currentPath = paths[i];

    if (!hasProperty(current, currentPath) || isNil(current[currentPath])) {
      current[currentPath] = {};
    }

    current = current[currentPath];
  }

  const lastPath = paths[paths.length - 1];

  if (typeof value === 'function') {
    current[lastPath] = value(get(clonedObj, resolvedPath));
  } else {
    current[lastPath] = value;
  }

  return clonedObj;
}
