import { renderHook, waitFor } from '@testing-library/react';
import { useFileReader } from '.';
import { mockFileList } from '../../utils/test/mockFileList';

// wip
class MockFileReader {
  error: any;
  result: any;
  onerror: (...args: any[]) => any;

  constructor() {
    this.error = null;
    this.result = null;
    this.onerror = () => {};
  }

  readAsText(file: File) {
    // onerror를 강제로 호출하여 에러를 시뮬레이션
    setTimeout(() => {
      if (this.onerror) {
        this.onerror(
          new ProgressEvent('error', { loaded: 0, total: file.size })
        );
      }
    }, 0);
  }
}

const originReadAsText = FileReader.prototype.readAsText;

afterEach(() => {
  FileReader.prototype.readAsText = originReadAsText;
  vi.clearAllMocks();
});

describe('useFileReader', () => {
  const testFile1 = new File(['file'], 'test.txt', {
    type: 'text/plain',
  });
  const testFile2 = new File(['file'], 'test.txt', {
    type: 'text/plain',
  });
  const errorTestFile = '' as any;

  it('', async () => {
    const { result } = renderHook(() => useFileReader());

    await waitFor(async () => {
      await result.current.readFile(testFile1, 'readAsText');
      expect(result.current.loading).toBeTruthy();
    });

    expect(result.current.loading).toBeFalsy();
    expect(result.current.fileContents.length).toBe(1);
    expect(result.current.fileContents).toEqual([
      {
        status: 'fulfilled',
        readValue: 'file',
        originFile: testFile1,
      },
    ]);
  });

  it('', async () => {
    const { result } = renderHook(() => useFileReader());

    const fileList = mockFileList([testFile1, testFile2]);

    await waitFor(async () => {
      await result.current.readFile(fileList, 'readAsText');
      expect(result.current.loading).toBeTruthy();
    });

    expect(result.current.loading).toBeFalsy();
    expect(result.current.fileContents.length).toBe(2);
    expect(result.current.fileContents).toEqual([
      {
        status: 'fulfilled',
        readValue: 'file',
        originFile: testFile1,
      },
      {
        status: 'fulfilled',
        readValue: 'file',
        originFile: testFile2,
      },
    ]);
  });

  it('', async () => {
    const { result } = renderHook(() => useFileReader());

    const readAsFunction = vi.fn().mockImplementation(() => {
      throw new Error('Failed to read file');
    });

    FileReader.prototype.readAsText = readAsFunction;

    await waitFor(async () => {
      await result.current.readFile(testFile1, 'readAsText');
    });

    expect(result.current.loading).toBeFalsy();
    expect(result.current.fileContents.length).toBe(1);
    expect(result.current.fileContents).toEqual([
      {
        status: 'rejected',
        readValue: 'Failed to read file test.txt',
        originFile: null,
      },
    ]);
  });

  it('', async () => {
    const { result } = renderHook(() => useFileReader());

    vi.stubGlobal('FileReader', MockFileReader);

    await waitFor(async () => {
      await result.current.readFile(testFile1, 'readAsText');
    });

    expect(result.current.loading).toBeFalsy();
    expect(result.current.fileContents.length).toBe(1);
    expect(result.current.fileContents).toEqual([
      {
        status: 'rejected',
        readValue: 'Failed to read file test.txt',
        originFile: null,
      },
    ]);
  });

  it('', async () => {
    const { result } = renderHook(() => useFileReader());

    await waitFor(async () => {
      await result.current.readFile(errorTestFile, 'readAsText');
    });

    expect(result.current.loading).toBeFalsy();
    expect(result.current.fileContents.length).toBe(0);
    expect(result.current.fileContents).toEqual([]);
  });
});
