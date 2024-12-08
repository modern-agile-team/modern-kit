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
  it('지정된 delay 후에 함수가 호출되어야 합니다.', () => {
    const mockFn = vi.fn();

    renderHook(() => useTimeout(mockFn, { delay: delayTime }));

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalled();
  });

  it('활성화된 경우에만 함수가 호출되어야 합니다.', () => {
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

  it('설정 및 재설정된 후 함수가 호출되어야 합니다.', () => {
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

  it('delay가 undefined일 경우 타이머가 비활성화되어야 합니다.', () => {
    const mockFn = vi.fn();

    renderHook(() =>
      useTimeout(mockFn, { delay: undefined as unknown as number })
    );

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(0);
    expect(mockFn).toBeCalled();
  });

  it('콜백 함수가 항상 최신 상태를 유지해야 합니다.', () => {
    renderSetup(<TestComponent />);

    expect(screen.getByText('0')).toBeInTheDocument();

    vi.advanceTimersByTime(delayTime);
    expect(screen.getByText('1')).toBeInTheDocument();

    vi.advanceTimersByTime(delayTime * 2);
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
