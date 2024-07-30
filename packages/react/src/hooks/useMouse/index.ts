import { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

interface CursorPosition {
  screenX?: number;
  screenY?: number;
  clientX?: number;
  clientY?: number;
  pageX?: number;
  pageY?: number;
  elementRelativeX?: number;
  elementRelativeY?: number;
  elementPositionX?: number;
  elementPositionY?: number;
}

type RelativePosition = Pick<
  CursorPosition,
  'elementRelativeX' | 'elementRelativeY'
>;
type ElementPosition = Pick<
  CursorPosition,
  'elementPositionX' | 'elementPositionY'
>;

export function useMouse<T extends HTMLElement>() {
  const targetRef = useRef<T>(null);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    screenX: undefined,
    screenY: undefined,
    clientX: undefined,
    clientY: undefined,
    pageX: undefined,
    pageY: undefined,
    elementRelativeX: undefined,
    elementRelativeY: undefined,
    elementPositionX: undefined,
    elementPositionY: undefined,
  });

  useIsomorphicLayoutEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const { screenX, screenY, clientX, clientY, pageX, pageY } = event;

      const relativePosition: RelativePosition = {};
      const elementPosition: ElementPosition = {};

      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        const elementRelativeX = clientX - rect.left;
        const elementRelativeY = clientY - rect.top;

        const elementPositionX = rect.left + window.scrollX;
        const elementPositionY = rect.top + window.scrollY;

        relativePosition.elementRelativeX = elementRelativeX;
        relativePosition.elementRelativeY = elementRelativeY;

        elementPosition.elementPositionX = elementPositionX;
        elementPosition.elementPositionY = elementPositionY;
      }

      setCursorPosition({
        screenX,
        screenY,
        clientX,
        clientY,
        pageX,
        pageY,
        ...relativePosition,
        ...elementPosition,
      });
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return { ref: targetRef, position: cursorPosition };
}
