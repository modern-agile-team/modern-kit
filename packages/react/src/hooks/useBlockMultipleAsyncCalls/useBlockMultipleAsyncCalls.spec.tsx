import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useBlockMultipleAsyncCalls } from '.';
import { delay } from '@modern-kit/utils';

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

const DELAY_TIME = 200;

describe('useBlockMultipleAsyncCalls', () => {
  it('비동기 작업 완료 전 중복 호출 시 한 번만 실행되어야 합니다', async () => {
    const mockFn = vi.fn(async () => await delay(DELAY_TIME));
    const { result } = renderHook(useBlockMultipleAsyncCalls);

    const { blockMultipleAsyncCalls } = result.current;
    const wrappedFn = blockMultipleAsyncCalls(mockFn);

    expect(result.current.isLoading).toBeFalsy();

    wrappedFn();
    wrappedFn();
    wrappedFn();

    await waitFor(async () => {
      expect(result.current.isLoading).toBeTruthy();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    await vi.advanceTimersByTimeAsync(DELAY_TIME);

    await waitFor(async () => {
      expect(result.current.isLoading).toBeFalsy();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  it('비동기 함수 호출 중 에러가 발생하면 isError가 true가 되고, 이후 정상적인 비동기 함수 호출 시 isError가 false로 초기화되어야 합니다.', async () => {
    const errorMockFn = vi.fn(async () => {
      throw new Error('비동기 작업 중 에러 발생');
    });
    const defaultMockFn = vi.fn(async () => await delay(DELAY_TIME));

    const { result } = renderHook(useBlockMultipleAsyncCalls);

    const { blockMultipleAsyncCalls } = result.current;

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeFalsy();

    await waitFor(() =>
      expect(blockMultipleAsyncCalls(errorMockFn)()).rejects.toThrowError(
        '비동기 작업 중 에러 발생'
      )
    );

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isError).toBeTruthy();

    blockMultipleAsyncCalls(defaultMockFn)(); // 정상 비동기 함수 호출

    await waitFor(() => {
      expect(result.current.isLoading).toBeTruthy();
      expect(result.current.isError).toBeFalsy();
      expect(defaultMockFn).toHaveBeenCalledTimes(1);
    });

    await vi.advanceTimersByTimeAsync(DELAY_TIME);

    await waitFor(async () => {
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.isError).toBeFalsy();
      expect(defaultMockFn).toHaveBeenCalledTimes(1);
    });
  });

  it('비동기 작업 진행 중 리렌더링 후에도 중복 호출이 차단되어야 합니다', async () => {
    const mockFn = vi.fn(async () => await delay(DELAY_TIME));
    const { result } = renderHook(useBlockMultipleAsyncCalls);

    result.current.blockMultipleAsyncCalls(mockFn)();

    await waitFor(() => expect(result.current.isLoading).toBeTruthy());

    // 리렌더링 이후 재호출
    result.current.blockMultipleAsyncCalls(mockFn)();

    expect(mockFn).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(DELAY_TIME);

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  it('콜백에 전달된 인자가 올바르게 전달되어야 합니다', async () => {
    const mockFn = vi.fn(async (id: number) => {
      await delay(DELAY_TIME);
      return `result-${id}`;
    });

    const { result } = renderHook(useBlockMultipleAsyncCalls);
    const { blockMultipleAsyncCalls } = result.current;
    const wrappedFn = blockMultipleAsyncCalls(mockFn);

    const promise = wrappedFn(42);

    await vi.advanceTimersByTimeAsync(DELAY_TIME);

    const value = await promise;

    expect(mockFn).toHaveBeenCalledWith(42);
    expect(value).toBe('result-42');
  });
});
