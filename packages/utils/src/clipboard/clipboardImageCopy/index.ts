import { isClient } from '../../device';
import { clipboardTextCopy } from '../clipboardTextCopy';

const fallbackImageCopy = async (res: Response) => {
  const textData = await res.text();
  await clipboardTextCopy(textData);
};

export const clipboardImageCopy = async (imgSrc: string) => {
  if (!isClient()) {
    console.error('Cannot be executed unless it is a browser environment.');
    return;
  }

  try {
    const hasNavigatorClipboard = 'clipboard' in window.navigator;
    const res = await fetch(imgSrc);

    if (!hasNavigatorClipboard) {
      return fallbackImageCopy(res);
    }

    const hasNavigatorClipboardWrite = 'write' in window.navigator.clipboard;

    if (!hasNavigatorClipboardWrite) {
      return fallbackImageCopy(res);
    }

    const blobData = await res.blob();

    await navigator.clipboard.write([
      new ClipboardItem({ [blobData.type]: blobData }),
    ]);
  } catch (err: any) {
    console.error(`Copying to the clipboard failed. message: ${err.message}`);
  }
};
