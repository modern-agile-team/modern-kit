export const clipboardFallbackTextCopy = (value: string) => {
  const textArea = document.createElement('textarea');

  textArea.value = value;
  textArea.style.opacity = '0';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  document.execCommand('copy');
  document.body.removeChild(textArea);
};
