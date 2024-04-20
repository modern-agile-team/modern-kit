import { describe, it, expect, vi, beforeAll } from 'vitest';
import { act, renderHook, screen } from '@testing-library/react';
import { useTimeout } from '.';
import { useState } from 'react';
import { renderSetup } from '../../utils/test/renderSetup';

const delayTime = 1000;

beforeAll(() => {
  vi.useFakeTimers();
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
  it('mockFn is executed after a given time', () => {
    const mockFn = vi.fn();

    renderHook(() => useTimeout(mockFn, delayTime));

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).toBeCalled();
  });

  it('delay is undefined, timeout is disabled', () => {
    const mockFn = vi.fn();

    renderHook(() => useTimeout(mockFn, undefined));

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);
    expect(mockFn).not.toBeCalled();
  });

  it('callback function always guarantees the latest state', () => {
    renderSetup(<TestComponent />);

    expect(screen.getByText('0')).toBeInTheDocument();

    vi.advanceTimersByTime(delayTime);
    expect(screen.getByText('1')).toBeInTheDocument();

    vi.advanceTimersByTime(delayTime * 2);
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
