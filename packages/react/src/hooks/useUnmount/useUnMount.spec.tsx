import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useUnmount } from '.';

describe('useUnMount', () => {
  it('should call provided callback on unmount', () => {
    const mockFn = vi.fn();

    const { unmount } = renderHook(() => useUnmount(mockFn));

    expect(mockFn).not.toBeCalled();

    unmount();

    expect(mockFn).toBeCalled();
  });

  it('should call provided callback if is has been changed', () => {
    const mockFn1 = vi.fn();
    const mockFn2 = vi.fn();
    const mockFn3 = vi.fn();

    const { rerender, unmount } = renderHook(
      (callback) => useUnmount(callback),
      { initialProps: mockFn1 }
    );

    rerender(mockFn2);
    rerender(mockFn3);

    unmount();

    expect(mockFn1).not.toBeCalled();
    expect(mockFn2).not.toBeCalled();
    expect(mockFn3).toBeCalled();
  });
});
