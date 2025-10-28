import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useWindowSize } from '.';
import { renderToString } from 'react-dom/server';

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

    await waitFor(() => {
      setMockWindowSize(1920, 1080);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: 1920,
      height: 1080,
    });
  });

  it('debounceWait이 설정되면 디바운스된 업데이트가 적용되어야 합니다', async () => {
    const DEBOUNCE_WAIT = 300;
    const { result } = renderHook(() => useWindowSize(DEBOUNCE_WAIT));

    const initialSize = result.current;

    await waitFor(() => {
      setMockWindowSize(800, 600);
      window.dispatchEvent(new Event('resize'));
    });

    // 디바운스 대기 시간 이전에는 업데이트되지 않아야 함
    expect(result.current).toEqual(initialSize);

    await vi.advanceTimersByTimeAsync(DEBOUNCE_WAIT);

    expect(result.current).toEqual({
      width: 800,
      height: 600,
    });
  });

  it('debounceWait 시간 내에 여러 번 resize 이벤트가 발생하면 마지막 값만 적용되어야 합니다', async () => {
    const DEBOUNCE_WAIT = 300;
    const { result } = renderHook(() => useWindowSize(DEBOUNCE_WAIT));

    await waitFor(() => {
      setMockWindowSize(800, 600);
      window.dispatchEvent(new Event('resize'));
    });

    await vi.advanceTimersByTimeAsync(DEBOUNCE_WAIT / 2);

    // 두 번째 resize (디바운스 시간 리셋)
    await waitFor(() => {
      setMockWindowSize(1024, 768);
      window.dispatchEvent(new Event('resize'));
    });

    await vi.advanceTimersByTimeAsync(DEBOUNCE_WAIT / 2);

    await waitFor(() => {
      // 세 번째 resize (최종 값)
      setMockWindowSize(1920, 1080);
      window.dispatchEvent(new Event('resize'));
    });

    await vi.advanceTimersByTimeAsync(DEBOUNCE_WAIT);

    expect(result.current).toEqual({
      width: 1920,
      height: 1080,
    });
  });

  it('debounceWait을 0으로 설정하면 즉시 업데이트되어야 합니다', async () => {
    const { result } = renderHook(() => useWindowSize(0));

    await waitFor(() => {
      setMockWindowSize(1440, 900);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({ width: 1440, height: 900 });
  });

  it('width만 변경되어도 올바르게 업데이트되어야 합니다', async () => {
    const { result } = renderHook(() => useWindowSize());

    const initialHeight = result.current.height;

    await waitFor(() => {
      setMockWindowSize(1280);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.width).toBe(1280);
    expect(result.current.height).toBe(initialHeight);
  });

  it('height만 변경되어도 올바르게 업데이트되어야 합니다', async () => {
    const { result } = renderHook(() => useWindowSize());

    const initialWidth = result.current.width;

    await waitFor(() => {
      setMockWindowSize(undefined, 720);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.width).toBe(initialWidth);
    expect(result.current.height).toBe(720);
  });

  it('서버 사이드 렌더링 중에는 초기값(width: 0, height: 0)이 렌더링되어야 합니다', async () => {
    const TestComponent = () => {
      const { width, height } = useWindowSize();
      return <span>{`${width}/${height}`}</span>;
    };

    const html = renderToString(<TestComponent />); // server side rendering

    expect(html).toContain('0/0');
  });
});
