/**
 * @description 아무 작업도 수행하지 않는 비동기 함수입니다.
 * 주로 비동기 함수가 필요하지만, 특정 작업이 필요하지 않을 때 사용됩니다.
 *
 * @returns {Promise<void>} - 아무런 값도 반환하지 않는 `Promise`를 반환합니다.
 *
 * @example
 * await asyncNoop(); // 이 함수는 아무런 작업도 하지 않고 종료됩니다.
 */
export async function asyncNoop(): Promise<void> {}
