import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDebouncedInputValue } from '.';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useDebouncedInputValue', () => {
  it('should initialize with empty string values', () => {
    const { result } = renderHook(() => useDebouncedInputValue());

    expect(result.current.value).toBe('');
    expect(result.current.debouncedValue).toBe('');
  });

  it('should update value immediately on change', async () => {
    const { result } = renderHook(() => useDebouncedInputValue());

    result.current.onChange('test');

    await vi.advanceTimersByTimeAsync(100); // debounce wait 타임 이전

    expect(result.current.value).toBe('test');
    expect(result.current.debouncedValue).toBe('');
  });

  it('should update debouncedValue after the wait time', async () => {
    const { result } = renderHook(() => useDebouncedInputValue());

    result.current.onChange('test');

    await vi.advanceTimersByTimeAsync(300);

    expect(result.current.value).toBe('test');
    expect(result.current.debouncedValue).toBe('test');
  });

  it('should reset both value and debouncedValue on reset', async () => {
    const { result } = renderHook(() => useDebouncedInputValue());

    result.current.onChange('test');

    await vi.advanceTimersByTimeAsync(300);

    expect(result.current.value).toBe('test');
    expect(result.current.debouncedValue).toBe('test');

    result.current.onReset(); // reset

    await vi.advanceTimersByTimeAsync(300);

    expect(result.current.value).toBe('');
    expect(result.current.debouncedValue).toBe('');
  });

  it('should work with a custom debounce wait time', async () => {
    const { result } = renderHook(() => useDebouncedInputValue(500));

    result.current.onChange('test');

    await vi.advanceTimersByTimeAsync(300);

    expect(result.current.value).toBe('test');
    expect(result.current.debouncedValue).toBe('');

    await vi.advanceTimersByTimeAsync(200);

    expect(result.current.value).toBe('test');
    expect(result.current.debouncedValue).toBe('test');
  });
});
