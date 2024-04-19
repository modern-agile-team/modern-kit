import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { DependencyList } from 'react';

interface UseScrollToProps {
  left?: ScrollToOptions['left'];
  top?: ScrollToOptions['top'];
  behavior?: ScrollToOptions['behavior'];
  dependencies?: DependencyList;
}

const useWindowScrollTo = ({
  left = 0,
  top = 0,
  behavior = 'auto',
  dependencies = [],
}: UseScrollToProps = {}) => {
  useIsomorphicLayoutEffect(() => {
    window.scrollTo({
      left,
      top,
      behavior,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, top, behavior, ...dependencies]);
};

export default useWindowScrollTo;
