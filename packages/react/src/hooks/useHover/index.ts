import { useEffect, useRef, useState } from 'react';

import { usePreservedCallback } from '../usePreservedCallback';
import { noop } from '@modern-kit/utils';

interface UseHoverProps {
  onEnter?: (event: MouseEvent) => void;
  onLeave?: (event: MouseEvent) => void;
}

export function useHover<T extends HTMLElement>({
  onEnter = noop,
  onLeave = noop,
}: UseHoverProps = {}) {
  const [isHovered, setIsHovered] = useState(false);

  const targetRef = useRef<T>(null);

  const onMouseEnter = usePreservedCallback((event: MouseEvent) => {
    setIsHovered(true);
    onEnter(event);
  });

  const onMouseLeave = usePreservedCallback((event: MouseEvent) => {
    setIsHovered(false);
    onLeave(event);
  });

  useEffect(() => {
    const targetElement = targetRef.current;
    if (!targetElement) return;

    targetElement.addEventListener('mouseenter', onMouseEnter);
    targetElement.addEventListener('mouseleave', onMouseLeave);

    return () => {
      targetElement.removeEventListener('mouseenter', onMouseEnter);
      targetElement.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [onMouseEnter, onMouseLeave]);

  return { ref: targetRef, isHovered };
}
