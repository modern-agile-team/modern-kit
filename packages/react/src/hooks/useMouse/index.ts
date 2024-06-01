import { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

interface CursorPosition {
  screenX?: number;
  screenY?: number;
  clientX?: number;
  clientY?: number;
  pageX?: number;
  pageY?: number;
  relativeX?: number;
  relativeY?: number;
}

export const useMouse = <T extends HTMLElement>() => {
  const targetRef = useRef<T>(null);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    screenX: undefined,
    screenY: undefined,
    clientX: undefined,
    clientY: undefined,
    pageX: undefined,
    pageY: undefined,
    relativeX: undefined,
    relativeY: undefined,
  });

  useIsomorphicLayoutEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const { screenX, screenY, clientX, clientY, pageX, pageY } = event;

      const relativePosition: Pick<CursorPosition, 'relativeX' | 'relativeY'> =
        {};

      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        const relativeX = clientX - rect.left;
        const relativeY = clientY - rect.top;

        relativePosition.relativeX = relativeX;
        relativePosition.relativeY = relativeY;
      }

      setCursorPosition({
        screenX,
        screenY,
        clientX,
        clientY,
        pageX,
        pageY,
        ...relativePosition,
      });
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return { ref: targetRef, position: cursorPosition };
};
