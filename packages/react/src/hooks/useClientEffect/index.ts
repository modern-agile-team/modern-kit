import { useEffect } from 'react';

import { isServer } from '@modern-kit/utils';

export const useClientEffect = (
  callback: React.EffectCallback,
  deps: React.DependencyList = []
) => {
  useEffect(() => {
    if (isServer()) return;
    callback();
  }, deps);
};
