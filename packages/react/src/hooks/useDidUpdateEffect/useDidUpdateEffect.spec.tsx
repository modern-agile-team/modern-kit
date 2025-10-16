import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDidUpdateEffect } from '.';

describe('useDidUpdateEffect', () => {
  it('초기 마운트 시 effect가 호출되지 않아야 합니다', () => {
    const effect = vi.fn();

    expect(effect).not.toHaveBeenCalled();
  });

  it('의존성이 변경될 때 effect가 호출되어야 합니다', () => {
    const effect = vi.fn();
    const { rerender } = renderHook(
      ({ deps }) => useDidUpdateEffect(effect, deps),
      {
        initialProps: { deps: [1] },
      }
    );

    rerender({ deps: [2] });
    expect(effect).toHaveBeenCalledTimes(1);

    rerender({ deps: [3] });
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it('의존성이 변경되지 않을 때 effect가 호출되지 않아야 합니다', () => {
    const effect = vi.fn();
    const { rerender } = renderHook(
      ({ deps }) => useDidUpdateEffect(effect, deps),
      {
        initialProps: { deps: [1] },
      }
    );

    rerender({ deps: [1] });
    expect(effect).not.toHaveBeenCalled();
  });
});
