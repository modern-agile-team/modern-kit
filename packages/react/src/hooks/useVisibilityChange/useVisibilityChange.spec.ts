import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useVisibilityChange } from '.';
import * as ModernKitUtils from '@modern-kit/utils';

// Mocking the noop function in @modern-kit/utils
vi.mock('@modern-kit/utils', async (importOriginal: any) => {
  const actual = await importOriginal();
  return {
    ...actual,
    isClient: vi.fn(),
  };
});

const visibilityStateSpyOn = vi.spyOn(document, 'visibilityState', 'get');
const event = new Event('visibilitychange');

describe('useVisibilityChange', () => {
  it('페이지가 보일 때 onShow 콜백이 호출되어야 합니다', () => {
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
    expect(onHide).toBeCalledTimes(0);
  });

  it('페이지가 숨겨질 때 onHide 콜백이 호출되어야 합니다', () => {
    const onShow = vi.fn();
    const onHide = vi.fn();

    renderHook(() =>
      useVisibilityChange({
        onShow,
        onHide,
      })
    );

    visibilityStateSpyOn.mockReturnValue('hidden');
    document.dispatchEvent(event);

    expect(onShow).toBeCalledTimes(0);
    expect(onHide).toBeCalledTimes(1);
  });
});
