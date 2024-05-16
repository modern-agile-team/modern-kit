import { isClient } from '../../device';
import { clipboardFallbackTextCopy } from '../clipboardFallbackTextCopy';

export const clipboardTextCopy = async (value: string) => {
  if (!isClient()) {
    console.error('Cannot be executed unless it is a client environment.');
    return;
  }

  try {
    const hasNavigatorClipboard = 'clipboard' in window.navigator;

    if (!hasNavigatorClipboard) {
      return clipboardFallbackTextCopy(value);
    }

    await navigator.clipboard.writeText(value);

    return value;
  } catch (err: any) {
    console.error(`Copying to the clipboard failed. message: ${err.message}`);
  }
};
