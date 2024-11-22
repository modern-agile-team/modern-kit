import { describe, it, expect } from 'vitest';
import { useCounter } from '.';
import { renderHook, waitFor } from '@testing-library/react';

describe('useCounter', () => {
  it('초기값으로 카운터가 초기화되어야 합니다.', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.counter).toBe(10);
  });

  it('카운터 값이 증가해야 합니다.', async () => {
    const { result } = renderHook(() => useCounter());

    await waitFor(() => {
      result.current.increment();
    });

    await waitFor(() => {
      expect(result.current.counter).toBe(1);
    });
  });

  it('카운터 값이 감소해야 합니다.', async () => {
    const { result } = renderHook(() => useCounter());

    await waitFor(() => {
      result.current.decrement();
    });

    await waitFor(() => {
      expect(result.current.counter).toBe(-1);
    });
  });

  it('카운터 값이 초기값으로 리셋되어야 합니다.', async () => {
    const { result } = renderHook(() => useCounter(5));

    await waitFor(() => {
      result.current.increment();
      result.current.reset();
    });

    await waitFor(() => {
      expect(result.current.counter).toBe(5);
    });
  });
});
