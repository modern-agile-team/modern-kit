import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { screen, renderHook, waitFor } from '@testing-library/react';
import { renderSetup } from '../../_internal/test/renderSetup';
import { useBlockMultipleAsyncCalls } from '.';
import { delay } from '@modern-kit/utils';

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

const DELAY_TIME = 1000;

describe('useBlockMultipleAsyncCalls', () => {
  it('비동기 작업 완료 전 중복 호출 시 한 번만 실행되어야 합니다', async () => {
    const mockFn = vi.fn(async () => await delay(DELAY_TIME));
    const { result } = renderHook(useBlockMultipleAsyncCalls);

    const { blockMultipleAsyncCalls } = result.current;
    expect(result.current.isLoading).toBeFalsy();

    blockMultipleAsyncCalls(mockFn);
    blockMultipleAsyncCalls(mockFn);
    blockMultipleAsyncCalls(mockFn);

    await waitFor(async () => {
      expect(result.current.isLoading).toBeTruthy();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    vi.advanceTimersByTime(DELAY_TIME);

    await waitFor(async () => {
      expect(result.current.isLoading).toBeFalsy();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  // 이해를 돕기 위해 컴포넌트 예제 추가
  it('버튼을 여러 번 클릭해도 비동기 작업이 완료되기 전까지는 한 번만 실행되어야 합니다.', async () => {
    const mockFn = vi.fn(async () => await delay(DELAY_TIME));
    const { result } = renderHook(useBlockMultipleAsyncCalls);

    const { blockMultipleAsyncCalls } = result.current;
    const onClick = () => blockMultipleAsyncCalls(mockFn);

    const { user } = renderSetup(<button onClick={onClick}>TestButton</button>);
    const button = screen.getByRole('button');

    expect(result.current.isLoading).toBeFalsy();

    await user.click(button);
    await user.click(button);
    await user.click(button);

    await waitFor(async () => {
      expect(result.current.isLoading).toBeTruthy();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    vi.advanceTimersByTime(DELAY_TIME);

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

    await waitFor(async () => {
      expect(() => blockMultipleAsyncCalls(errorMockFn)).rejects.toThrowError(
        '비동기 작업 중 에러 발생'
      );
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.isError).toBeTruthy();
    });

    blockMultipleAsyncCalls(defaultMockFn); // 정상 비동기 함수 호출

    await waitFor(async () => {
      expect(result.current.isLoading).toBeTruthy();
      expect(result.current.isError).toBeFalsy();
      expect(defaultMockFn).toHaveBeenCalledTimes(1);
    });

    vi.advanceTimersByTime(DELAY_TIME);

    await waitFor(async () => {
      expect(result.current.isLoading).toBeFalsy();
      expect(result.current.isError).toBeFalsy();
      expect(defaultMockFn).toHaveBeenCalledTimes(1);
    });
  });
});
