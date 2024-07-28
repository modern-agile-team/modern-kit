import { isWindow } from '@modern-kit/utils';

export interface ScrollToElementOptions {
  offsetX?: number;
  offsetY?: number;
  behavior?: ScrollBehavior;
}

/**
 * @description parent가 window인지 특정 요소인지에 child의 위치 값을 가져오는 함수
 */
export const getRelativePosition = <T extends HTMLElement>(
  parent: T | Window,
  child: HTMLElement,
  scrollToOptions: ScrollToElementOptions
) => {
  const childRect = child.getBoundingClientRect();
  const { offsetX = 0, offsetY = 0 } = scrollToOptions;

  if (isWindow(parent)) {
    return {
      top: childRect.top + window.scrollY + offsetY,
      left: childRect.left + window.scrollX + offsetX,
    };
  }
  const parentRect = parent.getBoundingClientRect();

  return {
    top: childRect.top - parentRect.top + parent.scrollTop + offsetY,
    left: childRect.left - parentRect.left + parent.scrollLeft + offsetX,
  };
};
