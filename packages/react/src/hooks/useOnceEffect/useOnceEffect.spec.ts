import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useOnceEffect } from '.';

describe('useOnceEffect', () => {
  it('컴포넌트가 처음 렌더링될 때 effect 함수가 한 번만 호출되고, 리렌더링 되어도 한 번만 호출되어야 합니다.', () => {
    const callback = vi.fn();

    const { rerender } = renderHook(() => useOnceEffect(callback));

    expect(callback).toHaveBeenCalledTimes(1);

    rerender(); // 리렌더링

    expect(callback).toHaveBeenCalledTimes(1);

    rerender(); // 리렌더링

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
