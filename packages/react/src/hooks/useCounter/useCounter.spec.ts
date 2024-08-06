import { describe, it, expect } from 'vitest';
import { useCounter } from '.';
import { renderHook, waitFor } from '@testing-library/react';

describe('useCounter', () => {
  it('should initialize the counter with the initial value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.counter).toBe(10);
  });

  it('should increment the counter', async () => {
    const { result } = renderHook(() => useCounter());

    await waitFor(() => {
      result.current.increment();
    });
    expect(result.current.counter).toBe(1);
  });

  it('should decrement the counter', async () => {
    const { result } = renderHook(() => useCounter());

    await waitFor(() => {
      result.current.decrement();
    });
    expect(result.current.counter).toBe(-1);
  });

  it('should reset the counter to initial value', async () => {
    const { result } = renderHook(() => useCounter(5));

    await waitFor(() => {
      result.current.increment();
      result.current.reset();
    });
    expect(result.current.counter).toBe(5);
  });
});
