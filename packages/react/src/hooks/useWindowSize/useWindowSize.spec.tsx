import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useWindowSize } from '.';
import { act } from 'react';

const originalInnerWidth = window.innerWidth;
const originalInnerHeight = window.innerHeight;

const setMockWindowSize = (width?: number, height?: number) => {
  if (width) {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
  }

  if (height) {
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: height,
    });
  }
};

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  setMockWindowSize(originalInnerWidth, originalInnerHeight);

  vi.useRealTimers();
  vi.clearAllMocks();
});

describe('useWindowSize', () => {
  it('초기 window 크기를 반환해야 합니다', () => {
    setMockWindowSize(1024, 768);

    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toEqual({
      width: 1024,
      height: 768,
    });
  });

  it('window resize 이벤트 발생 시 크기를 즉시 업데이트해야 합니다 (debounce 없음)', async () => {
    const { result } = renderHook(() => useWindowSize());

    setMockWindowSize(1920, 1080);
    window.dispatchEvent(new Event('resize'));

    await waitFor(() =>
      expect(result.current).toEqual({
        width: 1920,
        height: 1080,
      })
    );
  });

  it('debounceWait이 설정되면 디바운스된 업데이트가 적용되어야 합니다', async () => {
    const DEBOUNCE_WAIT = 300;
    const { result } = renderHook(() =>
      useWindowSize({ debounceWait: DEBOUNCE_WAIT })
    );

    const initialSize = result.current;

    setMockWindowSize(800, 600);
    window.dispatchEvent(new Event('resize'));

    // 디바운스 대기 시간 이전에는 업데이트되지 않아야 함
    expect(result.current).toEqual(initialSize);

    vi.advanceTimersByTime(DEBOUNCE_WAIT);

    await waitFor(() => {
      expect(result.current).toEqual({
        width: 800,
        height: 600,
      });
    });
  });

  it('debounceWait 시간 내에 여러 번 resize 이벤트가 발생하면 마지막 값만 적용되어야 합니다', async () => {
    const DEBOUNCE_WAIT = 300;
    const { result } = renderHook(() =>
      useWindowSize({ debounceWait: DEBOUNCE_WAIT })
    );

    setMockWindowSize(800, 600);

    await waitFor(() => {
      window.dispatchEvent(new Event('resize'));
    });

    vi.advanceTimersByTime(DEBOUNCE_WAIT / 2);

    // 두 번째 resize (디바운스 시간 리셋)
    setMockWindowSize(1024, 768);
    window.dispatchEvent(new Event('resize'));

    vi.advanceTimersByTime(DEBOUNCE_WAIT / 2);

    // 세 번째 resize (최종 값)
    setMockWindowSize(1920, 1080);
    window.dispatchEvent(new Event('resize'));

    vi.advanceTimersByTime(DEBOUNCE_WAIT);

    await waitFor(() =>
      expect(result.current).toEqual({
        width: 1920,
        height: 1080,
      })
    );
  });

  it('debounceWait을 0으로 설정하면 즉시 업데이트되어야 합니다', async () => {
    const { result } = renderHook(() => useWindowSize({ debounceWait: 0 }));

    setMockWindowSize(1440, 900);

    window.dispatchEvent(new Event('resize'));

    await waitFor(() => {
      expect(result.current).toEqual({
        width: 1440,
        height: 900,
      });
    });
  });

  it('언마운트 시 이벤트 리스너가 제거되어야 합니다', async () => {
    const removeEventListenerSpy = vi.spyOn(
      globalThis.window,
      'removeEventListener'
    );

    const { unmount } = renderHook(() => useWindowSize());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
      undefined
    );
  });

  it('여러 번 리렌더링되어도 이벤트 리스너가 중복 등록되지 않아야 합니다', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

    const { rerender } = renderHook(() => useWindowSize());

    rerender();
    rerender();
    rerender();

    // 리렌더링해도 추가 등록되지 않음
    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
  });

  it('width만 변경되어도 올바르게 업데이트되어야 합니다', async () => {
    const { result } = renderHook(() => useWindowSize());

    const initialHeight = result.current.height;

    setMockWindowSize(1280);
    window.dispatchEvent(new Event('resize'));

    await waitFor(() => {
      expect(result.current.width).toBe(1280);
      expect(result.current.height).toBe(initialHeight);
    });
  });

  it('height만 변경되어도 올바르게 업데이트되어야 합니다', async () => {
    const { result } = renderHook(() => useWindowSize());

    const initialWidth = result.current.width;

    setMockWindowSize(undefined, 720);
    window.dispatchEvent(new Event('resize'));

    await waitFor(() => {
      expect(result.current.width).toBe(initialWidth);
      expect(result.current.height).toBe(720);
    });
  });
});
