import { useCallback, useState } from 'react';
import { clipboardImageCopy, clipboardTextCopy } from '@modern-kit/utils';

type CopiedData = string | Blob | null;

export const useClipboard = () => {
  const [copiedData, setCopiedData] = useState<CopiedData>(null);

  const copyText = useCallback(async (value: string) => {
    try {
      const result = await clipboardTextCopy(value);
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
      toPng = false,
    }: Parameters<typeof clipboardImageCopy>[0]) => {
      try {
        const result = await clipboardImageCopy({ src, toPng });
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
};
