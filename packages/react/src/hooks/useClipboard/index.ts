import { useCallback, useState } from 'react';
import {
  copyClipboardImage,
  copyClipboardText,
  readClipboardContents,
  readClipboardText,
} from '@modern-kit/utils';

interface UseClipboardReturnType {
  copiedData: string | Blob | null;
  readData: string | ClipboardItems | null;
  copyText: (value: string) => Promise<boolean>;
  copyImage: (src: string, options?: { toText: boolean }) => Promise<boolean>;
  readText: () => Promise<boolean>;
  readContents: () => Promise<boolean>;
}

/**
 * @description 클립보드 관련 기능을 제공하는 커스텀 훅입니다.
 * 텍스트 또는 이미지를 클립보드에 복사하거나 클립보드 내용을 읽을 수 있습니다.
 *
 * @returns {{
 *   copiedData: CopiedData;
 *   readData: ReadData;
 *   copyText: (value: string) => Promise<boolean>;
 *   copyImage: (src: string, options?: { toText: boolean }) => Promise<boolean>
 *   readText: () => Promise<boolean>;
 *   readContents: () => Promise<boolean>;
 * }} 클립보드와 상호작용하는 함수들을 포함한 객체를 반환합니다.
 * - `copiedData`: 최근 클립보드에 복사된 데이터입니다.
 * - `readData`: 클립보드에서 읽어온 데이터입니다.
 * - `copyText`: 주어진 텍스트를 클립보드에 복사하는 함수이며, 성공 여부를 반환합니다.
 * - `copyImage`: 주어진 이미지 URL을 클립보드에 복사하는 함수이며, 성공 여부를 반환합니다.
 * - `readText`: 클립보드에 저장된 텍스트 데이터를 읽어오는 함수이며, 성공 여부를 반환합니다.
 * - `readContents`: 클립보드에 저장된 텍스트를 포함한 html, 이미지 등 다양한 유형의 컨텐츠를 읽어오는 함수이며, 성공 여부를 반환합니다.
 *
 * @example
 * const { copiedData, copyText, copyImage } = useClipboard();
 * copyText('modern-kit');
 * // 성공 시 true, 실패 시 false 반환
 * // 문자열을 클립보드에 저장합니다.
 *
 * copyImage(imgSrc);
 * // 성공 시 true, 실패 시 false 반환
 * // 이미지를 클립보드에 저장합니다.
 *
 * copiedData; // 최근 클립보드에 복사된 데이터입니다.
 *
 * @example
 * const { readData, readText, readContents } = useClipboard();
 * readText();
 * // 성공 시 true, 실패 시 false 반환
 * // 클립보드에 저장된 텍스트를 읽어옵니다.
 *
 * readContents();
 * // 성공 시 true, 실패 시 false 반환
 * // 클립보드의 텍스트를 포함한 html, 이미지 등 다양한 유형의 컨텐츠를 읽어옵니다.
 *
 * readData; // 클립보드에서 읽어온 데이터입니다.
 */
export function useClipboard(): UseClipboardReturnType {
  const [copiedData, setCopiedData] = useState<string | Blob | null>(null);
  const [readData, setReadData] = useState<string | ClipboardItems | null>(
    null
  );

  const copyText = useCallback(async (value: string) => {
    try {
      const result = await copyClipboardText(value);
      setCopiedData(result);
      return true;
    } catch (err: any) {
      setCopiedData(null);
      return false;
    }
  }, []);

  const copyImage = useCallback(
    async (src: string, options?: { toText: boolean }) => {
      const toText = options?.toText ?? false;

      try {
        const result = await copyClipboardImage(src, { toText });
        setCopiedData(result);
        return true;
      } catch (err: any) {
        setCopiedData(null);
        return false;
      }
    },
    []
  );

  const readText = useCallback(async () => {
    try {
      const result = await readClipboardText();
      setReadData(result);
      return true;
    } catch (err: any) {
      setReadData(null);
      return false;
    }
  }, []);

  const readContents = useCallback(async () => {
    try {
      const result = await readClipboardContents();
      setReadData(result);
      return true;
    } catch (err: any) {
      setReadData(null);
      return false;
    }
  }, []);

  return { copiedData, readData, copyText, copyImage, readText, readContents };
}
