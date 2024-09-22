import { renderHook } from '@testing-library/react';
import { vi, describe, it, afterEach, expect } from 'vitest';
import { useEventListener } from '.';

// window
const windowAddEventListenerSpy = vi.spyOn(window, 'addEventListener');
const windowRemoveEventListenerSpy = vi.spyOn(window, 'removeEventListener');

// element
const divElement = document.createElement('div');
const elementAddEventListenerSpy = vi.spyOn(divElement, 'addEventListener');
const elementRemoveEventListenerSpy = vi.spyOn(
  divElement,
  'removeEventListener'
);

// document
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

describe('useEventListener()', () => {
  it('should bind/unbind the event listener to the window when element is not provided', () => {
    const eventName = 'click';
    const handler = vi.fn();

    const { unmount } = renderHook(() => {
      useEventListener(window, eventName, handler);
    });

    expect(windowAddEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      expect.any(Function),
      {}
    );

    unmount();

    expect(windowRemoveEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      expect.any(Function),
      {}
    );
  });

  it('should bind/unbind the event listener to the element when element is provided', () => {
    const eventName = 'click';
    const handler = vi.fn();

    const { unmount } = renderHook(() => {
      useEventListener(divElement, eventName, handler);
    });

    expect(elementAddEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      expect.any(Function),
      {}
    );

    unmount();

    expect(elementRemoveEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      expect.any(Function),
      {}
    );
  });

  it('should bind/unbind the event listener to the document when document is provided', () => {
    const eventName = 'click';
    const handler = vi.fn();

    const { unmount } = renderHook(() => {
      useEventListener(document, eventName, handler);
    });

    expect(documentAddEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      expect.any(Function),
      {}
    );

    unmount();

    expect(documentRemoveEventListenerSpy).toHaveBeenCalledWith(
      eventName,
      expect.any(Function),
      {}
    );
  });

  it('should pass the options to the event listener', () => {
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

  it('should not be called if addEventListener is not available', () => {
    const eventName = 'click';
    const handler = vi.fn();

    renderHook(() => {
      useEventListener({} as unknown as Window, eventName, handler);
    });

    expect(windowAddEventListenerSpy).toHaveBeenCalledTimes(0);
  });
});
