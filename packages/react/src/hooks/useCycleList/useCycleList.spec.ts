import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCycleList } from '.';

describe('useCycleList', () => {
  const nextIndexActionMockFn = vi.fn();
  const prevIndexActionMockFn = vi.fn();
  const setIndexActionMockFn = vi.fn();
  const resetIndexActionMockFn = vi.fn();

  it('리스트를 올바르게 순환해야 합니다', async () => {
    const { result } = renderHook(() => useCycleList([1, 2, 3, 4, 5]));

    expect(result.current.currentItem).toBe(1);

    await waitFor(() => {
      result.current.nextIndex(nextIndexActionMockFn);
    });

    await waitFor(() => {
      expect(result.current.currentItem).toBe(2);
      expect(nextIndexActionMockFn).toBeCalledTimes(1);
    });

    await waitFor(() => {
      result.current.prevIndex(prevIndexActionMockFn);
    });

    await waitFor(() => {
      expect(result.current.currentItem).toBe(1);
      expect(prevIndexActionMockFn).toBeCalledTimes(1);
    });

    await waitFor(() => {
      result.current.setIndex(3, setIndexActionMockFn);
    });

    await waitFor(() => {
      expect(result.current.currentItem).toBe(4);
      expect(setIndexActionMockFn).toBeCalledTimes(1);
    });

    await waitFor(() => {
      result.current.resetIndex(resetIndexActionMockFn);
    });

    await waitFor(() => {
      expect(result.current.currentItem).toBe(1);
      expect(resetIndexActionMockFn).toBeCalledTimes(1);
    });
  });
});
