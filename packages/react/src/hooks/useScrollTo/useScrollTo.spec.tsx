import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useScrollTo } from '.';
import { renderHook } from '@testing-library/react';

const DEFAULT_OPTIONS = {
  behavior: 'auto',
  left: 0,
  top: 0,
} as const;

const SCROLL_OPTIONS = {
  behavior: 'smooth',
  left: 500,
  top: 500,
} as const;

const SCROLL_TO_ELEMENT_OPTIONS = {
  behavior: 'smooth',
  offsetX: 500,
  offsetY: 500,
} as const;

beforeEach(() => {
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

describe('useScrollTo', () => {
  it('should scroll to the default position when no arguments are provided', () => {
    const { result } = renderHook(() => useScrollTo());

    result.current.scrollToPosition();

    expect(window.scrollTo).toHaveBeenCalledWith(DEFAULT_OPTIONS);
  });

  it('should call scrollToPosition on the div element with the correct options', () => {
    const { result } = renderHook(() => useScrollTo<HTMLDivElement>());

    const container = document.createElement('div');
    container.scrollTo = vi.fn() as any;

    (result.current.containerRef.current as any) = container;

    result.current.scrollToPosition(SCROLL_OPTIONS);

    expect(container.scrollTo).toHaveBeenCalledWith(SCROLL_OPTIONS);
  });

  it('should call scrollToElement on the window with the correct options', () => {
    const { result } = renderHook(() => useScrollTo<HTMLDivElement>());

    const target = document.createElement('div');

    result.current.scrollToElement(target, SCROLL_TO_ELEMENT_OPTIONS);

    expect(window.scrollTo).toHaveBeenCalledWith(SCROLL_OPTIONS);
  });

  it('should call scrollToElement on the container element with the correct options when scrolling to an element', () => {
    const { result } = renderHook(() => useScrollTo<HTMLDivElement>());

    const container = document.createElement('div');
    const target = document.createElement('div');
    container.scrollTo = vi.fn() as any;

    (result.current.containerRef.current as any) = container;

    result.current.scrollToElement(target, SCROLL_TO_ELEMENT_OPTIONS);

    expect(container.scrollTo).toHaveBeenCalledWith(SCROLL_OPTIONS);
  });
});
