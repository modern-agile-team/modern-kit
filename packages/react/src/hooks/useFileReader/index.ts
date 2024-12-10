import { useState } from 'react';
import {
  type FileContent,
  getFiles,
  getReaderPromise,
  inValidFileType,
} from './useFileReader.utils';

type ReadType = 'readAsText' | 'readAsDataURL' | 'readAsArrayBuffer';

interface ReadFileOptions {
  file: FileList | File;
  readType: ReadType;
  accepts?: string[];
}

interface UseFileReaderReturnType {
  readFile: ({
    file,
    readType,
    accepts,
  }: ReadFileOptions) => Promise<FileContent[]>;
  fileContents: FileContent[];
  isLoading: boolean;
}

/**
 * @description `File` 객체를 원하는 읽기 메서드(`readAsText`,`readAsDataURL`,`readAsArrayBuffer`)로 읽고, 읽은 파일 컨텐츠를 반환하는 커스텀 훅입니다.
 *
 * @returns {UseFileReaderReturnType} - 파일 읽기 함수, 파일 내용, 로딩 상태를 포함하는 객체를 반환합니다.
 * @property {{file, readType, accepts}: ReadFileOptions} readFile - 파일을 읽는 비동기 함수입니다.
 * - `file`: 읽을 파일 또는 파일 목록입니다.
 * - `readType`: 파일을 읽는 방법을 지정합니다. ('readAsText', 'readAsDataURL', 'readAsArrayBuffer' 중 하나)
 * - `accepts`: 허용되는 파일 유형의 배열입니다.
 * @property {FileContent[]} fileContents - 읽은 파일의 내용을 저장하는 상태입니다.
 * @property {boolean} isLoading - 파일을 읽는 동안 로딩 상태를 나타내는 상태입니다.
 *
 * @example
 * ```tsx
 * const { readFile, fileContents, isLoading } = useFileReader();
 *
 * const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 *   if(!e.target.files) return;
 *   readFile({ file: e.target.files, readType: 'readAsText' });
 * }
 * ```
 */
export function useFileReader(): UseFileReaderReturnType {
  const [fileContents, setFileContents] = useState<FileContent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const readFile = async ({
    file,
    readType,
    accepts = [],
  }: ReadFileOptions) => {
    if (inValidFileType(file)) {
      return [];
    }

    const files = getFiles(file, accepts);

    setIsLoading(true);
    setFileContents([]);

    const readerPromises = files.map((file) => {
      const reader = new FileReader();

      try {
        reader[readType](file);
      } catch {
        return Promise.reject(`Failed to read file ${file.name}`);
      }

      return getReaderPromise(reader, file);
    });

    const settledPromises = await Promise.allSettled(readerPromises);
    const contents: FileContent[] = settledPromises.map((el, idx) => {
      const isFulfilled = el.status === 'fulfilled';

      return {
        status: el.status,
        readValue: isFulfilled ? el.value : el.reason,
        originFile: isFulfilled ? files[idx] : null,
      };
    });

    setFileContents(contents);
    setIsLoading(false);

    return contents;
  };

  return { readFile, fileContents, isLoading };
}
