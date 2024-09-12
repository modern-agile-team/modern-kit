import { isClient } from '@modern-kit/utils';
import { useEffect, useLayoutEffect } from 'react';

/**
 * @description `useIsomorphicLayoutEffect`훅은 클라이언트와 서버 환경에서 적절한 Effect 훅을 사용하는 훅입니다.
 *
 * React의 `useLayoutEffect`는 서버 측 렌더링 시 경고가 발생할 수 있으므로,
 * 이를 방지하기 위해 서버에서는 `useEffect`를 사용하고, 클라이언트에서는 `useLayoutEffect`를 사용합니다.
 *
 * @example
 * useIsomorphicLayoutEffect(callback, deps);
 */
export const useIsomorphicLayoutEffect = isClient()
  ? useLayoutEffect
  : useEffect;
