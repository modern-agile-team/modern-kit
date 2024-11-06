/**
 * @description 주어진 값을 변형하지 않고 그대로 반환하는 단순한 유틸리티 함수입니다.
 *
 * 원본 입력을 그대로 반환하는 함수가 필요한 상황이나 고차 함수의 기본 매개변수로 유용하게 사용할 수 있습니다.
 *
 * @typeParam T - 입력 값의 타입입니다.
 * @param {T} value - 반환할 값입니다.
 * @returns {T} 입력된 `value`를 변형 없이 반환합니다.
 *
 * @example
 * const number = identity(42); // 42
 * const text = identity("안녕하세요"); // "안녕하세요"
 * const obj = identity({ a: 1 }); // { a: 1 }
 */
export function identity<T>(value: T): T {
  return value;
}
