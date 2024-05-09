import { renderHook } from '@testing-library/react';
import { useVisibilityChange } from '.';
import * as ModernKitUtils from '@modern-kit/utils';

// Mocking the noop function in @modern-kit/utils
vi.mock('@modern-kit/utils', () => {
  return {
    noop: vi.fn(),
  };
});

const visibilityStateSpyOn = vi.spyOn(document, 'visibilityState', 'get');
const event = new Event('visibilitychange');

afterEach(() => {
  vi.clearAllMocks();
});

describe('useVisibilityChange', () => {
  it('should call the onShow callback when the page becomes visible', () => {
    const { noop } = ModernKitUtils;

    renderHook(() => useVisibilityChange());

    visibilityStateSpyOn.mockReturnValue('visible');
    document.dispatchEvent(event);

    expect(noop).toBeCalledTimes(1);

    visibilityStateSpyOn.mockReturnValue('hidden');
    document.dispatchEvent(event);

    expect(noop).toBeCalledTimes(2);
  });

  it('should call the onShow callback when the page becomes visible', () => {
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

  it('should call the onHide callback when the page becomes hidden', () => {
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
