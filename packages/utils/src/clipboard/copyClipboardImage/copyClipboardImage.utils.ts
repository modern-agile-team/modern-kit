import { copyClipboardText } from '../copyClipboardText';

/**
 * @description 클립보드에 이미지를 복사하는 폴백 함수입니다.
 * `navigator.clipboard` API가 지원되지 않는 환경에서 사용되며, 이미지를 텍스트 형식으로 클립보드에 복사합니다.
 *
 * @param {string} src - 클립보드에 복사할 이미지의 소스 URL입니다.
 * @returns {Promise<string>} 이미지의 텍스트 데이터를 복사한 후 해당 텍스트를 반환합니다.
 * @throws {Error} 이미지를 가져오거나 텍스트로 복사하는 도중 에러가 발생할 경우 예외를 던집니다.
 *
 * @example
 * const copiedText = await copyFallbackImage('https://example.com/image.png');
 * console.log(`Copied image: ${copiedText}`);
 */
export const copyFallbackImage = async (src: string): Promise<string> => {
  const response = await fetch(src);
  const textData = await response.text();

  return copyClipboardText(textData);
};
