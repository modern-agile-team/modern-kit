import { renderHook } from '@testing-library/react';
import { useBeforeUnload } from '.';
import { describe, it, vi, expect } from 'vitest';

const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

describe('useBeforeUnload', () => {
  it('기본적으로 beforeunload 이벤트 리스너가 추가되고, 언마운트 시 제거되어야 한다', () => {
    const { unmount } = renderHook(() => useBeforeUnload());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'beforeunload',
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'beforeunload',
      expect.any(Function)
    );
  });

  it('enabled가 false일 때 이벤트 리스너가 추가되지 않아야 한다', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

    renderHook(() => useBeforeUnload(false));

    expect(addEventListenerSpy).not.toHaveBeenCalled();
  });
});
