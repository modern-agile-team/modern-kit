import { describe, it, expect, beforeEach, vi, MockInstance } from 'vitest';

import { useMediaQuery } from '.';
import { renderHook } from '@testing-library/react';
import * as ModernKitUtils from '@modern-kit/utils';

let windowMatchMediaSpy: MockInstance;

beforeEach(() => {
  windowMatchMediaSpy = vi.spyOn(window, 'matchMedia');

  windowMatchMediaSpy.mockImplementation((query) => {
    return {
      matches: query === '(min-width: 600px)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
  });
});

describe('useMediaQuery', () => {
  it('쿼리가 일치할 때 true를 반환해야 합니다', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));

    expect(result.current).toBe(true);
  });

  it('쿼리가 일치하지 않을 때 false를 반환해야 합니다', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 599px)'));

    expect(result.current).toBe(false);
  });

  it('클라이언트 환경이 아닐 때 false를 반환해야 합니다', () => {
    vi.spyOn(ModernKitUtils, 'isClient').mockReturnValue(false);

    const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));

    expect(result.current).toBe(false);
  });
});
