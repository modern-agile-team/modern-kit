import { isClient } from '../../device';

/**
 * @description 클립보드에서 텍스트를 읽어오는 함수입니다.
 * 클라이언트 환경에서만 실행 가능하며, 서버 환경에서는 에러를 발생시킵니다.
 *
 * @returns {Promise<string>} 클립보드에서 읽어온 텍스트를 반환합니다.
 * @throws {Error} 클라이언트 환경이 아닌 경우 에러를 발생시킵니다.
 * @throws {Error} 클립보드에서 텍스트를 읽어오는 도중 에러가 발생할 경우 예외를 던집니다.
 *
 * @example
 * const text = await readClipboardText();
 */
export async function readClipboardText(): Promise<string> {
  if (!isClient()) {
    throw new Error('Cannot be executed unless it is a client environment.');
  }

  try {
    const text = await navigator.clipboard.readText();
    return text;
  } catch (err: any) {
    console.error(`Failed to read clipboard. message: ${err.message}`);
    throw err;
  }
}
