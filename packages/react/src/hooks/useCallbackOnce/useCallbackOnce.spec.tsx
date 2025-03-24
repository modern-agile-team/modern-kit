import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCallbackOnce } from '.';

describe('useCallbackOnce', () => {
  it('콜백이 한 번만 실행되어야 합니다.', async () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useCallbackOnce(callback));

    await waitFor(() => {
      result.current();
      result.current();
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('리렌더링 후에 재호출되어서는 안됩니다.', async () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(() => useCallbackOnce(callback));

    await waitFor(() => result.current());

    expect(callback).toHaveBeenCalledTimes(1);

    rerender();

    await waitFor(() => result.current());

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
