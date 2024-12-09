import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAsyncEffect } from '.';
import { asyncNoop } from '@modern-kit/utils';

describe('useAsyncEffect', () => {
  it('마운트 시 비동기 effect가 실행되어야 한다', () => {
    const effect = vi.fn(asyncNoop);

    renderHook(() => useAsyncEffect(effect));

    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('의존성이 변경될 때 effect가 다시 실행되어야 한다', () => {
    const effect = vi.fn(asyncNoop);

    const { rerender } = renderHook(
      ({ deps }) => useAsyncEffect(effect, [deps]),
      {
        initialProps: {
          deps: 1,
        },
      }
    );

    expect(effect).toHaveBeenCalledTimes(1);

    rerender({ deps: 2 });

    expect(effect).toHaveBeenCalledTimes(2);
  });
});
