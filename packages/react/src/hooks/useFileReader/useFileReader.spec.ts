import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useFileReader } from '.';
import {
  MockFileReaderForcedCallOnError,
  MockFileReaderThrowError,
  mockFileList,
} from '../../_internal/test/mockFile';

const getSuccessFileContent = (file: File) => {
  return {
    status: 'fulfilled',
    readValue: 'file',
    originFile: file,
  };
};

const testFile1 = new File(['file'], 'test1.txt', {
  type: 'text/plain',
});
const testFile2 = new File(['file'], 'test2.csv', {
  type: 'text/csv',
});

const testFileList = mockFileList([testFile1, testFile2]);
const errorTestFile = '' as any;

const errorFileContent = {
  status: 'rejected',
  readValue: 'Failed to read file test1.txt',
  originFile: null,
};

describe('useFileReader', () => {
  describe('Success Case', () => {
    it('should return the normal file contents in "fileContents" when a value of type "File" is passed as an argument to "readFile"', async () => {
      const { result } = renderHook(() => useFileReader());
      const expectedSuccessFileContents = [getSuccessFileContent(testFile1)];

      await waitFor(async () => {
        const fileContents = await result.current.readFile({
          file: testFile1,
          readType: 'readAsText',
        });

        expect(result.current.isLoading).toBeTruthy();
        expect(fileContents).toEqual(expectedSuccessFileContents);
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.fileContents).toEqual(
          expectedSuccessFileContents
        );
      });
    });

    it('should return the normal file contents in "fileContents" when a value of type "FileList" is passed as an argument to "readFile"', async () => {
      const { result } = renderHook(() => useFileReader());
      const expectedSuccessFileContents = [
        getSuccessFileContent(testFile1),
        getSuccessFileContent(testFile2),
      ];

      await waitFor(async () => {
        const fileContents = await result.current.readFile({
          file: testFileList,
          readType: 'readAsText',
        });

        expect(result.current.isLoading).toBeTruthy();
        expect(fileContents).toEqual(expectedSuccessFileContents);
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.fileContents).toEqual(
          expectedSuccessFileContents
        );
      });
    });

    it('should only read files of types specified in the "accepts" attribute', async () => {
      const { result } = renderHook(() => useFileReader());
      const expectedSuccessFileContents = [getSuccessFileContent(testFile2)];

      await waitFor(async () => {
        const fileContents = await result.current.readFile({
          file: testFileList,
          readType: 'readAsText',
          accepts: ['text/csv'],
        });
        expect(result.current.isLoading).toBeTruthy();
        expect(fileContents).toEqual(expectedSuccessFileContents);
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.fileContents).toEqual(
          expectedSuccessFileContents
        );
      });
    });
  });

  describe('Error Case', () => {
    // Line: getReaderPromise - reader.onerror
    it('should return the error contents in "fileContents" when "reader.onerror" is called', async () => {
      const { result } = renderHook(() => useFileReader());
      const failedExpectedFileContents = [errorFileContent];

      vi.stubGlobal('FileReader', MockFileReaderForcedCallOnError);

      await waitFor(async () => {
        const fileContents = await result.current.readFile({
          file: testFile1,
          readType: 'readAsText',
        });
        expect(fileContents).toEqual(failedExpectedFileContents);
      });

      await waitFor(() => {
        expect(result.current.fileContents).toEqual(failedExpectedFileContents);
      });
    });

    // Line: readerPromises - catch
    it('should return the error contents in "fileContents" if an error occurs during the call to "reader[readType]"', async () => {
      const { result } = renderHook(() => useFileReader());
      const failedExpectedFileContents = [errorFileContent];

      vi.stubGlobal('FileReader', MockFileReaderThrowError);

      await waitFor(async () => {
        const fileContents = await result.current.readFile({
          file: testFile1,
          readType: 'readAsText',
        });

        expect(fileContents).toEqual(failedExpectedFileContents);
      });

      await waitFor(() => {
        expect(result.current.fileContents).toEqual(failedExpectedFileContents);
      });
    });

    // Line: inValidFileType
    it('should return an empty array for "fileContents" if the argument to "readFile" is neither of type "File" nor "FileList"', async () => {
      const { result } = renderHook(() => useFileReader());

      await waitFor(async () => {
        const fileContents = await result.current.readFile({
          file: errorTestFile,
          readType: 'readAsText',
        });
        expect(fileContents).toEqual([]);
      });

      await waitFor(() => {
        expect(result.current.fileContents).toEqual([]);
      });
    });
  });
});
