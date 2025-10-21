import { useSyncExternalStore } from 'react';
import { isNumber, debounce } from '@modern-kit/utils';

interface WindowSize {
  width: number;
  height: number;
}

const DEFAULT_SIZE: WindowSize = { width: 0, height: 0 }; // SSR 환경에서 사용할 기본 크기

const subscribe = (callback: () => void, wait?: number) => {
  const debouncedCallback = debounce(callback, wait ?? 0);
  const callbackToUse = isNumber(wait) ? debouncedCallback : callback;

  window.addEventListener('resize', callbackToUse);

  return () => {
    window.removeEventListener('resize', callbackToUse);
  };
};

const getSnapshot = () => {
  return JSON.stringify({
    width: window.innerWidth,
    height: window.innerHeight,
  });
};

const getServerSnapshot = () => {
  return JSON.stringify(DEFAULT_SIZE);
};

/**
 * @description 현재 브라우저 창의 너비와 높이 정보를 추적하고, 반환하는 커스텀 훅입니다.
 *
 * SSR 환경에서 hydration 불일치를 방지하며, resize 이벤트가 발생할 때 불 필요한 호출을 방지하기위한 `debounce` 기능을 제공합니다.
 *
 * 디바운스 대기 시간(debounceWait)을 설정하면 debounce로 동작하며, 설정하지 않으면 즉시 업데이트됩니다.
 *
 * @param {number} debounceWait - 이벤트를 디바운싱 대기 시간(ms), 값이 없다면 디바운스가 적용되지 않습니다.
 * @returns {WindowSize} 현재 브라우저 창의 `width`와 `height`를 포함한 객체를 반환합니다.
 *
 * @example const { width, height } = useWindowSize();
 *
 * @example const { width, height } = useWindowSize(300);
 */
export function useWindowSize(debounceWait?: number): {
  width: number;
  height: number;
} {
  const windowSize = useSyncExternalStore(
    (callback) => subscribe(callback, debounceWait),
    getSnapshot,
    getServerSnapshot
  );

  return JSON.parse(windowSize);
}
