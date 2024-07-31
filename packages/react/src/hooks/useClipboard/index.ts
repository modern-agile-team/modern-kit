import { useCallback, useState } from 'react';
import { copyClipboardImage, copyClipboardText } from '@modern-kit/utils';

type CopiedData = string | Blob | null;

export function useClipboard() {
  const [copiedData, setCopiedData] = useState<CopiedData>(null);

  const copyText = useCallback(async (value: string) => {
    try {
      const result = await copyClipboardText(value);
      setCopiedData(result);
      return true;
    } catch (err: any) {
      console.error(err.message);
      setCopiedData(null);
      return false;
    }
  }, []);

  const copyImage = useCallback(
    async ({
      src,
      toText = false,
    }: Parameters<typeof copyClipboardImage>[0]) => {
      try {
        const result = await copyClipboardImage({ src, toText });
        setCopiedData(result);
        return true;
      } catch (err: any) {
        console.error(err.message);
        setCopiedData(null);
        return false;
      }
    },
    []
  );

  return { copiedData, copyText, copyImage };
}
