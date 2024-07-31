import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useToggle } from '.';

describe('useToggle', () => {
  it('should default to false if no arguments are passed.', async () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBeFalsy();
  });

  it('should toggle the boolean value from true to false or from false to true when executed.', async () => {
    const { result } = renderHook(() => useToggle(false));
    const toggle = result.current[1];

    expect(result.current[0]).toBeFalsy();

    await waitFor(() => toggle());

    expect(result.current[0]).toBeTruthy();

    await waitFor(() => toggle());

    expect(result.current[0]).toBeFalsy();
  });
});
