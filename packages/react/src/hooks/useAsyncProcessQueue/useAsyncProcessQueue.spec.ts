import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { useAsyncProcessQueue } from '.';
import { act, renderHook } from '@testing-library/react';

beforeEach(() => {
  // https://github.com/testing-library/user-event/issues/833#issuecomment-1725364780
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

const createTestPromiseFunc =
  (fn: Mock<any>, time: number, value?: any, isError = false) =>
  () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fn();
        if (isError) {
          reject(value);
        } else {
          resolve(value);
        }
      }, time);
    });
  };

describe('useAsyncProcessQueue', () => {
  it('여러 비동기 함수를 순차적으로 실행하고, 해결된 데이터는 data 상태에 할당되어야 합니다', async () => {
    const mockFn1 = vi.fn();
    const mockFn2 = vi.fn();

    const { result } = renderHook(() =>
      useAsyncProcessQueue({ keepPreviousData: false })
    );
    const addToProcessQueue = result.current.addToProcessQueue;

    const testPromise1 = createTestPromiseFunc(mockFn1, 200, 'foo');
    const testPromise2 = createTestPromiseFunc(mockFn2, 200, 'bar');

    act(() => {
      addToProcessQueue(testPromise1);
      addToProcessQueue(testPromise2);
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);

      expect(mockFn1).toBeCalledTimes(1);
      expect(mockFn2).toBeCalledTimes(0);
      expect(result.current.isLoading).toBeTruthy();
      expect(result.current.data).toBeNull();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);

      expect(result.current.data).toBe('foo');
      expect(mockFn2).toBeCalledTimes(1);
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);

      expect(result.current.data).toBe('bar');
      expect(result.current.isLoading).toBeFalsy();
    });

    // Initialize data if keepPreviousData is false
    act(() => {
      addToProcessQueue(testPromise1);
    });
    expect(result.current.data).toBeNull();
  });

  it('keepPreviousData 속성이 true인 경우 이전 데이터를 유지해야 합니다', async () => {
    const mockFn1 = vi.fn();
    const { result } = renderHook(() =>
      useAsyncProcessQueue({ keepPreviousData: true })
    );
    const addToProcessQueue = result.current.addToProcessQueue;

    const testPromise1 = createTestPromiseFunc(mockFn1, 200, 'foo');

    act(() => {
      addToProcessQueue(testPromise1);
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);

      expect(result.current.data).toBeNull();
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);

      expect(result.current.data).toBe('foo');
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);

      expect(result.current.isLoading).toBeFalsy();
    });

    // Keep data if keepPreviousData is true
    act(() => {
      addToProcessQueue(testPromise1);
    });
    expect(result.current.data).toBe('foo');
  });

  it('여러 비동기 함수를 순차적으로 실행하고, 오류는 error 상태에 할당되어야 합니다', async () => {
    const mockFn1 = vi.fn();

    const { result } = renderHook(() => useAsyncProcessQueue());
    const addToProcessQueue = result.current.addToProcessQueue;

    const testPromise = createTestPromiseFunc(mockFn1, 200, 'bar', true);

    act(() => {
      addToProcessQueue(testPromise);
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);

      expect(mockFn1).toBeCalledTimes(1);
    });

    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);

      expect(result.current.error).toBe('bar');
      expect(result.current.data).toBeNull();
    });
  });
});
