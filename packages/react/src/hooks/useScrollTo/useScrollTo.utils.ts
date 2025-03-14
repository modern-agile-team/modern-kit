import { isWindow } from '@modern-kit/utils';

export interface ScrollToElementOptions {
  offsetX?: number;
  offsetY?: number;
  behavior?: ScrollBehavior;
  alignY?: Align; // 수직
  alignX?: Align; // 수평
}

type Align = 'start' | 'center' | 'end';

interface Position {
  top: number;
  left: number;
}

type CalculatePositionOptions = Required<
  Pick<ScrollToElementOptions, 'offsetX' | 'offsetY' | 'alignX' | 'alignY'>
>;

/**
 * @description 컨테이너 내에서 타겟 요소의 정렬 위치를 계산합니다.
 */
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
 * @description 윈도우를 기준으로 타겟 요소의 위치를 계산합니다.
 */
const calculateTargetPositionFromWindow = (
  targetRect: DOMRect,
  options: CalculatePositionOptions
): Position => ({
  top:
    targetRect.top +
    window.scrollY +
    options.offsetY +
    getAlignPosition(window.innerHeight, targetRect.height, options.alignY),
  left:
    targetRect.left +
    window.scrollX +
    options.offsetX +
    getAlignPosition(window.innerWidth, targetRect.width, options.alignX),
});

/**
 * @description 특정 컨테이너 요소를 기준으로 타겟 요소의 스크롤 위치를 계산합니다.
 */
const calculateTargetPositionFromElement = (
  targetRect: DOMRect,
  container: HTMLElement,
  options: CalculatePositionOptions
): Position => {
  const containerRect = container.getBoundingClientRect();

  return {
    top:
      targetRect.top -
      containerRect.top +
      container.scrollTop +
      options.offsetY +
      getAlignPosition(containerRect.height, targetRect.height, options.alignY),
    left:
      targetRect.left -
      containerRect.left +
      container.scrollLeft +
      options.offsetX +
      getAlignPosition(containerRect.width, targetRect.width, options.alignX),
  };
};

/**
 * @description parent가 window인지 특정 요소인지에 child의 위치 값을 가져오는 함수
 */
export const getRelativePosition = <T extends HTMLElement>(
  container: T | Window,
  target: HTMLElement,
  scrollToOptions: ScrollToElementOptions
): Position => {
  const targetRect = target.getBoundingClientRect();
  const options = {
    offsetX: scrollToOptions?.offsetX ?? 0,
    offsetY: scrollToOptions?.offsetY ?? 0,
    alignY: scrollToOptions?.alignY ?? 'start',
    alignX: scrollToOptions?.alignX ?? 'start',
  };

  return isWindow(container)
    ? calculateTargetPositionFromWindow(targetRect, options)
    : calculateTargetPositionFromElement(targetRect, container, options);
};
