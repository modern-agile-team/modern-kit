import { useEffect, useRef, useState } from 'react';

import { usePreservedCallback } from '../usePreservedCallback';
import { noop } from '@modern-kit/utils';

interface UseHoverProps {
  onEnter?: (event: MouseEvent) => void;
  onLeave?: (event: MouseEvent) => void;
}

export const useHover = <T extends HTMLElement>({
  onEnter = noop,
  onLeave = noop,
}: UseHoverProps = {}) => {
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
    const target = targetRef.current;
    if (!target) return;

    target.addEventListener('mouseenter', onMouseEnter);
    target.addEventListener('mouseleave', onMouseLeave);

    return () => {
      target.removeEventListener('mouseenter', onMouseEnter);
      target.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [onMouseEnter, onMouseLeave]);

  return { ref: targetRef, isHovered };
};
