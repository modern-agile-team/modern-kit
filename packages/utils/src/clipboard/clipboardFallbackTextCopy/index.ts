export const clipboardFallbackTextCopy = (value: string) => {
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
    throw new Error(`Copying to the clipboard failed. message: ${err.message}`);
  } finally {
    document.body.removeChild(textArea);
  }
};
