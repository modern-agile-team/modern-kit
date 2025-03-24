import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCallbackOnce } from '.';

describe('useCallbackOnce', () => {
  it('콜백이 한 번만 실행되어야 합니다.', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useCallbackOnce(callback));

    act(() => {
      result.current();
      result.current();
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('리렌더링 후에도 콜백이 유지되어야 합니다.', () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(() => useCallbackOnce(callback));

    const preservedCallback = result.current;

    rerender();

    expect(result.current).toEqual(preservedCallback);
  });
});
