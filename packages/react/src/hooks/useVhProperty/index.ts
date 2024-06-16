import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

interface Options {
  enableResize?: boolean;
}

export const useVhProperty = (
  name: string = 'vh',
  options: Options = { enableResize: false },
) => {
  const { enableResize } = options;

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
