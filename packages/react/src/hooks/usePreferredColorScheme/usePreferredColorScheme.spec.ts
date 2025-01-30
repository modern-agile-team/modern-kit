import { describe, it, expect, vi, Mock } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePreferredColorScheme } from '.';
import { useMediaQuery } from '../useMediaQuery';

vi.mock('../useMediaQuery', () => ({
  useMediaQuery: vi.fn(),
}));

describe('usePreferredColorScheme', () => {
  it('prefers-color-scheme가 dark일 때 "dark"를 반환해야 합니다', () => {
    (useMediaQuery as Mock).mockImplementation((query: string) => {
      return query === '(prefers-color-scheme: dark)';
    });

    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe('dark');
  });

  it('prefers-color-scheme가 light일 때 "light"를 반환해야 합니다', () => {
    (useMediaQuery as Mock).mockImplementation((query: string) => {
      return query === '(prefers-color-scheme: light)';
    });

    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe('light');
  });
});
