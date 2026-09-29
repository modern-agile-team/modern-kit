import type { PropertyPath } from '@modern-kit/types';
import { cloneDeep } from '../../common/cloneDeep';
import { hasProperty } from '../../validator/hasProperty';
import { isReference } from '../../validator/isReference';

/**
 * @description 객체의 특정 경로에 해당하는 속성을 삭제하고 새로운 객체를 반환합니다.
 * `get`, `set` 과 동일한 점 표기법(dot notation) 경로를 사용하며, 옵셔널 키는 옵셔널(?) 경로로 접근합니다.
 *
 * 경로 중간의 값이 없거나 객체가 아니라면 아무것도 삭제하지 않고 반환합니다.
 * 기본적으로 원본 객체를 변경하지 않으며, `immutable: false` 옵션을 주면 원본 객체에서 직접 삭제합니다.
 *
 * @template T - 속성을 삭제할 객체의 타입
 * @template P - 삭제할 경로의 타입
 *
 * @param {T} obj - 속성을 삭제할 객체
 * @param {P} path - 점 표기법으로 구성된 삭제할 경로
 * @param {{ immutable?: boolean }} options - `immutable` 이 `false` 이면 원본 객체를 직접 변경합니다. (기본값: `true`)
 * @returns {T} - 속성이 삭제된 객체
 *
 * @example
 * const obj = { a: { b: 1, c: 2 } };
 *
 * unset(obj, 'a.b');
 * // { a: { c: 2 } }
 *
 * @example
 * // 경로 중간의 값이 없으면 그대로 반환합니다.
 * const obj: { a?: { b?: number } } = {};
 *
 * unset(obj, 'a?.b');
 * // {}
 */
export function unset<
  T extends Record<string, unknown>,
  P extends PropertyPath<T>
>(obj: T, path: P, options: { immutable?: boolean } = {}): T {
  const immutable = options?.immutable ?? true;
  const clonedObj = immutable ? cloneDeep(obj) : obj;
  const paths = path.replace(/\?/g, '').split('.');

  let current: Record<string, any> = clonedObj;

  for (let i = 0; i < paths.length - 1; i++) {
    const next = current[paths[i]];

    if (!hasProperty(current, paths[i]) || !isReference(next)) {
      return clonedObj;
    }

    current = next;
  }

  delete current[paths[paths.length - 1]];

  return clonedObj;
}
