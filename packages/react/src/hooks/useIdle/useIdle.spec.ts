import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useIdle } from '.';

const TIMEOUT_DELAY = 50;
const THROTTLE_DELAY = 500;

// visibility 상태 스파이
const visibilityStateSpyOn = vi.spyOn(document, 'visibilityState', 'get');

beforeEach(() => {
  // https://github.com/testing-library/user-event/issues/833#issuecomment-1725364780
  vi.useFakeTimers({ shouldAdvanceTime: true });
  visibilityStateSpyOn.mockReturnValue('visible');
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe('useIdle', () => {
  describe('기본 동작', () => {
    it('초기 상태는 idle이 아니어야 한다', () => {
      const { result } = renderHook(() => useIdle({ timeout: TIMEOUT_DELAY }));

      expect(result.current).toBeFalsy();
    });

    it('지정된 timeout 시간 후에 idle 상태가 되어야 한다', async () => {
      const { result } = renderHook(() => useIdle({ timeout: TIMEOUT_DELAY }));

      expect(result.current).toBeFalsy();

      vi.advanceTimersByTime(TIMEOUT_DELAY);

      await waitFor(() => {
        expect(result.current).toBeTruthy();
      });
    });

    it('사용자 활동이 감지되면 idle 상태에서 벗어나야 한다', async () => {
      const { result } = renderHook(() => useIdle({ timeout: TIMEOUT_DELAY }));

      // idle 상태로 만들기
      vi.advanceTimersByTime(TIMEOUT_DELAY);
      await waitFor(() => {
        expect(result.current).toBeTruthy();
      });

      // 마우스 이동 이벤트 시뮬레이션
      const mouseMoveEvent = new Event('pointermove');
      window.dispatchEvent(mouseMoveEvent);

      await waitFor(() => {
        expect(result.current).toBeFalsy();
      });
    });

    it('사용자 활동 후 다시 timeout 시간이 지나면 idle 상태가 되어야 한다', async () => {
      const { result } = renderHook(() => useIdle({ timeout: TIMEOUT_DELAY }));

      // idle 상태로 만들기
      vi.advanceTimersByTime(TIMEOUT_DELAY);

      await waitFor(() => {
        expect(result.current).toBeTruthy();
      });

      // 사용자 활동
      const clickEvent = new Event('wheel');
      window.dispatchEvent(clickEvent);

      await waitFor(() => {
        expect(result.current).toBeFalsy();
      });

      vi.advanceTimersByTime(TIMEOUT_DELAY);

      await waitFor(() => {
        expect(result.current).toBeTruthy();
      });
    });

    it('페이지가 보이게 될 때 active 상태가 되어야 한다', async () => {
      const { result } = renderHook(() => useIdle({ timeout: TIMEOUT_DELAY }));

      // idle 상태로 만들기
      vi.advanceTimersByTime(TIMEOUT_DELAY);

      await waitFor(() => {
        expect(result.current).toBeTruthy();
      });

      // 페이지 visibility 변경 이벤트
      visibilityStateSpyOn.mockReturnValue('visible');
      const visibilityEvent = new Event('visibilitychange');
      document.dispatchEvent(visibilityEvent);

      await waitFor(() => {
        expect(result.current).toBeFalsy();
      });
    });

    it('timeout 값이 변경되면 새로운 시간으로 타이머가 재설정되어야 한다', async () => {
      const { result, rerender } = renderHook(
        ({ timeout }) => useIdle({ timeout }),
        { initialProps: { timeout: TIMEOUT_DELAY } }
      );

      vi.advanceTimersByTime(TIMEOUT_DELAY / 2);

      await waitFor(() => {
        expect(result.current).toBeFalsy();
      });

      // timeout 값을 더 작게 변경
      const newTimeout = TIMEOUT_DELAY / 4;
      rerender({ timeout: newTimeout });

      await waitFor(() => {
        expect(result.current).toBeFalsy();
      });

      vi.advanceTimersByTime(newTimeout);

      await waitFor(() => {
        expect(result.current).toBeTruthy();
      });
    });

    it('active 상태에서 event 발생 시 타이머가 재설정되어야 한다', async () => {
      const { result } = renderHook(({ timeout }) => useIdle({ timeout }), {
        initialProps: { timeout: TIMEOUT_DELAY },
      });

      // event 발생
      const clickEvent = new Event('pointerdown');
      window.dispatchEvent(clickEvent);

      await waitFor(() => {
        expect(result.current).toBeFalsy();
      });

      vi.advanceTimersByTime(TIMEOUT_DELAY / 2);

      await waitFor(() => {
        expect(result.current).toBeFalsy();
      });

      // event 발생, 타이머 재설정
      window.dispatchEvent(clickEvent);

      vi.advanceTimersByTime(TIMEOUT_DELAY / 2);

      await waitFor(() => {
        expect(result.current).toBeFalsy();
      });

      vi.advanceTimersByTime(TIMEOUT_DELAY / 2);

      await waitFor(() => {
        expect(result.current).toBeTruthy();
      });
    });
  });

  describe('콜백 동작', () => {
    it('onIdle 콜백이 idle 상태가 될 때 호출되어야 한다', async () => {
      const onIdle = vi.fn();
      const { result } = renderHook(() =>
        useIdle({ timeout: TIMEOUT_DELAY, onIdle })
      );

      expect(onIdle).not.toBeCalled();

      vi.advanceTimersByTime(TIMEOUT_DELAY);

      await waitFor(() => {
        expect(result.current).toBeTruthy();
        expect(onIdle).toBeCalledTimes(1);
      });
    });

    it('onActive 콜백이 active 상태가 될 때 호출되어야 한다', async () => {
      const onActive = vi.fn();
      const { result } = renderHook(() =>
        useIdle({ timeout: TIMEOUT_DELAY, onActive })
      );

      expect(onActive).not.toBeCalled();

      // idle 상태로 만들기
      vi.advanceTimersByTime(TIMEOUT_DELAY);

      await waitFor(() => {
        expect(result.current).toBeTruthy();
      });

      // 사용자 활동
      const keydownEvent = new Event('keydown');
      window.dispatchEvent(keydownEvent);

      await waitFor(() => {
        expect(result.current).toBeFalsy();
        expect(onActive).toBeCalledTimes(1);
      });
    });

    it('스로틀링으로 인해 연속된 이벤트는 제한되어야 한다', async () => {
      const onActive = vi.fn();
      const { result } = renderHook(() =>
        useIdle({ timeout: TIMEOUT_DELAY, onActive })
      );

      // idle 상태로 만들기
      vi.advanceTimersByTime(TIMEOUT_DELAY);

      await waitFor(() => {
        expect(result.current).toBeTruthy();
      });

      const clickEvent = new Event('pointerdown');
      window.dispatchEvent(clickEvent);
      window.dispatchEvent(clickEvent);
      window.dispatchEvent(clickEvent);

      await waitFor(() => {
        expect(onActive).toBeCalledTimes(1);
      });

      // 스로틀링 delay 시간 내에 호출되는 이벤트는 무시
      vi.advanceTimersByTime(THROTTLE_DELAY / 2);

      window.dispatchEvent(clickEvent);
      window.dispatchEvent(clickEvent);
      window.dispatchEvent(clickEvent);

      await waitFor(() => {
        expect(onActive).toBeCalledTimes(1);
      });

      vi.advanceTimersByTime(THROTTLE_DELAY / 2);

      await waitFor(() => {
        expect(onActive).toBeCalledTimes(1);
      });
    });
  });
});
