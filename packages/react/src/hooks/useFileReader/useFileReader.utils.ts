export interface FileContent {
  status: 'fulfilled' | 'rejected';
  readValue: string | ArrayBuffer;
  originFile: File | null;
}

export function isFile(file: FileList | File): file is File {
  return file instanceof File;
}

export function isFileList(file: FileList | File): file is FileList {
  return file instanceof FileList;
}

export function inValidFileType(file: FileList | File) {
  return !isFile(file) && !isFileList(file);
}

export function getFiles(file: File | FileList, accepts: string[]) {
  const files = isFile(file) ? [file] : Array.from(file);

  return accepts.length > 0
    ? files.filter((file) => accepts.includes(file.type))
    : files;
}

export function getReaderPromise(reader: FileReader, file: File) {
  return new Promise<FileContent['readValue'] | null>((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(`Failed to read file ${file.name}`);
    };
  });
}
