import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToggleState } from '.';

describe('useToggleState', () => {
  it('초기 상태로 초기화되야 합니다.', async () => {
    const { result } = renderHook(() => useToggleState('ON', 'OFF'));
    const [value] = result.current;

    expect(value).toEqual('ON');
  });

  it('value1과 value2 사이의 상태를 토글해야 합니다.', async () => {
    const { result } = renderHook(() => useToggleState('ON', 'OFF'));
    const toggle = result.current[1];
    const setValue = result.current[2];

    expect(result.current[0]).toEqual('ON');

    act(() => {
      toggle();
    });
    expect(result.current[0]).toEqual('OFF');

    act(() => toggle());
    expect(result.current[0]).toEqual('ON');

    act(() => setValue('OFF'));
    expect(result.current[0]).toEqual('OFF');
  });
});
