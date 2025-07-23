type GetInValueReturnType<
  T,
  K extends string
> = K extends `${infer First}.${infer Rest}`
  ? First extends keyof T
    ? GetInValueReturnType<T[First], Rest>
    : undefined
  : K extends keyof T
  ? T[K]
  : undefined;

type ObjectPath<T> = T extends Record<PropertyKey, any>
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends Record<PropertyKey, any> | undefined
          ? `${K}` | `${K}.${ObjectPath<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

/**
 * @description 주어진 객체에서 주어진 키에 해당하는 값을 반환합니다.
 *
 * @param {T} obj - 객체
 * @param {K} key - 키
 * @returns {GetInValueReturnType<T, K>} 값
 *
 * @example
 * const obj = { a: { b: { c: 1 } } };
 *
 * getInValue(obj, 'a'); // { b: { c: 1 } }
 * getInValue(obj, 'a.b'); // { c: 1 }
 * getInValue(obj, 'a.b.c'); // 1
 * getInValue(obj, 'a.b.d'); // undefined
 */
export function getInValue<
  T extends Record<PropertyKey, any>,
  K extends ObjectPath<T>
>(obj: T, key: K): GetInValueReturnType<T, K> {
  const paths = key.split('.');
  let result = obj;

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    result = result[path];
  }

  return result as GetInValueReturnType<T, K>;
}
