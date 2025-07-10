import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useVisibilityChange } from '.';

const visibilityStateSpyOn = vi.spyOn(document, 'visibilityState', 'get');
const event = new Event('visibilitychange');

describe('useVisibilityChange', () => {
  it('페이지가 표시 될 때 onShow, 숨겨 질 때 onHide 콜백 함수를 호출해야 한다', () => {
    const onShow = vi.fn();
    const onHide = vi.fn();

    renderHook(() =>
      useVisibilityChange({
        onShow,
        onHide,
      })
    );

    visibilityStateSpyOn.mockReturnValue('visible');
    document.dispatchEvent(event);

    expect(onShow).toBeCalledTimes(1);

    visibilityStateSpyOn.mockReturnValue('hidden');
    document.dispatchEvent(event);

    expect(onHide).toBeCalledTimes(1);
  });

  it('enabled 옵션을 통해 가시성 변경 이벤트 핸들러를 등록할지 여부를 결정할 수 있어야 한다', () => {
    const onShow = vi.fn();
    const onHide = vi.fn();

    renderHook(() =>
      useVisibilityChange({
        onShow,
        onHide,
        enabled: false,
      })
    );

    visibilityStateSpyOn.mockReturnValue('visible');
    document.dispatchEvent(event);

    visibilityStateSpyOn.mockReturnValue('hidden');
    document.dispatchEvent(event);

    expect(onShow).toBeCalledTimes(0);
    expect(onHide).toBeCalledTimes(0);
  });
});
