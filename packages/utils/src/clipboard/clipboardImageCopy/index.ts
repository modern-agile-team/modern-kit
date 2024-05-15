import { convertImageToBase64 } from '../../file';
import { isClient } from '../../device';
import { clipboardTextCopy } from '../clipboardTextCopy';

interface ClipboardImageCopyProps {
  src: string;
  toPng?: boolean;
}

const fallbackImageCopy = async (res: Response) => {
  const textData = await res.text();
  await clipboardTextCopy(textData);
};

export const clipboardImageCopy = async ({
  src,
  toPng = false,
}: ClipboardImageCopyProps) => {
  if (!isClient()) {
    console.error('Cannot be executed unless it is a browser environment.');
    return;
  }

  try {
    const hasNavigatorClipboard = 'clipboard' in window.navigator;
    const convertedImgSrc = toPng
      ? await convertImageToBase64(src, 'png')
      : src;
    const response = await fetch(convertedImgSrc);

    if (!hasNavigatorClipboard) {
      await fallbackImageCopy(response);
      return;
    }

    const hasNavigatorClipboardWrite = 'write' in window.navigator.clipboard;

    if (!hasNavigatorClipboardWrite) {
      await fallbackImageCopy(response);
      return;
    }

    const cloneResponse = response.clone();
    const blobData = await cloneResponse.blob();

    if (blobData.type === 'image/svg+xml') {
      await fallbackImageCopy(response);
      return;
    }

    await navigator.clipboard.write([
      new ClipboardItem({ [blobData.type]: blobData }),
    ]);
  } catch (err: any) {
    console.error(`Copying to the clipboard failed. message: ${err.message}`);
  }
};
