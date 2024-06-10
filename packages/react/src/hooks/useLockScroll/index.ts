import { CSSProperties, useCallback, useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { Nullable } from '@modern-kit/types';

interface UseLockScrollProps {
  autoLock?: boolean;
}

export const useLockScroll = <T extends HTMLElement>({
  autoLock = true,
}: UseLockScrollProps = {}) => {
  const ref = useRef<Nullable<T>>(null);
  const originalOverflow = useRef<CSSProperties['overflow']>('');

  const lock = useCallback(() => {
    const targetElement = ref.current as T;

    originalOverflow.current = window.getComputedStyle(targetElement).overflow;
    targetElement.style.overflow = 'hidden';
  }, []);

  const unlock = useCallback(() => {
    const targetElement = ref.current as T;

    targetElement.style.overflow = originalOverflow.current as string;
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
};
