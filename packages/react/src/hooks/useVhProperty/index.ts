import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { usePrevious } from '../usePrevious';

interface Options {
  calculateAtResize?: boolean;
}

export const useVhProperty = (
  name: string = 'vh',
  options: Options = { calculateAtResize: false },
) => {
  const previousName = usePrevious(name);
  const { calculateAtResize } = options;

  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty(`--${name}`, `${vh}px`);
    };

    if (previousName !== name) {
      document.documentElement.style.removeProperty(`--${previousName}`);
    }

    handleResize();

    if (calculateAtResize) {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (calculateAtResize) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [name, calculateAtResize]);
};
