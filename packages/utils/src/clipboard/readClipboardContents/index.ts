import { isClient } from '../../device';

/**
 * @description 클립보드에 저장된 텍스트를 포함한 html, 이미지 등 다양한 유형의 컨텐츠를 읽어오는 함수입니다.
 * 클라이언트 환경에서만 실행 가능하며, 서버 환경에서는 에러를 발생시킵니다.
 *
 * @returns {Promise<ClipboardItems>} 클립보드에서 읽어온 콘텐츠 목록을 반환합니다. 각 항목은 DataTransfer 객체입니다.
 * @throws {Error} 클라이언트 환경이 아닌 경우 에러를 발생시킵니다.
 * @throws {Error} 클립보드에서 콘텐츠를 읽어오는 도중 에러가 발생할 경우 예외를 던집니다.
 *
 * @example
 * const contents = await readClipboardContents();
 */
export async function readClipboardContents(): Promise<ClipboardItems> {
  if (!isClient()) {
    throw new Error('Cannot be executed unless it is a client environment.');
  }

  try {
    const contents = await navigator.clipboard.read();
    return contents;
  } catch (err: any) {
    console.error(`Failed to read clipboard. message: ${err.message}`);
    throw err;
  }
}
