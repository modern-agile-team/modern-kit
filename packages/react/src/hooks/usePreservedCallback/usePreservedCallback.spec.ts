import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { usePreservedCallback } from '.';

describe('usePreservedCallback', () => {
  it('콜백 함수의 참조를 항상 유지해야 합니다.', () => {
    let counter = 0;

    const { result, rerender } = renderHook(
      ({ callback }) => usePreservedCallback(callback),
      {
        initialProps: {
          callback: () => counter,
        },
      }
    );

    expect(result.current()).toBe(0);

    counter = 1;
    rerender({ callback: () => counter });

    expect(result.current()).toBe(1);
  });

  it('리렌더링마다 콜백 함수를 재생성하지 않아야 합니다.', () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(() =>
      usePreservedCallback(callback)
    );

    const preservedCallback = result.current;

    rerender();
    expect(result.current).toBe(preservedCallback);
  });

  it('최신의 콜백 함수를 호출해야 합니다.', async () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { result, rerender } = renderHook(
      ({ callback }) => usePreservedCallback(callback),
      {
        initialProps: { callback: callback1 },
      }
    );

    await waitFor(() => {
      result.current();
    });
    expect(callback1).toHaveBeenCalledTimes(1);

    rerender({ callback: callback2 });

    await waitFor(() => {
      result.current();
    });

    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledTimes(1);
  });
});
