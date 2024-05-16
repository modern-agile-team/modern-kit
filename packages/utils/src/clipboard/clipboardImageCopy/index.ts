import { convertImageToBase64, getMIMETypeFromResponse } from '../../file';
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

const getImageSource = async (src: string, toPng: boolean) => {
  return toPng ? await convertImageToBase64(src, 'image/png') : src;
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
    const imgSrc = await getImageSource(src, toPng);

    const response = await fetch(imgSrc);
    const mimeType = getMIMETypeFromResponse(response);

    if (!hasNavigatorClipboard) {
      await fallbackImageCopy(response);
      return;
    }

    const hasNavigatorClipboardWrite = 'write' in window.navigator.clipboard;

    if (!hasNavigatorClipboardWrite) {
      await fallbackImageCopy(response);
      return;
    }

    if (mimeType === 'image/svg+xml') {
      await fallbackImageCopy(response);
      return;
    }

    const blobData = await response.blob();

    await navigator.clipboard.write([
      new ClipboardItem({ [mimeType]: blobData }),
    ]);
  } catch (err: any) {
    console.error(`Copying to the clipboard failed. message: ${err.message}`);
  }
};
