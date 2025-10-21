import { usePreservedCallback } from '../usePreservedCallback';
import { useEffect } from 'react';

/**
 * @description 컴포넌트가 언마운트될 때 특정 작업을 수행할 수 있게 해주는 훅입니다.
 *
 * @param {() => void} cleanup - 컴포넌트가 언마운트될 때 실행될 콜백 함수입니다.
 *
 * @example
 * useUnmount(() => {
 *   console.log('컴포넌트가 언마운트되었습니다.');
 * });
 */
export function useUnmount(cleanup: () => void) {
  const preservedCleanup = usePreservedCallback(cleanup);

  useEffect(() => () => preservedCleanup(), [preservedCleanup]);
}
