import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

interface UseVhPropertyProps {
  name?: string;
  enableResize?: boolean;
}

export const useVhProperty = ({
  name = 'vh',
  enableResize = false,
}: UseVhPropertyProps = {}) => {
  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty(`--${name}`, `${vh}px`);
    };

    handleResize();

    if (enableResize) {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (enableResize) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [name, enableResize]);
};
