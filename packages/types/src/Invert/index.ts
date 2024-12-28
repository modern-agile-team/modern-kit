/**
 * @description 객체의 key와 value을 서로 바꾸는 타입입니다.
 *
 * @template T - 타입을 변경 할 객체 타입
 * @returns 원본 객체의 키와 값이 서로 바뀐 새로운 타입을 반환합니다
 *
 * @example
 * type originObj = { a: "x", b: "y" };
 * type invertedObj = Invert<origin>; // { x: "a", y: "b" }
 */
export type Invert<T extends Record<PropertyKey, PropertyKey>> = {
  [K in keyof T as T[K]]: K;
};
