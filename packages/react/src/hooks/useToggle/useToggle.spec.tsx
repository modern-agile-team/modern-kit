import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useToggle } from '.';

describe('useToggle', () => {
  it('defaultValue가 전달되지 않으면 기본값은 false여야 합니다.', async () => {
    const { result } = renderHook(() => useToggle());
    const [boolean] = result.current;

    expect(boolean).toBeFalsy();
  });

  it('toggle가 실행될 때 boolean 값이 true에서 false로 또는 false에서 true로 토글되어야 합니다.', async () => {
    const { result } = renderHook(() => useToggle(false));
    const toggle = result.current[1];

    expect(result.current[0]).toBeFalsy();

    await waitFor(() => {
      toggle();
      expect(result.current[0]).toBeTruthy();
    });

    await waitFor(() => {
      toggle();
      expect(result.current[0]).toBeFalsy();
    });
  });
});
