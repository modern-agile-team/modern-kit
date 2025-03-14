import { isNil } from '../../validator/isNil';

/**
 * 주어진 조건이 참인지 확인하고, 거짓일 경우 에러를 발생시키는 런타임 타입 체크 함수입니다.
 * 이 함수는 TypeScript의 타입 좁히기(type narrowing)를 지원합니다.
 *
 * @param {boolean} value - 검증할 값 또는 조건
 * @param {string} message - 조건이 거짓일 경우 표시할 에러 메시지
 *
 * @throws {Error} value가 false이거나 null/undefined인 경우
 * @returns {asserts value}
 *
 * @example
 * invariant(user.isAdmin, "관리자 권한이 필요합니다");
 * // 이후 코드에서 user.isAdmin는 true가 보장됩니다
 */
export function invariant(value: boolean, message: string): asserts value;

/**
 * 주어진 조건이 참인지 확인하고, 거짓일 경우 에러를 발생시키는 런타임 타입 체크 함수입니다.
 * 이 함수는 TypeScript의 타입 좁히기(type narrowing)를 지원합니다.
 *
 * @param value - 검증할 값 또는 조건
 * @param message - 조건이 거짓일 경우 표시할 에러 메시지
 *
 * @throws {Error} value가 false이거나 null/undefined인 경우
 *
 * @example
 * // user: User | null | undefined
 *
 * invariant(user, "사용자가 존재하지 않습니다");
 * // 이후 코드에서 user는 User 타입이 보장됩니다
 */
export function invariant<T>(
  value: T | null | undefined,
  message: string
): asserts value is T;

/**
 * 주어진 조건이 참인지 확인하고, 거짓일 경우 에러를 발생시키는 런타임 타입 체크 함수입니다.
 * 이 함수는 TypeScript의 타입 좁히기(type narrowing)를 지원합니다.
 *
 * @param value - 검증할 값 또는 조건
 * @param message - 조건이 거짓일 경우 표시할 에러 메시지
 *
 * @throws {Error} value가 false이거나 null/undefined인 경우
 *
 * @example
 * invariant(user.isAdmin, "관리자 권한이 필요합니다");
 * // 이후 코드에서 user.isAdmin는 true가 보장됩니다
 *
 * @example
 * // user: User | null | undefined
 *
 * invariant(user, "사용자가 존재하지 않습니다");
 * // 이후 코드에서 user는 User 타입이 보장됩니다
 */
export function invariant(value: unknown, message: string) {
  if (value === false || isNil(value)) {
    throw new Error(message);
  }
}
