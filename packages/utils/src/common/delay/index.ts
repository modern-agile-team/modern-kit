/**
 * @description 주어진 시간(밀리초)만큼 지연된 후에 완료되는 `Promise`를 반환하는 함수입니다.
 * 지연 시간은 정수여야 하며, 음수일 수 없습니다.
 *
 * @param {number} time - 지연시킬 시간(밀리초)입니다. 정수여야 하며, 0 이상의 값이어야 합니다.
 * @returns {Promise<void>} - 지정된 시간이 지난 후에 해결되는 `Promise`를 반환합니다.
 *
 * @throws {Error} - 유효하지 않은 시간이 주어지면 에러를 발생시킵니다.
 *
 * @example
 * const doSomethingAfterDelay = async () => {
 *   await delay(1000);
 *   await something();
 * };
 */
export function delay(time: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (!Number.isInteger(time) || time < 0) {
      reject(new Error('Invalid time value'));
    }

    setTimeout(resolve, time);
  });
}
