import { useIsomorphicLayoutEffect } from "@devgrace/react";
import { useEffect } from "react";

/**
 * @description ripple 효과가 끝나는 시간(duration)에 맞춰 ripples 배열 초기화 함수
 * @param rippleCount ripple 아이템 개수
 * @param duration 지연시간
 * @param cleanup cleanup 함수
 */
const useDebouncedRippleCleanUp = (
  rippleCount: number,
  duration: number,
  cleanup: () => void
) => {
  useIsomorphicLayoutEffect(() => {
    const timeoutId = setTimeout(() => {
      cleanup();
    }, duration);

    return () => clearTimeout(timeoutId);
  }, [rippleCount, duration, cleanup]);
};

export default useDebouncedRippleCleanUp;
