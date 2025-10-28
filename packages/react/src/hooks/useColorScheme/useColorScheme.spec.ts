import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useColorScheme } from '.';

const TEST_KEY = 'test-key';
const originalMatchMedia = window.matchMedia;

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn().mockImplementation((query) => {
      return {
        matches: query === '(prefers-color-scheme: dark)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    }),
  });
});

afterEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    value: originalMatchMedia,
  });
});

describe('useColorScheme', () => {
  it('기본 색상 모드를 반환해야 합니다', () => {
    const { result } = renderHook(() => useColorScheme({ key: TEST_KEY }));

    expect(result.current.colorScheme).toBe('dark');
  });

  it('기본 색상 모드를 반환해야 합니다', () => {
    const { result } = renderHook(() =>
      useColorScheme({ defaultValue: 'light', key: TEST_KEY })
    );

    expect(result.current.colorScheme).toBe('light');
  });

  it('다크 모드와 라이트 모드를 토글해야 합니다', async () => {
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

  it('다크 모드로 설정해야 합니다', async () => {
    const { result } = renderHook(() =>
      useColorScheme({ defaultValue: 'light' })
    );

    await waitFor(() => {
      result.current.setDarkMode();
    });

    expect(result.current.colorScheme).toBe('dark');
  });

  it('라이트 모드로 설정해야 합니다', async () => {
    const { result } = renderHook(() =>
      useColorScheme({ defaultValue: 'dark' })
    );

    await waitFor(() => {
      result.current.setLightMode();
    });

    expect(result.current.colorScheme).toBe('light');
  });

  it('선호하는 색상 모드로 설정해야 합니다', async () => {
    const { result } = renderHook(() =>
      useColorScheme({ defaultValue: 'light' })
    );

    await waitFor(() => {
      result.current.setPreferredMode();
    });

    expect(result.current.colorScheme).toBe('dark');
  });

  it('shouldSetBodyClass가 true일 때 body에 클래스를 추가해야 합니다', async () => {
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
