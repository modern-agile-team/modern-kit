import { MockInstance } from 'vitest';
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

afterEach(() => {
  vi.clearAllMocks();
});

describe('useMediaQuery', () => {
  it('should return true for matches when query matches', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));

    expect(result.current.isMatch).toBe(true);
  });

  it('should return false when query does not match', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 599px)'));

    expect(result.current.isMatch).toBe(false);
  });

  it('should return false for isMatch when not in a client environment', () => {
    vi.spyOn(ModernKitUtils, 'isClient').mockReturnValue(false);

    const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));

    expect(result.current.isMatch).toBe(false);
  });
});
