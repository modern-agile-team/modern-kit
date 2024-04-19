import { isClient } from '@devgrace/utils';
import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect = isClient()
  ? useLayoutEffect
  : useEffect;
