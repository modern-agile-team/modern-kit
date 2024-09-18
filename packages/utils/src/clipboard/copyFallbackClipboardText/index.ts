/**
 * @description 클립보드에 텍스트를 복사하는 폴백 함수입니다.
 * `navigator.clipboard` API가 지원되지 않는 환경에서 사용할 수 있습니다.
 *
 * 텍스트 영역(`textarea`)을 생성하고, 해당 영역에 텍스트를 입력한 후 클립보드에 복사하는 방식으로 동작합니다.
 *
 * @param {string} value - 클립보드에 복사할 텍스트 값입니다.
 * @returns {string} 복사된 텍스트를 반환합니다.
 * @throws {Error} 클립보드에 텍스트를 복사하는 도중 에러가 발생할 경우 예외를 던집니다.
 *
 * @example
 * const copiedText = copyFallbackClipboardText('Hello, World!');
 * console.log(`Copied text: ${copiedText}`);
 */
export function copyFallbackClipboardText(value: string): string {
  const textArea = document.createElement('textarea');

  textArea.value = value;
  textArea.style.opacity = '0';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    return value;
  } catch (err: any) {
    console.error(`Failed to copy to clipboard. message: ${err.message}`);
    throw err;
  } finally {
    document.body.removeChild(textArea);
  }
}
