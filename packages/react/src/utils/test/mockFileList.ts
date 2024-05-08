export const mockFileList = (files: File[]): FileList => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.multiple = true;

  const fileList: FileList = Object.create(input.files);

  for (let i = 0; i < files.length; i++) {
    fileList[i] = files[i];
  }

  Object.defineProperty(fileList, 'length', { value: files.length });
  return fileList;
};
