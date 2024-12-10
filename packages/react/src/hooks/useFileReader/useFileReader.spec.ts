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
  describe('성공 케이스', () => {
    it('"readFile"의 인자로 "File" 타입의 값이 전달되면 "fileContents"에 정상적인 파일 내용을 반환해야 합니다.', async () => {
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

    it('"readFile"의 인자로 "FileList" 타입의 값이 전달되면 "fileContents"에 정상적인 파일 내용을 반환해야 합니다.', async () => {
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

    it('"accepts" 속성에 지정된 타입의 파일만 읽어야 합니다.', async () => {
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

  describe('에러 케이스', () => {
    // Line: getReaderPromise - reader.onerror
    it('"reader.onerror"가 호출되면 "fileContents"에 에러 내용을 반환해야 합니다.', async () => {
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
    it('"reader[readType]" 호출 중 에러가 발생하면 "fileContents"에 에러 내용을 반환해야 합니다.', async () => {
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
    it('"readFile"의 인자가 "File" 또는 "FileList" 타입이 아닌 경우 "fileContents"에 빈 배열을 반환해야 합니다.', async () => {
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
