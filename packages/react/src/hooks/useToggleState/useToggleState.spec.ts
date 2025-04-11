import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useToggleState } from '.';

describe('useToggleState', () => {
  it('초기 상태가 올바르게 초기화되어야 합니다', async () => {
    const { result } = renderHook(() => useToggleState('ON', 'OFF'));
    const [value] = result.current;

    expect(value).toEqual('ON');
  });

  it('실행 시 value1과 value2 사이에서 상태가 토글되어야 합니다', async () => {
    const { result } = renderHook(() => useToggleState('ON', 'OFF'));
    const toggle = result.current[1];

    expect(result.current[0]).toEqual('ON');

    await waitFor(() => {
      toggle();
      expect(result.current[0]).toEqual('OFF');
    });

    await waitFor(() => {
      toggle();
      expect(result.current[0]).toEqual('ON');
    });
  });
});
