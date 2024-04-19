import { isMobile } from '@devgrace/utils';
import React, { CSSProperties, useCallback, useState } from 'react';
import useDebouncedRippleCleanUp from './useDebouncedRippleCleanUp';

type NotUndefined<T> = Exclude<T, undefined>;

export interface RippleItem {
  id: number;
  left: NotUndefined<CSSProperties['left']>;
  top: NotUndefined<CSSProperties['top']>;
  width: NotUndefined<CSSProperties['width']>;
  height: NotUndefined<CSSProperties['height']>;
}

/**
 * @description
 * Ripple과 관련된 state, event 관리 커스텀 훅
 */
const useRipple = (duration: number) => {
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const clearRipples = useCallback(() => {
    setRipples([]);
  }, []);

  /**
   * @description
   * 모바일 환경에서는 touch event, 데스크탑에서는 mouse event 동작시키기 위해 분리해서 관리
   */
  const onMouseDownAddRipple = (element: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile()) return;

    const { currentTarget, clientX, clientY } = element;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();

    const size = Math.max(width, height);
    const data = new Date().getMilliseconds();
    const x = clientX - left - size / 2;
    const y = clientY - top - size / 2;

    const newRippleItem = {
      id: data,
      left: x,
      top: y,
      width: width,
      height: width,
    };

    setRipples([...ripples, newRippleItem]);
  };

  const onTouchStartAddRipple = (element: React.TouchEvent<HTMLDivElement>) => {
    if (!isMobile()) return;

    const { currentTarget, touches } = element;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const { clientX, clientY } = touches[0];

    const size = Math.max(width, height);
    const data = new Date().getMilliseconds();
    const x = clientX - left - size / 2;
    const y = clientY - top - size / 2;

    const newRippleItem = {
      id: data,
      left: x,
      top: y,
      width: width,
      height: width,
    };

    setRipples([...ripples, newRippleItem]);
  };

  useDebouncedRippleCleanUp(ripples.length, duration, clearRipples);

  return {
    ripples,
    onMouseDownAddRipple,
    onTouchStartAddRipple,
  };
};

export default useRipple;
