import { useCallback, useEffect, useRef, useState } from 'react';

interface UseHoverProps {
  onEnter?: (event?: MouseEvent) => void;
  onLeave?: (event?: MouseEvent) => void;
}

export const useHover = <T extends HTMLElement = HTMLDivElement>({
  onEnter,
  onLeave,
}: UseHoverProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const targetRef = useRef<T>(null);

  const onMouseEnter = useCallback(
    (event: MouseEvent) => {
      setIsHovered(true);
      onEnter?.(event);
    },
    [onEnter],
  );

  const onMouseLeave = useCallback(
    (event: MouseEvent) => {
      setIsHovered(false);
      onLeave?.(event);
    },
    [onLeave],
  );

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
