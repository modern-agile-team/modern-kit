import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useManualTimeout } from '.';

const delayTime = 100;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useManualTimeout', () => {
  const callback1 = vi.fn();
  const callback2 = vi.fn();
  const callback3 = vi.fn();

  it('지정된 delay 시간 후에 콜백 함수를 호출해야 합니다.', () => {
    const mockFn = vi.fn();
    const { result } = renderHook(() => useManualTimeout());

    result.current.set(mockFn, delayTime);

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);

    expect(mockFn).toBeCalled();
  });

  it('여러 개의 타임아웃을 병렬적으로 실행해야 합니다.', () => {
    const { result } = renderHook(() => useManualTimeout());

    result.current.set(callback1, delayTime);
    result.current.set(callback2, delayTime);
    result.current.set(callback3, delayTime * 2);

    expect(callback1).not.toBeCalled();
    expect(callback2).not.toBeCalled();
    expect(callback3).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);
    expect(callback1).toBeCalledTimes(1);
    expect(callback2).toBeCalledTimes(1);
    expect(callback3).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);
    expect(callback1).toBeCalledTimes(1);
    expect(callback2).toBeCalledTimes(1);
    expect(callback3).toBeCalledTimes(1);
  });

  it('중첩된 타임아웃을 지원해야 합니다.', () => {
    const { result } = renderHook(() => useManualTimeout());

    result.current.set(() => {
      callback1();
      result.current.set(() => {
        callback2();
        result.current.set(callback3, delayTime);
      }, delayTime);
    }, delayTime);

    expect(callback1).not.toBeCalled();
    expect(callback2).not.toBeCalled();
    expect(callback3).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);
    expect(callback1).toBeCalledTimes(1);
    expect(callback2).not.toBeCalled();
    expect(callback3).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);
    expect(callback1).toBeCalledTimes(1);
    expect(callback2).toBeCalledTimes(1);
    expect(callback3).not.toBeCalled();

    vi.advanceTimersByTime(delayTime);
    expect(callback1).toBeCalledTimes(1);
    expect(callback2).toBeCalledTimes(1);
    expect(callback3).toBeCalledTimes(1);
  });

  it('clearAll 함수를 호출하면 모든 타임아웃을 초기화해야 합니다.', () => {
    const { result } = renderHook(() => useManualTimeout());

    result.current.set(callback1, delayTime);
    result.current.set(callback2, delayTime * 2);
    result.current.set(callback3, delayTime * 3);

    result.current.clearAll();
    vi.advanceTimersByTime(delayTime * 3);

    expect(callback1).not.toBeCalled();
    expect(callback2).not.toBeCalled();
    expect(callback3).not.toBeCalled();
  });

  it('언마운트 시 모든 타임아웃을 정리해야 합니다.', () => {
    const { result, unmount } = renderHook(() => useManualTimeout());

    result.current.set(() => {
      callback1();
      result.current.set(() => {
        callback2();
        result.current.set(callback3, delayTime);
      }, delayTime);
    }, delayTime);

    unmount();
    vi.advanceTimersByTime(delayTime);

    expect(callback1).not.toBeCalled();
    expect(callback2).not.toBeCalled();
    expect(callback3).not.toBeCalled();
  });
});
