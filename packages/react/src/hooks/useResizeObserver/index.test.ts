import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useResizeObserver } from '.';

describe('useResizeObserver', () => {
  const observeMock = vi.fn();
  const unobserveMock = vi.fn();
  const disconnectMock = vi.fn();

  const mockResizeObserver = vi.fn().mockImplementation(() => ({
    observe: observeMock,
    unobserve: unobserveMock,
    disconnect: disconnectMock,
  }));

  beforeEach(() => {
    global.ResizeObserver = mockResizeObserver;
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useResizeObserver());

    expect(result.current.ref.current).toBe(null);
    expect(result.current.contentRect).toEqual({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
    });
  });

  it('should observe the target element when ref is set', () => {
    const { result } = renderHook(() => useResizeObserver());

    const mockElement = document.createElement('div');

    act(() => {
      // @ts-ignore - Setting ref manually for testing
      result.current.ref.current = mockElement;
    });

    // Force effect to run
    act(() => {});

    expect(observeMock).toHaveBeenCalledWith(mockElement);
  });

  it('should call the action callback when resize occurs', () => {
    const actionMock = vi.fn();
    renderHook(() => useResizeObserver(actionMock));

    const mockEntry = {
      contentRect: {
        width: 100,
        height: 200,
        top: 0,
        left: 0,
        bottom: 200,
        right: 100,
        x: 0,
        y: 0,
      },
    };

    // Simulate resize event
    act(() => {
      const callback = mockResizeObserver.mock.calls[0][0];
      callback([mockEntry]);
    });

    expect(actionMock).toHaveBeenCalledWith(mockEntry);
  });

  it('should update contentRect when resize occurs', () => {
    const { result } = renderHook(() => useResizeObserver());

    const mockEntry = {
      contentRect: {
        width: 100,
        height: 200,
        top: 0,
        left: 0,
        bottom: 200,
        right: 100,
        x: 0,
        y: 0,
      },
    };

    // Simulate resize event
    act(() => {
      const callback = mockResizeObserver.mock.calls[0][0];
      callback([mockEntry]);
    });

    expect(result.current.contentRect).toEqual(mockEntry.contentRect);
  });

  it('should clean up observer when unmounting', () => {
    const mockElement = document.createElement('div');

    const { unmount } = renderHook(() => {
      const result = useResizeObserver();
      // @ts-ignore - Setting ref manually for testing
      result.ref.current = mockElement;
      return result;
    });

    // Force effect to run
    act(() => {});

    unmount();

    expect(unobserveMock).toHaveBeenCalledWith(mockElement);
  });
});
