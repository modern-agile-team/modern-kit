import { isClient } from '@modern-kit/utils';
import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect = isClient()
  ? useLayoutEffect
  : useEffect;
