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

const initialCursorPosition: CursorPosition = {
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
};

export function useMouse<T extends HTMLElement>() {
  const targetRef = useRef<T>(null);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>(
    initialCursorPosition
  );

  const handleMouseMove = (event: MouseEvent) => {
    const { screenX, screenY, clientX, clientY, pageX, pageY } = event;

    let elementRelativeX = null;
    let elementRelativeY = null;
    let elementPositionX = null;
    let elementPositionY = null;

    if (targetRef.current) {
      const clientRect = targetRef.current.getBoundingClientRect();

      elementRelativeX = clientX - clientRect.left;
      elementRelativeY = clientY - clientRect.top;
      elementPositionX = clientRect.left + window.scrollX;
      elementPositionY = clientRect.top + window.scrollY;
    }

    setCursorPosition({
      screenX,
      screenY,
      clientX,
      clientY,
      pageX,
      pageY,
      elementRelativeX,
      elementRelativeY,
      elementPositionX,
      elementPositionY,
    });
  };

  useEventListener(
    typeof document !== 'undefined' ? document : null,
    'mousemove',
    handleMouseMove
  );

  return { ref: targetRef, position: cursorPosition };
}
