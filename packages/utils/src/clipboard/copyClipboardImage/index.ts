import { convertImageToBlob } from '../../file';
import { isClient } from '../../device';
import { copyClipboardText } from '../copyClipboardText';

interface ClipboardImageCopyProps {
  src: string;
  toText?: boolean;
}

const copyFallbackImage = async (src: string) => {
  const response = await fetch(src);
  const textData = await response.text();

  return await copyClipboardText(textData);
};

export async function copyClipboardImage({
  src,
  toText = false,
}: ClipboardImageCopyProps) {
  if (!isClient()) {
    throw new Error('Cannot be executed unless it is a client environment.');
  }

  try {
    const hasNavigatorClipboard = 'clipboard' in window.navigator;

    if (!hasNavigatorClipboard) {
      return await copyFallbackImage(src);
    }

    const hasNavigatorClipboardWrite = 'write' in window.navigator.clipboard;

    if (!hasNavigatorClipboardWrite) {
      return await copyFallbackImage(src);
    }

    if (toText) {
      return await copyFallbackImage(src);
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
}
