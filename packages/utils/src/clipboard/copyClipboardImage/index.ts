import { convertImageToBlob } from '../../file';
import { isClient } from '../../device';
import { copyFallbackImage } from './copyClipboardImage.utils';

/**
 * @description 클립보드에 이미지를 복사하는 함수입니다.
 * 클라이언트 환경에서만 실행 가능하며, `navigator.clipboard` API와 `ClipboardItem`을 지원하는 경우 해당 API를 사용합니다.
 * 지원되지 않는 환경에서는 폴백으로 `copyFallbackImage`를 사용합니다.
 *
 * @param {string} src - 클립보드에 복사할 이미지의 소스 URL입니다.
 * @param {Object} options - 이미지 복사 옵션입니다.
 * @param {boolean} [options.toText=false] - 이미지를 텍스트로 복사할지 여부를 결정하는 옵션입니다. true인 경우 폴백 메서드가 호출됩니다.
 * @returns {Promise<Blob | string>} 복사된 Blob 데이터나 텍스트를 반환합니다.
 * @throws {Error} 클라이언트 환경이 아닌 경우 에러를 발생시킵니다.
 * @throws {Error} 클립보드에 이미지를 복사하는 도중 에러가 발생할 경우 예외를 던집니다.
 *
 * @example
 * const imageBlob = await copyClipboardImage('https://example.com/image.png');
 * console.log(`Copied image: ${imageBlob}`);
 */
export async function copyClipboardImage(
  src: string,
  options?: { toText: boolean }
): Promise<Blob | string> {
  if (!isClient()) {
    throw new Error('Cannot be executed unless it is a client environment.');
  }

  try {
    const hasNavigatorClipboard = 'clipboard' in window.navigator;

    if (!hasNavigatorClipboard) {
      return copyFallbackImage(src);
    }

    const hasNavigatorClipboardWrite = 'write' in window.navigator.clipboard;

    if (!hasNavigatorClipboardWrite) {
      return copyFallbackImage(src);
    }

    const toText = options?.toText ?? false;

    if (toText) {
      return copyFallbackImage(src);
    }

    const blobData = await convertImageToBlob(src, 'png');

    await navigator.clipboard.write([
      new ClipboardItem({ [blobData.type]: blobData }),
    ]);

    return blobData;
  } catch (err: any) {
    console.error(`Failed to copy to clipboard. message: ${err.message}`);
    throw err;
  }
}
