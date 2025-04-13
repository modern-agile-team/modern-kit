/**
 * @description 스크롤 진행 상태를 반환하는 함수입니다.
 */
export const getScrollProgress = (
  current: number,
  total: number,
  clientSize: number
): number => {
  const maxScroll = total - clientSize;

  if (maxScroll <= 0) return 0;

  return Math.min(Math.round((current / maxScroll) * 100), 100);
};

/**
 * @description 스크롤 방향을 반환하는 함수입니다.
 */
export const getScrollDirection = (
  currentScrollX: number,
  currentScrollY: number,
  prevScrollY: number,
  prevScrollX: number
) => {
  return {
    y:
      currentScrollY === prevScrollY
        ? "none"
        : currentScrollY > prevScrollY
        ? "down"
        : "up",
    x:
      currentScrollX === prevScrollX
        ? "none"
        : currentScrollX > prevScrollX
        ? "right"
        : "left",
  } as const;
};
