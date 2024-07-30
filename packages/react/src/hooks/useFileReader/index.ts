import { useState } from 'react';
import {
  type FileContent,
  getFiles,
  getReaderPromise,
  inValidFileType,
} from './internal';

type ReadType = 'readAsText' | 'readAsDataURL' | 'readAsArrayBuffer';

interface ReadFileOptions {
  file: FileList | File;
  readType: ReadType;
  accepts?: string[];
}

export function useFileReader() {
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
