import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

interface UseVhPropertyProps {
  name?: string;
  enabledResize?: boolean;
}

export function useVhProperty({
  name = 'vh',
  enabledResize = false,
}: UseVhPropertyProps = {}) {
  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty(`--${name}`, `${vh}px`);
    };

    handleResize();

    if (enabledResize) {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (enabledResize) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [name, enabledResize]);
}
