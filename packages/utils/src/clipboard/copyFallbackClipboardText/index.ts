export const copyFallbackClipboardText = (value: string) => {
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
    console.error(`Copying to the clipboard failed. message: ${err.message}`);
    throw err;
  } finally {
    document.body.removeChild(textArea);
  }
};
