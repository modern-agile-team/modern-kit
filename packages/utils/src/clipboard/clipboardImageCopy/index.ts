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
    const response = await fetch(imgSrc);

    if (!hasNavigatorClipboard) {
      return await fallbackImageCopy(response);
    }

    const hasNavigatorClipboardWrite = 'write' in window.navigator.clipboard;

    if (!hasNavigatorClipboardWrite) {
      return await fallbackImageCopy(response);
    }

    const cloneResponse = response.clone();
    const blobData = await cloneResponse.blob();

    if (blobData.type === 'image/svg+xml') {
      return await fallbackImageCopy(response);
    }

    await navigator.clipboard.write([
      new ClipboardItem({ [blobData.type]: blobData }),
    ]);
  } catch (err: any) {
    console.error(`Copying to the clipboard failed. message: ${err.message}`);
  }
};
