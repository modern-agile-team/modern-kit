import { type EffectCallback, useEffect } from 'react';

/**
 * @description 컴포넌트가 마운트될 때 한 번만 실행되는 훅입니다.
 *
 * @param {EffectCallback } effectCallback - 실행할 함수입니다.
 *
 * @example
 */
export function useOnceEffect(effectCallback: EffectCallback) {
  useEffect(() => {
    effectCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
