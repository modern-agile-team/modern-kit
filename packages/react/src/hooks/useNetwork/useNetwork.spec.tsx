import { renderHook } from '@testing-library/react';
import { MockInstance } from 'vitest';
import { useNetwork } from '.';
import { renderToString } from 'react-dom/server';

let navigatorOnLineMockSpy: MockInstance;

beforeEach(() => {
  navigatorOnLineMockSpy = vi.spyOn(navigator, 'onLine', 'get');
});

describe('useNetwork', () => {
  const onlineCallbackMock = vi.fn();
  const offlineCallbackMock = vi.fn();

  it('should return true for isOnline when online', () => {
    navigatorOnLineMockSpy.mockReturnValue(true);

    const { result } = renderHook(() => useNetwork());

    expect(result.current.isOnline).toBeTruthy();
  });

  it('should return false for isOnline when offline', () => {
    navigatorOnLineMockSpy.mockReturnValue(false);

    const { result } = renderHook(() => useNetwork());

    expect(result.current.isOnline).toBeFalsy();
  });

  it('should execute the registered callback when the network status changes', () => {
    navigatorOnLineMockSpy.mockReturnValue(true);

    renderHook(() =>
      useNetwork({
        onlineCallback: onlineCallbackMock,
        offlineCallback: offlineCallbackMock,
      })
    );

    expect(offlineCallbackMock).not.toBeCalled();
    expect(onlineCallbackMock).not.toBeCalled();

    window.dispatchEvent(new Event('offline'));

    expect(offlineCallbackMock).toBeCalled();

    window.dispatchEvent(new Event('online'));

    expect(onlineCallbackMock).toBeCalled();
  });

  it('should return true for isOnline during server-side rendering', () => {
    const TestComponent = () => {
      const { isOnline } = useNetwork({
        onlineCallback: onlineCallbackMock,
        offlineCallback: offlineCallbackMock,
      });
      return <p>{isOnline ? 'online' : 'offline'}</p>;
    };

    const html = renderToString(<TestComponent />); // server side rendering

    expect(html).toContain('online');
  });
});
