import { isClient } from '../../device';
import { copyFallbackClipboardText } from '../copyFallbackClipboardText';

/**
 * @description 클립보드에 텍스트를 복사하는 함수입니다.
 * 클라이언트 환경에서만 실행 가능하며, `navigator.clipboard` API를 지원하는 경우 해당 API를 사용합니다.
 * 만약 `navigator.clipboard`를 지원하지 않는 경우, 폴백 함수(copyFallbackClipboardText)를 사용하여 텍스트를 복사합니다.
 *
 * @param {string} value - 클립보드에 복사할 텍스트 값입니다.
 * @returns {Promise<string>} 복사된 텍스트를 반환합니다.
 * @throws {Error} 클라이언트 환경이 아닌 경우 에러를 발생시킵니다.
 * @throws {Error} 클립보드에 텍스트를 복사하는 도중 에러가 발생할 경우 예외를 던집니다.
 *
 * @example
 * const copiedText = await copyClipboardText('Hello, World!');
 * console.log(`Copied text: ${copiedText}`);
 */
export async function copyClipboardText(value: string): Promise<string> {
  if (!isClient()) {
    throw new Error('Cannot be executed unless it is a client environment.');
  }

  try {
    const hasNavigatorClipboard = 'clipboard' in window.navigator;

    if (!hasNavigatorClipboard) {
      return copyFallbackClipboardText(value);
    }

    await navigator.clipboard.writeText(value);

    return value;
  } catch (err: any) {
    console.error(`Failed to copy to clipboard. message: ${err.message}`);
    throw err;
  }
}
