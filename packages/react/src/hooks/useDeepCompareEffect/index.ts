import { useConditionalEffect } from '../useConditionalEffect';
import { isEqual } from '@modern-kit/utils';
import { type DependencyList, type EffectCallback } from 'react';

/**
 * @description 의존성 배열을 깊은 비교(deep comparison)를 통해 판단하여 effect를 실행하는 커스텀 훅입니다.
 *
 * ⚠️ 깊은 비교를 수행하기 때문에 성능 이슈가 발생할 수 있어 사용 시 주의가 필요합니다.
 *
 * @param {EffectCallback} effectCallback - 실행할 effectCallback 함수
 * @param {DependencyList} deps - 의존성 배열
 *
 * @example
 * useDeepCompareEffect(() => {
 *   console.log('obj가 변경되었습니다.');
 * }, [obj]);
 */
export function useDeepCompareEffect(
  effectCallback: EffectCallback,
  deps: DependencyList
) {
  useConditionalEffect(effectCallback, deps, (prevDeps, currentDeps) => {
    if (prevDeps === undefined) {
      return true;
    }

    return !isEqual(prevDeps, currentDeps);
  });
}
