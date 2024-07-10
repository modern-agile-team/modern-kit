import { renderHook } from '@testing-library/react';
import { usePreferredColorScheme } from '.';
import { useMediaQuery } from '../useMediaQuery';
import { Mock } from 'vitest';

vi.mock('../useMediaQuery', () => ({
  useMediaQuery: vi.fn(),
}));

describe('usePreferredColorScheme', () => {
  it('should return "dark" when prefers-color-scheme is dark', () => {
    (useMediaQuery as Mock).mockImplementation((query: string) => {
      return query === '(prefers-color-scheme: dark)';
    });

    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe('dark');
  });

  it('should return "light" when prefers-color-scheme is light', () => {
    (useMediaQuery as Mock).mockImplementation((query: string) => {
      return query === '(prefers-color-scheme: light)';
    });

    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe('light');
  });

  it('should return "no-preference" when no color scheme preference is set', () => {
    (useMediaQuery as Mock).mockImplementation(() => false);

    const { result } = renderHook(() => usePreferredColorScheme());
    expect(result.current).toBe('no-preference');
  });
});
