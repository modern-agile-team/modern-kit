import { describe, it, expect, beforeEach, vi, MockInstance } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useNetwork } from '.';
import { renderToString } from 'react-dom/server';

let navigatorOnLineMockSpy: MockInstance;

beforeEach(() => {
  navigatorOnLineMockSpy = vi.spyOn(navigator, 'onLine', 'get');
});

describe('useNetwork', () => {
  const onlineCallbackMock = vi.fn();
  const offlineCallbackMock = vi.fn();

  it('네트워크가 온라인 상태 일때 isOnline은 true를 반환해야 합니다.', () => {
    navigatorOnLineMockSpy.mockReturnValue(true);

    const { result } = renderHook(() => useNetwork());
    const isOnline = result.current;

    expect(isOnline).toBeTruthy();
  });

  it('네트워크가 오프라인 상태 일때 isOnline은 false를 반환해야 합니다.', () => {
    navigatorOnLineMockSpy.mockReturnValue(false);

    const { result } = renderHook(() => useNetwork());
    const isOnline = result.current;

    expect(isOnline).toBeFalsy();
  });

  it('네트워크 상태가 변경되면 등록된 콜백을 실행해야 합니다.', () => {
    navigatorOnLineMockSpy.mockReturnValue(true);

    renderHook(() =>
      useNetwork({
        onlineAction: onlineCallbackMock,
        offlineAction: offlineCallbackMock,
      })
    );

    expect(offlineCallbackMock).not.toBeCalled();
    expect(onlineCallbackMock).not.toBeCalled();

    window.dispatchEvent(new Event('offline'));

    expect(offlineCallbackMock).toBeCalled();

    window.dispatchEvent(new Event('online'));

    expect(onlineCallbackMock).toBeCalled();
  });

  /**
   * @see https://react.dev/reference/react/useSyncExternalStore#adding-support-for-server-rendering
   */
  it('서버 측 렌더링 중에 isOnline은 true을 반환해야 합니다.', () => {
    const TestComponent = () => {
      const isOnline = useNetwork({
        onlineAction: onlineCallbackMock,
        offlineAction: offlineCallbackMock,
      });
      return <p>{isOnline ? 'online' : 'offline'}</p>;
    };

    const html = renderToString(<TestComponent />); // server side rendering

    expect(html).toContain('online');
  });
});
