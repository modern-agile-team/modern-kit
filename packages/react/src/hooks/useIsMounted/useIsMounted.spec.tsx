import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIsMounted } from '.';

describe('useIsMounted', () => {
  it('should return "true" when mounted', () => {
    const { result } = renderHook(() => useIsMounted());

    expect(result.current).toBe(true);
  });
});
