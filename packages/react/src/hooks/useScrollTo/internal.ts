import { isWindow } from '@modern-kit/utils';

type Align = 'start' | 'center' | 'end';

export interface ScrollToElementOptions {
  offsetX?: number;
  offsetY?: number;
  behavior?: ScrollBehavior;
  alignY?: Align; // 수직
  alignX?: Align; // 수평
}

const getAlignPosition = (
  containerDimension: number,
  targetDimension: number,
  align: Align
) => {
  if (align === 'start') {
    return 0;
  }
  if (align === 'center') {
    return -containerDimension / 2 + targetDimension / 2;
  }
  return -containerDimension + targetDimension;
};

/**
 * @description parent가 window인지 특정 요소인지에 child의 위치 값을 가져오는 함수
 */
export const getRelativePosition = <T extends HTMLElement>(
  container: T | Window,
  target: HTMLElement,
  scrollToOptions: ScrollToElementOptions
) => {
  const targetRect = target.getBoundingClientRect();
  const {
    offsetX = 0,
    offsetY = 0,
    alignY = 'start',
    alignX = 'start',
  } = scrollToOptions;

  if (isWindow(container)) {
    return {
      top:
        targetRect.top +
        window.scrollY +
        offsetY +
        getAlignPosition(window.innerHeight, targetRect.height, alignY),
      left:
        targetRect.left +
        window.scrollX +
        offsetX +
        getAlignPosition(window.innerWidth, targetRect.width, alignX),
    };
  }
  const containerRect = container.getBoundingClientRect();

  return {
    top:
      targetRect.top -
      containerRect.top +
      container.scrollTop +
      offsetY +
      getAlignPosition(containerRect.height, targetRect.height, alignY),
    left:
      targetRect.left -
      containerRect.left +
      container.scrollLeft +
      offsetX +
      getAlignPosition(containerRect.width, targetRect.width, alignX),
  };
};
