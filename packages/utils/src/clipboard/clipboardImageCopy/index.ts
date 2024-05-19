import { convertImageToBlob } from '../../file';
import { isClient } from '../../device';
import { clipboardTextCopy } from '../clipboardTextCopy';

interface ClipboardImageCopyProps {
  src: string;
  toText?: boolean;
}

const fallbackImageCopy = async (src: string) => {
  const response = await fetch(src);
  const textData = await response.text();

  return await clipboardTextCopy(textData);
};

export const clipboardImageCopy = async ({
  src,
  toText = false,
}: ClipboardImageCopyProps) => {
  if (!isClient()) {
    throw new Error('Cannot be executed unless it is a client environment.');
  }

  try {
    const hasNavigatorClipboard = 'clipboard' in window.navigator;

    if (!hasNavigatorClipboard) {
      return await fallbackImageCopy(src);
    }

    const hasNavigatorClipboardWrite = 'write' in window.navigator.clipboard;

    if (!hasNavigatorClipboardWrite) {
      return await fallbackImageCopy(src);
    }

    if (toText) {
      return await fallbackImageCopy(src);
    }

    const blobData = await convertImageToBlob(src, 'png');

    await navigator.clipboard.write([
      new ClipboardItem({ [blobData.type]: blobData }),
    ]);

    return blobData;
  } catch (err: any) {
    console.error(`Copying to the clipboard failed. message: ${err.message}`);
    throw err;
  }
};
