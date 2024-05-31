import { useRef, useState, useLayoutEffect } from 'react';

interface CursorPosition {
  screenX: number;
  screenY: number;
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
  relativeX: number;
  relativeY: number;
}

export const useMouse = <T extends HTMLElement>() => {
  const targetRef = useRef<T>(null);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    screenX: NaN,
    screenY: NaN,
    clientX: NaN,
    clientY: NaN,
    pageX: NaN,
    pageY: NaN,
    relativeX: NaN,
    relativeY: NaN,
  });

  useLayoutEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const element = targetRef.current;

      if (!element) return;

      const { screenX, screenY, clientX, clientY, pageX, pageY } = event;
      const rect = element.getBoundingClientRect();

      const relativeX = clientX - rect.left;
      const relativeY = clientY - rect.top;

      setCursorPosition({
        screenX,
        screenY,
        clientX,
        clientY,
        pageX,
        pageY,
        relativeX,
        relativeY,
      });
    };

    const element = targetRef.current;
    if (element) {
      element.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', onMouseMove);
      }
    };
  }, []);

  return { targetRef, position: cursorPosition };
};
