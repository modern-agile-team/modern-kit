import { useCallback, useRef, useState } from 'react';
import { useEventListener } from '../../hooks/useEventListener';

interface CursorPosition {
  screenX: number | null;
  screenY: number | null;
  clientX: number | null;
  clientY: number | null;
  pageX: number | null;
  pageY: number | null;
  elementRelativeX: number | null;
  elementRelativeY: number | null;
  elementPositionX: number | null;
  elementPositionY: number | null;
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
    screenX: null,
    screenY: null,
    clientX: null,
    clientY: null,
    pageX: null,
    pageY: null,
    elementRelativeX: null,
    elementRelativeY: null,
    elementPositionX: null,
    elementPositionY: null,
  });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { screenX, screenY, clientX, clientY, pageX, pageY } = event;

    const relativePosition = {} as RelativePosition;
    const elementPosition = {} as ElementPosition;

    if (targetRef.current) {
      const clientRect = targetRef.current.getBoundingClientRect();
      const elementRelativeX = clientX - clientRect.left;
      const elementRelativeY = clientY - clientRect.top;

      const elementPositionX = clientRect.left + window.scrollX;
      const elementPositionY = clientRect.top + window.scrollY;

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
  }, []);

  useEventListener(window.document, 'mousemove', handleMouseMove);

  return { ref: targetRef, position: cursorPosition };
}
