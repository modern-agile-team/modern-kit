import { renderHook, waitFor } from '@testing-library/react';
import { useCycleList } from '.';

describe('useCycleList', () => {
  const nextIndexActionMockFn = vi.fn();
  const prevIndexActionMockFn = vi.fn();
  const setIndexActionMockFn = vi.fn();

  it('should cycle through the list correctly', async () => {
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
  });
});
