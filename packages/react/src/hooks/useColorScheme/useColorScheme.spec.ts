import { MockInstance, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useColorScheme } from '.';

const TEST_KEY = 'test-key';
let windowMatchMediaSpy: MockInstance;

beforeEach(() => {
  windowMatchMediaSpy = vi.spyOn(window, 'matchMedia');

  windowMatchMediaSpy.mockImplementation((query) => {
    return {
      matches: query === '(prefers-color-scheme: dark)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
  });
});

describe('useColorScheme', () => {
  it('should return default color scheme', () => {
    const { result } = renderHook(() => useColorScheme({ key: TEST_KEY }));

    expect(result.current.colorScheme).toBe('dark');
  });

  it('should return default color scheme', () => {
    const { result } = renderHook(() =>
      useColorScheme({ defaultValue: 'light', key: TEST_KEY })
    );

    expect(result.current.colorScheme).toBe('light');
  });

  it('should toggle between dark and light mode', async () => {
    const { result } = renderHook(() =>
      useColorScheme({ defaultValue: 'light' })
    );

    await waitFor(() => {
      result.current.setToggleMode();
    });

    expect(result.current.colorScheme).toBe('dark');

    await waitFor(() => {
      result.current.setToggleMode();
    });

    expect(result.current.colorScheme).toBe('light');
  });

  it('should set dark mode', async () => {
    const { result } = renderHook(() =>
      useColorScheme({ defaultValue: 'light' })
    );

    await waitFor(() => {
      result.current.setDarkMode();
    });

    expect(result.current.colorScheme).toBe('dark');
  });

  it('should set light mode', async () => {
    const { result } = renderHook(() =>
      useColorScheme({ defaultValue: 'dark' })
    );

    await waitFor(() => {
      result.current.setLightMode();
    });

    expect(result.current.colorScheme).toBe('light');
  });

  it('should set color scheme to preferred mode', async () => {
    const { result } = renderHook(() =>
      useColorScheme({ defaultValue: 'light' })
    );

    await waitFor(() => {
      result.current.setPreferredMode();
    });

    expect(result.current.colorScheme).toBe('dark');
  });

  it('should add class to body if shouldSetBodyClass is true', async () => {
    const { unmount } = renderHook(() =>
      useColorScheme({
        defaultValue: 'light',
        shouldSetBodyClass: true,
        key: TEST_KEY,
      })
    );

    expect(document.body.classList.contains('light')).toBeTruthy();

    unmount();

    expect(document.body.classList.contains('light')).toBeFalsy();
  });
});
