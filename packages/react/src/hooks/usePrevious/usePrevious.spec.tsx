import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePrevious } from '.';

describe('usePrevious', () => {
  it('이전 렌더링의 인자 값을 반환해야 합니다', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });

    expect(result.current).toBe(0);

    rerender({ value: 1 });
    expect(result.current).toBe(0);

    rerender({ value: 3 });
    expect(result.current).toBe(1);

    rerender({ value: 5 });
    expect(result.current).toBe(3);
  });
});
