import React, { useCallback, useEffect, useRef, useState } from 'react';
import throttle from 'lodash-es/throttle';
import { getScrollDirection, getScrollProgress } from './useScrollEvent.utils';

interface UseScrollProps {
  throttleDelay?: number;
  throttleLeading?: boolean;
  throttleTrailing?: boolean;
  enabled?: boolean;
}

interface UpdateScrollPositionProps {
  scrollX: number;
  scrollY: number;
  scrollWidth: number;
  scrollHeight: number;
  clientWidth: number;
  clientHeight: number;
}

interface ScrollState {
  scrollX: number;
  scrollY: number;
  scrollWidth: number;
  scrollHeight: number;
  direction: {
    y: 'up' | 'down' | 'none';
    x: 'left' | 'right' | 'none';
  };
  progress: {
    y: number;
    x: number;
  };
}

/**
 * @description 특정 요소나 window의 스크롤 위치를 추적하는 React 커스텀 훅입니다.
 * 스크롤 방향, 진행도, 위치 등 스크롤 관련 정보를 제공합니다.
 *
 * @template T - HTMLElement를 상속하는 제네릭 타입
 * @param {UseScrollProps} props - 훅의 설정 객체
 * @param {boolean} [props.enabled=true] - 스크롤 이벤트 활성화 여부
 * @param {number} [props.throttleDelay=0] - 스크롤 이벤트 쓰로틀링 딜레이(밀리초)
 * @param {boolean} [props.throttleLeading=true] - 스크롤 이벤트 쓰로틀링 시작 시점 이벤트 무시 여부
 * @param {boolean} [props.throttleTrailing=true] - 스크롤 이벤트 쓰로틀링 마지막 이벤트 무시 여부
 * @returns {{
 *  ref: React.RefObject<T>;
 *  scrollState: ScrollState;
 * }} 스크롤 관련 데이터와 ref
 * - `ref`: 스크롤을 추적할 요소에 연결할 ref 객체
 * - `scrollState.scrollX`: 현재 스크롤 위치의 X좌표
 * - `scrollState.scrollY`: 현재 스크롤 위치의 Y좌표
 * - `scrollState.scrollWidth`: 스크롤 가능한 최대 너비
 * - `scrollState.scrollHeight`: 스크롤 가능한 최대 높이
 * - `scrollState.direction`: 현재 스크롤 방향
 * - `scrollState.progress`: 현재 스크롤 진행도
 *
 * @example
 * ```tsx
 * // ref를 전달하지 않으면 기본적으로 window의 스크롤 위치를 추적
 * const { scrollState } = useScrollEvent();
 * ```
 *
 * @example
 * ```tsx
 * // ref를 전달하면 해당 요소를 기준으로 스크롤 위치를 추적
 * const { ref, scrollState } = useScrollEvent<HTMLDivElement>();
 *
 * return <div ref={ref}>{...}</div>
 * ```
 *
 * @example
 * ```tsx
 * // 스크롤 이벤트 쓰로틀링 딜레이를 설정
 * const { scrollState } = useScrollEvent({ throttleDelay: 300, enabled: true });
 * ```
 */
export function useScrollEvent<T extends HTMLElement>({
  throttleDelay = 0,
  throttleLeading = true,
  throttleTrailing = true,
  enabled = true,
}: UseScrollProps = {}): {
  ref: React.RefObject<T>;
  scrollState: ScrollState;
} {
  const ref = useRef<T>(null);
  const prevScrollY = useRef(0);
  const prevScrollX = useRef(0);

  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollX: 0,
    scrollY: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    direction: {
      y: 'none',
      x: 'none',
    },
    progress: {
      y: 0,
      x: 0,
    },
  });

  const updateScrollPosition = useCallback(
    ({
      scrollX,
      scrollY,
      scrollWidth,
      scrollHeight,
      clientWidth,
      clientHeight,
    }: UpdateScrollPositionProps) => {
      setScrollState({
        scrollX,
        scrollY,
        scrollWidth,
        scrollHeight,
        direction: getScrollDirection(
          scrollX,
          scrollY,
          prevScrollY.current,
          prevScrollX.current
        ),
        progress: {
          y: getScrollProgress(scrollY, scrollHeight, clientHeight),
          x: getScrollProgress(scrollX, scrollWidth, clientWidth),
        },
      });

      // 이전 스크롤 위치 업데이트
      prevScrollY.current = scrollY;
      prevScrollX.current = scrollX;
    },
    []
  );

  const handleScrollByRef = useCallback(() => {
    if (!ref.current) return;
    const targetElement = ref.current;

    updateScrollPosition({
      scrollX: targetElement.scrollLeft,
      scrollY: targetElement.scrollTop,
      scrollWidth: targetElement.scrollWidth,
      scrollHeight: targetElement.scrollHeight,
      clientWidth: targetElement.clientWidth,
      clientHeight: targetElement.clientHeight,
    });
  }, [updateScrollPosition]);

  const handleScrollByWindow = useCallback(() => {
    updateScrollPosition({
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      clientWidth: window.innerWidth,
      clientHeight: window.innerHeight,
    });
  }, [updateScrollPosition]);

  useEffect(() => {
    if (!enabled) return;

    const targetElement = ref.current ?? window;

    const scrollHandler = ref.current
      ? handleScrollByRef
      : handleScrollByWindow;

    const throttledScrollHandler = throttle(scrollHandler, throttleDelay, {
      leading: throttleLeading,
      trailing: throttleTrailing,
    });

    scrollHandler(); // 초기 스크롤 위치 업데이트
    targetElement.addEventListener('scroll', throttledScrollHandler);

    return () => {
      targetElement.removeEventListener('scroll', throttledScrollHandler);
      throttledScrollHandler.cancel();
    };
  }, [
    handleScrollByRef,
    handleScrollByWindow,
    enabled,
    throttleDelay,
    throttleLeading,
    throttleTrailing,
  ]);

  return {
    ref: ref as React.RefObject<T>,
    scrollState,
  };
}
