import { renderHook } from '@testing-library/react';
import { vi, describe, it, afterEach, expect } from 'vitest';
import { useEventListener } from '.';

// window
const windowAddEventListenerSpy = vi.spyOn(window, 'addEventListener');
const windowRemoveEventListenerSpy = vi.spyOn(window, 'removeEventListener');

// Element
const divElement = document.createElement('div');
const elementAddEventListenerSpy = vi.spyOn(divElement, 'addEventListener');
const elementRemoveEventListenerSpy = vi.spyOn(
  divElement,
  'removeEventListener'
);

// document 이벤트 리스너 스파이
const documentAddEventListenerSpy = vi.spyOn(
  window.document,
  'addEventListener'
);
const documentRemoveEventListenerSpy = vi.spyOn(
  window.document,
  'removeEventListener'
);

afterEach(() => {
  vi.clearAllMocks();
});

describe('useEventListener', () => {
  it('Element가 제공되지 않았을 때 window에 이벤트 리스너를 바인딩/언바인딩해야 한다', () => {
    const eventName = 'click';
    const handler = vi.fn();

    const { unmount } = renderHook(() => {
      useEventListener(window, eventName, handler);
    });

    expect(windowAddEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      expect.any(Function),
      undefined
    );

    unmount();

    expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      expect.any(Function),
      undefined
    );
  });

  it('Element가 제공되었을 때 해당 Element에 이벤트 리스너를 바인딩/언바인딩해야 한다', () => {
    const eventName = 'click';
    const handler = vi.fn();

    const { unmount } = renderHook(() => {
      useEventListener(divElement, eventName, handler);
    });

    expect(elementAddEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      expect.any(Function),
      undefined
    );

    unmount();

    expect(elementRemoveEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      expect.any(Function),
      undefined
    );
  });

  it('document가 제공되었을 때 document에 이벤트 리스너를 바인딩/언바인딩해야 한다', () => {
    const eventName = 'click';
    const handler = vi.fn();

    const { unmount } = renderHook(() => {
      useEventListener(document, eventName, handler);
    });

    expect(documentAddEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      expect.any(Function),
      undefined
    );

    unmount();

    expect(documentRemoveEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      expect.any(Function),
      undefined
    );
  });

  it('이벤트 리스너에 옵션을 전달해서 처리할 수 있어야 한다', () => {
    const eventName = 'click';
    const handler = vi.fn();
    const options = {
      passive: true,
      once: true,
      capture: true,
    };

    renderHook(() => {
      useEventListener(window, eventName, handler, options);
    });

    expect(windowAddEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      expect.any(Function),
      options
    );
  });
});
