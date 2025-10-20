import { useCallback, useState } from 'react';
import { useDebounce } from '../useDebounce';
import { useEventListener } from '../../hooks/useEventListener';
import { isNumber, isServer } from '@modern-kit/utils';

interface WindowSize {
  width: number;
  height: number;
}

interface useWindowSizeOptions {
  debounceWait?: number;
  initialSize?: WindowSize;
}

const DEFAULT_SIZE: WindowSize = { width: 0, height: 0 }; // SSR 환경에서 사용할 기본 크기

/**
 * @description 현재 브라우저 창의 너비와 높이 정보를 추적하고, 반환하는 커스텀 훅입니다.
 *
 * 또한, resize 이벤트가 발생할 때 불 필요한 호출을 방지하기위한 `debounce` 기능을 제공합니다.
 *
 * @param {useWindowSizeOptions} options - 옵션 객체
 * @param {number} [options.debounceWait=300] - 이벤트를 디바운싱 대기 시간(ms), 값이 없다면 디바운스가 적용되지 않습니다.
 * @param {WindowSize} [options.initialSize={width: 0, height: 0}] - SSR 환경에서 사용할 기본 크기
 *
 * @returns {WindowSize} 현재 브라우저 창의 `width`와 `height`를 포함한 객체를 반환합니다.
 *
 * @example
 * const { width, height } = useWindowSize();
 *
 * @example
 * const { width, height } = useWindowSize({ debounceWait: 300 });
 */
export function useWindowSize({
  debounceWait,
  initialSize = DEFAULT_SIZE,
}: useWindowSizeOptions = {}): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(() => {
    if (isServer()) return initialSize;

    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  const debouncedResize = useDebounce(setWindowSize, debounceWait ?? 0);

  const handleResize = useCallback(() => {
    const setSize = isNumber(debounceWait) ? debouncedResize : setWindowSize;

    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [debounceWait, debouncedResize]);

  useEventListener(!isServer() ? window : null, 'resize', handleResize);

  return windowSize;
}
