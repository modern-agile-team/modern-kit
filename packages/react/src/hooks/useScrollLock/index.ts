import { useCallback, useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { Nullable } from '@modern-kit/types';

interface UseScrollLockProps {
  autoLock?: boolean;
}

export function useScrollLock<T extends HTMLElement>({
  autoLock = true,
}: UseScrollLockProps = {}) {
  const ref = useRef<Nullable<T>>(null);
  const originalOverflow =
    useRef<Nullable<CSSStyleDeclaration['overflow']>>(null);

  const lock = useCallback(() => {
    const targetElement = ref.current as T;

    originalOverflow.current = window.getComputedStyle(targetElement).overflow;
    targetElement.style.overflow = 'hidden';
  }, []);

  const unlock = useCallback(() => {
    if (!originalOverflow.current) return;

    const targetElement = ref.current as T;
    targetElement.style.overflow = originalOverflow.current;
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) {
      ref.current = document.body as T;
    }

    if (autoLock) {
      lock();
    }

    return () => unlock();
  }, [autoLock, lock, unlock]);

  return { ref, lock, unlock };
}
