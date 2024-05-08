import { Nullable } from '@modern-kit/types';
import { useState } from 'react';

type ReadType = 'readAsText' | 'readAsDataURL' | 'readAsArrayBuffer';

interface FileContent {
  status: 'fulfilled' | 'rejected';
  readValue: string | ArrayBuffer;
  originFile: Nullable<File>;
}

interface ReadFileOptions {
  file: FileList | File;
  readType: ReadType;
  accepts?: string[];
}

const isFile = (file: FileList | File): file is File => {
  return file instanceof File;
};

const isFileList = (file: FileList | File): file is FileList => {
  return file instanceof FileList;
};

const inValidFileType = (file: FileList | File) => {
  return !isFile(file) && !isFileList(file);
};

const getFiles = (file: File | FileList, accepts: string[]) => {
  const files = isFile(file) ? [file] : Array.from(file);

  return accepts.length > 0
    ? files.filter((file) => accepts.includes(file.type))
    : files;
};

const getReaderPromise = (reader: FileReader, file: File) => {
  return new Promise<Nullable<FileContent['readValue']>>((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(`Failed to read file ${file.name}`);
    };
  });
};

export const useFileReader = () => {
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
};
