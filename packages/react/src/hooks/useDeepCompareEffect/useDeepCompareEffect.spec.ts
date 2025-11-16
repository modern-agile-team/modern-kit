import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDeepCompareEffect } from '.';

describe('useDeepCompareEffect', () => {
  it('초기 마운트 시 effect가 호출되어야 합니다', () => {
    const effect = vi.fn();

    renderHook(() => useDeepCompareEffect(effect, [{ a: 1 }]));

    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('객체 참조가 변경되었지만 값이 같을 때 effect가 호출되지 않아야 합니다', () => {
    const effect = vi.fn();
    const { rerender } = renderHook(
      ({ deps }) => useDeepCompareEffect(effect, deps),
      {
        initialProps: { deps: [{ a: 1, b: 2 }] },
      }
    );

    expect(effect).toHaveBeenCalledTimes(1);

    rerender({ deps: [{ a: 1, b: 2 }] });

    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('객체의 값이 실제로 변경되었을 때 effect가 호출되어야 합니다', () => {
    const effect = vi.fn();
    const { rerender } = renderHook(
      ({ deps }) => useDeepCompareEffect(effect, deps),
      {
        initialProps: { deps: [{ a: 1, b: 2 }] },
      }
    );

    expect(effect).toHaveBeenCalledTimes(1);

    rerender({ deps: [{ a: 1, b: 3 }] });
    expect(effect).toHaveBeenCalledTimes(2);

    rerender({ deps: [{ a: 2, b: 3 }] });
    expect(effect).toHaveBeenCalledTimes(3);
  });

  it('배열의 경우에도 깊은 비교가 동작해야 합니다', () => {
    const effect = vi.fn();
    const { rerender } = renderHook(
      ({ deps }) => useDeepCompareEffect(effect, deps),
      {
        initialProps: { deps: [[1, 2, 3]] },
      }
    );

    // 새로운 배열이지만 값은 같음
    rerender({ deps: [[1, 2, 3]] });
    expect(effect).toHaveBeenCalledTimes(1);

    rerender({ deps: [[1, 2, 4]] });
    expect(effect).toHaveBeenCalledTimes(2);
  });
});
