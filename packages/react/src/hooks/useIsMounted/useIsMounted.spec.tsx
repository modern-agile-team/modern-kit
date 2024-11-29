import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIsMounted } from '.';

describe('useIsMounted', () => {
  it('마운트되었을 때 "true"를 반환해야 합니다', () => {
    const { result } = renderHook(() => useIsMounted());

    expect(result.current).toBe(true);
  });
});
