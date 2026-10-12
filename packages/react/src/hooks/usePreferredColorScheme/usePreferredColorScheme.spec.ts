import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePreferredColorScheme } from '.';

const stubMatchMedia = (matchedQuery: string) => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches: query === matchedQuery,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  );
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('usePreferredColorScheme', () => {
  it('prefers-color-scheme가 dark일 때 "dark"를 반환해야 합니다', () => {
    stubMatchMedia('(prefers-color-scheme: dark)');

    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe('dark');
  });

  it('prefers-color-scheme가 light일 때 "light"를 반환해야 합니다', () => {
    stubMatchMedia('(prefers-color-scheme: light)');

    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe('light');
  });
});
