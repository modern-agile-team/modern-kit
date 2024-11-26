import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, renderHook, screen } from '@testing-library/react';
import { useTimeout } from '.';
import { useState } from 'react';
import { renderSetup } from '../../_internal/test/renderSetup';

const delayTime = 1000;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

const TestComponent = () => {
  const [number, setNumber] = useState(0);

  useTimeout(() => {
    act(() => setNumber(number + 1));
  }, delayTime);

  useTimeout(() => {
    act(() => setNumber(number + 1));
  }, delayTime * 2);

  return <div>{number}</div>;
};

describe('useTimeout', () => {
  it('should call the function after the specified delay', () => {
    const mockFn = vi.fn();

    renderHook(() => useTimeout(mockFn, { delay: delayTime }));

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalled();
  });

  it('should call the function only when enabled', () => {
    const mockFn = vi.fn();

    const { rerender } = renderHook(
      ({ enabled }) => useTimeout(mockFn, { delay: delayTime, enabled }),
      {
        initialProps: { enabled: false },
      }
    );

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);

    expect(mockFn).not.toBeCalled();

    rerender({ enabled: true });

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalled();
  });

  it('should call the function after being set and reset', () => {
    const mockFn = vi.fn();

    const { result } = renderHook(
      ({ enabled }) => useTimeout(mockFn, { delay: delayTime, enabled }),
      {
        initialProps: { enabled: false },
      }
    );

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);

    expect(mockFn).not.toBeCalled();

    result.current.set();

    vi.advanceTimersByTime(delayTime);

    expect(mockFn).toBeCalledTimes(1);

    result.current.reset();

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalledTimes(2);
  });

  it('should disable the timeout when delay is undefined', () => {
    const mockFn = vi.fn();

    renderHook(() =>
      useTimeout(mockFn, { delay: undefined as unknown as number })
    );

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(0);
    expect(mockFn).toBeCalled();
  });

  it('should ensure the callback function always has the latest state', () => {
    renderSetup(<TestComponent />);

    expect(screen.getByText('0')).toBeInTheDocument();

    vi.advanceTimersByTime(delayTime);
    expect(screen.getByText('1')).toBeInTheDocument();

    vi.advanceTimersByTime(delayTime * 2);
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
