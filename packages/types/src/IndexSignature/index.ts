/**
 * @description 객체에 동적으로 프로퍼티를 추가할 수 있도록 하는 인덱스 시그니처 타입입니다.
 * 모든 프로퍼티 키에 대해 동일한 타입 T의 값을 가질 수 있도록 제한합니다.
 *
 * @template T - 프로퍼티의 타입
 * @example
 * const test: IndexSignature<string> = { foo: 'foo', bar: 'bar' };
 * test.test = '1';
 *
 * @example
 */
export type IndexSignature<T> = {
  [key: PropertyKey]: T;
};
