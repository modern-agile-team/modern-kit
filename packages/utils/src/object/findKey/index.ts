/**
 * @description 객체에서 주어진 조건에 맞는 첫 번째 키를 찾습니다.
 *
 * 이 함수는 객체의 각 키와 값을 `predicate` 함수에 전달하여 조건을 만족하는 첫 번째 키를 반환합니다.
 * 조건을 만족하는 키가 없으면 `undefined`를 반환합니다.
 *
 * @template T - 키를 찾고자 하는 객체 요소의 타입
 * @param {T} obj - 검색하고자 하는 객체입니다.
 * @param {(predicateData: {
 *  value: T[keyof T];
 *  key: keyof T;
 *  obj: T;
 * }) => boolean} predicate - 검색하고자 하는 조건을 검사하는 함수입니다.
 * @returns {string | undefined} 검색하고자 하는 조건에 부합하는 key를 반환합니다. 만약 조건에 부합하는 key가 없다면 undefined를 반환합니다.
 *
 * @example
 * const obj = {
 *   bike: { active: true },
 *   plane: { active: true },
 *   car: { active: false },
 * };
 *
 *  findKey(obj, (item) => item.active); // 'bike'
 */
export function findKey<T extends Record<PropertyKey, any>>(
  obj: T,
  predicate: (predicateData: {
    value: T[keyof T];
    key: keyof T;
    obj: T;
  }) => boolean
): string | undefined {
  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = obj[key];

    if (predicate({ value, key, obj })) {
      return key;
    }
  }

  return undefined;
}
