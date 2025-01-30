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
  it('인자가 제공되지 않았을 때 기본 위치로 스크롤되어야 합니다', () => {
    const { result } = renderHook(() => useScrollTo());

    result.current.scrollToPosition();

    expect(window.scrollTo).toHaveBeenCalledWith(DEFAULT_OPTIONS);
  });

  it('div 요소에서 scrollToPosition이 올바른 옵션과 함께 호출되어야 합니다', () => {
    const { result } = renderHook(() => useScrollTo<HTMLDivElement>());

    const container = document.createElement('div');
    container.scrollTo = vi.fn() as any;

    (result.current.containerRef.current as any) = container;

    result.current.scrollToPosition(SCROLL_OPTIONS);

    expect(container.scrollTo).toHaveBeenCalledWith(SCROLL_OPTIONS);
  });

  it('window에서 scrollToElement가 올바른 옵션과 함께 호출되어야 합니다', () => {
    const { result } = renderHook(() => useScrollTo<HTMLDivElement>());

    const target = document.createElement('div');

    result.current.scrollToElement(target, SCROLL_TO_ELEMENT_OPTIONS);

    expect(window.scrollTo).toHaveBeenCalledWith(SCROLL_OPTIONS);
  });

  it('요소로 스크롤할 때 container 요소에서 scrollToElement가 올바른 옵션과 함께 호출되어야 합니다', () => {
    const { result } = renderHook(() => useScrollTo<HTMLDivElement>());

    const container = document.createElement('div');
    const target = document.createElement('div');
    container.scrollTo = vi.fn() as any;

    (result.current.containerRef.current as any) = container;

    result.current.scrollToElement(target, SCROLL_TO_ELEMENT_OPTIONS);

    expect(container.scrollTo).toHaveBeenCalledWith(SCROLL_OPTIONS);
  });
});
