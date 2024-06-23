import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

interface Options {
  name?: string;
  enableResize?: boolean;
}

export const useVhProperty = (options: Options = {}) => {
  const { name = 'vh', enableResize = false } = options;

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
