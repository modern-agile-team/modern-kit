import { PropertyPath } from '@modern-kit/types';
import { isNil } from '../../validator';

/**
 * @description 주어진 객체 타입에서 지정된 경로에 해당하는 값의 타입을 반환합니다.
 * 점 표기법(dot notation)을 사용하여 중첩된 객체 속성 타입에 접근할 수 있습니다.
 *
 * 주어진 객체 타입에 옵셔널 키가 있는 경우, 옵셔널(?) 경로로 접근해야 합니다.
 *
 * @param {T} obj - 객체
 * @param {P} path - 점 표기법으로 구성된 키 경로
 * @param {isUndefinable} isUndefinable - 경로에 해당하는 값이 존재하지 않을 경우 undefined를 반환할지 여부
 * @returns {GetReturnType<T, P, isUndefinable>} 경로에 해당하는 값
 *
 * @example
 * GetReturnType<{ a: { b: { c: 1 } } }, 'a'> // { b: { c: 1 } }
 * GetReturnType<{ a: { b: { c: 1 } } }, 'a.b'> // { c: 1 }
 * GetReturnType<{ a: { b: { c: 1 } } }, 'a.b.c'> // 1
 *
 * @example
 * GetReturnType<{ a: { b?: { c: 1 } } }, 'a.b?.c'> // 1 | undefined
 *
 * @example
 * GetReturnType<{ a: { b: { c: 1 } } }, 'a.b.c', true> // 1 | undefined
 */
type GetReturnType<
  T extends Record<string, unknown>,
  P extends PropertyPath<T>,
  isUndefinable extends boolean = false
> = P extends `${infer LeftPath}.${infer RightPath}`
  ? LeftPath extends `${infer OptionalLeft}?`
    ? NonNullable<T[OptionalLeft]> extends Record<string, unknown>
      ? GetReturnType<NonNullable<T[OptionalLeft]>, RightPath, true>
      : never
    : T[LeftPath] extends Record<string, unknown>
    ? GetReturnType<T[LeftPath], RightPath, isUndefinable>
    : never
  : isUndefinable extends false
  ? T[P]
  : T[P] | undefined;

/**
 * @description 주어진 객체에서 주어진 경로에 해당하는 값을 반환합니다.
 * 주어진 객체의 타입에 옵셔널 프로퍼티가 있는 경우, 옵셔널(?) 경로로 접근해야 합니다.
 *
 * @param {T} obj - 객체
 * @param {K} path - 점 표기법으로 구성된 키 경로
 * @returns {GetReturnType<T, K>} 경로에 해당하는 값
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
>(obj: T, path: K, defaultValue?: GetReturnType<T, K>): GetReturnType<T, K> {
  const paths = path.replace(/\?/g, '').split('.');
  let result = obj;

  for (let i = 0; i < paths.length; i++) {
    const currentPath = paths[i];

    if (isNil(result[currentPath])) {
      return defaultValue as GetReturnType<T, K>;
    }

    result = result[currentPath];
  }

  return result as GetReturnType<T, K>;
}
