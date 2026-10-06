import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToggle } from '.';

describe('useToggle', () => {
  it('인자가 전달되지 않으면 기본값은 false로 설정해야 합니다.', async () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBeFalsy();
  });

  it('toggle 함수를 사용하여 true이라면 false로, false라면 true로 변경할 수 있어야 합니다.', async () => {
    const { result } = renderHook(() => useToggle(false));
    const toggle = result.current[1];

    expect(result.current[0]).toBeFalsy();

    // toggle
    act(() => toggle());

    expect(result.current[0]).toBeTruthy();

    // toggle
    act(() => toggle());
    expect(result.current[0]).toBeFalsy();

    // toggle
    act(() => toggle());
    expect(result.current[0]).toBeTruthy();
  });

  it('setValue 함수를 사용하여 값을 직접 설정할 수 있어야 합니다.', async () => {
    const { result } = renderHook(() => useToggle(false));
    const setValue = result.current[2];

    // setValue
    act(() => setValue(true));
    expect(result.current[0]).toBeTruthy();
  });
});
