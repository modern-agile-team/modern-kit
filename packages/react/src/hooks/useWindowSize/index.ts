import { useCallback, useState } from 'react';
import { useDebounce } from '../useDebounce';
import { useEventListener } from '../../hooks/useEventListener';
import { isServer } from '@modern-kit/utils';

interface WindowSize {
  width: number | null;
  height: number | null;
}

interface useWindowSizeProps {
  debounceWait?: number;
}

const initialSize = {
  width: null,
  height: null,
};

/**
 * @description 현재 브라우저 창의 너비와 높이 정보를 추적하고, 반환하는 커스텀 훅입니다.
 *
 * 또한, 불 필요한 호출을 방지하기위한 `debounce` 기능을 제공합니다.
 *
 * @param {{ debounceWait: number }} props - 선택적인 설정 객체입니다.
 * - `debounceWait`: 크기 변경 이벤트를 디바운싱하기 위한 대기 시간(ms)입니다.
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
}: useWindowSizeProps = {}): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(() => {
    if (isServer()) return initialSize;

    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  const debouncedResize = useDebounce(setWindowSize, debounceWait);

  const handleResize = useCallback(() => {
    const setSize = debounceWait ? debouncedResize : setWindowSize;

    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [debounceWait, debouncedResize]);

  useEventListener(window, 'resize', handleResize);

  return windowSize;
}
