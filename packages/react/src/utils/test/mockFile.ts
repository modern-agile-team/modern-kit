export const mockFileList = (files: File[]): FileList => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.multiple = true;

  const fileList: FileList = Object.create(input.files);

  files.forEach((file, idx) => {
    fileList[idx] = file;
  });

  Object.defineProperty(fileList, 'length', { value: files.length });
  return fileList;
};

export class MockFileReaderForcedCallOnError {
  onerror: (...args: any[]) => any;

  constructor() {
    this.onerror = () => {};
  }

  readAsText(file: File) {
    if (this.onerror) {
      setTimeout(() => {
        this.onerror(new Error(`Error, ${file.name}`));
      }, 0);
    }
  }
}

export class MockFileReaderThrowError {
  onerror: (...args: any[]) => any;

  constructor() {
    this.onerror = () => {};
  }

  readAsText() {
    throw new Error('Failed to read file');
  }
}
