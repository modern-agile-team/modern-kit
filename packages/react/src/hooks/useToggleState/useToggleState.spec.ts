import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useToggleState } from '.';

describe('useToggleState', () => {
  it('should initialize with the correct initial state', async () => {
    const { result } = renderHook(() => useToggleState('ON', 'OFF'));
    const [value] = result.current;

    expect(value).toEqual('ON');
  });

  it('should toggle the state between value1 and value2 when executed.', async () => {
    const { result } = renderHook(() => useToggleState('ON', 'OFF'));
    const toggle = result.current[1];

    expect(result.current[0]).toEqual('ON');

    await waitFor(() => toggle());

    expect(result.current[0]).toEqual('OFF');

    await waitFor(() => toggle());

    expect(result.current[0]).toEqual('ON');
  });
});
